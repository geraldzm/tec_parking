import db from '../firebase'

export class UserRep {
 
    public constructor() {
        // this.log = new Logger();
    }

    //List all users from 'Users' collection in firebase db
    public getAllUsers(): Promise<any> {

        return db.collection('Users')
            .where('active', '==', true)
            .get()
            .then((rs: any) => rs.docs.map((doc: any) => ({
                id: doc.id,
                
                ...doc.data(),
            })));
    }

    /**
    * Consult an user by email
    * @param {string} email
    */
    public getUserByEmail(email: string): Promise<any> {
        
        return db.collection('Users')
        .where('email', '==', email)
        .where('active', '==', true)
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
    * Consult an user by Id
    * @param {string} userId
    */
    public getUserById(userId : string): Promise<any> {
        return db.collection('Users')
        .doc(userId)
        .get()
        .then((doc : any) => doc.exists ? { id : doc.id, ...doc.data()} : null);
    }

    /**
    * Consult an user by IdNumber
    * @param {string} userIdNumber
    */
     public getUserByIdNumber(userIdNumber : string): Promise<any> {
        
        return db.collection('Users')
        .where('idNumber', '==', userIdNumber)
        .where('active', '==', true)
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
    * Register a new User
    * @param {Object} user { user }
    */
    public saveUser(user : any): Promise<any> {
        
        return db.collection('Users')
        .add({
            name: user.name,
            email: user.email,
            secondEmail: user.secondEmail, 
            phone: user.phone,
            idNumber: user.idNumber,
            useSecondEmailAsFavorite: user.useSecondEmailAsFavorite,
            area: user.area,
            password: user.password,
            role: user.role,
            active: user.active,
            schedule: user.schedule,
            plates: user.plates,
            profile : user.profile,
            disabled : user.disabled,
            parkinglotId : user.parkinglotId
        })
        .then((rs:any) => {
            console.log('user saved: ' + rs);
        });
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
        
        console.log("user");
        console.log(user);

        return db.collection('Users')
        .doc(userId)
        .update({
            plates : user.plates,
            secondEmail : user.secondEmail,
            schedule : user.schedule
        });
    }


    //Get only the time zones of currently active users
    public listTimeZones() : Promise <any>{

        return db.collection('Users')
        .where('active', '==', true)
        .get()
        .then((rs: any) => rs.docs.map((doc: any) => ({
            ...doc.data().schedule,
        })));
    }

    public editUserInfo(user : any) : Promise <any>{

        return db.collection('Users')
        .doc(user.id)
        .update({
            idNumber : user.idNumber,
            role : user.role,
            area : user.area,
            phone : user.phone,
            password : user.password,
            secondEmail : user.secondEmail,
            email : user.email,
            name : user.name,
            useSecondEmailAsFavorite : user.useSecondEmailAsFavorite,
            profile : user.profile,
            disabled : user.disabled,
            parkinglotId : user.parkinglotId
        })
        .then((rs:any) => rs)
        .catch((error : any) => error);	 
    }

    /*
    public setDisabled(): Promise<any> {

        return db.collection("Users").get().then(function(querySnapshot : any) {
            querySnapshot.forEach(function(doc : any) {
                doc.ref.update({
                    disabled: false
                });
            });
        });
    }*/
}