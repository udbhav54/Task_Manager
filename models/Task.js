// backend/models/Task.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    dueDate: { type: Date },
    status: { type: String, default: "pending" }, // e.g., 'pending', 'completed'
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
