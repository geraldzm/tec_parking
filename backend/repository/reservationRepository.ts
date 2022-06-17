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
    public getReservationsByType(type: string): Promise<any> {

        return db.collection('Reservations')
            .where('active', '==', true)
            .where('type', '==', type)
            .get()
            .then((rs: any) => rs.docs.map((doc: any) => ({
                id: doc.id,
                ...doc.data()
            })));
    }
}