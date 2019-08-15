module.exports = class Chat {
    createConnection(io) {
        io.on('connection', socket => {

            socket.on('new message', data => {
                socket.broadcast.to(data.room).emit('new message', data.message)
            });

            socket.on('join room', room => {
                socket.join(room);
            })
        })
    }
};