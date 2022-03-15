const express = require("express");
const app = express();

app.get("/abcd", (req, res) => {
  res.send("Hello server");
  console.log("Hi");
});

app.listen(3000, () => {
  console.log("app is running on port 3000");
});
