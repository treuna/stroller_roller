import mongoose from 'mongoose'

const { Schema } = mongoose

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

export default mongoose.model('users', User)
