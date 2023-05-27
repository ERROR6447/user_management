const emailValidator = require("email-validator");
const { ObjectId } = require("mongodb");
const { Task } = require("../models/Task");

const addTask = async (req, res) => {
  //auth left here
  const { title, description, image, visible_to } = req.body;

  const SavedTask = await Task.create({
    taskId: new ObjectId().toString(),
    title,
    description,
    image,
    visible_to,
  });

  if (!SavedTask) {
    res.status(500).json({ message: "Error While Creating Task" });
    return;
  }
  console.log("Saved Task", SavedTask);
  res.status(201).json({ message: "Task Created Successfully" });
};

const updateTask = async (req, res) => {
  const { title, description, image, visible_to } = req.body;

  const result = await Task.updateOne(
    { taskId: req.params.taskId },
    {
      $set: {
        title,
        description,
        image,
        visible_to,
      },
    }
  );

  if (!result) {
    res.status(500).json({ message: "Error While updating Task" });
    return;
  }
  res.status(200).json({ message: "Task Updated Successfully" });
};

const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.taskId;

    const dTask = await Task.findOneAndDelete({ taskId: taskId });
    if (!dTask) {
      res.status(500).json({ message: "Error While Deleting Task" });
      return;
    }

    res.status(200).json({ message: "Task Deleted Succesfully" });
  } catch (err) {
    res.status(500).json({ message: "Error While Deleting Task" });
    return;
  }
};

const getAllTask = async (req, res) => {
  const tasks = await Task.find({}).select({
    taskId: 1,
    _id: 0,
    title: 1,
    description: 1,
    image: 1,
    visible_to: 1,
  });

  if (!tasks) {
    res.status(500).json({ message: "Error While Fetching Task" });
    return;
  }

  res.status(200).json({ tasks });
};

module.exports = {
  getAllTask,
  addTask,
  updateTask,
  deleteTask,
};
