import {Socket} from "socket.io";

export class SocketManager {
    // SocketIO instance
    io;

    constructor(io) {
        this.io = io;

        io.on('connect' , (socket: Socket) => {
            console.log('connected');

            socket.on('disconnect', () => {
                console.log('disconnected')
            });
        });
    }
}
