import { UserRep } from '../repository';
import { toSha256, createToken } from '../utils/auth'

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
            
            const user = await this.rep.getUserByEmail(email);
            console.log(user);
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
                if(user.role && user.role.toLowerCase() === 'admin')
                    scopes.push("reports");

                const authToken = createToken({ sub: user.id, email: user.email, name: user.name, scopes: scopes });

                rs( { token: authToken } );
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
                || !user.role){
                rj("It does not have all the data"); //reject
            }

            //verify types
            else if (typeof(user.name) != 'string' || typeof(user.email) != 'string'  
                || typeof(user.secondEmail) != 'string' || typeof(user.phone) != 'number' 
                || typeof(user.idNumber) != 'string'|| typeof(user.useSecondEmailAsFavorite) != 'boolean' 
                || typeof(user.area) != 'object' || typeof(user.password) != 'string'
                || typeof(user.role) != 'string'){

                rj ("A field is incorrect")
            }

            //Verify area
            else if (!user.area.code || !user.area.name){
                rj("the area requires code and name");
            }

            //verify role?
            else if (user.role != "Admin" && user.role != "Docente" && user.role != "Jefatura"){
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
    * Update specific data for an user
    * @param {Object} user { user }
    * @param {string} userId
    */
    public updateUser(user : any, userId : string) : Promise<any>
    {
        
        return new Promise(async (rs, rj) => {
            
            if (!userId || userId == ""){
                rj("Error Empty parameter"); //reject
            }
            else{

                const userDB = await this.rep.getUserById(userId);
                
                if(!userDB) {
                    rj("No user found"); // reject 
                }

                else{
                    user.plates = user.plates ? user.plates : userDB.plates;
                    user.secondEmail = user.secondEmail ? user.secondEmail : userDB.secondEmail;
                    user.schedule = user.schedule ? user.schedule : userDB.schedule;

                    rs(this.rep.updateUserInfo(user, userId));
                }
            }
        });
    }
}
