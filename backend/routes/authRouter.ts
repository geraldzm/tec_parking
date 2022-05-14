import * as express from 'express';
import { UserController } from '../controllers'
import { status } from '../utils/http'

const app = express();


// endpoint: localhost:port/api/auth/login
app.post("/login", (req, res, next) => {
    UserController.getInstance().login(req.body["email"], req.body["password"])
    .then((data : any)=>{
        res.json(data);
    })
    .catch((err: any)=>{
        console.log(err);
        res.sendStatus(status.UNAUTHORIZED);
    });
});

// endpoint: localhost:port/api/auth/logout
app.post("/logout", (req, res, next) => {
    res.sendStatus(status.NOT_FOUND);
});



export { app as authRouter };