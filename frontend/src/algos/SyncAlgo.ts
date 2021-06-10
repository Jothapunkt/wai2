export class SyncAlgo {
    updateHandlers: ((data: any) => void)[] = [];

    setUpdateHandler(handler: (data: any) => void) {
        this.updateHandlers.push(handler);
    }

    removeUpdateHandler(handler: (data: any) => void) {
        this.updateHandlers = this.updateHandlers.filter(updateHandler => updateHandler !== handler);
    }

    fireUpdateHandlers(data: any) {
        for (let handler of this.updateHandlers) {
            handler(data);
        }
    }

    notifyUpdate(newState: any) {

    }
}
