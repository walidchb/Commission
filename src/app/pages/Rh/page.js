'use client'

import React, { useEffect, useState } from 'react'
import './styles.css'
import { useRouter } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import Select from 'react-select'

import NavBar from '../../components/navBar'
import { useFormik } from 'formik'

const isValidEmail = email => {
  // A simple email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

function isValidNumber(value) {
  // Check if the value is a number and not NaN
  return typeof value === 'number' && !isNaN(value)
}

function Rh() {
  const { data: session } = useSession()
  console.log(session)
  if (!session) {
    redirect('/')
  }
  const [showModal, setShowModal] = React.useState(false)
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/users?`, {
          method: 'GET'
        })

        if (!response.ok) {
          console.log(response)

          throw new Error('Failed to fetch data')
        }

        const data = await response.json()
        setUsers(data.message)
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }, [refresh])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/services?`, {
          method: 'GET'
        })

        if (!response.ok) {
          console.log(response)

          throw new Error('Failed to fetch data')
        }

        const data = await response.json()
        setServices(data.message)
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }, [refresh])

  const [showModalServices, setShowModalServices] = React.useState(false)
  const [showModalEmployees, setShowModalEmployees] = React.useState(false)
  const [showModalCommissions, setShowModalCommissions] = React.useState(false)
  const [commissions, setCommission] = useState([])
  function sommeAttribut(tableau, attribut) {
    // Vérifier si le tableau est vide
    if (tableau.length === 0) {
      return 0
    }

    // Utiliser la méthode reduce pour calculer la somme de l'attribut
    return tableau.reduce((somme, objet) => somme + objet[attribut], 0)
  }
  const fetchData = async email => {
    try {
      const response = await fetch(`/api/commission?email=${email}`, {
        method: 'GET'
      })

      if (!response.ok) {
        console.log(response)

        throw new Error('Failed to fetch data')
      }

      const data = await response.json()
      setCommission(data.message)
    } catch (error) {
      console.log(error)
    }
  }

  const [users, setUsers] = useState([])
  const [services, setServices] = useState([])

  const postesTrav = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' }
  ]
  const months = [
    {
      label: 'January',
      number: 1
    },
    {
      label: 'February',
      number: 2
    },
    {
      label: 'March',
      number: 3
    },
    {
      label: 'April',
      number: 4
    },
    {
      label: 'May',
      number: 5
    },
    {
      label: 'June',
      number: 6
    },
    {
      label: 'July',
      number: 7
    },
    {
      label: 'August',
      number: 8
    },
    {
      label: 'September',
      number: 9
    },
    {
      label: 'October',
      number: 10
    },
    {
      label: 'November',
      number: 11
    },
    {
      label: 'December',
      number: 12
    }
  ]

  const formik = useFormik({
    initialValues: {
      posteTrav: '',
      nom: '',
      prenom: '',
      email: '',
      password: ''
    },

    validate: values => {
      const errors = {}

      // Example validation logic
      if (!values.email) {
        errors.email = 'Email is required'
      } else if (!isValidEmail(values.email)) {
        errors.email = 'Invalid email address'
      }

      if (!values.password) {
        errors.password = 'Password is required'
      } else if (values.password.length < 6) {
        errors.password = 'Password must be at least 6 characters long'
      }

      return errors
    },

    onSubmit: async values => {
      try {
        const res = await fetch('/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            posteTrav: values.posteTrav.label,
            nom: values.nom,
            prenom: values.prenom,
            email: values.email,
            password: values.password
          })
        })
        if (res.status === 400) {
          console.log('This email is already registered')
        }
        if (res.status === 200) {
          console.log('sign up succesuly')
          setRefresh(!refresh)
          setShowModalEmployees(false)
        }
      } catch (error) {
        console.log(error)
      }
      // alert(JSON.stringify(values, null, 2))
    }
  })

  const formikS = useFormik({
    initialValues: {
      nom: '',
      commission: ''
    },

    validate: values => {
      const errors = {}
      if (!values.commission) {
        errors.commission = 'commission is required'
      } else if (!isValidNumber(values.commission)) {
        errors.commission = 'Invalid commission '
      }

      return errors
    },

    onSubmit: async values => {
      try {
        const res = await fetch('/api/services', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            nom: values.nom,
            commission: values.commission
          })
        })
        if (res.status === 400) {
          console.log('This service is already exist')
        }
        if (res.status === 200) {
          setRefresh(!refresh)
          console.log('service added up succesuly')
        }
      } catch (error) {
        console.log(error)
      }
      // alert(JSON.stringify(values, null, 2))
    }
  })
  return (
    <div className='min-h-screen bg-white text-black'>
      <NavBar userName={'walid'} title={'Recources Humaine'} />

      <div className='mt-16 flex w-full flex-col items-center justify-center'>
        <div
          style={{ width: '75vw' }}
          className='  flex items-center justify-between px-10 '
        >
          <h1 className='mb-4 text-xl text-black'>Our employees :</h1>

          <div></div>
        </div>

        <div className=' flex items-center justify-center '>
          <div className=' relative  mb-6 overflow-x-auto shadow-md sm:rounded-lg'>
            <table className=' text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400'>
              <thead className='bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400'>
                <tr>
                  <th scope='col' className='px-6 py-3'>
                    Nom
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Prenom
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Post de travail{' '}
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Commissions
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((ele, index) => (
                  <tr
                    key={ele.id}
                    className='border-b bg-white dark:border-gray-700 dark:bg-gray-800'
                  >
                    <td
                      scope='row'
                      className='whitespace-nowrap whitespace-nowrap px-6 py-4 font-medium font-medium text-gray-900 text-gray-900 dark:text-white dark:text-white'
                    >
                      {ele.nom}
                    </td>
                    <td className='whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white'>
                      {ele.prenom}
                    </td>
                    <td className='whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white'>
                      {ele.posteTrav}
                    </td>
                    <td className='whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white'>
                      <a
                        onClick={() => {
                          console.log(ele.email)
                          fetchData(ele.email)
                          setShowModalCommissions(true)
                        }}
                        className=' cursor-pointer font-medium text-blue-600 hover:underline dark:text-blue-500'
                      >
                        Voir tous
                      </a>
                    </td>
                    <td className='whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white'>
                      <a
                        onClick={() => {
                          const fetchData = async () => {
                            try {
                              console.log('1')
                              const response = await fetch(
                                `/api/users?email=${ele.email}`,
                                {
                                  method: 'DELETE'
                                }
                              )

                              if (!response.ok) {
                                console.log(response)

                                throw new Error('Failed to fetch data')
                              }
                              console.log('3')

                              const data = await response.json()
                              console.log('user deleted')
                              setRefresh(!refresh)
                            } catch (error) {
                              console.log('4')

                              console.log(error)
                            }
                          }

                          fetchData()
                        }}
                        href='#'
                        className='font-medium text-blue-600 hover:underline dark:text-blue-500'
                      >
                        Supprimer
                      </a>{' '}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className=' mb-16 flex w-5/6 items-center justify-around'>
          <button
            className='my-4 rounded border-b-4 border-violet-700 bg-violet-500 px-4 py-2 font-bold text-white hover:border-violet-500 hover:bg-violet-400'
            type='submit'
            onClick={() => setShowModalServices(true)}
            // disabled={isSubmitting}
          >
            Add Service
          </button>
          <button
            className='my-4 rounded border-b-4 border-violet-700 bg-violet-500 px-4 py-2 font-bold text-white hover:border-violet-500 hover:bg-violet-400'
            type='submit'
            onClick={() => setShowModalEmployees(true)}
            // disabled={isSubmitting}
          >
            Add Employee{' '}
          </button>
        </div>
      </div>

      {showModalServices ? (
        <div>
          <div className='fixed inset-0  z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none'>
            <div className='relative mx-auto my-6 w-auto max-w-3xl'>
              {/*content*/}
              <div className='relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none'>
                {/*header*/}
                <div className='border-blueGray-200 flex items-start justify-between rounded-t border-b border-solid p-5'>
                  <h3 className='text-3xl font-semibold'>Ajouter un Service</h3>
                </div>
                {/*body*/}
                <div
                  style={{ padding: 12, height: '50vh' }}
                  className='flex w-full  items-center justify-center'
                >
                  <div className=' flex w-full flex-col items-center justify-center rounded-2xl p-12'>
                    <form
                      className='flex w-5/6 flex-col items-center justify-center '
                      onSubmit={formikS.handleSubmit}
                    >
                      <div className='w-full'>
                        <p className='text-xl'>Nom Service:</p>
                        <input
                          className='input mb-2 h-8 w-full rounded-2xl px-4'
                          type='text'
                          name='nom'
                          onChange={formikS.handleChange}
                          value={formikS.values.nom}
                        />
                      </div>
                      <div className='w-full'>
                        <p className='text-xl'>Commission :</p>
                        <input
                          className='input mb-2 h-8 w-full rounded-2xl px-4'
                          type='number'
                          name='commission'
                          onChange={formikS.handleChange}
                          value={formikS.values.commission}
                        />
                      </div>
                      <p className='mb-4 text-red-500'>
                        {' '}
                        {formikS.errors.commission &&
                          formikS.touched.commission &&
                          formikS.errors.commission}
                      </p>
                      <button
                        className='my-4 rounded border-b-4 border-violet-700 bg-violet-500 px-4 py-2 font-bold text-white hover:border-violet-500 hover:bg-violet-400'
                        type='submit'
                      >
                        Add Service
                      </button>
                    </form>
                  </div>
                  <div
                    style={{ padding: 12, height: '50vh', overflowY: 'scroll' }}
                  >
                    <div className=' flex items-center justify-center '>
                      <div className=' relative  mb-6 overflow-x-auto shadow-md sm:rounded-lg'>
                        <table className=' text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400'>
                          <thead className='bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400'>
                            <tr>
                              <th scope='col' className='px-6 py-3'>
                                Service
                              </th>

                              <th scope='col' className='px-6 py-3'>
                                Action
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {services.map(ele => (
                              <tr
                                key={ele.id}
                                className='border-b bg-white dark:border-gray-700 dark:bg-gray-800'
                              >
                                <td
                                  scope='row'
                                  className='whitespace-nowrap whitespace-nowrap px-6 py-4 font-medium font-medium text-gray-900 text-gray-900 dark:text-white dark:text-white'
                                >
                                  {ele.nom} /{' '}
                                  <span className='text-green-600'>
                                    {ele.commission} DA
                                  </span>
                                </td>

                                <td className='whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white'>
                                  <a
                                    onClick={() => {
                                      const fetchData = async () => {
                                        try {
                                          console.log('1')
                                          const response = await fetch(
                                            `/api/services?nom=${ele.nom}`,
                                            {
                                              method: 'DELETE'
                                            }
                                          )

                                          if (!response.ok) {
                                            console.log(response)

                                            throw new Error(
                                              'Failed to fetch data'
                                            )
                                          }
                                          console.log('3')

                                          const data = await response.json()
                                          console.log('service deleted')
                                          setRefresh(!refresh)
                                        } catch (error) {
                                          console.log('4')

                                          console.log(error)
                                        }
                                      }

                                      fetchData()
                                    }}
                                    href='#'
                                    className='font-medium text-blue-600 hover:underline dark:text-blue-500'
                                  >
                                    Supprimer
                                  </a>{' '}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                {/*footer*/}
                <div className='border-blueGray-200 flex items-center justify-end rounded-b border-t border-solid p-6'>
                  <button
                    className='background-transparent mb-1 mr-1 px-6 py-2 text-sm font-bold uppercase text-red-500 outline-none transition-all duration-150 ease-linear focus:outline-none'
                    type='button'
                    onClick={() => setShowModalServices(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className='fixed inset-0 z-40 bg-black opacity-25'></div>
        </div>
      ) : null}
      {showModalEmployees ? (
        <>
          <div className='fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none'>
            <div className='relative mx-auto my-6 w-auto max-w-3xl'>
              {/*content*/}
              <div className='relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none'>
                {/*header*/}
                <div className='border-blueGray-200 flex items-start justify-between rounded-t border-b border-solid p-5'>
                  <h3 className='text-3xl font-semibold'>
                    Ajouter un Employee
                  </h3>
                </div>
                {/*body*/}
                <div className=' flex w-full flex-col items-center justify-center rounded-2xl p-12'>
                  <form
                    className='flex w-5/6 flex-col items-center justify-center '
                    onSubmit={formik.handleSubmit}
                  >
                    <div className='w-full'>
                      <p className='text-xl'>Poste de travail :</p>
                      <Select
                        id='posteTrav'
                        name='posteTrav'
                        value={formik.values.posteTrav}
                        onChange={posteTrav =>
                          formik.setFieldValue('posteTrav', posteTrav)
                        }
                        options={postesTrav}
                      />
                    </div>
                    <h3 className='my-4'>Information de l'employee</h3>
                    <div className='w-full'>
                      <p className='text-xl'>Nom :</p>
                      <input
                        className='input mb-2 h-8 w-full rounded-2xl px-4'
                        type='text'
                        name='nom'
                        onChange={formik.handleChange}
                        value={formik.values.nom}
                      />
                    </div>
                    <div className='w-full'>
                      <p className='text-xl'>Prenom :</p>
                      <input
                        className='input mb-2 h-8 w-full rounded-2xl px-4'
                        type='text'
                        name='prenom'
                        onChange={formik.handleChange}
                        value={formik.values.prenom}
                      />
                    </div>
                    <div className='w-full'>
                      <p className='text-xl'>email :</p>
                      <input
                        className='input mb-2 h-8 w-full rounded-2xl px-4 '
                        type='email'
                        name='email'
                        onChange={formik.handleChange}
                        value={formik.values.email}
                      />
                    </div>
                    <p className='mb-4 text-red-500'>
                      {' '}
                      {formik.errors.email &&
                        formik.touched.email &&
                        formik.errors.email}
                    </p>
                    <div className='w-full'>
                      <p className='text-xl'>password :</p>
                      <input
                        className='input mb-2 h-8 w-full rounded-2xl px-4 '
                        type='password'
                        name='password'
                        onChange={formik.handleChange}
                        value={formik.values.password}
                      />
                    </div>
                    <p className=' mb-4 text-red-500'>
                      {' '}
                      {formik.errors.password &&
                        formik.touched.password &&
                        formik.errors.password}
                    </p>
                    <button
                      className='my-4 rounded border-b-4 border-violet-700 bg-violet-500 px-4 py-2 font-bold text-white hover:border-violet-500 hover:bg-violet-400'
                      type='submit'
                    >
                      Add Employee
                    </button>
                  </form>
                </div>
                {/*footer*/}
                <div className='border-blueGray-200 flex items-center justify-end rounded-b border-t border-solid p-6'>
                  <button
                    className='background-transparent mb-1 mr-1 px-6 py-2 text-sm font-bold uppercase text-red-500 outline-none transition-all duration-150 ease-linear focus:outline-none'
                    type='button'
                    onClick={() => setShowModalEmployees(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className='fixed inset-0 z-40 bg-black opacity-25'></div>
        </>
      ) : null}
      {showModalCommissions ? (
        <>
          <div className='fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none'>
            <div className='relative mx-auto my-6 w-auto max-w-3xl'>
              {/*content*/}
              <div className='relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none'>
                {/*header*/}
                <div className='border-blueGray-200 flex items-start justify-center rounded-t border-b border-solid p-5'>
                  <h3 className='text-3xl font-semibold'>
                    Commissions de walid chebbab
                  </h3>
                </div>
                {/*body*/}
                <div
                  style={{ padding: 12, height: '50vh', overflowY: 'scroll' }}
                >
                  {/* <div className='dropdownE pb-4'>
                    <button className='dropbtnE '>
                      janvier <span>&#x22BD;</span>
                    </button>
                    <div className='dropdown-contentE'>
                      {months.map(month, index => (
                        <a href='#' key={index}>
                          {month.label}
                        </a>
                      ))}
                    </div>
                  </div> */}
                  <div className='  flex items-center justify-center '>
                    <div className=' relative   overflow-x-auto shadow-md sm:rounded-lg'>
                      <table className=' text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400'>
                        <thead className='bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400'>
                          <tr>
                            <th scope='col' className='px-6 py-3'>
                              Nombre
                            </th>
                            <th scope='col' className='px-6 py-3'>
                              Service
                            </th>
                            <th scope='col' className='px-6 py-3'>
                              Info de Client
                            </th>
                            <th scope='col' className='px-6 py-3'>
                              Commission
                            </th>
                            <th scope='col' className='px-6 py-3'>
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {commissions.map((ele, index) => (
                            <tr
                              key={ele.id}
                              className='border-b bg-white dark:border-gray-700 dark:bg-gray-800'
                            >
                              <td
                                scope='row'
                                className='whitespace-nowrap whitespace-nowrap px-6 py-4 font-medium font-medium text-gray-900 text-gray-900 dark:text-white dark:text-white'
                              >
                                {index + 1}
                              </td>
                              <td className='whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white'>
                                {ele.serviceNom}
                              </td>
                              <td className='whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white'>
                                {ele.nomClient} {ele.prenomClient}
                              </td>
                              <td className='whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white'>
                                {ele.servicePrix} DA
                              </td>
                              <td className='whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white'>
                                <a
                                  href='#'
                                  className='font-medium text-blue-600 hover:underline dark:text-blue-500'
                                >
                                  Supprimer
                                </a>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                {/*footer*/}
                <div className='border-blueGray-200 flex items-center justify-between rounded-b border-t border-solid p-6'>
                  total de Commissions :{' '}
                  {sommeAttribut(commissions, 'servicePrix')} DA
                  <button
                    className='background-transparent mb-1 mr-1 px-6 py-2 text-sm font-bold uppercase text-red-500 outline-none transition-all duration-150 ease-linear focus:outline-none'
                    type='button'
                    onClick={() => {
                      setCommission([])
                      setShowModalCommissions(false)
                    }}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className='fixed inset-0 z-40 bg-black opacity-25'></div>
        </>
      ) : null}
    </div>
  )
}

export default Rh
