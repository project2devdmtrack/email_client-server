"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("./db/config"));
const db = require('./controllers/messageController');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const socketPort = 8000;
const { emit } = require('process');
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
});
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));
const emitMostRecentMessges = () => {
    db.getSocketMessages()
        .then((result) => io.emit('chat message', result))
        .catch(console.log);
};
// connects, creates message, and emits top 10 messages
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('chat message', (msg) => {
        db.createSocketMessage(JSON.parse(msg))
            .then(() => {
            emitMostRecentMessges();
        })
            .catch((err) => io.emit(err));
    });
    // close event when user disconnects from app
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});
// Displays in terminal which port the socketPort is running on
config_1.default
    .sync()
    .then(() => {
    console.log('Database synced succesfully');
})
    .catch((err) => {
    console.log('Err', err);
});
app.listen(port, () => {
    console.log(`App running on port ${port}.`);
});
server.listen(socketPort, () => {
    console.log(`listening on *:${socketPort}`);
});
