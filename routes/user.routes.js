const express = require("express");
const router = express.Router();

app.get("/", (req, res) => {
  res.send("<h1>Hello from Nodemon!!!</h1>");
});

const tester = () => {};

router.get("/test");
