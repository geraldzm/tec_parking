import * as express from 'express';
import { UserController } from '../controllers'
import { status } from '../utils/http'

const app = express();


// endpoint: localhost:port/api/auth/register
app.post("/register", (req, res, next) => {
    UserController.getInstance().registerUser(req.body["user"])
    .then((data : any)=>{
        res.sendStatus(status.OK);
    })
    .catch((err: any)=>{
        console.log(err);
        res.sendStatus(status.INTERNAL_ERROR); // internal error
    });
});

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

// endpoint: localhost:port/api/auth/delete
app.delete("/delete", (req, res, next) => {
    UserController.getInstance().deleteUser(req.body["userId"])
    .then((data : any)=>{
        res.json(data);
    })
    .catch((err: any)=>{
        console.log(err);
        res.sendStatus(500); // internal error
    });
});

// endpoint: localhost:port/api/auth/update
app.put("/update", (req, res, next) => {
    
    UserController.getInstance().updateUser(req.body["user"], req.body["userId"])
    .then((data : any)=>{
        res.json(data);
    })
    .catch((err: any)=>{
        console.log(err);
        res.sendStatus(500); // internal error
    });
});

export { app as userAuthRouter };