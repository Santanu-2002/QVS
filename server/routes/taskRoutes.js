const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { createTask } = require("../controllers/createTask");
const { getTasks } = require("../controllers/getTask");
const { updateTask } = require("../controllers/updateTask");
const { deleteTask } = require("../controllers/deleteTask");

// All task routes require a valid JWT
router.use(auth);

// POST   /api/tasks        — create a task
// GET    /api/tasks        — get all tasks  (optional: ?status=Pending)
// PUT    /api/tasks/:id    — update a task
// DELETE /api/tasks/:id    — delete a task
router.post("/", createTask);
router.get("/", getTasks);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

module.exports = router;
