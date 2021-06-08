import {Scenario} from "../scenarios/Scenario";

export class SyncAlgorithm {
    scenario: Scenario;

    constructor(scenario: Scenario) {
        this.scenario = scenario;
    }

    receivePatch(patch: any) {

    }
}
