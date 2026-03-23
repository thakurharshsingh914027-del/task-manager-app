const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory database
let tasks = [];
let idCounter = 1;

// GET /tasks → Fetch all tasks
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// POST /tasks → Add new task
app.post("/tasks", (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }

  const newTask = {
    id: idCounter++,
    title,
    completed: false,
    createdAt: new Date(),
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

// PUT /tasks/:id → Update task
app.put("/tasks/:id", (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;

  const task = tasks.find((t) => t.id == id);

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  if (title !== undefined) task.title = title;
  if (completed !== undefined) task.completed = completed;

  res.json(task);
});

// DELETE /tasks/:id → Delete task
app.delete("/tasks/:id", (req, res) => {
  const { id } = req.params;

  const exists = tasks.some((t) => t.id == id);
  if (!exists) {
    return res.status(404).json({ message: "Task not found" });
  }

  tasks = tasks.filter((t) => t.id != id);

  res.json({ message: "Task deleted successfully" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});