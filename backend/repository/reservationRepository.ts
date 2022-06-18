import db from '../firebase'

export class ReservationRep {

    public constructor() {
        // this.log = new Logger();
    }


    /**
    * It must create a new Reservation
    * @param {Object} reservation { reservation }
    */
    public createReservation(reservation: any): Promise<any> {

        return db.collection('Reservations')
            .add(reservation)
            .then((rs: any) => rs);
    }


    //List reservations of a type from 'Reservation' collection in firebase db
    public getReservationsByTypeByParking(type: string, parkinglotId: string): Promise<any> {

        return db.collection('Reservations')
            .where('active', '==', true)
            .where('type', '==', type)
            .where('parkinglotId', '==', parkinglotId)
            .get()
            .then((rs: any) => rs.docs.map((doc: any) => ({
                id: doc.id,
                ...doc.data()
            })));
    }

    //Delete logic for a reservation
    public deleteReservation(reservationId: string): Promise<any> {
        
        return db.collection('Reservations')
        .doc(reservationId)
        .update({
            active : false
        })
        .then((rs:any) => rs)
        .catch((error : any) => error);	
    }

    //List reservations from 'Reservation' collection in firebase db by user
    public getReservationsByUser(userId: string): Promise<any> {
        return db.collection('Reservations')
            .where('active', '==', true)
            .where('userId', '==', userId)
            .get()
            .then((rs: any) => rs.docs.map((doc: any) => ({
                id: doc.id,
                ...doc.data()
        })));
    }
}