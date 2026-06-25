const Task = require("../models/Task");

exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;

    const task = await Task.findOne({ _id: id, user: req.userId });
    if (!task) {
      return res.status(404).json({ message: "Task not found." });
    }

    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (status !== undefined) task.status = status;

    await task.save();

    res.status(200).json({ message: "Task updated successfully.", task });
  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};
