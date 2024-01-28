'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'
import './styles.css'
import { useRouter } from 'next/navigation'

import Logo from './components/logo'
import { useDispatch, useSelector } from 'react-redux'

function NavBar({ title, userName, userType }) {
  const router = useRouter()

  const { data: session } = useSession()
  const styles = {
    container: {
      height: '12vh',
      boxShadow:
        ' rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 0px 16px 0px'
    }
  }

  return (
    <div style={styles.container} className=' overflow-visible  bg-white '>
      <nav
        className='flex items-center justify-between px-10 lg:px-8'
        aria-label='Global'
      >
        <div className=' cursor-pointer '>
          <Logo textColor='white' />
        </div>
        <h1 className='text-center text-4xl text-black'>{title}</h1>
        {session ? (
          <div>
            <div className='dropdown'>
              <button className='dropbtn '>
                Hello, Walid <span>&#x22BD;</span>
              </button>
              <div className='dropdown-content'>
                <p>Poste : developer</p>
                <p
                  className=' cursor-pointer '
                  onClick={() => {
                    signOut()
                  }}
                >
                  Deconnection
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </nav>
    </div>
  )
}

export default NavBar
