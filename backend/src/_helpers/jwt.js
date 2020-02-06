import expressJwt from 'express-jwt'
import userService from '../services/user.service'
// eslint-disable-next-line
const config =  require('../../config')


async function isRevoked(req, payload, done) {
  const user = await userService.getById(payload.sub)
  // revoke token if user no longer exists
  if (!user) {
    return done(null, true)
  }

  return done()
}

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

export default jwt
