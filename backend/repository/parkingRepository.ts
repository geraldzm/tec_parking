import db from '../firebase'

export class ParkingRep {


    public constructor() {
        // this.log = new Logger();
    }

    /**
    * Consult a parkinglot by building
    * @param {string} building
    */
    public getAllSpacesByBuilding(building: string): Promise<any> {

        return db.collection('ParkingLots')
            .where('building', '==', building)
            .where('active', '==', true)
            .get()
            .then((rs: any) => {
                if (rs.docs[0]) {
                    return {
                        id: rs.docs[0].id,
                        ...rs.docs[0].data()
                    }
                } else {
                    return null;
                }
            });
    }


    //List all parkinglots from 'ParkingLots' collection in firebase db
    public getAllSpaces(): Promise<any> {

        return db.collection('ParkingLots')
            .where('active', '==', true)
            .get()
            .then((rs: any) => rs.docs.map((doc: any) => ({
                id: doc.id,
                ...doc.data()
            })));
    }


    /**
    * Consult a parkinglot by Id
    * @param {string} parkingId
    */
     public getParkingById(parkingId : string): Promise<any> {
        return db.collection('ParkingLots')
        .doc(parkingId)
        .get()
        .then((doc : any) => doc.exists ? { id : doc.id, ...doc.data()} : null);
    }


    /**
    * It must create a new Parkinglot
    * @param {Object} parkinglot { parkingLot }
    */
    public createParkingLot(parkinglot: any): Promise<any> {

        return db.collection('ParkingLots')
            .add(parkinglot)
            .then((rs: any) => rs);
    }


    /**
    * Allows to update a parkinglot
    * @param {Object} parkinglot { parkingLot }
    * @param {string} idParking
    */
    public updateParkingLot(parkinglot: any, idParking: string): Promise<any> {

        return db.collection('ParkingLots')
            .doc(idParking)
            .update(parkinglot)
            .then((rs: any) => rs)
            .catch((error: any) => error);
    }


    /**
    * Change the active field to false for a parkinglot
    * @param {string} idParking
    */
    public deleteParkingLot(idParking: string): Promise<any> {

        return db.collection('ParkingLots')
            .doc(idParking)
            .update({
                active: false
            })
            .then((rs: any) => rs)
            .catch((error: any) => error);
    }
}