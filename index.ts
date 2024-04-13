
import { Server } from 'socket.io';
import express from 'express';

import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';


let SerialPort = require("serialport");
const port = "COM3";
/*
const app = express();
const server = createServer(app);
const io = new Server(server);

const __dirname = dirname(fileURLToPath(import.meta.url));

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
    console.log('a user connected');
});

server.listen(3000, () => {
    console.log('server running at http://localhost:3000');
});

interface portOptions {
    path?: string,
    baudRate?: number;
}



let port = "COM1";
let message = "Hakuna Matata";
*/
let serialPort2 = new SerialPort(port, {
    baudRate: 9600
});

let message = "show";
serialPort2.write(message, function(err) {
    if (err) {
        return console.log("Error on write: ", err.message);
    }
    console.log("Message sent successfully");
});