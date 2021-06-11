import {SyncAlgo} from "./SyncAlgo";
const dsync = require('diffsync');
const dsyncClient = dsync.Client;

export class DiffSync extends SyncAlgo {
    client: any;
    data: any;

    constructor(drawID: string) {
        super();
        this.client = new dsyncClient(this.socket, drawID);

        this.client.on('connected', () => {
            this.data = this.client.getData();
            this.fireUpdateHandlers(this.data.state);
        });

        this.client.on('synced', () => {
            this.fireUpdateHandlers(this.data.state);
        });

        this.client.initialize();
    }

    pushUpdate(newState: any) {
        super.pushUpdate(newState);
        if (!this.data) {
            return;
        }

        this.data.state = newState;
        this.client.sync();
    }
}
