import {SyncAlgorithm} from "./SyncAlgorithm";
import {Scenario} from "../scenarios/Scenario";

const diffsync = require('diffsync');

export class DiffSyncAlgo extends SyncAlgorithm {
    dataAdapter: any;
    diffSyncServer: any;

    constructor(scenario: Scenario, io: any, dataID: string) {
        super(scenario, io);

        this.dataAdapter = new diffsync.InMemoryDataAdapter();
        this.diffSyncServer = new diffsync.Server(this.dataAdapter, this.io);

        this.dataAdapter.getData(dataID, console.log);
    }
}
