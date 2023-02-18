const user = require("../controllers/user");
const express = require("express");
const app = express();
const routes = require("express").Router();
const upload = require("../config/file");

const multer = require("multer");
const uploaden = multer({ dest: "upload/" });

routes.get("/health", user.health);
routes.post("/register", user.register);
routes.put("/update/:id", user.update);
routes.put("/picture/:id", upload.array("image", 3), user.picture);

module.exports = routes;
