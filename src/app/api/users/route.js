// const { connect } = require('../../lib/mongodb')
import connect from '@/utils/db'
import User from '@/models/User'
import { NextResponse } from 'next/server'
// export async function handler(req, res) {
//   // switch the methods
//   switch (req.method) {
//     case 'GET': {
//       return getUsers(req, res)
//     }

//     case 'PATCH': {
//       return updateClient(req, res)
//     }
//     case 'DELETE': {
//       return deleteClient(req, res)
//     }
//   }
// }

export async function GET(request, { params }) {
  try {
    // connect to the database
    await connect()
    console.log('req')
    const email = request.nextUrl.searchParams.get('email')
    // fetch the Riders
    if (email) {
      const elements = await User.findOne({ email: email })

      return NextResponse.json({
        message: elements,
        success: true
      })
    } else {
      const elements = await User.find({})
      return NextResponse.json({
        message: elements,
        success: true
      })
    }
    // console.log('res')

    // console.log(elements)
  } catch (error) {
    console.log('error')
    console.log(error)

    // return the error
    return NextResponse.json({
      message: new Error(error).message,
      success: false
    })
  }
}

export async function DELETE(request, { params }) {
  try {
    await connect()
    console.log('req')
    const email = request.nextUrl.searchParams.get('email')
    console.log(email)
    // Deleting the Rider
    await User.deleteOne({ email: email })
    // returning a message
    return NextResponse.json({
      message: 'user deleted successfully',
      success: true
    })
  } catch (error) {
    // returning an error
    return NextResponse.json({
      message: new Error(error).message,
      success: false
    })
  }
}
// async function updateClient(req, res) {
//   try {
//     const session = await getSession({ req: req })

//     if (!session) {
//       res.status(401).json({ message: 'Not authenticated!' })
//       return
//     }

//     const userEmail = session.user.email
//     const oldPassword = req.body.oldPassword
//     const newPassword = req.body.newPassword

//     // connect to the database
//     let { db, client } = await connectToDatabase()

//     const rider = await db.collection('clients').findOne({ email: userEmail })
//     if (!rider) {
//       res.status(404).json({ message: 'User not found.' })
//       client.close()
//       return
//     }

//     //Check if the old password is correct
//     const currentPassword = rider.password
//     const passwordsAreEqual = await verifyPassword(oldPassword, currentPassword)

//     if (!passwordsAreEqual) {
//       res.status(403).json({ message: 'Invalid password.' })
//       client.close()
//       return
//     }

//     // update the published status of the Rider
//     const hashedPassword = await hashPassword(newPassword)

//     const result = await db
//       .collection('clients')
//       .updateOne({ email: userEmail }, { $set: { password: hashedPassword } })

//     client.close()
//     res.status(200).json({ message: 'Password updated!' })
//   } catch (error) {
//     // return an error
//     return res.json({
//       message: new Error(error).message,
//       success: false
//     })
//   }
// }

// async function deleteClient(req, res) {
//   try {
//     // Connecting to the database
//     let { db } = await connectToDatabase()

//     // Deleting the Rider
//     await db.collection('clients').deleteOne({})

//     // returning a message
//     return res.json({
//       message: 'Rider deleted successfully',
//       success: true
//     })
//   } catch (error) {
//     // returning an error
//     return res.json({
//       message: new Error(error).message,
//       success: false
//     })
//   }
// }
