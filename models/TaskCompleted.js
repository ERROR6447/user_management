const mongoose = require("mongoose");

const TStatus = new mongoose.Schema({
  //statusId: mongoose.Types.ObjectId,
  taskId: {
    type: mongoose.Types.ObjectId,
    ref: "task",
    localField: "userId",
    foreignField: "userId",
  },
  userId: { type: mongoose.Types.ObjectId, ref: "user" },
  status: {
    type: String,
    enum: ["PENDING", "COMPLETED"],
  },
});

const Status = mongoose.model("task_status", TStatus);

module.exports = { Status };
