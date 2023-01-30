import connection from './db/config';
import { IEnterUserPropsSockets } from './interfaces/messages';
const express = require('express');
const app = express();
const db = require('./controllers/query');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = process.env.PORT;
import * as http from 'http';

app.use(cors());
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
const server = http.createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: '*',
    },
});

io.on('connection', (socket: any) => {
    socket.on('USER:JOIN', async (data: IEnterUserPropsSockets) => {
        const messages = await db.getSocketMessages(data.value);
        await socket.emit('MESSAGES:RECEIVED', messages);
    });

    console.log('a user connected');

    socket.on('MESSAGE:CREATED', async (msg: any) => {
        const message = await db.createSocketMessage(msg);
        await socket.broadcast.emit('MESSAGE:DELIVERED', message);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

// const emitMostRecentMessges = (username: string) => {
//     db.getSocketMessages(username)
//         .then((result: any) => io.emit('MESSAGE:DELIVERED', result))
//         .catch(console.log);
// };

connection
    .sync()
    .then(() => {
        console.log('Database synced succesfully');
    })
    .catch((err) => {
        console.log('Err', err);
    });

server.listen(port, () => {
    console.log(`listening on *:${port}`);
});

app.post('/signin', db.signIn);
app.get('/getmessages', db.getMessagesForUser);
app.get('/getusers', db.getusers);
