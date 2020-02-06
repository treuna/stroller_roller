import mongoose from 'mongoose'

const { Schema } = mongoose

const Stroller = new Schema(
  {
    name: { type: String, required: false },
    manufacturer: { type: String, required: false },
    weight: { type: Number, required: false },
    price: { type: Number, required: false },
    maxNumberOfSeats: { type: Number, required: false },
    wheels: { type: String, required: false },
    length: { type: Number, required: false },
    depth: { type: Number, required: false },
    height: { type: Number, required: false },
    lengthFolded: { type: Number, required: false },
    depthFolded: { type: Number, required: false },
    heightFolded: { type: Number, required: false },
  },
  { timestamps: true },
)

Stroller.set('toJson', { virtuals: true })

export default mongoose.model('strollers', Stroller)
