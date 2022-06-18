import { UserRep } from '../repository';
import { toSha256, createToken } from '../utils/auth'
import { setCorrectFormatSchedule } from '../utils/common';
import { validateEmail } from '../utils/validations'

export class UserController {
    
    private static instance: UserController;
    private rep: UserRep;

    private constructor()
    {
        this.rep = new UserRep();
    }

    public static getInstance() : UserController
    {
        if (!this.instance) this.instance = new UserController();
        return this.instance;
    }

    public login(email:string, password:string) : Promise<any> 
    {
        return new Promise(async (rs, rj) => {
            
            // validate 
            if (!email){
                rj("email is empty");
                return;
            }
            
            const user = await this.rep.getUserByEmail(email);
            
            if(!user) {
                rj("No user found"); // reject 
            } else {

                // compare passwords
                const encryptedPassword = toSha256(password);
                if(encryptedPassword !== user.password) {
                    rj("Incorrect password"); // reject
                }

                // create token 
                const scopes = [];
                if(user.role && user.role.toLowerCase() === 'admin') {
                    scopes.push("reports");
                    scopes.push("parkinglots");
                    scopes.push("editUsers");
                }

                const authToken = createToken({ sub: user.id, email: user.email, name: user.name, scopes: scopes });

                rs( { token: authToken, user: { email: user.email, name: user.name, role: user.role, profile: user.profile } } );
            }
        });
    }


    /**
    * Validates the data and register a new user
    * @param {Object} user { user }
    */
    public registerUser(user : any) : Promise<any>
    {

        return new Promise(async (rs, rj) => {
            
            //Verify that has all the necessary data
            if (!user.name || !user.email  || !user.secondEmail  || !user.phone || !user.idNumber
                || user.useSecondEmailAsFavorite == undefined  || !user.area || !user.password 
                || !user.role || !user.profile || user.disabled == undefined){
                rj("It does not have all the data"); //reject
            }

            //verify types
            else if (typeof(user.name) != 'string' || typeof(user.email) != 'string'  
                || typeof(user.secondEmail) != 'string' || typeof(user.phone) != 'number' 
                || typeof(user.idNumber) != 'string'|| typeof(user.useSecondEmailAsFavorite) != 'boolean' 
                || typeof(user.area) != 'object' || typeof(user.password) != 'string'
                || typeof(user.role) != 'string' || typeof(user.profile) != 'string'
                || typeof(user.disabled) != 'boolean'){

                rj ("A field is incorrect")
            }

            //Verify area
            else if (!user.area.code || !user.area.name){
                rj("the area requires code and name");
            }

            //verify role
            else if (user.role != "admin" && user.role != "funcionario"){
                rj("Role incorrect");
            }

            //verify profile
            else if (user.profile != "admin" && user.profile != "estandar" && user.profile != "jefatura"
                    && user.profile != "operador"){
                rj("Role incorrect");
            }

            //Verify emails structures
            else if (!user.email.includes('@') || !user.secondEmail.includes('@')){
                rj("Malformed email structure");
            }

            //Verify institutional email
            else if (user.email.split("@")[1] != "itcr.ac.cr" && user.email.split("@")[1] != "tec.ac.cr") {
                rj("Need an institutional email for the main email");
            }

            //Verify if it's a new account
            else if (await this.rep.getUserByEmail(user.email)){
                rj("The email has already been registered previously");
            }

            //Insert new user
            else{
                
                //Encrypt the passcode and set the active field
                user.password = toSha256(user.password);
                user.active = true;

                //Set by default a list of plates and schedule, both of them empty
                user.schedule = {}
                user.plates = []
            
                rs(this.rep.saveUser(user));   
            }            
        });
    }


    /**
    * It allows to do a logical deletion for an user
    * @param {string} userId
    */
    public deleteUser(userId : string) : Promise <any>
    {

        return new Promise(async (rs, rj) => {
            
            if (!userId || userId == ""){
                rj("Error Empty string"); //reject
            }
            else{

                const result = await this.rep.deleteUser(userId);

                if (result.code && result.code == 5){
                    rj("No user found")
                }
                rs(result);
            }
        });
    }


    /**
    * Method for the user to edit his own information 
    * @param {Object} user { user }
    * @param {string} userId
    */
    public updateUser( userId : string, user : any) : Promise<any>
    {
        return new Promise(async (rs, rj) => {
            
            const userDB = await this.rep.getUserById(userId);
            
            if(!userDB) {
                rj("No user found"); // reject 
                return; 
            } 

            user.plates = user.plates ? user.plates : userDB.plates;
            user.secondEmail = user.secondEmail ? user.secondEmail : userDB.secondEmail;
            this.setScheduleCorrectFormat(user.schedule);

            return rs(this.rep.updateUserInfo(user, userId));
        });
    }


    /**
    * Set the correct format for schedules
    * @param schedule 
    */
    private setScheduleCorrectFormat(schedule : any) : void {

        //var days = ["domingo", "lunes", "martes", "miercoles", "jueves", "viernes", "sabado"];

        for (var i in schedule) {

            for(var j in schedule[i]) {
                
                //Set correct format to the schedule
                var date = new Date();

                date.setHours((schedule[i][j].start.split(':'))[0]);
                date.setMinutes((schedule[i][j].start.split(':'))[1]);
                schedule[i][j].start = date;

                date = new Date();
                date.setHours((schedule[i][j].end.split(':'))[0]);
                date.setMinutes((schedule[i][j].end.split(':'))[1]);
                schedule[i][j].end = date;
            }
        }
    }

    /**
    * Method to update the information of a user (admins only)
    * @param user 
    */
    public editUser( user : any) : Promise<any>
    {
        return new Promise(async (rs, rj) => {

            const oldUserDB = await this.rep.getUserById(user.id);
            if(oldUserDB === null ) {
                rj("No user found");
                return;
            }

            //Checks the main email
            if (user.email !== "") {

                // validate email form
                const rs = validateEmail(user.email);
                if(!rs.ok) {
                    rj(rs.error);
                    return;
                }

                // validate duplicated
                var tmpUser = await this.rep.getUserByEmail(user.email);

                //Verify if it's valid email
                if (tmpUser && user.id !== tmpUser.id) {
                    rj("The email has already been registered previously");
                    return;
                }
               
            } else user.email = oldUserDB.email;
            
            // verify role
            if (user.role !== "admin" && user.role !== "funcionario"){
                rj("Incorrect role");
                return;
            }

            user.idNumber = user.idNumber !== "" ? user.idNumber : oldUserDB.idNumber;
            user.phone = user.phone ? user.phone : oldUserDB.phone;
            user.secondEmail = user.secondEmail !== "" ? user.secondEmail : oldUserDB.secondEmail;
            user.name = user.name !== "" ? user.name : oldUserDB.name;
            user.password = user.password !== "" ? toSha256(user.password) : oldUserDB.password; // NOTES: password is not validated

            return rs(this.rep.editUserInfo(user));
        });
    }

    public getUserInfoByID(userId : string) : Promise<any> 
    {
        return new Promise(async (rs, rj) => {

            const result = await this.rep.getUserById(userId);

            if (!result) {
                rj("No user found");
            }

            setCorrectFormatSchedule(result.schedule);
            rs(result);
        });
    }   
}
