import * as express from 'express';
import { UserController } from '../controllers'
import { status } from '../utils/http'

const app = express();


// endpoint: localhost:5000/api/auth/register
app.post("/register", (req, res, next) => {
    res.sendStatus(status.NOT_FOUND);
});

// endpoint: localhost:5000/api/auth/login
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

// endpoint: localhost:5000/api/auth/logout
app.post("/logout", (req, res, next) => {
    res.sendStatus(status.NOT_FOUND);

});

// endpoint: localhost:5000/api/auth/delete
app.delete("/delete", (req, res, next) => {
    res.sendStatus(status.NOT_FOUND);

});

// endpoint: localhost:5000/api/auth/update
app.put("/update", (req, res, next) => {
    res.sendStatus(status.NOT_FOUND);
  
});

export { app as userAuthRouter };