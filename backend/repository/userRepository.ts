import db from '../firebase'

export class UserRep {


    public constructor() {
        // this.log = new Logger();
    }

    
    public register(user : any) : Promise<any> {

        return db.collection('Users')
        .add(user)
        .then(rs => rs);
    }


    public login(data : any) : Promise<any> {
        
        return db.collection('Users')
        .where ('email','==', data.email)
        .get()
        .then(rs => rs.docs.map((doc)=> ({
            id: doc.id,
            ...doc.data(),
        })));
    }


}