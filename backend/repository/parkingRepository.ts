import db from '../firebase'

export class ParkingRep {


    public constructor() {
        // this.log = new Logger();
    }

    
    public getAllSpacesByBuilding(building: string): Promise<any> {

        return db.collection('ParkingLots')
        .where ('building','==', building)
        .get()
        .then((rs:any) => rs.docs.map((doc:any)=> ({
            id: doc.id,
            ...doc.data(),
        })));
    }

    public getAllSpaces(): Promise<any> {
        
        return db.collection('ParkingLots')
        .get()
        .then((rs:any) => rs.docs.map((doc:any)=> ({
            id: doc.id,
            ...doc.data(),
        })));
    }

    public createParkingLot(parkinglot : any) : Promise <any>{

        return db.collection('ParkingLots')
        .add(parkinglot)
        .then((rs:any) => rs);
    }

    public updateParkingLot(parkinglot : any, idParking : any) : Promise <any>{
       
        return db.collection('ParkingLots')
        .doc(idParking)
        .update(parkinglot)
        .then((rs:any) => rs);
    }
    

    public deleteParkingLot(idParking : any) : Promise <any>{

        return db.collection('ParkingLots')
        .doc(idParking)
        .update({active : false})
        .then((rs:any) => rs);
    }
    
}