let express = require('express')
let { validationResult, check } = require('express-validator')
let Guest = require('../models/Guest.js')
let router = express.Router()
let auth = require('../middleware/auth.js')





router.get('/', auth, async (request, response) => {
  try {
    let guests = await Guest.find({ user: request.user.id })
    response.json(guests)
  } catch (error) {
    response.status(500).send('Error from server')
  }
})



router.post('/',
  [
    auth,
    [
      check('phone', 'Enter phone number please').not().isEmpty(),
      check('name', 'Enter name please').not().isEmpty()
    ]
  ],
  async (request, response) => {
    let errors = validationResult(request)
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() })
    }

    let { phone, isconfirmed, diet, name } = request.body

    try {
      let newGuest = new Guest({
        phone,
        name,
        diet,
        user: request.user.id,
        isconfirmed
      })

      let detailGuest = await newGuest.save()

      response.json(detailGuest)

    } catch (error) {
      response.status(500).send('error from server detected')
    }
  })



  router.delete('/:id', auth, async (request, response) => {
    try {
      let detailGuest = await Guest.findById(request.params.id)
      if (!detailGuest) return response.status(404).json({ msg: 'No guest found' })
  
      if (detailGuest.user.toString() !== request.user.id) {
        return response.status(401).json({ msg: 'Authorizaation failed' })
      }
      await Guest.findByIdAndRemove(request.params.id)
      response.send('Data deleted from records')
    } catch (error) {
      response.status(500).send('Error from server')
    }
  })


router.put('/:id', auth, async (request, response) => {
  let { phone, isconfirmed,  diet, name } = request.body


  let visitorDetais = { phone, isconfirmed,  diet, name }

  try {
    let detailGuest = await Guest.findById(request.params.id)
    if (!detailGuest) return response.status(404).json({ msg: ' No guest found' })

    if (detailGuest.user.toString() !== request.user.id) {
      return response.status(401).json({ msg: 'authorization failed' })
    }
    detailGuest = await Guest.findByIdAndUpdate(request.params.id, { $set: visitorDetais }, { new: true })
    response.send(detailGuest)
  } catch (error) {
    response.status(500).send('Error from server')
  }
})





module.exports = router