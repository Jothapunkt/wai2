import {Socket} from "socket.io";
import {JiffAlgo} from "../algos/JiffAlgo";
import {Notepad} from "../scenarios/notepad/Notepad";
import {DrawingBoard} from "../scenarios/drawingboard/DrawingBoard";
import {JsonSyncAlgo} from "../algos/JsonSyncAlgo";

export class SocketManager {
    // SocketIO instance
    io;
    connections: Socket[] = [];

    connect(socket: Socket) {
        console.log('connected');
        this.connections.push(socket);
    }

    disconnect(socket: Socket) {
        console.log('disconnected')
        this.connections = this.connections.filter(connection => connection !== socket);
    }

    constructor(io) {
        this.io = io;

        const jiffNotepad = new JiffAlgo(new Notepad(), io);
        const jiffDrawingBoard = new JiffAlgo(new DrawingBoard(), io);

        const jsyncNotepad = new JsonSyncAlgo(new Notepad(), io);
        const jsyncDrawingboard = new JsonSyncAlgo(new DrawingBoard(), io);

        io.on('connect' , (socket: Socket) => {
            this.connect(socket);

            socket.on('disconnect', () => {
                this.disconnect(socket);
            });

            socket.on('jiff-notepad-patch', (patch: any) => {
                jiffNotepad.receivePatch(patch);
            });

            socket.on('jiff-drawingboard-patch', (patch: any) => {
                jiffDrawingBoard.receivePatch(patch);
            });
        });
    }
}
