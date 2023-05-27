const { ObjectId } = require("mongodb");
const { Task } = require("../models/Task");
const { Status } = require("../models/TaskCompleted");

const addTaskStatus = async (req, res) => {
  const { userId, status } = req.body;

  const ctask = await Task.findOne({ where: { taskId: req.params.taskId } });

  if (!ctask) {
    res.status(500).json({ message: "No Task Found" });
  }

  const uStatus = await Status.create({
    statusId: new ObjectId().toString(),
    taskId: ctask.taskId,
    userId,
    status,
  });

  if (!uStatus) {
    res.status(500).json({ message: "Cannot Add Status" });
  }

  res.status(200).json({ message: "Status Added Successfully" });
};

const updateTaskStatus = async (req, res) => {
  const { taskId, userId, status } = req.body;

  const dtask = await Status.findOne({
    where: { statusId: req.params.statusId },
  });

  if (!dtask) {
    res.status(500).json({ message: "No Status Found" });
    return;
  }

  const ctask = await Task.findOne({ where: { taskId: taskId } });

  if (!ctask) {
    res.status(500).json({ message: "No Task Found" });
    return;
  }

  const uStatus = await Status.updateOne(
    { statusId: req.params.statusId },
    {
      $set: {
        status,
      },
    }
  );

  if (!uStatus) {
    res.status(500).json({ message: "Error while updating status" });
    return;
  }

  res.status(200).json({ message: "Status updated Successfully" });
};

const deleteTaskStatus = async (req, res) => {
  const dtask = await Task.findOneAndDelete({ statusId: req.params.statusId });

  if (!dtask) {
    res.status(500).json({ message: "Error while updating status" });
    return;
  }

  res.status(200).json({ message: "Task Status Deleted" });
};

const getAllTaskStatus = async (req, res) => {
  const tasksStatus = await Status.find({});

  if (!tasksStatus) {
    res.status(500).json({ message: "Error while Fetching Task Status" });
    return;
  }

  res.status(200).json({ tasksStatus });
};

module.exports = {
  addTaskStatus,
  updateTaskStatus,
  deleteTaskStatus,
  getAllTaskStatus,
};
