const express = require("express");

const {
  addTask,
  updateTask,
  deleteTask,
  getAllTask,
  getTaskById,
} = require("../controller/task");

const router = express.Router();

router.get("/all-tasks", getAllTask);

router.post("/add-task", addTask);

router.put("/update-task/:taskId", updateTask);

router.delete("/delete-task/:taskId", deleteTask);

router.get("/getUserTask/:userId", getTaskById);

module.exports = router;
