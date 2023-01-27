"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("./db/config"));
const express = require('express');
const db = require('./controllers/messageController');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 5000;
const socketPort = 8000;
const { emit } = require('process');
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: 'http://localhost:3001',
        methods: ['GET', 'POST'],
    },
});
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));
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
app.get('/getmessagesforuser', db.getMessagesForUser);
app.post('/createmessage', db.createMessage);
