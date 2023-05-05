const express = require('express');
const app = express();
// const PORT = 3000;
const path = require('path');
const socketIo = require('socket.io');

app.use('/sala1', express.static(path.join(__dirname, 'public')))
app.use('/sala2', express.static(path.join(__dirname, 'public')))

const server = app.listen(3000,()=>{
    console.log('App running.');
})

const messages = {
    sala1:[],
    sala2:[]
};

const io = socketIo(server);

const sala1 = io.of('/sala1').on('connectin',(socket) =>{

    console.log("New connection.");
    socket.emit('update_messages', messages.sala1);

    socket.on('new_message', (data) =>{
        messages.sala1.push(data);
        sala1.emit('update_messages', messages.sala1)
    })
})
const sala2 = io.of('/sala2').on('connectin',(socket) =>{

    console.log("New connection.");
    socket.emit('update_messages', messages.sala2);

    socket.on('new_message', (data) =>{
        messages.sala2.push(data);
        sala2.emit('update_messages', messages.sala1)
    })
})

// io.on('connection', (socket)=>{

//     console.log("New connection.");
//     socket.emit('update_messages', messages);

//     socket.on('new_message', (data) =>{
//         messages.push(data);

//         io.emit('update_messages', messages)
//     })
// })