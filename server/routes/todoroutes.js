const express = require("express");
const Todo = require("../models/Todo");
const router = express.Router();

// Create To-Do
router.post("/new", async (req, res) => {
  try {
    const todo = await Todo.create(req.body);
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all To-Dos
router.get("/", async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

// Update To-Do
router.put("/:id", async (req, res) => {
  const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(todo);
});

// Delete To-Do
router.delete("/:id", async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;
