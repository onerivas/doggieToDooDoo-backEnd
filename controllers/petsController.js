const express = require('express');
const mongoose = require('mongoose');
const pet = express.Router();
const Pet = require('../models/pet.js');
const Todo = require('../models/todo.js')

pet.get('/', (req, res) => {
  console.log(req.query);
  Pet.find({user:req.query}, (err, foundPets) => {
    res.json(foundPets)
  })
})
pet.get('/:id', (req, res) => {
  Pet.findById(req.params.id, (err, foundPet) => {
    res.json(foundPet)
  })
})
pet.post('/', (req, res) => {
  Pet.create(req.body, (err, createPet) => {
    Pet.find({}, (err, foundPet) => {
      res.json(foundPet)
    })
  })
})
// pet.post('/todos', (req, res) => {
//   Todo.create(req.body, (err, createdTodo) => {
//     Pet.findById(req.body.Pet_id, (err, foundPet) => {
//       foundPet.todos.push(createdTodo);
//       foundPet.save();
//       res.json(foundPet);
//     })
//   })
// })
pet.post('/:id', (req, res) => {
  Pet.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedPet) => {
    if (err) {
      res.send(err)
    } else {
      console.log(updatedPet);
      res.json(updatedPet)
    }
  })
})
pet.delete('/:id', (req, res) => {
  Pet.findByIdAndRemove(req.params.id, (err, deletedPet) => {
    Pet.find({}, (err, foundPets) => {
      res.json(foundPets)
    })
  })
})

module.exports = pet
