import * as express from 'express';
import { ParkingController } from '../../controllers'
import { status } from '../../utils/http';

const app = express();


// endpoint: localhost:port/api/admin/parking/parkinglot
app.post("/parkinglot", (req, res, next) => {

    console.log(JSON.stringify(req.body));

    ParkingController.getInstance().createParking(req.body["parkinglot"])
    .then((data : any)=>{
        res.sendStatus(status.OK);
    })
    .catch((err: any)=>{
        console.log(err);
        res.sendStatus(status.INTERNAL_ERROR); 
    });
});


// endpoint: localhost:port/api/admin/parking/delete
app.delete("/delete", (req, res, next) => {

    ParkingController.getInstance().deleteParking(req.body["idparking"])
    .then((data : any)=>{
        res.json(data);
    })
    .catch((err: any)=>{
        console.log(err);
        res.sendStatus(status.INTERNAL_ERROR); // internal error
    });
});


// endpoint: localhost:port/api/admin/parking/update
app.post("/update", (req, res, next) => {

    ParkingController.getInstance().updateParking(req.body["parkinglot"])
    .then((data : any)=>{
        res.json(data);
    })
    .catch((err: any)=>{
        console.log(err);
        res.sendStatus(status.INTERNAL_ERROR); // internal error
    });
});

export { app as parkingRouter };