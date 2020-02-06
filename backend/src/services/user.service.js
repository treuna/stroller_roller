import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import db from '../_helpers/db'
// eslint-disable-next-line
const config =  require('../../config')

const { User } = db

async function authenticate({ username, password }) {
  const user = await User.findOne({ username })
  if (user && bcrypt.compareSync(password, user.hash)) {
    const { hash, ...userWithOutHash } = user.toObject()
    const token = jwt.sign({ sub: user.id }, config.SECRET)
    return { ...userWithOutHash, token }
  }
  throw new Error('Invalid password or something')
}

async function getAll() {
  return User.find().select('-hash')
}

async function getById(id) {
  return User.findById(id).select('-hash')
}

async function create(userParams) {
  // validate
  if (await User.findOne({ username: userParams.username })) {
    throw new Error(`Username "${userParams.username}" is already taken`)
  }

  const user = new User(userParams)

  // hash password
  if (userParams.password) {
    user.hash = bcrypt.hashSync(userParams.password, 10)
  }

  await user.save()
}

async function update(id, userParams) {
  const user = await User.findById(id)

  // validate
  if (!user) throw new Error('User not found')
  if (user.username !== userParams.username && await User.findOne({ username: userParams.username })) {
    throw new Error(`Username "${userParams.username}" is already taken`)
  }

  // hash password, if entered
  if (userParams.username) {
    // eslint-disable-next-line
    userParams.hash = bcrypt.hashSync(userParams.password, 10)
  }

  // copy userParams to user
  Object.assign(user, userParams)

  await user.save()
}

async function deleteById(id) {
  await User.findByIdAndRemove(id)
}

export default {
  authenticate,
  getAll,
  getById,
  create,
  update,
  deleteById
}
