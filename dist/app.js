"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("./db/config"));
const express = require('express');
const app = express();
const db = require('./controllers/query');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = process.env.PORT;
const socketPort = process.env.SOCKETPORT;
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
});
io.on('connection', (socket) => {
    socket.on('USER:JOIN', (data) => __awaiter(void 0, void 0, void 0, function* () {
        const messages = yield db.getSocketMessages(data.value);
        yield socket.emit('MESSAGES:RECEIVED', messages);
    }));
    console.log('a user connected');
    socket.on('MESSAGE:CREATED', (msg) => __awaiter(void 0, void 0, void 0, function* () {
        const message = yield db.createSocketMessage(msg);
        yield socket.broadcast.emit('MESSAGE:DELIVERED', message);
        console.log('test');
    }));
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});
// const emitMostRecentMessges = (username: string) => {
//     db.getSocketMessages(username)
//         .then((result: any) => io.emit('MESSAGE:DELIVERED', result))
//         .catch(console.log);
// };
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
app.post('/signin', db.signIn);
app.get('/getmessages', db.getMessagesForUser);
app.get('/getusers', db.getusers);
