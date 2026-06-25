const Task = require("../models/Task");

exports.getTasks = async (req, res) => {
  try {
    const { status } = req.query;

    const filter = { user: req.userId };
    if (status) {
      filter.status = status; // e.g. GET /api/tasks?status=Pending
    }

    const tasks = await Task.find(filter).sort({ createdAt: -1 });

    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};
