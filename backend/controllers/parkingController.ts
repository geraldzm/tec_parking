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

}