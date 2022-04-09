import * as express from 'express';
import { parkingRouter } from './parkingRouter';

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
        this.express.use('/parking', parkingRouter);
        // this.logger.info("route loaded");
    }
}

export default new Routes().express;