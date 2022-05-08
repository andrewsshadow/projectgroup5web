let express = require('express')
let jwt = require('jsonwebtoken')
let router = express.Router()
let { validationResult , check } = require('express-validator')
let bcrypt = require('bcrypt')
let auth = require('../middleware/auth.js')
let User = require('../models/User.js')

require('dotenv').config()


router.post('/',
  [
    check('password', 'Enter your password').exists(),
    check('email', 'Enter your emailId').isEmail()
  ],
  async (request, response) => {
    let errors = validationResult(request)
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() })
    }
    let { password, email } = request.body
    try {
      let DataUser = await User.findOne({ email })
      if (!DataUser) {
        return response.status(400).json({ msg: 'Wrong input' })
      }

      let isSame = await bcrypt.compare(password, user.password)

      if (!isSame) {
        return response.status(400).json({ msg: 'Wrong input' })
      }


      let passload = {
        user: { id: user.id}
      }

      jwt.sign(passload, process.env.JWT_SECRET, {
        expiresIn: 40000
      },
        (error, token) => {
          if (error) throw error
          response.json({ token })
        }
      )

    } catch (error) {
      response.status(500).send('Error from Server detected')
    }
  })


router.get('/', auth, async (request, response) => {
  try {
    let dataUser = await User.findById(request.user.id).select('-password')
    response.json(dataUser)
  } catch (error) {
    response.status(500).send('Error from Server detected ')
  }
})


module.exports = router