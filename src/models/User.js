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
      required: true
    },
    salaire: {
      type: Number,

      unique: false,
      required: true
    },
    salaireValide: {
      type: Array,

      unique: false,
      required: false
    },
    createdAt: { type: Date, default: Date.now }
  },

  { timestamps: true }
)

export default mongoose.models.User || mongoose.model('User', userSchema)
