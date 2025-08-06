// backend/routes/tasks.js
const router = require("express").Router();
let Task = require("../models/Task");

// GET all tasks
router.route("/").get((req, res) => {
  Task.find()
    .then((tasks) => res.json(tasks))
    .catch((err) => res.status(400).json("Error: " + err));
});

// POST a new task
router.route("/add").post((req, res) => {
  const { name, description, dueDate } = req.body;
  const newTask = new Task({ name, description, dueDate });

  newTask
    .save()
    .then(() => res.json("Task added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

// GET a single task by ID
router.route("/:id").get((req, res) => {
  Task.findById(req.params.id)
    .then((task) => res.json(task))
    .catch((err) => res.status(400).json("Error: " + err));
});

// DELETE a task by ID
router.route("/:id").delete((req, res) => {
  Task.findByIdAndDelete(req.params.id)
    .then(() => res.json("Task deleted!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

// UPDATE a task by ID
router.route("/update/:id").post((req, res) => {
  Task.findById(req.params.id)
    .then((task) => {
      task.name = req.body.name || task.name;
      task.description = req.body.description || task.description;
      task.dueDate = req.body.dueDate || task.dueDate;
      task.status = req.body.status || task.status;

      task
        .save()
        .then(() => res.json("Task updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;

