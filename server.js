const express = require('express');
const mongoose =require('mongoose');
const app = express();
require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = process.env.PORT;

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

app.use(cors());
app.use(express.json())

const todoController = require('./controllers/todoController.js');
app.use('/todos', todoController)

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
