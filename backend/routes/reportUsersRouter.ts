import * as express from 'express';
import { ReportUserController } from '../controllers'

const app = express();

// endpoint: localhost:port/api/reservation/parkingdetails?:parkinglotId&start&end
app.get("/parkingdetails?:parkinglotId", (req, res) => {
    console.log(req.query.parkinglotId, req.query.start, req.query.end);

    ReportUserController.getInstance().getOperatorReport(String(req.query.parkinglotId), String(req.query.start), String(req.query.end))
    .then((data : any)=>{
        res.json(data);
    })
    .catch((err: any)=>{
        res.sendStatus(500); // internal error
    });
});

export { app as reportUserRouter };