const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')


//Init Middlewares
app.use(express.json({ extended: false }))

//connect to database 
mongoose.connect("mongodb+srv://sohomdas:Sohamdas123@cluster0.uoajq.mongodb.net/test")

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