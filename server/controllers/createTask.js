const Task = require("../models/Task");

exports.createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required." });
    }

    const newTask = new Task({
      title,
      description,
      status,
      user: req.userId,
    });

    await newTask.save();

    res.status(201).json({ message: "Task created successfully.", task: newTask });
  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};
