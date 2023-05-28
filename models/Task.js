const mongoose = require("mongoose");

const task = new mongoose.Schema({
  //taskId: mongoose.Types.ObjectId,
  title: String,
  description: String,
  image: String,
  visible_to: [{ type: mongoose.Types.ObjectId, ref: "user" }],
});

const Task = mongoose.model("task", task);

module.exports = { Task };
