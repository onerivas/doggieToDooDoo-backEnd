const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  todo_description: String,
  todo_completed: {type: Boolean, default: false},
  pet_id: {type: String, required: true}
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
