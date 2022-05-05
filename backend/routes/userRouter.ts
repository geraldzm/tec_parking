import * as express from 'express';
import { UserController } from '../controllers'

const app = express();


// endpoint: localhost:5000/api/user/register
app.post("/register", (req, res, next) => {

    UserController.getInstance().registerUser(req.body["user"])
    .then((data : any)=>{
        res.json(data);
    })
    .catch((err: any)=>{
        console.log(err);
        res.sendStatus(500); // internal error
    });
});


// endpoint: localhost:5000/api/user/login
app.post("/login", (req, res, next) => {

    UserController.getInstance().login(req.body["data"])
    .then((data : any)=>{
        res.json(data);
    })
    .catch((err: any)=>{
        console.log(err);
        res.sendStatus(500); // internal error
    });
});

// endpoint: localhost:5000/api/user/login
app.post("/login", (req, res, next) => {

    UserController.getInstance().login(req.body["data"])
    .then((data : any)=>{
        res.json(data);
    })
    .catch((err: any)=>{
        console.log(err);
        res.sendStatus(500); // internal error
    });
});
export { app as userRouter };