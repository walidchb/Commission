'use client'
import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import Footer from './components/footer'
import './globals.css'
import NavBar from './components/navbar'
import Login from './components/Login'

export default function Home() {
  const router = useRouter()

  function handleClick(e) {
    router.push(`/pages/LoginPage?usertype=${e}`)
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
        </div>
      </div>
    </section>
  )
}
