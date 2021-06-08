import {SyncAlgorithm} from "./SyncAlgorithm";
import {Scenario} from "../scenarios/Scenario";

const jiff = require("jiff");

export class JiffAlgo extends SyncAlgorithm {
    constructor(scenario: Scenario) {
        super(scenario);
    }

    receivePatch(patch: any) {
        try {
            const patched = jiff.patch(patch, this.scenario.state);
            this.scenario.state = patched;
        } catch (e) {
            console.log(e);
        }
    }
}
