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
                const authToken = createToken({ sub: user.id, email: user.email, name: user.name });

                // save token in DB 
                this.rep.saveUserToken(user.id, toSha256(authToken));

                rs(authToken);
            }
        });
    }


    /**
    * Validates the data and register a new user
    * @param {Object} user { user }
    */
    public registerUser(user : any) : Promise<any>
    {

        /*
        var email = user.email.split("@");
        
        //Check the domain in the main email 
        if (email[1] != "itcr.ac.cr" && email[1] != "tec.ac.cr"){
            throw new Error('main email does not have the correct domain');
        }*/

        
        //Encrypt the passcode and set the active field
        user.password = toSha256(user.password);
        user.active = true;

        //Set by default a list of plates and schedule, both of them empty
        user.schedule = {}
        user.plates = []

        return this.rep.saveUser(user);
    }


    /**
    * It allows to do a logical deletion for an user
    * @param {string} userId
    */
    public deleteUser(userId : string) : Promise <any>
    {

        return new Promise(async (rs, rj) => {
            
            if (!userId){
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
            
            if (!userId || !user){
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
