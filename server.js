const express = require('express');
const mongoose =require('mongoose');
const passport = require('passport')
const app = express();
require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = process.env.PORT || 3002;

//database
const MONGODB_URI = process.env.MONGODB_URI
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
})
// Error / success
mongoose.connection.on('error', err =>
  console.log(
    err.message,
    ' is Mongod not running?/Problem with Atlas Connection?'
  )
)
mongoose.connection.on('connected', () =>
  console.log('mongo connected: ', MONGODB_URI)
)
mongoose.connection.on('disconnected', () => console.log('mongo disconnected'))
mongoose.Promise = global.Promise;
require('./auth/auth')

const userModel = require('./models/user.js')

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


const petsController = require('./controllers/petsController.js');
app.use('/pets', petsController)
const todoController = require('./controllers/todoController.js');
app.use('/todos', todoController)
const authController = require('./controllers/authController.js')
app.use('/auth', authController)


const secureController = require('./controllers/secureRoutes.js')
app.use('/user', passport.authenticate('jwt', { session: false }), secureController)

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ error: err });
})





app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
