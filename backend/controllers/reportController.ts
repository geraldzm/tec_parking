import { ParkingRep, UserRep } from '../repository';
import { setCorrectFormatSchedule } from '../utils/common'

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

                //Set the correct format for the schedule and contracts' limits
                result.schedule.startHour = (new Date(result.schedule.startHour.seconds * 1000)).toLocaleTimeString();
                result.schedule.endHour = (new Date(result.schedule.endHour.seconds * 1000)).toLocaleTimeString();
         
                if (result.type == "Alquilado"){
                    result.startContract = (new Date(result.startContract.seconds * 1000)).toLocaleDateString();
                    result.endContract = (new Date(result.endContract.seconds * 1000)).toLocaleDateString();
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

                setCorrectFormatSchedule(result.schedule);

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
                setCorrectFormatSchedule(result.schedule);
                rs(result);
            }
        });
    }   
    
    /**
    * Get user info by email
    * @param {string} email
    */
     public getEmployeeByEmail(email : string) : Promise<any> 
     {
         return new Promise(async (rs, rj) => {
 
             if (!email || email == ""){
                 rj("Error Empty string"); //reject
             }
             else{
 
                 const result = await this.userRep.getUserByEmail(email);
 
                 if (!result){
                     rj("No user found")
                 }

                 setCorrectFormatSchedule(result.schedule);
                 rs(result);
             }
         });
     }   



    
    //Get all users' time zones for the charts
    public getTimeZones() : Promise<any> 
    {
        return new Promise(async (rs, rj) => {

            //Consult the schedules of active employees
            const employees = await this.userRep.listTimeZones();
            const n = employees.length;
            
            var timeZones = this.createTimeZonesObject();
            
            //Checks all employees an sets the employee frenquency in every day and hour
            for (var i in employees){

                //Sunday
                if (employees[i].domingo){
                    this.checkDay(timeZones, "domingo", employees[i].domingo);
                }

                //Monday
                if (employees[i].lunes){
                    this.checkDay(timeZones, "lunes", employees[i].lunes);
                }

                //Tuesday
                if (employees[i].martes){
                    this.checkDay(timeZones, "martes", employees[i].martes);
                }

                //Wednesday
                if (employees[i].miercoles){
                    this.checkDay(timeZones, "miercoles", employees[i].miercoles);
                }

                //Thursday
                if (employees[i].jueves){
                    this.checkDay(timeZones, "jueves", employees[i].jueves);
                }

                //Friday
                if (employees[i].viernes){
                    this.checkDay(timeZones, "viernes", employees[i].viernes);
                }

                //Saturday
                if (employees[i].sabado){
                    this.checkDay(timeZones, "sabado", employees[i].sabado);
                }
                
            }

            //Update the object timeZones to set the colors
            this.updateTimeZones(timeZones, n);
            rs(timeZones);
        });
    }


    /**
     * Creates the basic structure of TimeZones object to create a chart in the frontend
     */
    private createTimeZonesObject() : any{

        var timeZones : any;
        timeZones = {};
        var days = ["domingo","lunes", "martes", "miercoles", "jueves", "viernes", "sabado"];


        //Iterates through the seven days and puts the initial values in zero
        for (var i in days){
            
            timeZones[days[i]] = {}
            
            for (var j = 0; j<24; j++){
                            
                timeZones[days[i]][j] = {};
                timeZones[days[i]][String(j+".5")] = {}

                timeZones[days[i]][j]["value"] = 0;
                timeZones[days[i]][String(j+".5")]["value"] = 0;
            }
        }

        return timeZones;
    }


    /**
     * Verify the frenquency hours for an employee for a day
     * @param timeZones 
     * @param day  : string
     * @param hours : {dates}
     */
    private checkDay(timeZones : any, day : string, hours : any) : void{
        
        const hour = new Date();
        
        //Checks the 24 hours
        for (var i = 0; i<24; i++){

            hour.setHours(i, 0);
            for (var j in hours){
                this.validateHour(timeZones[day][i], hour, new Date(hours[j].start.seconds * 1000), 
                                    new Date(hours[j].end.seconds * 1000));
            }
            
            hour.setHours(i, 30);
            for (var j in hours){
                this.validateHour(timeZones[day][String(i+".5")], hour, (new Date(hours[j].start.seconds * 1000)), 
                                    (new Date(hours[j].end.seconds * 1000)));
            }
        }   
    }

    /**
     * Checks if the hour is within the range
     * @param time 
     * @param beginRange 
     * @param start 
     * @param end 
     */
    private validateHour(time : any, beginRange : Date, start : Date, end : Date){

        //Upper limit range
        var endRange = new Date(beginRange.getTime() + 30*60000);
       
        //Update the date for the hour
        start.setFullYear(beginRange.getFullYear(),beginRange.getMonth(), beginRange.getDate());
        end.setFullYear(endRange.getFullYear(),endRange.getMonth(), endRange.getDate());

        if (start.getTime() < endRange.getTime() && beginRange.getTime() <= end.getTime())
            time["value"] += 1;
            /*
        if (beginRange.getTime() > start.getTime() && beginRange.getTime() < end.getTime()) {
            time["value"] += 1;
        }
        else if (endRange.getTime() > start.getTime() && endRange.getTime() < end.getTime()) {
            time["value"] += 1;
        }*/
    }


    /**
     * Calculates the probability for all hours and call the function to set colors
     * @param timeZones {dates}
     * @param n 
     */
    private updateTimeZones(timeZones : any, n : number) : void{

        var days = ["domingo","lunes", "martes", "miercoles", "jueves", "viernes", "sabado"];

        //Iterates for all seven days
        for (var i in days){
            
            for (var j = 0; j<24; j++){

                //Set the correct colors
                timeZones[days[i]][j]["color"] = this.setColor((timeZones[days[i]][j]["value"] * 100) /n);
                timeZones[days[i]][String(j+".5")]["color"] = this.setColor((timeZones[days[i]][String(j+".5")]["value"] * 100) /n);

                //remove atributte value
                delete timeZones[days[i]][j]["value"];
                delete timeZones[days[i]][String(j+".5")]["value"];
            }
        }
    }

    /**
     * Set the correct color according to the probability
     * @param p 
     */
    private setColor(p : number) : string {

        if (p < 25) return "green";
        else if (p < 50) return "yellowgreen";
        else if (p < 75) return "yellow";
        else return "red";
    }
}