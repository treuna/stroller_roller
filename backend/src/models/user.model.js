const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema(
  {
    username: { type: String, uniqie: true, required: true },
    hash: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  { timestamps: true},
)

User.set('toJson', { virtuals: true })

module.exports = mongoose.model('users', User)
