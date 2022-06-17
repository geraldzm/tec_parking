import { ParkingRep } from '../repository';

export class ParkingController {
    
    private static instance: ParkingController;
    private rep: ParkingRep;

    private constructor()
    {
        this.rep = new ParkingRep();
    }

    public static getInstance() : ParkingController
    {
        if (!this.instance) this.instance = new ParkingController();
        return this.instance;
    }

    //List all parkinglots
    public listAll() : Promise<any> 
    {

        return new Promise(async (rs, rj) => {
        
            var data = await this.rep.getAllSpaces();

            for (var i in data){
                data[i].schedule.startHour = (new Date(data[i].schedule.startHour.seconds * 1000)).toLocaleTimeString();
                data[i].schedule.endHour = (new Date(data[i].schedule.endHour.seconds * 1000)).toLocaleTimeString();
        
                if ( data[i].startContract){
                    data[i].startContract = (new Date(data[i].startContract.seconds * 1000)).toDateString();
                    data[i].endContract = (new Date(data[i].endContract.seconds * 1000)).toDateString();
                }
            }
            rs(data);
        });

    }


    /**
    * Consult a parkinglot by building
    * @param {string} building
    */
    public listByBuilding(building : string) : Promise<any> 
    {
        return new Promise(async (rs, rj) => {
            
            if (!building || building == ""){
                rj("Error Empty string"); //reject
            }
            else{

                const parking = await this.rep.getAllSpacesByBuilding(building);
                
                if(!parking) {
                    rj("No parkinglot found"); // reject 
                }
                rs(parking);
            }
        });
    }
    

    /**
     * Controller Method to create a parkinglot
     * @param {Object} parkinglot { parkinglot }
     */
    public createParking(parkinglot : any) : Promise<any>
    {
        
        return new Promise(async (rs, rj) => {
            
            //Verify that has all the necessary data
            if (!parkinglot.building || !parkinglot.name || !parkinglot.disabledSpaces || 
                !parkinglot.vehiclesSpaces || !parkinglot.administrativeSpaces || !parkinglot.othersSpaces ||
                !parkinglot.type || !parkinglot.schedule){
                rj("It does not have all the data"); //reject
            }

            //verify types
            else if (typeof(parkinglot.building) != 'string' || typeof(parkinglot.name) != 'string'  
                || typeof(parkinglot.disabledSpaces) != 'number' || typeof(parkinglot.vehiclesSpaces) != 'number' 
                || typeof(parkinglot.administrativeSpaces) != 'number'|| typeof(parkinglot.othersSpaces) != 'number' 
                || typeof(parkinglot.type) != 'string' || typeof(parkinglot.schedule) != 'object'){

                rj ("A field is incorrect")
            }

            //verify type
            else if (parkinglot.type != "Propio" && parkinglot.type != "Alquilado"){
                rj("Incorrect type");
            }

            //Verify if it's a new parkinglot
            else if (await this.rep.getAllSpacesByBuilding(parkinglot.building)){
                rj("The building has already been registered previously");
            }

            //Insert new parkinglot
            else{
                
                if (parkinglot.type == "Alquilado"){

                    if (!parkinglot.phone || !parkinglot.ownerName || !parkinglot.startContract || !parkinglot.endContract){
                        rj("It does not have all the data"); //reject
                        return;
                    }
                    
                    else if (typeof(parkinglot.phone) != 'number' || typeof(parkinglot.ownerName) != 'string'
                            || typeof(parkinglot.startContract) != 'string' || typeof(parkinglot.endContract) != 'string'){
                        rj("A field is incorrect"); //reject
                        return;
                    }

                    parkinglot.startContract = this.addOneDay(parkinglot.startContract);
                    parkinglot.endContract = this.addOneDay(parkinglot.endContract);
                }

                this.setScheduleCorrectFormat(parkinglot);
                
                parkinglot.active = true;
                rs(this.rep.createParkingLot(parkinglot));   
            }            
        });
    }

    /**
     * Controller Method to update a parkinglot
     * @param {Object} parkinglot { parkinglot }
     */
    public updateParking(parkinglot : any) : Promise<any>
    {
        console.log(parkinglot);
        return new Promise(async (rs, rj) => {
            
            if (!parkinglot || !parkinglot.id){
                rj("Error Empty parameter"); //reject
            }
            else{
                
                //save the parking key, and removes it from parking lot
                const idParking = parkinglot.id;
                delete parkinglot.id;

                const oldParking = await this.rep.getParkingById(idParking);
                if(!oldParking) {
                    rj("No parkinglot found"); // reject 
                }
                
                //Checks an set the correct values for the update
                parkinglot.building = parkinglot.building !=='' ? parkinglot.building : oldParking.building;
                parkinglot.name = parkinglot.name !==''  ? parkinglot.name : oldParking.name;
                parkinglot.disabledSpaces = parkinglot.disabledSpaces ? parkinglot.disabledSpaces : oldParking.disabledSpaces;
                parkinglot.vehiclesSpaces = parkinglot.vehiclesSpaces ? parkinglot.vehiclesSpaces : oldParking.vehiclesSpaces;
                parkinglot.administrativeSpaces = parkinglot.administrativeSpaces ? parkinglot.administrativeSpaces : oldParking.administrativeSpaces;
                parkinglot.othersSpaces = parkinglot.othersSpaces ? parkinglot.othersSpaces : oldParking.othersSpaces;
                this.setScheduleCorrectFormat(parkinglot);

                if (parkinglot.type == "Propio"){
                    parkinglot.phone = null;
                    parkinglot.ownerName = "";
                    parkinglot.startContract = null;
                    parkinglot.endContract = null;
                } else{
                    parkinglot.phone = parkinglot.phone ? parkinglot.phone : oldParking.phone;
                    parkinglot.ownerName = parkinglot.ownerName !== '' ? parkinglot.ownerName : oldParking.ownerName;
                    parkinglot.startContract = parkinglot.startContract ? this.addOneDay(parkinglot.startContract) : oldParking.startContract;
                    parkinglot.endContract = parkinglot.endContract ? this.addOneDay(parkinglot.endContract) : oldParking.endContract;
                }
                rs(this.rep.updateParkingLot(parkinglot, idParking));
            }
        });
    }

    /**
     * Controller Method to delete a parkinglot
     * @param {string} idParking
     */
    public deleteParking(idParking : string) : Promise <any>
    {   
        return new Promise(async (rs, rj) => {
            
            if (!idParking || idParking == ""){
                rj("Error Empty string"); //reject
            }
            else{

                const result = await this.rep.deleteParkingLot(idParking);

                if (result.code && result.code == 5){
                    rj("No parkinglot found")
                }

                rs(result);
            }
        });
    }

    /**
     * Set the correct format for the schedules
     * @param parkinglot any
     */
    private setScheduleCorrectFormat(parkinglot : any){

        //Set correct format to the schedule
        var date = new Date();

        date.setHours((parkinglot.schedule.startHour.split(':'))[0], (parkinglot.schedule.startHour.split(':'))[1], 0);
        parkinglot.schedule.startHour = date;

        date = new Date();
        date.setHours((parkinglot.schedule.endHour.split(':'))[0], (parkinglot.schedule.endHour.split(':'))[1], 0);
        parkinglot.schedule.endHour = date;
    }


    /**
     * Add one day for dates
     * @param date 
     * @returns corect date
     */
    private addOneDay(date : any) : Date {
        var newDate = new Date(date);
        newDate.setDate(newDate.getDate()+1);
        return newDate;
    }
}