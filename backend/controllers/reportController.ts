import { ParkingRep, UserRep } from '../repository';

export class ReportController {
    
    private static instance: ReportController;
    private parkingRep : ParkingRep;
    private userRep : UserRep;

    private constructor()
    {
        this.parkingRep = new ParkingRep();
        this.userRep = new UserRep();
    }

    public static getInstance() : ReportController
    {
        if (!this.instance) this.instance = new ReportController();
        return this.instance;
    }

    //List all parkinglots
    public listAllParkings() : Promise<any> 
    {
        return this.parkingRep.getAllSpaces();
    }
    
    //List all employees
    public listAllEmployees() : Promise<any> 
    {
        return this.userRep.getAllUsers();
    }


    /**
    * Get user info by Id
    * @param {string} employeeId
    */
    public getEmployeeByID(employeeId : string) : Promise<any> 
    {
        return new Promise(async (rs, rj) => {

            if (!employeeId || employeeId == ""){
                rj("Error Empty string"); //reject
            }
            else{

                const result = await this.userRep.getUserById(employeeId);

                if (!result){
                    rj("No user found")
                }
                rs(result);
            }
        });
    }

    
    //Get all users' time zones for the charts
    public getTimeZones() : Promise<any> 
    {
        return this.userRep.listTimeZones();
    }
}