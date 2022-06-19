import * as express from 'express';
import { ReservationController } from '../controllers'

const app = express();


// endpoint: localhost:port/api/reservation/functionary
app.post("/functionary", (req, res) => {
    
    ReservationController.getInstance().createFunctionaryReservation(req.body["reservation"])
    .then((data : any)=>{
        console.log("Reservation created");
        res.sendStatus(200);
    })
    .catch((err: any)=>{
        console.log(err);
        res.sendStatus(500); // internal error
    });
});

// endpoint: localhost:port/api/reservation/leadership
app.post("/leadership", (req, res) => {

    ReservationController.getInstance().createLeadershipReservation(req.body["reservation"])
    .then((data : any)=>{
        console.log("Reservation created");
        res.sendStatus(200);
    })
    .catch((err: any)=>{
        console.log(err);
        res.sendStatus(500); // internal error
    });
});


// endpoint: localhost:port/api/reservation/visitor
app.post("/visitor", (req, res) => {

    ReservationController.getInstance().createVisitorReservation(req.body["reservation"])
    .then((data : any)=>{
        console.log("Reservation created");
        res.sendStatus(200);
    })
    .catch((err: any)=>{
        console.log(err);
        res.sendStatus(500); // internal error
    });
});


// endpoint: localhost:port/api/reservation/officialvehicle
app.post("/officialvehicle", (req, res) => {

    ReservationController.getInstance().createOfficialVehicleReservation(req.body["reservation"])
    .then((data : any)=>{
        console.log("Reservation created");
        res.sendStatus(200);
    })
    .catch((err: any)=>{
        console.log(err);
        res.sendStatus(500); // internal error
    });
});


// endpoint: localhost:port/api/reservation/liststandarprofile?userId=
app.get("/liststandarprofile?:userId", (req, res) => {
    
    ReservationController.getInstance().getReservationsStandarProfile(String(req.query.userId))
    .then((data : any)=>{
        res.json(data);
    })
    .catch((err: any)=>{
        res.sendStatus(500); // internal error
    });
});


// endpoint: localhost:port/api/reservation/listofficialvehicles?userId=
app.get("/listofficialvehicles?:userId", (req, res) => {
    
    ReservationController.getInstance().getReservationsOfficialVehicles(String(req.query.userId))
    .then((data : any)=>{
        res.json(data);
    })
    .catch((err: any)=>{
        res.sendStatus(500); // internal error
    });
});

// endpoint: localhost:port/api/reservation/listleadershipprofile?userId=
app.get("/listleadershipprofile?:userId", (req, res) => {
    
    ReservationController.getInstance().getReservationsLeadershipProfile(String(req.query.userId))
    .then((data : any)=>{
        res.json(data);
    })
    .catch((err: any)=>{
        res.sendStatus(500); // internal error
    });
});


// endpoint: localhost:port/api/reservation/listvisitors?userId=
app.get("/listvisitors?:userId", (req, res) => {
    
    ReservationController.getInstance().getReservationsVisitors(String(req.query.userId))
    .then((data : any)=>{
        res.json(data);
    })
    .catch((err: any)=>{
        res.sendStatus(500); // internal error
    });
});

// endpoint: localhost:port/api/reservation/deletereservation
app.delete("/deletereservation", (req, res) => {

    ReservationController.getInstance().deleteReservation(req.body["reservationId"])
    .then((data : any)=>{
        console.log("Reservation deleted");
        res.sendStatus(200);
    })
    .catch((err: any)=>{
        console.log(err);
        res.sendStatus(500); // internal error
    });
});

export { app as reservationRouter };
