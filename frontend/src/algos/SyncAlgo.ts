export class SyncAlgo {
    updateHandlers: ((data: any) => void)[] = [];

    setUpdateHandler(handler: (data: any) => void): void {
        this.updateHandlers.push(handler);
    }

    removeUpdateHandler(handler: (data: any) => void): void {
        this.updateHandlers = this.updateHandlers.filter(updateHandler => updateHandler !== handler);
    }

    // A new state was received from server
    fireUpdateHandlers(data: any): void {
        for (let handler of this.updateHandlers) {
            handler(data);
        }
    }

    // Own client changed state
    pushUpdate(newState: any) {

    }
}
