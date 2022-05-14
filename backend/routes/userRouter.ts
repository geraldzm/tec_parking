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

export { app as userRouter };