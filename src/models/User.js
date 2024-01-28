import mongoose from 'mongoose'

const { Schema } = mongoose

const userSchema = new Schema(
  {
    nom: {
      type: String,
      unique: false,
      required: true
    },
    prenom: {
      type: String,
      unique: false,
      required: true
    },
    posteTrav: {
      type: String,
      unique: false,
      required: true
    },
    email: {
      type: String,
      unique: false,
      required: true
    },
    password: {
      type: String,
      unique: false,

      required: false
    }
  },
  { timestamps: true }
)

export default mongoose.models.User || mongoose.model('User', userSchema)
