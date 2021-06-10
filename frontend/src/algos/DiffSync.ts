import {SyncAlgo} from "./SyncAlgo";
const dsync = require('diffsync');
const dsyncClient = dsync.Client;

export class DiffSync extends SyncAlgo {
    client = dsync.Client;
}
