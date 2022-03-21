// const { instrument } = require("@socket.io/admin-ui");
import { io, Socket } from "socket.io-client";
const messageInput = document.querySelector("#message-input");
const roomInput = document.querySelector("#room-input");
const joinRoomButton = document.querySelector("#join-room-button");
const form = document.querySelector("#form");

const socket = io("http://localhost:3000");

socket.on("connect", () => {
  displayMessage(`you connected with id->${socket.id}`);
});

socket.on("recieve-message", (message) => {
  // listening the event
  displayMessage(message);
});

// socket.emit("custom-event", 10, "this_is_custome_event", { a: 1 });

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value;
  const room = roomInput.value;

  if (message === "") return;
  displayMessage(message);
  socket.emit("send-message", message);
  messageInput.value = "";
});

joinRoomButton.addEventListener("click", () => {
  const room = roomInput.value;
});

function displayMessage(message) {
  const div = document.createElement("div");
  div.textContent = message;
  document.querySelector("#message-container").append(div);
}

// instrument(io, {
//   auth: false,
// });
