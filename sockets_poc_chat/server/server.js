const io = require("socket.io")(3000, {
  cors: {
    origin: [
      "http://localhost:8080",
      "https://admin.socket.io",
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
  // console.log("socket connection start ho gya hai");
  // console.log(socket.id);
  // socket.on("custom-event", (num, text, obj) => {
  //   console.log(num, text, obj);
  // });
  socket.on("send-message", (message) => {
    // listening the message event
    console.log(message);
    // io.emit("recieve-message", message); // io.emit brodcast it to all the socket connetion( represent all the connection i.e mulitple socekt)
    socket.broadcast.emit("recieve-message", message); // it reprent one single socket conneciton
    // console.log(message);
  });
});
