import {SyncAlgo} from "./SyncAlgo";
const dsync = require('diffsync');
const dsyncClient = dsync.Client;
const socketIO = require("socket.io-client");

export class DiffSync extends SyncAlgo {
    socket = socketIO('http://localhost:7200');
    client: any;
    data: any;

    constructor(drawID: string) {
        super();
        this.client = new dsyncClient(this.socket, drawID);

        this.client.on('connected', () => {
            console.log('connected');
            this.data = this.client.getData();
            this.fireUpdateHandlers(this.data.state);
        });

        this.client.on('synced', () => {
            console.log('sync call');
            this.fireUpdateHandlers(this.data.state);
        });

        this.client.initialize();
    }

    pushUpdate(newState: any) {
        console.log('pushUpdate');
        if (!this.data) {
            return;
        }

        this.data.state = newState;
        this.client.sync();
    }
}
