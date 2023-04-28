const express = require('express');
const app = express();
// const PORT = 3000;
const path = require('path');
const socketIo = require('socket.io');

app.use('/', express.static(path.join(__dirname, 'public')))

const server = app.listen(3000,()=>{
    console.log('App running.');
})

const messages = [];

const io = socketIo(server);

io.on('connection', (socket)=>{

    console.log("New connection.");
    socket.emit('update_messages', messages);

    socket.on('new_message', (data) =>{
        messages.push(data);

        io.emit('update_messages', messages)
    })
})