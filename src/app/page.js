'use client'
import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signIn, useSession } from 'next-auth/react'

import Footer from './components/footer'
import './globals.css'
import NavBar from './components/navbar'
import Login from './components/Login'

export default function Home() {
  const router = useRouter()
  const { data: session, status: sessionStatus } = useSession()

  function handleClick(e) {
    if (!session) {
      router.push(`/pages/LoginPage?usertype=${e}`)
    } else {
      const fetchData = async () => {
        try {
          const response = await fetch(
            `https://commissions-silamarketingagency.vercel.app/api/users?email=${session.user.email}`,
            {
              method: 'GET'
            }
          )

          if (!response.ok) {
            console.log(response)

            throw new Error('Failed to fetch data')
          }

          const data = await response.json()
          console.log(data.message.posteTrav)
          if (
            data.message.posteTrav != 'Human Resources Specialist' &&
            data.message.posteTrav != 'Ceo' &&
            sessionStatus === 'authenticated'
          ) {
            router.replace(`/pages/Employee`)
          } else if (
            data.message.posteTrav == 'Human Resources Specialist' &&
            sessionStatus === 'authenticated'
          ) {
            router.replace(`/pages/Rh`)
          } else {
            router.replace(`/pages/Rh`)
          }
        } catch (error) {
          console.log(error)
        }
      }
      console.log('object')
      fetchData()
    }
  }
  return (
    <section className='h-screen bg-white'>
      <NavBar title={'Gestion des commission'} />
      <div className='myContainer flex flex-col items-center justify-center '>
        <h1 className='mb-10 text-4xl text-black'>Je suis : </h1>
        <div className='flex w-5/6 items-center justify-around  text-black'>
          <button
            onClick={() => handleClick(1)}
            type='button'
            className='my-4 rounded border-b-4 border-violet-700 bg-violet-500 p-6 text-4xl font-bold text-white hover:border-violet-500 hover:bg-violet-400'
          >
            Employee
          </button>{' '}
          <button
            onClick={() => handleClick(2)}
            type='button'
            className='my-4 rounded border-b-4 border-violet-700 bg-violet-500 p-6 text-4xl font-bold text-white hover:border-violet-500 hover:bg-violet-400'
          >
            Recources Humain
          </button>
          <button
            onClick={() => handleClick(3)}
            type='button'
            className='my-4 rounded border-b-4 border-violet-700 bg-violet-500 p-6 text-4xl font-bold text-white hover:border-violet-500 hover:bg-violet-400'
          >
            Admin
          </button>
        </div>
      </div>
    </section>
  )
}
