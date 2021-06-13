import {SyncAlgo} from "./SyncAlgo";

const jiff = require('jiff');

export class JiffAlgo extends SyncAlgo {
    lastState = undefined;
    scenario;

    constructor(scenario: string) {
        super();

        this.scenario = scenario;

        this.socket.on('jiff-patch', (patch: any) => {
            if (patch.scenario !== this.scenario) {
                return;
            }

            // Can't be in one step to avoid desync if the patch fails
            try {
                const patched = jiff.patch(patch.patch, this.lastState);
                this.lastState = jiff.clone(patched);
                this.fireUpdateHandlers(patched);
            } catch (e) {
                console.log(e);
            }

        });

        this.socket.on('jiff-initial-state', (state: any) => {
            this.lastState = jiff.clone(state);
            this.fireUpdateHandlers(state);
        });

        this.socket.emit('jiff-request', {scenario: this.scenario});
    }

    pushUpdate(newState: any) {
        super.pushUpdate(newState);

        // Calculate difference
        const patch = jiff.diff(this.lastState, newState);
        /*console.log(this.lastState);
        console.log(newState);
        console.log(patch);*/

        this.lastState = jiff.clone(newState);

        if (patch) {
            this.socket.emit('jiff-patch', {patch, scenario: this.scenario});
        }
    }
}
