import User from '@/models/User'
import connect from '@/utils/db'
import bcrypt from 'bcryptjs'
import { NextResponse } from 'next/server'

export const POST = async request => {
  const { nom, prenom, salaire, posteTrav, email, password } =
    await request.json()

  await connect()

  // const existingUser = await User.findOne({ email })

  // if (existingUser) {
  //   return new NextResponse('Email is already in use', { status: 400 })
  // }

  const hashedPassword = await bcrypt.hash(password, 5)
  const newUser = new User({
    nom,
    prenom,
    salaire,
    posteTrav,
    email,
    password: hashedPassword,
    createdAt: new Date(),
    salaireValide: [
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false
    ],
    salaireAfterFrais: [
      salaire,
      salaire,
      salaire,
      salaire,
      salaire,
      salaire,
      salaire,
      salaire,
      salaire,
      salaire,
      salaire,
      salaire
    ]
  })

  try {
    console.log(newUser)
    // await User.insertOne(newUser)
    await newUser.save()
    return new NextResponse('user is registered', { status: 200 })
  } catch (err) {
    console.log(err)
    return new NextResponse(err, {
      status: 500
    })
  }
}
