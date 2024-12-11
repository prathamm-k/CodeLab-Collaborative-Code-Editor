require('dotenv').config();
const express = require('express')
const app = express();
const http = require('http');
const { Server } = require('socket.io');
const ACTIONS = require('./src/Actions');

const server = http.createServer(app);
const io = new Server(server);

const userSocketMap = {};

function getAllConnectedClients(roomId){
    return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map((socketId) => {
        return {
            socketId,
            username: userSocketMap[socketId],
        }
    });
}

io.on('connection', (socket) => {
    console.log('socket connected', socket.id)
    socket.on(ACTIONS.JOIN, ({roomId, username}) => {
        userSocketMap[socket.id] = username;
        socket.join(roomId);
        const clients = getAllConnectedClients(roomId);
        clients.forEach(({socketId})=>{
            io.to(socketId).emit(ACTIONS.JOINED, {
                clients,
                username,
                socketId: socket.id,
            });
        })
    })

    socket.on(ACTIONS.CODE_CHANGE, ({roomId, code}) =>{
        //console.log('receiving', code)
        socket.in(roomId).emit(ACTIONS.CODE_CHANGE, {code})
    })

    socket.on(ACTIONS.SYNC_CODE, ({socketId, code}) =>{
        io.to(socketId).emit(ACTIONS.CODE_CHANGE, {code})
    })

    socket.on(ACTIONS.LEAVE, ({ roomId, username }) => {
        // Notify other users in the room about the user's departure
        socket.in(roomId).emit(ACTIONS.LEAVE, {
            username,
        });

        // Remove the user from the userSocketMap
        delete userSocketMap[socket.id];

        // Make the socket leave the room
        socket.leave(roomId);

        console.log(`${username} left room ${roomId}`);
    });

    socket.on('disconnecting', () => {
        const rooms = [...socket.rooms];
        rooms.forEach((roomId) => {
            socket.in(roomId).emit(ACTIONS.DISCONNECTED, {
                socketId: socket.id,
                username: userSocketMap[socket.id],
            });
        });
        delete userSocketMap[socket.id];
        socket.leave();
    });

})

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`listening on port ${PORT}`))