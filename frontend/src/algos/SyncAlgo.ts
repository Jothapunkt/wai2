export class SyncAlgo {
    updateHandlers: ((data: any) => void)[] = [];

    setUpdateHandler(handler: (data: any) => void): void {
        this.updateHandlers.push(handler);
    }

    patch(oldData: any, patch: any): any {

    }

    removeUpdateHandler(handler: (data: any) => void): void {
        this.updateHandlers = this.updateHandlers.filter(updateHandler => updateHandler !== handler);
    }

    fireUpdateHandlers(data: any): void {
        for (let handler of this.updateHandlers) {
            handler(data);
        }
    }

    pushUpdate(newState: any) {

    }
}
