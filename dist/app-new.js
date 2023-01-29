"use strict";
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
// const wss = new ws.Server(
//     {
//         port: socketPort || 8000,
//     },
//     () => console.log(`WSS started on ${socketPort}`)
// );
// wss.on('connection', function connection(ws: any) {
//     ws.send('user is connected to server');
//     ws.on('open', function (message: any) {
//         message = JSON.parse(message);
//         console.log(message);
//     });
// const messages = db.getSocketMessages(message.username);
// ws.send(JSON.stringify(messages));
// });
// ws.on('message', function (message: any) {
//     message = JSON.parse(message);
//     switch (message.event) {
//         case 'message':
//             broadcastMessage(message);
//             break;
//         case 'connection':
//             // broadcastMessage(message);
//             break;
//     }
// });
// });
// wss.on('connection', (ws: any) => {
//     ws.on('open', (message: any) => {
//         ws.send(`[client connected]`);
// const messages = await db.getSocketMessages(message.username);
// ws.send(JSON.stringify(messages));
// });
// ws.on('message', async (message: any) => {
//     message = await JSON.parse(message);
//     // console.log(message);
//     switch (message.event) {
//         case 'message':
//             console.log(message, 'message event');
//             db.createSocketMessage(message);
//             const newmessages = await db.getSocketMessages(
//                 message.username
//             );
//             await broadcastMessage(newmessages);
//             break;
//         case 'connection':
//             console.log('connection');
//             const messages = await db.getSocketMessages(message.username);
//             await ws.send(JSON.stringify(messages));
//             break;
//     }
// });
//     ws.on('disconnect', () => {
//         console.log('user is disconnected');
//     });
// });
// function broadcastMessage(message: any) {
//     wss.clients.forEach((client: WebSocket) => {
//         client.send(JSON.stringify(message));
//     });
// }
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
app.get('/getusers', db.getusers);
