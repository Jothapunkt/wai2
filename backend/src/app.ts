import * as express from "express";
import * as path from "path";
import {SocketManager} from "./sockets/SocketManager";
import {metricsRouter} from "./routes/metrics";

const socketIO = require("socket.io");

const cors = require('cors');

export const startServer = () => {
    return new Promise((resolve, reject) => {
        const app = express();

        app.use('*' , cors());

        const publicPath = path.resolve(path.join(__dirname, 'public'));

        app.use('/', express.static(publicPath));
        app.use('/metrics', metricsRouter);

        const port = process.env.PORT ? process.env.PORT : 7200;
        const server = app.listen(port);

        console.log('listening on port', port);

        const io = socketIO(server, {
            cors: {
                origin: '*',
            }
        });

        // Set up socket events
        new SocketManager(io);

        resolve({server, port});
    });
};
