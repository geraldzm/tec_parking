import * as express from 'express';
import { parkingRouterAdmin } from './parkingRouterAdmin';
import { parkingRouter } from './parkingRouter';
import { userAuthRouter } from './userAuthRouter';
import { tokenMiddlewareValidation } from '../middleware/middlewareAuth';
import { middlewareValidateScopes, reportsScopes, parkingLotScopes } from '../middleware/middlewareScopes';
import { reportRouter } from './reportRouter';
const cors = require('cors');

class Routes {

    public express: express.Application;

    constructor() {
        this.express = express();

        this.middleware();
        this.routes();
    }

    // Configure Express middleware.
    private middleware(): void {
        this.express.use(cors());
        this.express.use(express.json());
        this.express.use(express.urlencoded({ extended: false }));
    }

    private routes(): void {
        this.express.use('/parking', tokenMiddlewareValidation, parkingRouter); 
        this.express.use('/parkingAdmin', tokenMiddlewareValidation, parkingLotScopes, middlewareValidateScopes, parkingRouterAdmin); // protected route
        this.express.use('/report', tokenMiddlewareValidation, reportsScopes, middlewareValidateScopes, reportRouter); // protected route
        this.express.use('/auth', userAuthRouter);
    }
}

export default new Routes().express;