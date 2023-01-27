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
const express = require('express');
const config_1 = __importDefault(require("./db/config"));
const db = require('./controllers/query');
const ws = require('ws');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const socketPort = process.env.SOCKETPORT;
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));
const wss = new ws.Server({
    port: socketPort || 8000,
}, () => console.log(`Server started on ${socketPort}`));
wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        message = JSON.parse(message);
        console.log(message);
        switch (message.event) {
            case 'message':
                broadcastMessage(message);
                db.createSocketMessage(message);
                break;
            case 'connection':
                const result = (function () {
                    return __awaiter(this, void 0, void 0, function* () {
                        const messages = yield db
                            .getSocketMessages(message)
                            .then((data) => data);
                        console.log(messages);
                        broadcastMessage(messages);
                    });
                })();
                break;
        }
    });
    ws.on('open', (message) => {
        console.log(`[client connected]`);
        ws.send(`Hi! this is client`);
    });
    ws.on('disconnect', () => {
        console.log('user is disconnected');
    });
});
function broadcastMessage(message) {
    wss.clients.forEach((client) => {
        client.send(JSON.stringify(message));
    });
}
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
app.post('/signin', db.signIn);
app.get('/getmessages', db.getMessagesForUser);
