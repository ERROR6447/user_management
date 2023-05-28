const express = require("express");

const {
  addTaskStatus,
  updateTaskStatus,
  deleteTaskStatus,
  getAllTaskStatus,
  getUserTaskStatus,
} = require("../controller/taskcompleted");

const router = express.Router();

router.get("/all-task-status", getAllTaskStatus);

router.post("/add-task-status/:taskId", addTaskStatus);

router.put("/update-task-status/:statusId", updateTaskStatus);

router.delete("/delete-task-status/:statusId", deleteTaskStatus);

router.get("/get-user-task-status/:userId", getUserTaskStatus);

module.exports = router;
