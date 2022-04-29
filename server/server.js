const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

//Init Middlewares
app.use(express.json({ extended: false }))

//connect to database 
mongoose.connect(process.env.MONGODB_STRING)

let db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log("hemllo");
})


// define routes
app.use('/register', require('./routes/register'))
app.use('/auth', require('./routes/auth'))

app.get('/', function (req, res) {
  res.send('Hemllo World')
})

app.listen(5000)