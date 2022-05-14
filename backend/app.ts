import * as express from 'express';
import morgan = require("morgan");
import Routes from './routes/routes'
const cors = require('cors');

class App {

    public express: express.Application;

    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
    }

    // Configure Express middleware.
    private middleware(): void {
        this.express.use(morgan('dev'));
        this.express.use(cors());
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