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
        res.sendStatus(500); // internal error
    });
});


export { app as parkingRouter };