const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);



app.use(express.static(__dirname + '/Views'))
app.set('views', `${__dirname}/Views`)
app.set('view engine', 'ejs')


app.get('/:room', (req, res) => {
    const { room } = req.params;
    return res.render('index', {room})
});



io.on('connection', socket => {
    // Join room
    socket.on('join', room => {
        socket.join(room)
    })
    socket.on('turnOff', room => {
        socket.broadcast.to(room).emit('turnOff')
    })
})




server.listen(process.env.PORT || 5000);