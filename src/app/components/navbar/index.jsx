'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'
import './styles.css'
import { useRouter } from 'next/navigation'

import Logo from './components/logo'
import { useDispatch, useSelector } from 'react-redux'

function NavBar({ title, userName, userType, display }) {
  const router = useRouter()

  const { data: session } = useSession()
  const styles = {
    container: {
      height: '12vh',
      boxShadow:
        ' rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 0px 16px 0px'
    }
  }
  const [refresh, setRefresh] = useState(false)
  const [user, setUser] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://commissions-silamarketingagency.vercel.app/api/users?email=${session?.user?.email}`,
          {
            method: 'GET'
          }
        )

        if (!response.ok) {
          throw new Error('Failed to fetch data')
        }

        const data = await response.json()
        console.log('nav bar ')
        // console.log(data.message)

        setUser(data.message)
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }, [])

  return (
    <div
      style={styles.container}
      className=' min-w-full  overflow-visible bg-white'
    >
      <nav
        className='flex min-w-full items-center justify-between px-10 lg:px-8'
        aria-label='Global'
      >
        <div className=' cursor-pointer '>
          <Logo textColor='white' />
        </div>
        <h1 className='text-m hidden text-center text-black sm:block sm:text-4xl'>
          {user?.posteTrav == 'Ceo' ? 'Admin' : title}
        </h1>

        {session && display ? (
          <div>
            <div className='dropdown'>
              <button className='dropbtn '>
                Hello, {user?.prenom} <span>&#x22BD;</span>
              </button>
              <div className='dropdown-content'>
                <p>Poste : {user?.posteTrav}</p>
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
