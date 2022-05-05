import { UserRep } from '../repository';

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

    public registerUser(user : any) : Promise<any> 
    {

        var email = user.email.split("@");
        console.log(email);
        
        //Check the domain in the main email 
        if (email[1] != "itcr.ac.cr" && email[1] != "tec.ac.cr"){
            throw new Error('main email does not have the correct domain');
        }

        //Validar
        return this.rep.register(user);
    }


    //Definir mejor, es solo un adelanto
    //data has email and password
    public login (data : any) : Promise <any>
    {
        return this.rep.login(data);
    }
}