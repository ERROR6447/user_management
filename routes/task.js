const express = require("express");

const {
  addTask,
  updateTask,
  deleteTask,
  getAllTask,
} = require("../controller/task");

const router = express.Router();

router.get("/all-tasks", getAllTask);

router.post("/add-task", addTask);

router.put("/update-task/:taskId", updateTask);

router.delete("/delete-task/:taskId", deleteTask);

module.exports = router;
