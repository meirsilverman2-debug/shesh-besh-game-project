import express from "express";
import {Server} from "socket.io";
import {createServer} from "http";
import dotenv from "dotenv";
dotenv.config();
import generatRoomCode from  "./utils/roomCode.js";
import isValidName from "./utils/utils-functions.js";
import roomWithoutSocketId from "./utils/roomCode.js";

const PORT = process.env.PORT || 3000

const app = express();
const server = createServer(app);

const io = new Server(server, {
    cors: {origin: [`http://localhost:5173`]}
});

const rooms = new Map(); // This act like a box that will contain the rooms which each room is a object:
const socketIdRooms = new Map()


io.on("connect", socket => {
    console.log("connected", socket.id);

  socket.on("room:create", ({name}, callback) => {

   
  if (!isValidName(name)){
    callback(
        {
            success: false,
            error: {
                code: "400",
                message: 'Name is not valid'
            }
        }
    )

  }

    let roomCode = generatRoomCode();
    while(rooms.has(roomCode)){
        roomCode = generatRoomCode();
    }

    const room = {
        id: roomCode,
        status: "waiting",
        ownerSocketId: socket.id,
        players: [
            {
                socketId: socket.id,
                name: name.trim(),
                color: "white"
            },
        ],
        game: null,
        rematchAcceptedBy: []
    };

    rooms.set(roomCode, room);
    socketIdRooms.set(socket.id, roomCode)

    socket.join(roomCode);
    console.log(roomCode, "has been created");

    callback(
        {
            success: true,
            room: roomWithoutSocketId(room)
        }
    )
    
  })

    socket.on("disconnect", () => {
        console.log("disconnected:", socket.id);
        
    });
});


server.listen(PORT, (e) => {
    if (e) return console.log(e);
    console.log(`Server is running on http://localhost:${PORT}`);  
});
