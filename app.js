const cookieParser = require("cookie-parser");
const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoute = require("../models/user");
/* import Routes  */

const app = express();

app.use(logger("dev"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeadler("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Max-Age", 1728000);
  next();
});

/* add routes here app.use('',routes) */

app.use("/", userRoute);

module.exports = app;
const emailValidator = require("email-validator");
const { ObjectId } = require("mongodb");
const { Task } = require("../models/Task");

const addTask = async (req, res) => {
  //auth left here
  const { title, description, image } = req.bodyPa;
};
