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
        return this.rep.getAllSpaces();
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
        
        parkinglot.active = true;
        return this.rep.createParkingLot(parkinglot);
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