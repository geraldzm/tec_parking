import { UserRep } from '../repository';
import { encrypt } from '../utils/auth'

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
        console.log("here");
        return new Promise(async (rs, rj) => {
            
            const user = await this.rep.getUserByEmail(email);

            if(!user) {
                rj("No user found"); // reject 
            }
            
            // compare passwords
            const encryptedPassword = encrypt(password);
            if(encryptedPassword !== user.password) {
                rj("Incorrect password"); // reject
            }

            // create token 
            const authToken = 'my-example-token'; // temporary

            // save token in DB 
            this.rep.saveUserToken(user.id, authToken);

            rs(authToken);
        });
    }

}