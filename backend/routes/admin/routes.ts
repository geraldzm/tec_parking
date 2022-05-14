import * as express from 'express';
import { parkingRouter } from './parkingRouter';
import { userRouter } from './userRouter';
import { middlewareValidateScopes, reportsScopes, parkingLotScopes, editUsersScopes } from '../../middleware/middlewareScopes';
import { reportRouter } from './reportRouter';

class AdminRoutes {

    public express: express.Application;

    constructor() {
        this.express = express();
        this.routes();
    }

    private routes(): void {

        this.express.use('/user', editUsersScopes, middlewareValidateScopes, userRouter); // protected route
        this.express.use('/parking', parkingLotScopes, middlewareValidateScopes, parkingRouter); // protected route
        this.express.use('/report', reportsScopes, middlewareValidateScopes, reportRouter); // protected route

    }
}

export default new AdminRoutes().express;