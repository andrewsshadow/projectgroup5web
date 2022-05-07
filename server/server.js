const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors');
const app = express()

dotenv.config()

app.options('*', cors());

var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // For legacy browser support
}

app.use(cors(corsOptions));

//Init Middlewares

app.use(express.json({ extended: false }))


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

//connect to database 
mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost:27017/test')

let db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log("DB connected");
})


// define routes
app.use('/register', require('./routes/register'))
app.use('/auth', require('./routes/auth'))
app.use('/guests', require('./routes/guest'))

app.get('/', function (req, res) {
  res.send('API up')
})

app.listen(process.env.PORT || 5000)