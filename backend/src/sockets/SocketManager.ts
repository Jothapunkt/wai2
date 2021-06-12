import {Socket} from "socket.io";
import {JiffAlgo} from "../algos/JiffAlgo";
import {Notepad} from "../scenarios/notepad/Notepad";
import {DrawingBoard} from "../scenarios/drawingboard/DrawingBoard";
import {DiffSyncAlgo} from "../algos/DiffSyncAlgo";
import {getMetricsCollection} from "../metrics/MetricsCollection";
import {diffsyncDrawID, diffsyncNotepadID} from "../data/dataIDs";

export class SocketManager {
    // SocketIO instance
    io;
    connections: Socket[] = [];

    connect(socket: Socket) {
        this.connections.push(socket);
    }

    disconnect(socket: Socket) {
        this.connections = this.connections.filter(connection => connection !== socket);
    }

    constructor(io) {
        this.io = io;

        const jiffNotepad = new JiffAlgo(new Notepad(), io);
        const jiffDrawingBoard = new JiffAlgo(new DrawingBoard(), io);

        const jsyncNotepad = new DiffSyncAlgo(new Notepad(), io, diffsyncNotepadID);
        const jsyncDrawingboard = new DiffSyncAlgo(new DrawingBoard(), io, diffsyncDrawID);

        io.on('connect' , (socket: Socket) => {
            this.connect(socket);

            socket.on('diffsync-send-edit', obj => {
                const len = JSON.stringify(obj).length;
                getMetricsCollection().diffsync.clientsSent += len;
            });

            socket.on('disconnect', () => {
                this.disconnect(socket);
            });

            socket.on('raw', ({length}) => {
                getMetricsCollection().raw.total += length;
            });

            socket.on("diffsync-message-size", ({length}) => {
                getMetricsCollection().diffsync.serverSent += length;
            });

            socket.on('jiff-patch', (patch: any) => {
                if (patch.scenario === 'drawingboard') {
                    jiffDrawingBoard.receivePatch(patch.patch);
                }

                if (patch.scenario === 'notepad') {
                    jiffNotepad.receivePatch(patch.patch);
                }

                const patchLength = JSON.stringify(patch).length;
                getMetricsCollection().jiff.clientsSent += patchLength;

                this.connections.forEach(conn => {
                    if (conn === socket) {
                        return;
                    }

                    getMetricsCollection().jiff.serverSent += patchLength;
                    conn.emit('jiff-patch', patch);
                }, patch);
            });

            socket.on('jiff-request', ({scenario}) => {
                if (scenario === 'drawingboard') {
                    socket.emit('jiff-initial-state', jiffDrawingBoard.scenario.state);
                }

                if (scenario === 'notepad') {
                    socket.emit('jiff-initial-state', jiffNotepad.scenario.state);
                }
            });
        });
    }
}
