import * as express from 'express';
import { authRouter } from './authRouter';
import AdminRouter from './admin/routes'
import { tokenMiddlewareValidation } from '../middleware/middlewareAuth';
import { parkingRouter } from './parkingRouter';
import { userRouter } from './userRouter';


class Routes {

    public express: express.Application;

    constructor() {
        this.express = express();
        this.routes();
    }

    private routes(): void {
        // admin routes (only admins)
        this.express.use('/admin', tokenMiddlewareValidation, AdminRouter);

        // open routes (any logged user can access them)
        this.express.use('/parking', tokenMiddlewareValidation, parkingRouter); 
        this.express.use('/user', tokenMiddlewareValidation, userRouter); 

        //public rutes (anyone can access them)
        this.express.use('/auth', authRouter);
    }
}

export default new Routes().express;