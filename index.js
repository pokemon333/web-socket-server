import { createServer } from "http";
import { Server } from "socket.io";
import dotenv from 'dotenv'

dotenv.config()

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true
  }
});

let messages = [];

io.on("connection", (socket) => {
  io.emit('update message',messages);
  socket.on('send-message',(message)=>{
    messages.push(message);
    io.emit('update message',messages);
  })  
});

httpServer.listen(process.env.PORT);
console.log('Server is listen on port: ' + process.env.PORT)
