const express = require('express')
const mongoose = require('mongoose')
const app = express()
const dotenv = require('dotenv')

dotenv.config()

app.use(express.json({ extended: false }))

mongoose.connect(process.env.MONGODB_STRING)

let db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log("hemllo");
})


app.use('/auth', require('./routes/auth'))
app.use('/register', require('./routes/register'))


app.get('/', function (req, res) {
  res.send('Hemllo World')
})


app.listen(5000)