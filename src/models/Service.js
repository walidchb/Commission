import mongoose from 'mongoose'

const { Schema } = mongoose

const serviceSchema = new Schema(
  {
    nom: {
      type: String,
      unique: true,
      required: true
    },
    commission: {
      type: Number,
      required: true
    },
    createdAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
)

export default mongoose.models.Service ||
  mongoose.model('Service', serviceSchema)
