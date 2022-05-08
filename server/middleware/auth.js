let jwt = require('jsonwebtoken')
require('dotenv').config()

let auth = (request, response, next) => {
  let jwtk = request.header('x-auth-token')

  if (!jwtk) {
    return response.status(401).json({ msg: 'Token not found, authorization unsuccessful' })
  }
  try {
    let check = jwt.verify(jwtk, process.env.JWT_SECRET)
    request.user = check.user
    next()

  } catch (error) {
    response.status(401).json(error)
  }
}

module.exports = auth