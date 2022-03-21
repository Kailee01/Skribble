const io = require("socket.io")(3000, {
  cors: {
    origin: [
      "http://localhost:8080",
      "http://127.0.0.1:5500",
      "http://localhost:3000",
      "https://admin.socket.io",
    ],
  },
});
/* we are not working on http server but working with socket.io
   run the socket server on 3000 port.
   io variable will create socket connection
  
   connection is the predefine event in socket.io
  inside cors object it will have all the  origin that allow our client to come from .
  
  
  
  
  */
io.on("connection", (socket) => {
  console.log(`socket connetion established with id ${socket.id}`);
  socket.on("draw/command", (commands) => {
    // console.log(commands);
    socket.broadcast.emit("draw/command", commands); // proxy the command to the frontend
  });
});
