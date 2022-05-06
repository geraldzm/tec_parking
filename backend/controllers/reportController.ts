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
    

    /**
    * Get a parkinglot by Id
    * @param {string} parkingId
    */
     public getParkingByID(parkingId : string) : Promise<any> 
     {
         return new Promise(async (rs, rj) => {
 
             if (!parkingId || parkingId == ""){
                 rj("Error Empty string"); //reject
             }
             else{
                
                const result = await this.parkingRep.getParkingById(parkingId);
                
                 if (!result){
                     rj("No parkinglot found")
                 }
                 rs(result);
             }
         });
     }

    //List all employees
    public listAllEmployees() : Promise<any> 
    {
        return this.userRep.getAllUsers();
    }


    /**
    * Get user info by key from db
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


    /**
    * Get user info by idNumber
    * @param {string} employeeIdNumber
    */
    public getEmployeeByIDNumber(employeeIdNumber : string) : Promise<any> 
    {
        return new Promise(async (rs, rj) => {

            if (!employeeIdNumber || employeeIdNumber == ""){
                rj("Error Empty string"); //reject
            }
            else{

                const result = await this.userRep.getUserByIdNumber(employeeIdNumber);

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