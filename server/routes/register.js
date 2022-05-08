let express = require('express')
let jwt = require('jsonwebtoken')
let { validationResult, check } = require('express-validator')
let bcrypt = require('bcrypt')
let router = express.Router()
require('dotenv').config()

let User = require('../models/User.js')


router.post('/',
  [
    check('email', 'Please provide an email').isEmail(),
    check('name', 'Please provide a name').not().isEmpty(),
    check('password', 'Password at least 6 character long').isLength({ min: 6 })

  ],
  async (request, response) => {
    console.log("post sent")
    console.log(request.body)
    let errors = validationResult(request)
    if (!errors.isEmpty()) {
      return response.status(400).json({ error: errors.array() })
    }

    let {email, password,  name } = request.body

    try {

      let Datauser = await User.findOne({ email })
      if (Datauser) {
        return response.status(400).json({ error: [{ msg: 'This user is present already' }] })
      }
      Datauser = new User({email, password,  name })


      let salt = await bcrypt.genSalt(10)
      Datauser.password = await bcrypt.hash(password, salt)

      await Datauser.save()


      let passdata = {
        Datauser: {
          id: Datauser.id
        }
      }

      jwt.sign(passdata, process.env.JWT_SECRET, {
        expiresIn: 40000
      },
        (error, token) => {
          if (error) throw error
          response.json({ token })
        }
      )
    } catch (error) {
      response.status(500).send('error from server side')
    }
  })

  
module.exports = router