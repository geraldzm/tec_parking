import db from '../firebase'

export class UserRep {
 
    public constructor() {
        // this.log = new Logger();
    }



    public saveUserToken(id: any, authToken: string) {
        console.log(`save ${id}, ${authToken}`)
    }


    /**
    * Consult a user by email
    * @param {string} email
    */
    public getUserByEmail(email: string): Promise<any> {
        //return new Promise((rs, rj) => rs({email: "gerald@gmail.com", password: "R1ttI7iZ8LeuAHW8G7UfMp3RsJbPII5ugmdMUQCprg0="})); // example

        return db.collection('Users')
        .where('email', '==', email)
        .get()
        .then((rs:any) => {
            if (rs.docs[0]){
                return {
                    id : rs.docs[0].id,
                    ...rs.docs[0].data()
                }
            }else{
                return null;
            }
        });
    }


    /**
    * Consult a user by Id
    * @param {string} userId
    */
    public getUserById(userId : string): Promise<any> {
        return db.collection('Users')
        .doc(userId)
        .get()
        .then((doc : any) => {
            if (doc.exists){
                return {
                    id : doc.id,
                    ...doc.data()
                }
            }else{
                return null;
            }
        });
    }


    /**
    * Register a new User
    * @param {Object} user { user }
    */
    public saveUser(user : any): Promise<any> {
        
        return db.collection('Users')
        .add(user)
        .then((rs:any) => rs);
    }


    /**
    * Logic delete for an user by id
    * @param {string} userId
    */
    public deleteUser(userId : string): Promise<any> {

        return db.collection('Users')
        .doc(userId)
        .update({
            active : false
        })
        .then((rs:any) => rs)
        .catch((error : any) => error);	
    }


    /**
    * Update an User
    * @param {Object} user { user }
    * @param {string} userId
    */
    public updateUserInfo(user : any, userId : string): Promise<any> {
        
        return db.collection('Users')
        .doc(userId)
        .update({
            plates : user.plates,
            secondEmail : user.secondEmail,
            schedule : user.schedule
        })
        .then((rs:any) => rs)
        .catch((error : any) => error);	
    }

}