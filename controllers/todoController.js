const express = require('express');
const mongoose = require('mongoose')
const todo = express.Router();
const Todo = require('../models/todo.js');

todo.get('/', (req, res) => {
  Todo.find({}, (err, foundTodos) => {
    res.json(foundTodos)
  })
})
todo.get('/:id', (req, res) => {
  Todo.findById(req.params.id, (err, foundTodo) => {
    res.json(foundTodo)
  })
})
todo.post('/', (req, res) => {
  Todo.create(req.body, (err, createTodo) => {
    Todo.find({}, (err, foundTodo) => {
      res.json(foundTodo)
    })
  })
})
todo.post('/:id', (req, res) => {
  // console.log(req.params);
  Todo.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedTodo) => {
    if(err){
      res.send(err)
    } else {
      console.log(updatedTodo);
      res.json(updatedTodo)
    }
  })
})
todo.delete('/:id', (req, res) => {
  Todo.findByIdAndRemove(req.params.id, (err, deleteTodo) => {
    Todo.find({}, (err, foundTodo) => {
      res.json(foundTodo)
    })
  })
})

module.exports = todo
