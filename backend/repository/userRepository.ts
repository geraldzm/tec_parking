// import db from '../firebase'

export class UserRep {
 
    public constructor() {
        // this.log = new Logger();
    }


    saveUserToken(id: any, authToken: string) {
        console.log(`save ${id}, ${authToken}`)
    }


    getUserByEmail(email: string): Promise<any> {
        return new Promise((rs, rj) => rs({email: "gerald@gmail.com", password: "R1ttI7iZ8LeuAHW8G7UfMp3RsJbPII5ugmdMUQCprg0="})); // example
    }

    public getUserById(userId:string): Promise<any> {
        throw new Error('Method not implemented.');
    }

    public saveUser(): Promise<any> {
        throw new Error('Method not implemented.');
    }

    public deleteUser(userId:string): Promise<any> {
        throw new Error('Method not implemented.');
    }

    public updateUserInfo(): Promise<any> {
        throw new Error('Method not implemented.');
    }

}