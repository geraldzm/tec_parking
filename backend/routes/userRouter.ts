import * as express from 'express';
import { UserController } from '../controllers'
import { status } from '../utils/http';

const app = express();

// endpoint: localhost:port/api/user/update
app.put("/update", (req:any, res, next) => {
    
    UserController.getInstance().updateUser(req.userId, req.body["user"])
    .then(()=> {
        res.sendStatus(status.OK);
    })
    .catch((err: any)=>{
        console.log("her2");
        console.log(err);
        res.sendStatus(status.INTERNAL_ERROR); // internal error
    });
});

// endpoint: localhost:port/api/user/info
app.get("/info", (req:any, res, next) => {
    
    console.log("here");
    UserController.getInstance().getUserInfoByID(String(req.userId))
    .then((data : any)=>{
        res.json(data);
    })
    .catch((err: any)=>{
        console.log(err);
        res.sendStatus(status.INTERNAL_ERROR); // internal error
    });
});


export { app as userRouter };