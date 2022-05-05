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

    public listAll() : Promise<any> 
    {
        return this.rep.getAllSpaces();
    }

    public listByBuilding(building : string) : Promise<any> 
    {
        return this.rep.getAllSpacesByBuilding(building);
    }
    

    public createParking(parkinglot : any) : Promise<any>
    {
        //validar
        parkinglot.active = true;
        return this.rep.createParkingLot(parkinglot);
    }


    public updateParking(parkinglot : any) : Promise<any>
    {
        //validar

        //save the parking key, and removes it from parking lot
        const idParking = parkinglot.id;
        delete parkinglot.id;
        
        return this.rep.updateParkingLot(parkinglot, idParking);
    }

    public deleteParking(idParking : any) : Promise <any>
    {
        return this.rep.deleteParkingLot(idParking);
    }

}