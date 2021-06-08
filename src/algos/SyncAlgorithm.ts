import {Scenario} from "../scenarios/Scenario";

export class SyncAlgorithm {
    scenario: Scenario;

    // Traffic metrics (in bytes)
    totalInboundTraffic = 0;
    totalOutboundTraffic = 0;

    constructor(scenario: Scenario) {
        this.scenario = scenario;
    }

    receiveData(data: any) {
        this.totalInboundTraffic += JSON.stringify(data).length;
        this.receivePatch(data);
    }

    sendData(data: any) {
        this.totalOutboundTraffic += JSON.stringify(data).length;
        this.sendPatch(data);
    }

    sendPatch(patch: any) {

    }

    receivePatch(patch: any) {

    }
}
