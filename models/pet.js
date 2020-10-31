const mongoose = require('mongoose');
const Todo = require('../models/todo.js');
const User = require('../models/user.js');

const petSchema = new mongoose.Schema({
  petName: {type: String, required: true},
  petTodos: [Todo.schema],
  user: String
});

const Pet = mongoose.model('Pet', petSchema);

module.exports = Pet;
