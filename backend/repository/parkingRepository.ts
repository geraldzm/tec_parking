import db from '../firebase'

export class ParkingRep {


    public constructor() {
        // this.log = new Logger();
    }

    
    public getAllSpacesByBuilding(building: string): Promise<any> {

        throw new Error('Method not implemented.');
        // EN MONGO, no sé como es en firebase aun xd:
        //    return db.collection('ParkingLots')
        //    .find({ building: building })
        //    .then(rs => rs.docs);
    }

    public getAllSpaces(): Promise<any> {
         
        return db.collection('users')
        .get()
        .then(rs => rs.docs[0]);
    }

}