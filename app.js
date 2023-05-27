const cookieParser = require("cookie-parser");
const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoute = require("./routes/user");
const taskRoute = require("./routes/task");
const statRoute = require("./routes/taskcompleted");
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
app.use("/task", taskRoute);
app.use("/stat", statRoute);

module.exports = app;
