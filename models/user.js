const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Pets = require('../models/pet.js')

const userSchema = new mongoose.Schema({
  email: {type: String, required: true, unique: true},
  password: {
    type: String, required: true
  },
  pets: [Pet.schema]
});

userSchema.pre(
  'save',
  async function(next) {
    const user = this;
    const hash = await bcrypt.hash(this.password, 10);
    console.log(user);

    this.password = hash;
    next();
  }
)
userSchema.methods.isValidPassword = async function(password){
  const user = this;
  const compare = await bcrypt.compare(password, user.password);

  return compare;
}


const User = mongoose.model('User', userSchema);

module.exports = User;
