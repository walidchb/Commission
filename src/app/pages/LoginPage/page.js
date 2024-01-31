'use client'

import React, { useEffect } from 'react'
import './styles.css'
import { useRouter } from 'next/navigation'
import { usePathname, useSearchParams } from 'next/navigation'
import { Formik } from 'formik'
import Login from '../../components/Login'
import NavBar from '../../components/navbar'

function LoginPage({ title }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const search = searchParams.get('usertype')

  useEffect(() => {
    const url = `${pathname}?${searchParams}`
    console.log(url)
    console.log(search)
    // You can now use the current URL
    // ...
  }, [pathname, searchParams])

  return (
    <div className='bg-white'>
      <NavBar title={'Login'} />
      {/* <h1 className='text-black'>{router.query}</h1> */}
      <Login
        userType={search}
        title={
          search == 1
            ? 'Enployee Login'
            : search == 2
              ? 'RH Login'
              : 'Admin Login'
        }
      />
    </div>
  )
}

export default LoginPage
