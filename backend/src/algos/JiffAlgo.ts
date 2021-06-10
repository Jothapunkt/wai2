import {SyncAlgorithm} from "./SyncAlgorithm";
import {Scenario} from "../scenarios/Scenario";

const jiff = require("jiff");

export class JiffAlgo extends SyncAlgorithm {
    constructor(scenario: Scenario, io: any) {
        super(scenario, io);
    }

    receivePatch(patch: any) {
        try {
            var diff = jiff.diff(this.scenario.state, patch)
            const patched = jiff.patch(patch, diff);
            this.scenario.state = patched;
        } catch (e) {
            console.log(e);
        }
    }
}
