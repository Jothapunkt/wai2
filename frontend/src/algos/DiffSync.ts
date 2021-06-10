import {SyncAlgo} from "./SyncAlgo";
import {diffsyncDrawID} from "../data/dataIDs";
const dsync = require('diffsync');
const dsyncClient = dsync.Client;
const socketIO = require("socket.io-client");

export class DiffSync extends SyncAlgo {
    socket = socketIO();
    client: any;
    data: any;

    constructor() {
        super();
        this.client = new dsyncClient(this.socket, diffsyncDrawID);

        this.client.on('connected', () => {
            this.data = this.client.getData();
        });

        this.client.on('synced', () => {

        });

        this.client.initialize();
    }
}
