import * as express from 'express';
import * as morgan from 'morgan';
import Routes from './routes/routes'


class App {

    public express: express.Application;
    private saludos:string[];

    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
    }

    // Configure Express middleware.
    private middleware(): void {
        this.express.use(morgan('dev'));
        this.express.use(express.json());//bodyParser deprecated
        this.express.use(express.urlencoded({ extended: false }));
    }

    private routes(): void {
        this.express.use('/api', Routes);
        this.express.use('*', (req,res) => {
            res.send("Invalid request");
        });
    }
}

export default new App().express;