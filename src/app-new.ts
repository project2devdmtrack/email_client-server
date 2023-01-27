const express = require('express');
import connection from './db/config';
const db = require('./controllers/query');
const ws = require('ws');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const socketPort = process.env.SOCKETPORT;

app.use(cors());
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

const wss = new ws.Server(
    {
        port: socketPort || 8000,
    },
    () => console.log(`Server started on ${socketPort}`)
);

wss.on('connection', (ws: any) => {
    ws.on('message', (message: any) => {
        message = JSON.parse(message);
        console.log(message);
        switch (message.event) {
            case 'message':
                broadcastMessage(message);
                db.createSocketMessage(message);
                break;
            case 'connection':
                const result = (async function () {
                    const messages = await db
                        .getSocketMessages(message)
                        .then((data: any) => data);
                    console.log(messages);
                    broadcastMessage(messages);
                })();
                break;
        }
    });
    ws.on('open', (message: any) => {
        console.log(`[client connected]`);
        ws.send(`Hi! this is client`);
    });
    ws.on('disconnect', () => {
        console.log('user is disconnected');
    });
});

function broadcastMessage(message: any) {
    wss.clients.forEach((client: WebSocket) => {
        client.send(JSON.stringify(message));
    });
}

connection
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
