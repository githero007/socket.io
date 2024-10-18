const express = require('express');
const { createServer } = require('node:http');
const { Server } = require('socket.io');
const path = require('path');
const app = express();
const server = createServer(app);
const io = new Server(server);
app.use(express.static(path.resolve('./public')));
io.on('connection', (socket) => {
    socket.on('userMessage', (msg) => {
        console.log(`meesage recieved from user ${msg}`);
        io.emit('userMessage', msg);//broadcasting this message to everyone
    })

})
app.get('/', async (req, res) => {
    res.sendFile('/public/index.html')
})

server.listen(3000, () => {
    console.log('server running at http://localhost:3000');
});