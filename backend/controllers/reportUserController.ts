import { ReservationRep, ParkingRep, /*UserRep*/ } from '../repository';

export class ReportUserController {

    private static instance: ReportUserController;
    private reservationRep: ReservationRep;
    private parkingRep: ParkingRep;
    //private userRep: UserRep;

    private constructor() {
        this.reservationRep = new ReservationRep();
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
            var parking = await this.parkingRep.getParkingById(parkinglotId);
            if (!parking) {
                rj("No user or parkinglot found"); // reject
                return;
            }

            //Return parking details without filter
            if (start != '0' && end != '0') {

                var s = new Date(start);
                var e = new Date(end);
                console.log("HERE");
                await this.consultOccupationStandarUserAndVisitor(parking, s, e);
                await this.consultOccupationOfficialVehicles(parking);
                await this.consultOccupationLeaderships(parking, s);
                await this.consultOccupationDisabledSpaces(parking, s, e);
            }

            //Set the correct format for the schedule limits
            parking.schedule.startHour = (new Date(parking.schedule.startHour.seconds * 1000)).toLocaleTimeString();
            parking.schedule.endHour = (new Date(parking.schedule.endHour.seconds * 1000)).toLocaleTimeString();

            rs(parking);
        });
    }

    async consultOccupationStandarUserAndVisitor(parking: any, start: Date, end: Date) {

        var reservations = await this.reservationRep.getReservationsByTypeByParking('Funcionario', parking.id);
        var count = 0;

        reservations.forEach(function (r: any) {
            if (start.getTime() < r.end.seconds * 1000 && r.start.seconds * 1000 < end.getTime())
                count++;
        });

        var reservations2 = await this.reservationRep.getReservationsByTypeByParking('Visitante', parking.id);
        reservations2.forEach(function (r: any) {
            if (start.getTime() < r.end.seconds * 1000 && r.start.seconds * 1000 < end.getTime())
                count++;
        });

        if (parking.othersSpaces < count) parking.busyOthersSpaces = parking.othersSpaces;
        else parking.busyOthersSpaces = count;
    }

    async consultOccupationOfficialVehicles(parking: any) {
        var reservations = await this.reservationRep.getReservationsByTypeByParking('Vehiculo Oficial', parking.id);
        parking.busyVehiclesSpaces = reservations.length;
    }


    async consultOccupationLeaderships(parking: any, start: Date) {
        var reservations = await this.reservationRep.getReservationsByTypeByParking('Jefatura', parking.id);
        var count = 0;

        reservations.forEach(function (r: any) {
            if (start.toDateString() == (new Date(r.date.seconds * 1000)).toDateString())
                count++;
        });
        parking.busyAdministrativeSpaces = count;
    }

    async consultOccupationDisabledSpaces(parking: any, start: Date, end: Date) {

        //Consult the reservation for Discapacitado type and parking
        var reservations = await this.reservationRep.getReservationsByTypeByParking('Discapacitado', parking.id);
        var count = 0;

        reservations.forEach(function (r: any) {
            if (r.date && (new Date(r.date.seconds * 1000)).toDateString() == start.toDateString())
                count++;

            else if (!r.date && start.getTime() < r.end.seconds * 1000 && r.start.seconds * 1000 < end.getTime())
                count++;
        });

        if (parking.disabledSpaces < count) parking.busyDisabledSpaces = parking.disabledSpaces;
        else parking.busyDisabledSpaces = count;
    }
}