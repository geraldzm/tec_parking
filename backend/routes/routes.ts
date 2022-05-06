import * as express from 'express';
import { parkingRouter } from './parkingRouter';
import { userAuthRouter } from './userAuthRouter';
import { tokenMiddlewareValidation } from '../utils/middlewareAuth';

class Routes {

    public express: express.Application;

    constructor() {
        this.express = express();

        this.middleware();
        this.routes();
    }

    // Configure Express middleware.
    private middleware(): void {
        this.express.use(express.json());
        this.express.use(express.urlencoded({ extended: false }));
    }

    private routes(): void {
        this.express.use('/parking', tokenMiddlewareValidation, parkingRouter); // protected route
        this.express.use('/auth', userAuthRouter);
        // this.logger.info("route loaded");
    }
}

export default new Routes().express;