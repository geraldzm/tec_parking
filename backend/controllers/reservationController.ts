import { ReservationRep, ParkingRep, UserRep } from '../repository';

export class ReservationController {

    private static instance: ReservationController;
    private reservationRep: ReservationRep;
    private parkingRep: ParkingRep;
    private userRep: UserRep;

    private constructor() {
        this.reservationRep = new ReservationRep();
        this.parkingRep = new ParkingRep();
        this.userRep = new UserRep();
    }

    public static getInstance(): ReservationController {
        if (!this.instance) this.instance = new ReservationController();
        return this.instance;
    }


    /**
    * Create a new reservation for a standar user
    * @param {Object} reservation { reservation }
    */
    public createFunctionaryReservation(reservation: any): Promise<any> {

        return new Promise(async (rs, rj) => {

            //Verify that has all the necessary data
            if (!reservation.userId || !reservation.start || !reservation.end || !reservation.plate
                || !reservation.parkinglotId) {
                rj("It does not have all the data"); //reject
                return;
            }

            //verify types
            else if (typeof (reservation.userId) != 'string' || typeof (reservation.start) != 'string'
                || typeof (reservation.end) != 'string' || typeof (reservation.plate) != 'string'
                || typeof (reservation.parkinglotId) != 'string') {
                rj("A field is incorrect");
                return;
            }

            //get user and parking and checks if exists
            const user = await this.userRep.getUserById(reservation.userId);
            const parking = await this.parkingRep.getParkingById(reservation.parkinglotId);
            if (!user || !parking) {
                rj("No user or parkinglot found"); // reject
                return;
            }

            //Checks timezone restrictions
            else if (!this.checkTimeZone(reservation, user.schedule)) {
                rj("Reservation's time does not match with the schedule"); // reject
                return;
            }

            //Checks parkinglot schedule 
            else if (!this.checkTimeZoneParking(reservation, parking.schedule)) {
                rj("Parkinglot is closed"); // reject
                return;
            }

            //Correct plate
            else if (!user.plates.includes(reservation.plate)) {
                rj("Incorrect plate"); // reject
                return;
            }

            reservation.active = true;
            if (user.disabled) {
                reservation.type = 'Discapacitado';
                rs(this.checkSpacesDisabledFunctionary(parking.disabledSpaces, reservation));
            } else {
                reservation.type = 'Funcionario';
                rs(this.checkSpacesFunctionaryAndVisitor(parking.othersSpaces, reservation));
            }
        });
    }


    //Validate if the standard user's scheduled reservation matches their time zone
    private checkTimeZone(reservation: any, schedule: any): Boolean {

        //Cast data
        reservation.start = new Date(reservation.start);
        reservation.end = new Date(reservation.end);

        //Get day
        var days = ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];
        var day = days[new Date(reservation.start).getDay()]

        if (!schedule[day])
            return false;

