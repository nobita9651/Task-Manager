// routes/tasks.js
const express = require("express");
const Task = require("../models/Task");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

// Create task
router.post("/", authMiddleware, async (req, res) => {
  const { title, description } = req.body;
  const task = new Task({ title, description, user: req.user.id });
  try {
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all tasks
router.get("/", authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get a task by ID
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user.id });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json(task);
  } catch (error) {
    console.error("Error fetching task:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Update a task by ID
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { title, description, completed } = req.body;
    const taskId = req.params.id;

    const updatedTask = await Task.findOneAndUpdate(
      { _id: taskId, user: req.user.id },
      { title, description, completed },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(updatedTask);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete a task by ID
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const deletedTask = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
