const express = require('express')
const app = express()
const path = require('path')


//connect to database 


//Init Middlewares
app.use(express.json({ extended: false }))


// define routes
app.use('/register', require('./routes/register'))
app.use('/auth', require('./routes/auth'))

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(5000)