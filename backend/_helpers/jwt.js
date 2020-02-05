const config = require('config.json')
const expressJwt = require('express-jwt')
const userService = require('../services/user.service')

module.exports = jwt

function jwt() {
  const secret = config.SECRET;
  return expressJwt({ secret, isRevoked }).unless({
    path: [
      // public routes that don't require authentication
      '/users/authenticate',
      '/users/register',
      '/strollers'
    ]
  })
}

async function isRevoked(req, payload, done) {
  const user = await userService.getById(payload.sub)
  // revoke token if user no longer exists
  if (!user) {
    return done(null, true)
  }

  done()
}
