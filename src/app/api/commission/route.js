import Commission from '@/models/Commission'
import connect from '@/utils/db'
import { NextResponse } from 'next/server'

export const POST = async request => {
  const {
    serviceNom,
    servicePrix,
    nomClient,
    prenomClient,
    numTelClient,
    userEmail
  } = await request.json()

  await connect()

  const newCommission = new Commission({
    serviceNom,
    servicePrix,
    nomClient,
    prenomClient,
    numTelClient,
    userEmail
  })

  try {
    await newCommission.save()
    return new NextResponse('Commission is registered', { status: 200 })
  } catch (err) {
    console.log(err)
    return new NextResponse(err, {
      status: 500
    })
  }
}

export async function GET(request, { params }) {
  try {
    // connect to the database
    await connect()
    console.log('req')
    const email = request.nextUrl.searchParams.get('email')
    console.log(email)
    // fetch the Riders

    const elements = await Commission.find({ userEmail: email })
    console.log(elements)
    return NextResponse.json({
      message: elements,
      success: true
    })

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
    const _id = request.nextUrl.searchParams.get('id')
    // Deleting the Rider
    await Commission.deleteOne({ _id })
    // returning a message
    return NextResponse.json({
      message: 'Commission deleted successfully',
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
// export async function GET(request, { params }) {
//   try {
//     // connect to the database
//     await connect()
//     console.log('req')
//     // fetch the Riders

//     const elements = await Service.find({})
//     return NextResponse.json({
//       message: elements,
//       success: true
//     })

//     // console.log('res')

//     // console.log(elements)
//   } catch (error) {
//     console.log('error')
//     console.log(error)

//     // return the error
//     return NextResponse.json({
//       message: new Error(error).message,
//       success: false
//     })
//   }
// }

// export async function DELETE(request, { params }) {
//   try {
//     await connect()
//     console.log('req')
//     const nom = request.nextUrl.searchParams.get('nom')
//     // Deleting the Rider
//     await Service.deleteOne({ nom })
//     // returning a message
//     return NextResponse.json({
//       message: 'service deleted successfully',
//       success: true
//     })
//   } catch (error) {
//     // returning an error
//     return NextResponse.json({
//       message: new Error(error).message,
//       success: false
//     })
//   }
// }
