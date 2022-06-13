require("dotenv/config")
const express = require("express")
const app = express()
const http = require("http").createServer(app)
const socket = require("socket.io")
const io = socket(http)

// port
const PORT = process.env.PORT

// static file
app.use("/public", express.static(__dirname + '/public'));

// get requirest
app.get("/", (req, res) => {

    res.sendFile(__dirname+"/index.html")
})

// listen port
http.listen(PORT, () => {
    console.log("Server Listening On Port " + PORT)
})

// socket

io.on("connection",(socket)=>{
    console.log("socket connected")

    socket.on("addMessage",(msg)=>{
        // console.log(msg)

        // send a message to everyone except who is send message
        socket.broadcast.emit("newMessage",msg)
    });
});