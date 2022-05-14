import * as express from 'express';
import { ReportController } from '../../controllers'

const app = express();


// endpoint: localhost:port/api/admin/report/parkinglots
app.get("/parkinglots", (req, res, next) => {

    ReportController.getInstance().listAllParkings()
    .then((data : any)=>{
        res.json(data);
    })
    .catch((err: any)=>{
        console.log(err);
        res.sendStatus(500); // internal error
    });
});


// endpoint: localhost:port/api/admin/report/parkinglot?id
app.get("/parkinglot?:id", (req, res, next) => {

    ReportController.getInstance().getParkingByID(String(req.query.id))
    .then((data : any)=>{
        res.json(data);
    })
    .catch((err: any)=>{
        console.log(err);
        res.sendStatus(500); // internal error
    });
});


// endpoint: localhost:port/api/admin/report/employees
app.get("/employees", (req, res, next) => {

    ReportController.getInstance().listAllEmployees()
    .then((data : any)=>{
        res.json(data);
    })
    .catch((err: any)=>{
        console.log(err);
        res.sendStatus(500); // internal error
    });
});

// endpoint: localhost:port/api/admin/report/employee?:id
app.get("/employee?:id", (req, res, next) => {
    
    ReportController.getInstance().getEmployeeByID(String(req.query.id))
    .then((data : any)=>{
        res.json(data);
    })
    .catch((err: any)=>{
        console.log(err);
        res.sendStatus(500); // internal error
    });
});


// endpoint: localhost:port/api/admin/report/employee/idnumber?:idNumber
app.get("/employee/idnumber?:idNumber", (req, res, next) => {
    
    ReportController.getInstance().getEmployeeByIDNumber(String(req.query.idNumber))
    .then((data : any)=>{
        res.json(data);
    })
    .catch((err: any)=>{
        console.log(err);
        res.sendStatus(500); // internal error
    });
});

// endpoint: localhost:port/api/admin/report/employee/email?:email
app.get("/employee/email?:email", (req, res, next) => {
    
    ReportController.getInstance().getEmployeeByEmail(String(req.query.email))
    .then((data : any)=>{
        res.json(data);
    })
    .catch((err: any)=>{
        console.log(err);
        res.sendStatus(500); // internal error
    });
});

// endpoint: localhost:port/api/admin/report/timeZones
app.get("/timezones", (req, res, next) => {

    ReportController.getInstance().getTimeZones()
    .then((data : any)=>{
        res.json(data);
    })
    .catch((err: any)=>{
        console.log(err);
        res.sendStatus(500); // internal error
    });
});

export { app as reportRouter };