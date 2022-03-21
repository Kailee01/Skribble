const canvas = document.querySelector("#drawing-area");

let drawing = false;
let eraser = false; // these are state
let defaultStyle = "rgb(255,255,255)"; // default coluour

let startX, startY, currentX, currentY;

const ctx = canvas.getContext("2d");
// to get the drawing content we extract as ctx from getContext
ctx.fillStyle = defaultStyle;

const socket = io("http://localhost:3000");

socket.on("connect", () => {
  console.log("connected to backend :)");
});

socket.on("draw/command", (commands) => {
  commands.forEach((command) => {
    if (command[0] == 0) {
      /**drawing */
      drawOnCanvas(command[1], command[2], command[3], command[4]);
    } else if (command[1] == 1) {
      /**erasing */
      eraseOnCanvas(command[3], command[4]);
    }
  });
});

let batch = []; // array of all the draw command
let isRequestTimed = false;

function eraseOnCanvas(currentX, currentY) {
  ctx.fillStyle = defaultStyle;
  ctx.fillRect(currentX, currentY, 20, 20);
}

function drawOnCanvas(startX, startY, currentX, currentY) {
  ctx.fillStyle = "rgb(0,0,225)";
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(currentX, currentY);
  ctx.stroke();
}

function sendDrawCommand(command, currentX, currentY) {
  batch.push([command, startX, startY, currentX, currentY]);
  if (!isRequestTimed) {
    setTimeout(() => {
      socket.emit("draw/command", batch);
      isRequestTimed = false;
      batch = [];
    }, 50);
    isRequestTimed = true;
  }
}

canvas.addEventListener("mousedown", (e) => {
  startX = e.offsetX;
  startY = e.offsetY;
  drawing = true;
});

canvas.addEventListener("mousemove", (e) => {
  const currentX = e.offsetX;
  const currentY = e.offsetY;
  if (drawing) {
    if (eraser) {
      eraseOnCanvas(currentX, currentY);
      sendDrawCommand(1, currentX, currentY); // erase active send command 1 and 0 in case of pencil active
    } else {
      drawOnCanvas(startX, startY, currentX, currentY);
      sendDrawCommand(0, currentX, currentY);

      startX = currentX;
      startY = currentY;
    }
  }
});

canvas.addEventListener("mouseup", (e) => {
  drawing = false;
});

const toggleEraser = () => {
  eraser = true;
  //   console.log("erasing");
};

const selectPen = () => {
  eraser = false;
};
// console.log(canvas.width, canvas.height);
const clearCanvas = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  eraser = false;
};
