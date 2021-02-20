const app = require('./config/server')
const PORT = process.env.PORT || 8089
const allmsg = []
const Routes = require('./app/routes/Routes')

const server = require('http').createServer(app)
const io = require('socket.io')(server)

io.on('connection', (socket) => {
    socket.emit('allmsg', allmsg)
    socket.on('msgS', (msg) => {
        allmsg.push(msg)
        console.log(allmsg)
        
        socket.emit('msgC', msg)
        socket.broadcast.emit('msgC', msg)
    })
})

app.set('io', io)

app.use('/', Routes)

server.listen(PORT, () => {
    console.log(`Running on PORT: ${PORT}`)
})
