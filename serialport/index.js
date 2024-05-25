import { SerialPort } from 'serialport';
import { ByteLengthParser } from '@serialport/parser-byte-length';
import { Server } from 'socket.io';
import {createServer} from 'http';
import express from 'express';

const port = new SerialPort({
    path: '/dev/ttyUSB0',
    baudRate: 115200,
});
const byteparser = port.pipe(new ByteLengthParser({
    length: 500
}));
port.open();
const server = express(); // socketio server used as fallback in case of electron failure
const httpServer = createServer(server);
const io = new Server(httpServer);
const connections = [];

class BmsData {
    constructor(voltage,cells,mean,stddev,current) {
        this.voltage = voltage;
        this.cells = cells;
        this.mean = mean;
        this.stddev = stddev;
        this.current = current;

    }
}

byteparser.on('data', (stream) => { //reads data
    let data = stream.toString().split('\n');
    let battery_data = {};
    for (let item of data) {
        item = item.trim().split(' ');
        item = item.filter((el) => el != '');
        
    }
    io.emit('data', battery_data);
});
port.on('error', (err) => {io.emit('error', err)});

io.on('connection', (socket) => {
    console.log('New connection!');
    connections.push(socket);
    if(writeData('sh\n')) {
        let interval = setInterval(() => {
            if(connections.length < 1) {
                clearInterval(interval);
            }
            else {
                console.log("write success: ", writeData('sh\n'));
            }
        }, 1000);
    }
    else {
        io.emit('error', 'BMS is not connected')
    }
    


});

httpServer.listen(3000, () => { //starts socketio server
    console.log('Site is running on port 3000')
});

function writeData(data) { // used to write commands to serialport
    if(!port.isOpen) {
        return false;
    }
    port.write(data, function(err) {
        if (err) {
            return console.log('Error on write: ', err.message)
        }
        console.log('message written')
    });
    return true;
}






