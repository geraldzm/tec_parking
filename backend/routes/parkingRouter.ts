import * as express from 'express';
import { ParkingController } from '../controllers'

const app = express();


// endpoint: localhost:5000/api/parking/list
app.get("/list", (req, res, next) => {

    ParkingController.getInstance().listAll()
    .then((data : any)=>{
        res.json(data);
    })
    .catch((err: any)=>{
        console.log(err);
        res.sendStatus(500); // internal error
    });
});


// endpoint: localhost:5000/api/parking/listbybuilding
app.post("/listbybuilding", (req, res, next) => {

    ParkingController.getInstance().listByBuilding(req.body["building"])
    .then((data : any)=>{
        res.json(data);
    })
    .catch((err: any)=>{
        console.log(err);
        res.sendStatus(500); // internal error
    });
});


// endpoint: localhost:5000/api/parking/parkinglot
app.post("/parkinglot", (req, res, next) => {

    ParkingController.getInstance().createParking(req.body["parkinglot"])
    .then((data : any)=>{
        res.json(data);
    })
    .catch((err: any)=>{
        console.log(err);
        res.sendStatus(500); // internal error
    });
});


// endpoint: localhost:5000/api/parking/delete
app.delete("/delete", (req, res, next) => {

    ParkingController.getInstance().deleteParking(req.body["idparking"])
    .then((data : any)=>{
        res.json(data);
    })
    .catch((err: any)=>{
        console.log(err);
        res.sendStatus(500); // internal error
    });
});


// endpoint: localhost:5000/api/parking/update
app.post("/update", (req, res, next) => {

    ParkingController.getInstance().updateParking(req.body["parkinglot"])
    .then((data : any)=>{
        res.json(data);
    })
    .catch((err: any)=>{
        console.log(err);
        res.sendStatus(500); // internal error
    });
});

export { app as parkingRouter };