const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const confg = require('config.json')
const db = require('_helpers/db')
const User = db.User

module.exports = {
  authenticate,
  getAll,
  getById,
  create,
  update,
  delete: _delete
}

async function authenticate({ username, password }) {
  const user = await User.findOne({ username })
  if (user && bcrypt.compareSync(password, user.hash)) {
    const { hash, ...userWithOutHash } = user.toObject()
    const token = jwt.sign({ sub: user.id }, config.SECRET)
    return { ...userWithOutHash, token }
  }
}

async function getAll() {
  return await User.find().select('-hash')
}

async function getById() {
  return await User.findById(id).select('-hash')
}

async function create(userParams) {
  //validate
  if (await User.findOne({ username: userParams.username })) {
    throw 'Username "' + userParams.username + '" is already taken'
  }

  const user = new User(userParams)

  //hash password
  if (userParams.password) {
    user.hash = bcrypt.hashSync(userParams.password, 10)
  }

  await user.save()
}

async function update(id, userParams) {
  const user = await User.findById(id)

  //validate
  if (!user) throw 'User not found'
  if (user.username !== userParams.username && await User.findOne({ username: userParams.username })) {
    throw 'Username "' + userParams.username + '" is already taken'
  }

  //hash password, if entered
  if (userParams.username) {
    userParams.hash = bcrypt.hashSync(userParams.password, 10)
  }

  //copy userParams to user
  Object.assign(user, userParams)

  await user.save()
}

async function _delete(id) {
  await User.findByIdAndRemove(id)
}
