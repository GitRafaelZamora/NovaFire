module.exports = class Chat {
    createConnection(io) {
        io.on('connection', socket => {

            socket.on('new message', data => {
                let response = {
                    message: data.message,
                    sender: data.sender
                };
                socket.broadcast.to(data.room).emit('new message', response)
            });

            socket.on('join room', room => {
                socket.join(room);
            })
        })
    }
};