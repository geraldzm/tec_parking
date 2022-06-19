import { /*ReservationRep,*/ ParkingRep, /*UserRep*/ } from '../repository';

export class ReportUserController {

    private static instance: ReportUserController;
    //private reservationRep: ReservationRep;
    private parkingRep: ParkingRep;
    //private userRep: UserRep;

    private constructor() {
      //  this.reservationRep = new ReservationRep();
        this.parkingRep = new ParkingRep();
        //this.userRep = new UserRep();
    }

    public static getInstance(): ReportUserController {
        if (!this.instance) this.instance = new ReportUserController();
        return this.instance;
    }

    /**
    * Create a parkinglot details for operator users
    * @param {Object} reservation { reservation }
    */
    public getOperatorReport(parkinglotId: string, start: string, end: string): Promise<any> {

        return new Promise(async (rs, rj) => {

            //Verify that has all the necessary data
            if (!parkinglotId || !start || !end) {
                rj("It does not have all the data"); //reject
                return;
            }

            //verify types
            else if (typeof (parkinglotId) != 'string' || typeof (start) != 'string'
                || typeof (end) != 'string') {
                rj("A field is incorrect");
                return;
            }

            //getparking and check if is correct
            const parking = await this.parkingRep.getParkingById(parkinglotId);
            if (!parking) {
                rj("No user or parkinglot found"); // reject
                return;
            }

            //Set the correct format for the schedule and contracts' limits
            parking.schedule.startHour = (new Date(parking.schedule.startHour.seconds * 1000)).toLocaleTimeString();
            parking.schedule.endHour = (new Date(parking.schedule.endHour.seconds * 1000)).toLocaleTimeString();


            //Return parking details without filter
            /*if (start == '0') 
                rs(parking);*/
            
            rs(parking);
        });
    }

}