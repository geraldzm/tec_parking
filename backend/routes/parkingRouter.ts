import * as express from 'express';
import { ParkingController } from '../controllers'

const app = express();


// endpoint: localhost:port/api/parking/list
app.get("/list", (req:any, res, next) => {

    ParkingController.getInstance().listAll()
    .then((data : any)=>{
        res.json(data);
    })
    .catch((err: any)=>{
        console.log(err);
        res.sendStatus(500); // internal error
    });
});


// endpoint: localhost:port/api/parking/listbybuilding
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


export { app as parkingRouter };