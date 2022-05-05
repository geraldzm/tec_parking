import db from '../firebase'

export class ParkingRep {


    public constructor() {
        // this.log = new Logger();
    }

    
    public getAllSpacesByBuilding(building: string): Promise<any> {

        console.log(building);

        return db.collection('ParkingLots')
        .where ('building','==', building)
        .get()
        .then(rs => rs.docs.map((doc)=> ({
            id: doc.id,
            ...doc.data(),
        })));
    }

    public getAllSpaces(): Promise<any> {
        
        return db.collection('ParkingLots')
        .get()
        .then(rs => rs.docs.map((doc)=> ({
            id: doc.id,
            ...doc.data(),
        })));
    }

    public createParkingLot(parkinglot : any) : Promise <any>{

        return db.collection('ParkingLots')
        .add(parkinglot)
        .then(rs => rs);
    }

    public updateParkingLot(parkinglot : any, idParking : any) : Promise <any>{


        console.log(parkinglot);
        console.log(idParking);
       
        return db.collection('ParkingLots')
        .doc(idParking)
        .update(parkinglot)
        .then(rs => rs);
    }
    

    public deleteParkingLot(idParking : any) : Promise <any>{

        return db.collection('ParkingLots')
        .doc(idParking)
        .update({active : false})
        .then(rs => rs);
    }
    
}