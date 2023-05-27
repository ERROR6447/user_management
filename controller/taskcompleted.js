const { ObjectId } = require("mongodb");
const { Task } = require("../models/Task");
const { Status } = require("../models/TaskCompleted");
const { User } = require("../models/user");

const addTaskStatus = async (req, res) => {
  const { userId, status } = req.body;

  const ctask = await Task.findOne({ taskId: req.params.taskId });

  if (!ctask) {
    res.status(500).json({ message: "No Task Found" });
  }

  const user = await User.findOne({ userId });

  if (!user) {
    res.status(500).json({ message: "No user Found" });
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
    statusId: req.params.statusId,
    userId,
    taskId,
  });

  if (!dtask) {
    res.status(500).json({ message: "No Status Found" });
    return;
  }

  const ctask = await Task.findOne({ taskId: taskId });

  if (!ctask) {
    res.status(500).json({ message: "No Task Found" });
    return;
  }

  const user = await User.findOne({ userId });

  if (!user) {
    res.status(500).json({ message: "No User Found" });
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
  console.log("req.params.statusId: ", req.params.statusId);
  const dtask = await Task.deleteOne({ statusId: req.params.statusId });

  if (!dtask) {
    console.log(dtask);
    res.status(500).json({ message: "Error while deleting status" });
    return;
  }

  res.status(200).json({ message: "Task Status Deleted" });
};

const getAllTaskStatus = async (req, res) => {
  const tasksStatus = await Status.find({})
    .populate(["taskId", "userId"])
    .select({
      _id: 0,
      statusId: 1,
      taskId: 1,
      userId: 1,
      status: 1,
    });

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
