import * as express from 'express';
import { UserController } from '../../controllers'
import { status } from '../../utils/http'

const app = express();


// endpoint: localhost:port/api/admin/user/register
app.post("/register", (req, res, next) => {
    UserController.getInstance().registerUser(req.body["user"])
    .then((data : any)=>{
        res.sendStatus(status.OK);
    })
    .catch((err: any)=>{
        console.error(err);
        res.sendStatus(status.INTERNAL_ERROR); // internal error
    });
});

// endpoint: localhost:port/api/admin/user/delete
app.delete("/delete", (req, res, next) => {
    UserController.getInstance().deleteUser(req.body["userId"])
    .then((data : any)=>{
        res.json(data);
    })
    .catch((err: any)=>{
        console.error(err);
        res.sendStatus(status.INTERNAL_ERROR); // internal error
    });
});

// endpoint: localhost:port/api/admin/user/edit
app.put("/edit", (req:any, res, next) => {
    
    if(req.userId === req.body["userId"]) {
        console.error("user cannot edit his own information");
        res.sendStatus(status.UNAUTHORIZED); // internal error
        return;
    }

    UserController.getInstance().editUser(req.body["user"])
    .then(()=>{
        res.sendStatus(status.OK);
    })
    .catch((err: any)=>{
        console.error(err);
        res.sendStatus(status.INTERNAL_ERROR); // internal error
    });

});



export { app as userRouter };