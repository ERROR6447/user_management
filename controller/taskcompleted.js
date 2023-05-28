const { ObjectId } = require("mongodb");
const { Task } = require("../models/Task");
const { Status } = require("../models/TaskCompleted");
const { User } = require("../models/user");

const addTaskStatus = async (req, res) => {
  const { userId, status } = req.body;

  const alpre = await Status.findOne({ taskId: req.params.taskId, userId });

  if (alpre) {
    res.status(500).json({ message: "Status Already Present" });
    return;
  }

  const ctask = await Task.findOne({ _id: req.params.taskId });

  if (!ctask) {
    res.status(500).json({ message: "No Task Found" });
  }

  const user = await User.findOne({ _id: userId });

  if (!user) {
    res.status(500).json({ message: "No user Found" });
  }

  const uStatus = await Status.create({
    // statusId: new ObjectId().toString(),
    taskId: ctask._id,
    userId,
    status,
  });

  if (!uStatus) {
    res.status(500).json({ message: "Cannot Add Status" });
    return;
  }

  res.status(200).json({ message: "Status Added Successfully" });
};

const updateTaskStatus = async (req, res) => {
  const { taskId, userId, status } = req.body;

  const dtask = await Status.findOne({
    _id: req.params.statusId,
    userId,
    taskId,
  });

  if (!dtask) {
    res.status(500).json({ message: "No Status Found" });
    return;
  }

  const ctask = await Task.findOne({ _id: taskId });

  if (!ctask) {
    res.status(500).json({ message: "No Task Found" });
    return;
  }

  const user = await User.findOne({ _id: userId });

  if (!user) {
    res.status(500).json({ message: "No User Found" });
    return;
  }

  const uStatus = await Status.updateOne(
    { _id: req.params.statusId },
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
  const dtask = await Status.findByIdAndDelete(req.params.statusId);

  console.log("datsk", dtask);

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
      _id: 1,
      // statusId: 1,
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

const getUserTaskStatus = async (req, res) => {
  const uts = await Status.find({ userId: req.params.userId });

  if (!uts) {
    res.status(500).json({ message: "Error while Fetching User Task Status" });
    return;
  }
  res.status(200).json({ user_task_status: uts });
};

module.exports = {
  addTaskStatus,
  updateTaskStatus,
  deleteTaskStatus,
  getAllTaskStatus,
  getUserTaskStatus,
};
