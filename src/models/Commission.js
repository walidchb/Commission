import mongoose from 'mongoose'
import serviceSchema from '@/models/Service'
import userSchema from '@/models/User'

const { Schema } = mongoose

const commissionSchema = new Schema(
  {
    serviceNom: {
      type: String,
      unique: false
    },
    servicePrix: {
      type: Number,
      unique: false
    },
    nomClient: {
      type: String,
      unique: false
    },
    prenomClient: {
      type: String,
      unique: false
    },
    numTelClient: {
      type: Number,
      unique: false
    },
    userEmail: {
      type: String,
      unique: false
    }
  },
  { timestamps: true }
)

export default mongoose.models.Commission ||
  mongoose.model('Commission', commissionSchema)
