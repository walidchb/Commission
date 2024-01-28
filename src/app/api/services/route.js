import Service from '@/models/Service'
import connect from '@/utils/db'
import { NextResponse } from 'next/server'

export const POST = async request => {
  const { nom, commission } = await request.json()

  await connect()

  const existingService = await Service.findOne({ nom })

  if (existingService) {
    return new NextResponse('Service is already in use', { status: 400 })
  }

  const newService = new Service({
    nom,
    commission
  })

  try {
    await newService.save()
    return new NextResponse('Service is registered', { status: 200 })
  } catch (err) {
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
    // fetch the Riders

    const elements = await Service.find({})
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
    const nom = request.nextUrl.searchParams.get('nom')
    // Deleting the Rider
    await Service.deleteOne({ nom })
    // returning a message
    return NextResponse.json({
      message: 'service deleted successfully',
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
