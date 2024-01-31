'use client'
import React, { useEffect, useState } from 'react'
import './styles.css'
import { Formik } from 'formik'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

function Login({ title, userType }) {
  const router = useRouter()
  const { data: session, status: sessionStatus } = useSession()
  const [error, setErrorCred] = useState('')
  useEffect(() => {
    console.log('session')

    console.log(session)
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/users?email=${session.user.email}`, {
          method: 'GET'
        })

        if (!response.ok) {
          console.log(response)

          throw new Error('Failed to fetch data')
        }

        const data = await response.json()
        console.log(data.message.posteTrav)
        if (userType == 1 && sessionStatus === 'authenticated') {
          router.replace(`/pages/Employee`)
        } else if (userType == 2 && sessionStatus === 'authenticated') {
          router.replace(`/pages/Rh`)
        } else {
          router.replace(`/pages/Rh`)
        }
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }, [sessionStatus, router])
  return (
    <div className='myContainer flex items-center justify-center  text-black'>
      <div className='loginDiv flex w-5/12 flex-col items-center justify-center rounded-2xl p-12'>
        <h1 className='mb-4 text-4xl'>{title}</h1>

        <Formik
          className='w-5/6'
          initialValues={{ email: '', password: '' }}
          validate={values => {
            const errors = {}

            if (!values.email) {
              errors.email = 'Required'
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = 'Invalid email address'
            }

            return errors
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(async () => {
              // router.replace(`/pages/Rh`)

              // alert(JSON.stringify(values, null, 2))
              const res = await signIn('credentials', {
                userType: userType,
                redirect: false,
                email: values.email,
                password: values.password
              })

              if (res?.error) {
                setErrorCred('Invalid email or password')
                if (res?.url) router.replace('/')
              } else {
                console.log(res)
                console.log('success')
              }
              setSubmitting(false)
            }, 400)
          }}
        >
          {({
            values,

            errors,

            touched,

            handleChange,

            handleBlur,

            handleSubmit,

            isSubmitting

            /* and other goodies */
          }) => (
            <form
              className='flex w-5/6 flex-col items-center justify-center '
              onSubmit={handleSubmit}
            >
              <div className='w-full'>
                <p className='text-xl'>Email :</p>
                <input
                  className='input h-8 w-full rounded-2xl px-4'
                  type='email'
                  name='email'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />

                <p className='mb-4 text-red-500'>
                  {' '}
                  {errors.email && touched.email && errors.email}
                </p>
              </div>
              <div className='w-full'>
                <p className='text-xl'>Password :</p>
                <input
                  className='input h-8 w-full rounded-2xl px-4'
                  type='password'
                  name='password'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />

                <p className=' mb-4 text-red-500'>
                  {' '}
                  {errors.password && touched.password && errors.password}
                </p>
              </div>
              <button
                className='my-4 rounded border-b-4 border-violet-700 bg-violet-500 px-4 py-2 font-bold text-white hover:border-violet-500 hover:bg-violet-400'
                type='submit'
                disabled={isSubmitting}
              >
                Login
              </button>
              <p className=' mb-4 text-red-500'> {error}</p>
            </form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default Login
