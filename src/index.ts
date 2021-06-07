import { startServer } from "./app";
import { startPermanentRooms } from "./util/startupRooms";

startServer()
    .then(async (result: any) => {
        // const room = new Room({roomID: "test", roomName: "testname", currentPlayers: 0, maxPlayers: 100, mapID: "test"});
        // room.id = 'test';
        await startPermanentRooms();
    });
