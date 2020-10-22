const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  todo_description: String,
  todo_responsible: String,
  todo_priority: String,
  todo_completed: {type: Boolean, default: false}
})

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo
