const mongoose = require('mongoose');
const Todo = require('../models/todo.js')

const petSchema = new mongoose.Schema({
  petName: {type: String, required: true},
  petTodos: [Todo.schema]
});

const Pet = mongoose.model('Pet', petSchema);

module.exports = Pet;