        //Loop through the user's time zones on that day and check if anything matches
        for (var i = 0; i < schedule[day].length; i++) {

            schedule[day][i].start = new Date(schedule[day][i].start.seconds * 1000);
            schedule[day][i].end = new Date(schedule[day][i].end.seconds * 1000);

            schedule[day][i].start.setFullYear(reservation.start.getFullYear(), reservation.start.getMonth(), reservation.start.getDate());
            schedule[day][i].end.setFullYear(reservation.end.getFullYear(), reservation.end.getMonth(), reservation.end.getDate());

            if (reservation.start.getTime() >= schedule[day][i].start.getTime() && reservation.start.getTime() < reservation.end.getTime()
                && reservation.end.getTime() <= schedule[day][i].end.getTime()) {
                return true;
            }
        }
        return false;
    }

    //Check if reservation is whitin the parkinglot schedule
    private checkTimeZoneParking(reservation: any, schedule: any): Boolean {

        //Cast and set correct dates to do the comparison
        schedule.startHour = new Date(schedule.startHour.seconds * 1000);
        schedule.endHour = new Date(schedule.endHour.seconds * 1000)
        schedule.startHour.setFullYear(reservation.start.getFullYear(), reservation.start.getMonth(), reservation.start.getDate());
        schedule.endHour.setFullYear(reservation.end.getFullYear(), reservation.end.getMonth(), reservation.end.getDate());

        if (reservation.start.getTime() >= schedule.startHour.getTime() && reservation.end.getTime() <= schedule.endHour.getTime() &&
            reservation.start.getTime() < reservation.end.getTime()) {
            return true;
        }

        return false;
    }

    //Validate if there are available spaces "othersSpaces" at the time of reservation 
    private checkSpacesFunctionaryAndVisitor(availableSpaces: number, reservation: any): Promise<any> {
        return new Promise(async (rs, rj) => {

            //Consult the reservation for Funcionario type and parking
            var reservations = await this.reservationRep.getReservationsByTypeByParking('Funcionario', reservation.parkinglotId);
            var reservationNumber = 0;

            //Check if exists an overlap between reservation shedule and each reservations in the query
            reservations.forEach(function (r: any) {
                if (reservation.start.getTime() < r.end.seconds * 1000 && r.start.seconds * 1000 < reservation.end.getTime())
                    reservationNumber++;
            });

            //Consult the reservation for Visitante type and parking
            reservations = await this.reservationRep.getReservationsByTypeByParking('Visitante', reservation.parkinglotId);

            //Check if exists an overlap between reservation shedule and each reservations in the query
            reservations.forEach(function (r: any) {
                if (reservation.start.getTime() < r.end.seconds * 1000 && r.start.seconds * 1000 < reservation.end.getTime())
                    reservationNumber++;
            });

            //Only if availableSpaces is bigger than reservationNumber, the reserve is made
            if (availableSpaces > reservationNumber) rs(this.reservationRep.createReservation(reservation));
            else rj("There are no spaces available"); // reject
        });
    }

    //Validate if there are available spaces "disabledSpaces" at the time of reservation 
    private checkSpacesDisabledFunctionary(availableSpaces: number, reservation: any): Promise<any> {
        return new Promise(async (rs, rj) => {
            
            //Consult the reservation for Discapacitado type and parking
            var reservations = await this.reservationRep.getReservationsByTypeByParking(reservation.type, reservation.parkinglotId);
            var reservationNumber = 0;

            reservations.forEach(function (r: any) {

                if (r.date && (new Date(r.date.seconds * 1000)).toDateString() == reservation.start.toDateString())
                    reservationNumber++;

                else if (!r.date && reservation.start.getTime() < r.end.seconds * 1000 && r.start.seconds * 1000 < reservation.end.getTime())
                    reservationNumber++;
            });

            //Only if availableSpaces is bigger than reservationNumber, the reserve is made
            if (availableSpaces > reservationNumber) rs(this.reservationRep.createReservation(reservation));
            else rj("There are no spaces available"); // reject
        });
    }


    /**
        * Create a new reservation for a leadership user
        * @param {Object} reservation { reservation }
    */
    public createLeadershipReservation(reservation: any): Promise<any> {

        return new Promise(async (rs, rj) => {

            //Verify that has all the necessary data
            if (!reservation.userId || !reservation.date || !reservation.plate
                || !reservation.parkinglotId) {
                rj("It does not have all the data"); //reject
                return;
            }

            //verify types
            else if (typeof (reservation.userId) != 'string' || typeof (reservation.date) != 'string'
                || typeof (reservation.plate) != 'string' || typeof (reservation.parkinglotId) != 'string') {
                rj("A field is incorrect");
                return;
            }

            //get user and parking and checks if exists
            const user = await this.userRep.getUserById(reservation.userId);
            const parking = await this.parkingRep.getParkingById(reservation.parkinglotId);
            if (!user || !parking) {
                rj("No user or parkinglot found"); // reject
                return;
            }

            //Checks day restriction
            else if (!this.checkDayLeadership(reservation, user.schedule)) {
                rj("Reservation's time does not match with the schedule"); // reject
                return;
            }

            //Correct plate
            else if (!user.plates.includes(reservation.plate)) {
                rj("Incorrect plate"); // reject
                return;
            }

            reservation.active = true;
            if (user.disabled) {
                reservation.type = 'Discapacitado';
                rs(this.checkSpacesDisabledLeadership(parking.disabledSpaces, reservation));
            } else {
                reservation.type = 'Jefatura';
                rs(this.checkSpacesLeadership(parking.administrativeSpaces, reservation));
            }
        });
    }

    //Check day restriction for leaderships
    private checkDayLeadership(reservation: any, schedule: any): Boolean {

        //Cast and set correct format for reserve date
        reservation.date = new Date(reservation.date);
        reservation.date.setDate(reservation.date.getDate() + 1);

        var days = ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];
        var day = days[reservation.date.getDay()];

        //Makes the comparison
        if (schedule[day] && schedule[day].length > 0)
            return true;

        return false;
    }

    //Validate if there are available spaces "administrativeSpaces" at the time of reservation 
    private checkSpacesLeadership(availableSpaces: number, reservation: any): Promise<any> {
        return new Promise(async (rs, rj) => {

            //Consult the reservation for Jefatura type and parking
            var reservations = await this.reservationRep.getReservationsByTypeByParking(reservation.type, reservation.parkinglotId);
            var reservationNumber = 0;

            reservations.forEach(function (r: any) {
                if (reservation.date.toDateString() == (new Date(r.date.seconds * 1000)).toDateString())
                    reservationNumber++;
            });

            //Only if availableSpaces is bigger than reservationNumber, the reserve is made
            if (availableSpaces > reservationNumber) rs(this.reservationRep.createReservation(reservation));
            else rj("There are no spaces available"); // reject
        });
    }

    //Validate if there are available spaces "disabledSpaces" at the time of reservation 
    private checkSpacesDisabledLeadership(availableSpaces: number, reservation: any): Promise<any> {
        return new Promise(async (rs, rj) => {

            //Consult the reservation for Discapacitado type and parking
            var reservations = await this.reservationRep.getReservationsByTypeByParking(reservation.type, reservation.parkinglotId);
            var reservationNumber1 = 0;
            var reservationNumber2 = 0;

            //loop through disabled leaderships, who book all day
            for (var i = 0; i < reservations.length; i++) {

                if (reservations[i].date && (new Date(reservations[i].date.seconds * 1000)).toDateString() == reservation.date.toDateString()) {
                    reservationNumber2++;
                }
            }

            //loop through disabled standar users
            for (var i = 0; i < reservations.length; i++) {

                if (!reservations[i].date && (new Date(reservations[i].start.seconds * 1000)).toDateString() == reservation.date.toDateString()) {

                    for (var j = 0; j < reservations.length; j++) {
                        if (!reservations[j].date
                            && (reservations[i].start.seconds < reservations[j].end.seconds && reservations[j].start.seconds < reservations[i].end.seconds)) {
                            reservationNumber1++;
                        }
                    }
                }

                //If there aren't enough availables spaces, the program sends a reject
                if (availableSpaces <= reservationNumber1 + reservationNumber2) {
                    rj("There are no spaces available"); // reject
                    return;
                }
                reservationNumber1 = 0;
            }
            rs(this.reservationRep.createReservation(reservation));
        });
    }

    /**
    * Create a new reservation for a visitor person
    * @param {Object} reservation { reservation }
    */
    public createVisitorReservation(reservation: any): Promise<any> {

        return new Promise(async (rs, rj) => {

            //Verify that has all the necessary data
            if (!reservation.visitorName || !reservation.visitorId || !reservation.reason || !reservation.place
                || !reservation.userId || !reservation.start || !reservation.end || !reservation.plate
                || !reservation.parkinglotId) {
                rj("It does not have all the data"); //reject
                return;
            }

            //verify types
            else if (typeof (reservation.visitorName) != 'string' || typeof (reservation.visitorId) != 'string'
                || typeof (reservation.reason) != 'string' || typeof (reservation.place) != 'string'
                || typeof (reservation.userId) != 'string' || typeof (reservation.start) != 'string'
                || typeof (reservation.end) != 'string' || typeof (reservation.plate) != 'string'
                || typeof (reservation.parkinglotId) != 'string') {
                rj("A field is incorrect");
                return;
            }

            reservation.start = new Date(reservation.start);
            reservation.end = new Date(reservation.end);
            reservation.active = true;
            reservation.type = 'Visitante';

            //get user and parking and checks if exists
            const user = await this.userRep.getUserById(reservation.userId);
            const parking = await this.parkingRep.getParkingById(reservation.parkinglotId);

            if (!user || !parking) {
                rj("No user or parkinglot found"); // reject
                return;
            }

            //Checks parkinglot schedule 
            else if (!this.checkTimeZoneParking(reservation, parking.schedule)) {
                rj("Parkinglot is closed"); // reject
                return;
            }

            //Check if parkinglot is private
            else if (parking.type != 'Alquilado') {
                rj("Parkinglot is not private"); // reject
                return;
            }
            rs(this.checkSpacesFunctionaryAndVisitor(parking.othersSpaces, reservation));
        });
    }

    /**
    * Create a new reservation for a official vehicle
    * @param {Object} reservation { reservation }
    */
    public createOfficialVehicleReservation(reservation: any): Promise<any> {

        return new Promise(async (rs, rj) => {

            //Verify that has all the necessary data
            if (!reservation.userId || !reservation.parkinglotId || !reservation.plate || !reservation.carModel
                || !reservation.carColor || !reservation.driver) {
                rj("It does not have all the data"); //reject
                return;
            }

            //verify types
            else if (typeof (reservation.userId) != 'string' || typeof (reservation.parkinglotId) != 'string'
                || typeof (reservation.carModel) != 'string' || typeof (reservation.plate) != 'string'
                || typeof (reservation.carColor) != 'string' || typeof (reservation.driver) != 'string') {
                rj("A field is incorrect");
                return;
            }

            reservation.active = true;
            reservation.type = 'Vehiculo Oficial';

            //get user and parking and checks if exists
            const user = await this.userRep.getUserById(reservation.userId);
            const parking = await this.parkingRep.getParkingById(reservation.parkinglotId);

            if (!user || !parking) {
                rj("No user or parkinglot found"); // reject
                return;
            }

            var reservations = await this.reservationRep.getReservationsByTypeByParking(reservation.type, reservation.parkinglotId);

            //Here check if there are enough available spaces
            if (parking.vehiclesSpaces > reservations.length) rs(this.reservationRep.createReservation(reservation));
            else rj("There are no spaces available"); // reject
        });
    }

    /**
    * Get all reservations for an user standar profile
    * @param {Object} userId { userId }
    */
    public getReservationsStandarProfile(userId: string): Promise<any> {

        return new Promise(async (rs, rj) => {

            const today = new Date();

            //get the reservations of a standar user according to userId
            var reservations = await this.reservationRep.getReservationsByUser(userId);

            //Make a filter and sort this array, descending by its datetimes
            reservations = reservations.filter(function (item: any) {
                return item.start != undefined && item.type != "Visitante";
            });
            reservations.sort(function (a: any, b: any) { return b.start.seconds - a.start.seconds; });
            
            //Simulate an inner join to get all the neccesary data for this query
            for (var i = 0; i < reservations.length; i++) {
                reservations[i].parkinglot = await this.parkingRep.getParkingById(reservations[i].parkinglotId);

                if (reservations[i].start.seconds * 1000 > today.getTime()) {
                    reservations[i].mod = true;
                }
                reservations[i].start = (new Date(reservations[i].start.seconds * 1000)).toLocaleDateString() + ' ' + (new Date(reservations[i].start.seconds * 1000)).toLocaleTimeString();
                reservations[i].end = (new Date(reservations[i].end.seconds * 1000)).toLocaleDateString() + ' ' + (new Date(reservations[i].end.seconds * 1000)).toLocaleTimeString();
            }
            rs(reservations);
        });
    }


    /**
     * Get all reservations of type Vehiculo Oficial
     * @param {Object} userId { userId }
     */
    public getReservationsOfficialVehicles(userId: string): Promise<any> {

        return new Promise(async (rs, rj) => {

            //Get the reservation and makes a filter
            var reservations = await this.reservationRep.getReservationsByUser(userId);
            reservations = reservations.filter(function (item: any) {
                return item.type == 'Vehiculo Oficial';
            });

            //Simulate an inner join to get all the neccesary data for this query
            const parkinglot = await this.parkingRep.getParkingById(reservations[0].parkinglotId);
            reservations.forEach(function (r: any) {
                r.parkinglot = parkinglot;
            });

            rs(reservations);
        });
    }


    /**
    * Get all reservations for an user leadership profile
    * @param {Object} userId { userId }
    */
    public getReservationsLeadershipProfile(userId: string): Promise<any> {

        return new Promise(async (rs, rj) => {

            const today = new Date();

            //get the reservations of a standar user according to userId
            var reservations = await this.reservationRep.getReservationsByUser(userId);

            //Make a filter and sort this array, descending by its datetimes
            reservations = reservations.filter(function (item: any) {
                return item.date != undefined && item.type != "Visitante";
            });
            reservations.sort(function (a: any, b: any) { return b.date.seconds - a.date.seconds; });

            //Simulate an inner join to get all the neccesary data for this query
            for (var i = 0; i < reservations.length; i++) {
                reservations[i].parkinglot = await this.parkingRep.getParkingById(reservations[i].parkinglotId);

                if (reservations[i].date.seconds * 1000 > today.getTime()) {
                    reservations[i].mod = true;
                }
                reservations[i].date = (new Date(reservations[i].date.seconds * 1000)).toLocaleDateString();
            }
            rs(reservations);
        });
    }

    /**
    * Get all visitors reservations for an user
    * @param {Object} userId { userId }
    */
    public getReservationsVisitors(userId: string): Promise<any> {

        return new Promise(async (rs, rj) => {

            const today = new Date();

            //Get the reservations
            var reservations = await this.reservationRep.getReservationsByUser(userId);

            //Make a filter and sort this array, descending by its datetimes
            reservations = reservations.filter(function (item: any) {
                return item.start != undefined && item.type == "Visitante";
            });
            reservations.sort(function (a: any, b: any) { return b.start.seconds - a.start.seconds; });

            //Simulate an inner join to get all the neccesary data for this query
            for (var i = 0; i < reservations.length; i++) {
                reservations[i].parkinglot = await this.parkingRep.getParkingById(reservations[i].parkinglotId);

                if (reservations[i].start.seconds * 1000 > today.getTime()) {
                    reservations[i].mod = true;
                }
                reservations[i].start = (new Date(reservations[i].start.seconds * 1000)).toLocaleDateString() + ' ' + (new Date(reservations[i].start.seconds * 1000)).toLocaleTimeString();
                reservations[i].end = (new Date(reservations[i].end.seconds * 1000)).toLocaleDateString() + ' ' + (new Date(reservations[i].end.seconds * 1000)).toLocaleTimeString();
            }
            rs(reservations);
        });
    }

    /**
    * Delete a reservation
    * @param {Object} reservationId { reservationId }
    */
    public deleteReservation(reservationId: string): Promise<any> {

        return new Promise(async (rs, rj) => {

            //Validate data
            if (!reservationId || reservationId == '') {
                rj("Incorrect id reservation");
                return;
            }
            rs(this.reservationRep.deleteReservation(reservationId));
        });
    }
}