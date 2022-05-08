let mongoose = require('mongoose')

let guestmodel = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  phone: {
    type: String,
    required: true,
  },
  isconfirmed: {
    type: Boolean,
    default: false
  },
  diet: {
    type: String,
    default: 'Non-Veg'
  }  
})

module.exports = mongoose.model('guest', guestmodel)