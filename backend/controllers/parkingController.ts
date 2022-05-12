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

                    parkinglot.startContract = new Date(parkinglot.startContract);
                    parkinglot.endContract = new Date(parkinglot.endContract);
                }

                //Set correct format to the schedule
                parkinglot.schedule.startHour = new Date(parkinglot.schedule.startHour);
                parkinglot.schedule.endHour = new Date(parkinglot.schedule.endHour);
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
        //validar

        //save the parking key, and removes it from parking lot
        const idParking = parkinglot.id;
        delete parkinglot.id;
        
        return this.rep.updateParkingLot(parkinglot, idParking);
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
}