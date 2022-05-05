import App from './app';
import * as  http from 'http'

const port = process.env.PORT;

App.set('port', port);
const server = http.createServer(App);
server.listen(port);

server.on('listening', () => {
    const addr = server.address() || { port: 0 };
    const bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;
    // log info
    console.log(`Listening on ${bind}`);
});
