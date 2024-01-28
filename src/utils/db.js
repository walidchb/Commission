import mongoose from 'mongoose'
require('dotenv').config()

const connect = async () => {
  let retries = 5
  while (retries) {
    try {
      await mongoose.connect(process.env.MONGO_URI, {})
      console.log('MongoDB connected')
      break
    } catch (error) {
      console.error('Error connecting to MongoDB:', error.message)
      retries -= 1
      console.log(`Retrying connection... ${retries} retries left.`)
      await new Promise(res => setTimeout(res, 5000)) // 5 seconds delay
    }
  }
}

// const connect = async () => {
//   if (mongoose.connections[0].readyState) return

//   try {
//     await mongoose.connect(
//       'mongodb+srv://walid_chb:Maman123@commission.w1lhmig.mongodb.net/com?retryWrites=true&w=majority'
//     )
//     console.log('Mongo Connection successfully established.')
//   } catch (error) {
//     throw new Error('Error connecting to Mongoose')
//   }
// }

export default connect
