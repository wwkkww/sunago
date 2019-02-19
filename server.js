const path = require("path");
const http = require("http");
const express = require('express');
const socketIO = require("socket.io");
const cors = require('cors')
const bodyParser = require("body-parser");

const publicPath = path.join(__dirname, "client/public")
const port = process.env.PORT || 5000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

console.log(publicPath)
app.use(express.static(publicPath)); //set express static middleware //host files

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

io.on("connection", (socket) => {
  // console.log("New user connected");
  socket.on("disconnect", () => {
    // console.log("Client disconnected")
  })

  socket.on("color", (color) => {
    console.log("Color chaged to: ", color)
    io.sockets.emit("change color", color)
  })

  socket.on("drawData", (data) => {
    console.log("receiving: ", data)
  })
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}!`)
})