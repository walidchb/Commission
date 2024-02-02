'use client'

import React, { useEffect, useState } from 'react'
import './styles.css'
import { useRouter } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import Select from 'react-select'
import { format, compareAsc, differenceInMonths } from 'date-fns'

import dotenv from 'dotenv'

// Load environment variables
dotenv.config()
import NavBar from '../../components/navbar'
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
  // console.log(session)

  if (!session) {
    redirect('/')
  }
  useEffect(() => {
    const month = new Date().getMonth() + 1
    setMonth({
      label: months[month - 1].label,
      number: month.toString()
    })
  }, [])
  const [showModal, setShowModal] = React.useState(false)
  const [refresh, setRefresh] = useState(false)
  const [user, setUser] = useState({})
  const [employee, setEmplyee] = useState('')

  const [month, setMonth] = useState({})
  const [paye, setPaye] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://commissions-silamarketingagency.vercel.app/api/users?email=${employee}`,
          {
            method: 'GET'
          }
        )

        if (!response.ok) {
          console.log(response)

          throw new Error('Failed to fetch data')
        }

        const data = await response.json()
        if (data?.message?.salaireValide != undefined) {
          setPaye(data?.message?.salaireValide[parseInt(month?.number - 1)])
        }
        //  setUser(data.message)
      } catch (error) {
        console.log(error)

        // setError(error)
      }
    }

    fetchData()
    console.log('elements?.salaireValide')

    console.log(user?.salaireValide)
  }, [refresh, employee, month])
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('1')
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
        console.log('3')

        const data = await response.json()
        console.log(data)
        setUser(data.message)
      } catch (error) {
        console.log(error)

        // setError(error)
      }
    }

    fetchData()
  }, [refresh])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://commissions-silamarketingagency.vercel.app/api/users?`,
          {
            method: 'GET'
          }
        )

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
        const response = await fetch(
          `https://commissions-silamarketingagency.vercel.app/api/services?`,
          {
            method: 'GET'
          }
        )

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
  const [tousCommission, setTousCommission] = useState([])
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
      const response = await fetch(
        `https://commissions-silamarketingagency.vercel.app/api/commission?email=${email}`,
        {
          method: 'GET'
        }
      )

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

  useEffect(() => {
    console.log('userrrrrrrrrrr')

    console.log(employee)
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://commissions-silamarketingagency.vercel.app/api/commission?email=${employee}`,
          {
            method: 'GET'
          }
        )

        if (!response.ok) {
          console.log(response)

          throw new Error('Failed to fetch data')
        }

        const data = await response.json()
        // console.log
        setTousCommission(data.message)
        // console.log(filterArrayByMonth(data.message, 1))
        console.log('data.message')

        console.log(data.message)
        setCommission(filterArrayByMonth(data.message, month.number))
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }, [refresh, month])

  useEffect(() => {
    console.log('commissions')

    console.log(commissions)
  }, [commissions])

  const [users, setUsers] = useState([])
  const [services, setServices] = useState([])

  const postesTrav = [
    { label: 'Ceo', value: 'Ceo' },
    { label: 'Developer', value: 'Developer' },
    {
      label: 'Human Resources Specialist',
      value: 'Human Resources Specialist'
    },
    { label: 'Photographer', value: 'Photographer' },
    { label: 'Editor', value: 'Editor' },
    { label: 'Designer', value: 'Designer' }
    // Add more job posts as needed
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
      salaire: '',
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
        console.log(
          process.env.API_URL +
            'https://commissions-silamarketingagency.vercel.app/api/register'
        )
        const res = await fetch(
          'https://commissions-silamarketingagency.vercel.apphttps://commissions-silamarketingagency.vercel.app/api/register',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              posteTrav: values.posteTrav.label,
              nom: values.nom,
              prenom: values.prenom,
              salaire: values.salaire,
              email: values.email,
              password: values.password
            })
          }
        )
        if (res.status === 400) {
          console.log('This email is already registered')
        }
        if (res.status === 200) {
          console.log('sign up succesuly')
          setRefresh(!refresh)
          ;(values.posteTrav = ''),
            (values.nom = ''),
            (values.prenom = ''),
            (values.salaire = ''),
            (values.email = ''),
            (values.password = '')
          setShowModalEmployees(false)
        }
      } catch (error) {
        console.log('thisssssssssssssssssss  error ')

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
        const res = await fetch(
          'https://commissions-silamarketingagency.vercel.app/api/services',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              nom: values.nom,
              commission: values.commission
            })
          }
        )
        if (res.status === 400) {
          console.log('This service is already exist')
        }
        if (res.status === 200) {
          setRefresh(!refresh)
          values.commission = ''
          values.nom = ''
          console.log('service added up succesuly')
        }
      } catch (error) {
        console.log(error)
      }
      // alert(JSON.stringify(values, null, 2))
    }
  })

  function transformArray(originalArray) {
    return originalArray.map(obj => {
      return {
        label: obj.nom,
        value: obj.commission
      }
    })
  }

  function filterArrayByMonth(array, targetMonth) {
    return array.filter(item => {
      return format(item.createdAt, 'M').toString() == targetMonth
    })
  }

  function hasAtrip(commissions) {
    let comHasPoits = []

    commissions?.forEach(element => {
      if (element.servicePrix >= 4000) {
        comHasPoits.push(element)
      }
    })
    commissions.sort(function (a, b) {
      return new Date(a.createdAt) - new Date(b.createdAt)
    })

    if (
      differenceInMonths(
        commissions[59]?.createdAt,
        commissions[0]?.createdAt
      ) <= 6
    ) {
      return true
    } else {
      return false
    }
  }
  function sommeAttribut(tableau, attribut) {
    // Vérifier si le tableau est vide
    if (tableau.length === 0) {
      return 0
    }

    // Utiliser la méthode reduce pour calculer la somme de l'attribut
    return tableau.reduce((somme, objet) => somme + objet[attribut], 0)
  }

  function sommePoints(tableau) {
    // Vérifier si le tableau est vide
    if (tableau.length === 0) {
      return 0
    }
    let points = 0
    tableau.forEach(element => {
      if (element.servicePrix >= 4000) {
        points++
      }
    })

    // Utiliser la méthode reduce pour calculer la somme de l'attribut
    return points
  }
  function commissionPoints(tableau) {
    return sommePoints(tableau) >= 10 ? 5000 : 0
  }
  return (
    <div className='min-h-screen bg-white text-black'>
      <NavBar display={true} userName={'walid'} title={'Recources Humaine'} />

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
                {users?.map((ele, index) => (
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
                          setEmplyee(ele.email)
                          // console.log(ele.email)
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
                                `https://commissions-silamarketingagency.vercel.app/api/users?email=${ele.email}`,
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
          {user?.posteTrav == 'Ceo' ? (
            <button
              className='my-4 rounded border-b-4 border-violet-700 bg-violet-500 px-4 py-2 font-bold text-white hover:border-violet-500 hover:bg-violet-400'
              type='submit'
              onClick={() => setShowModalEmployees(true)}
              // disabled={isSubmitting}
            >
              Add Employee{' '}
            </button>
          ) : null}
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
                                            `https://commissions-silamarketingagency.vercel.app/api/services?nom=${ele.nom}`,
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
                      <p className='text-xl'>Salaire :</p>
                      <input
                        className='input mb-2 h-8 w-full rounded-2xl px-4'
                        type='number'
                        name='salaire'
                        onChange={formik.handleChange}
                        value={formik.values.salaire}
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
                  <h3 className='text-3xl font-semibold'>Commissions</h3>
                </div>
                {/*body*/}
                <div
                  style={{ padding: 12, height: '50vh', overflowY: 'scroll' }}
                >
                  <div className='mb-4  flex items-center justify-center px-10 '>
                    <div>
                      <div className='dropdownE'>
                        <button className='dropbtnE '>
                          {month.label} <span>&#x22BD;</span>
                        </button>
                        <div className='dropdown-contentE'>
                          {months.map(month => (
                            <p
                              onClick={() => setMonth(month)}
                              className=' cursor-pointer'
                            >
                              {month.label}
                            </p>
                            // <a href='#'>{month.label}</a>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='  flex items-center justify-center '>
                    <div className=' relative   overflow-x-auto shadow-md sm:rounded-lg'>
                      <table className=' text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400'>
                        <thead className='bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400'>
                          <tr>
                            <th scope='col' className='px-6 py-3'>
                              Date
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
                                {format(ele.createdAt, 'yyyy-MM-dd HH:mm')}
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
                  <div className='mt-4  flex w-full flex-col items-center justify-around '>
                    <div className='mb-8 flex  w-full  items-center justify-between  '>
                      <h3 className='text-l text-black'>
                        Le salaire de ce mois :{' '}
                        <span className='text-green-600'>
                          {user?.salaire} DA
                        </span>
                      </h3>
                      <h3 className='text-l text-black'>
                        Le total de mes Commission dans ce mois :{' '}
                        <span className='text-green-600'>
                          {sommeAttribut(commissions, 'servicePrix')} DA
                        </span>
                      </h3>
                    </div>
                    <div className='flex  w-full  items-center justify-between  '>
                      <h3 className='text-l text-black'>
                        Le nombre de points de ce mois :{' '}
                        <span className='text-green-600'>
                          ({sommePoints(commissions)}) -{' '}
                          {commissionPoints(commissions)} DA
                        </span>
                      </h3>
                    </div>
                    {hasAtrip(tousCommission) ? (
                      <div class='my-8 w-full rounded-lg bg-blue-500 p-6 text-center text-white shadow-lg'>
                        <h2 class='mb-4 text-2xl font-bold'>
                          Congratulations!
                        </h2>
                        <p class='text-lg'>You won a trip to Turkey</p>
                      </div>
                    ) : null}
                  </div>
                </div>
                {/*footer*/}
                <div className=' border-blueGray-200 flex items-center justify-between rounded-b border-t border-solid p-6'>
                  <h3 className='text-l rounded-md border bg-violet-200 p-4 text-center text-black shadow-lg'>
                    Le total de ce mois :{' '}
                    <span className='text-green-600'>
                      {sommeAttribut(commissions, 'servicePrix') +
                        user?.salaire +
                        commissionPoints(commissions)}{' '}
                      DA
                    </span>
                    {paye ? (
                      <p className='mb-2 me-2 rounded-lg bg-green-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'>
                        payé
                      </p>
                    ) : (
                      <p
                        onClick={() => {
                          const fetchData = async () => {
                            try {
                              const response = await fetch(
                                `https://commissions-silamarketingagency.vercel.app/api/users?email=${employee}&month=${month.number - 1}`,
                                {
                                  method: 'PUT'
                                }
                              )

                              if (!response.ok) {
                                console.log(response)

                                throw new Error('Failed to fetch data')
                              }

                              const data = await response.json()
                              // console.log
                              //  setTousCommission(data.message)
                              // console.log(filterArrayByMonth(data.message, 1))
                              //  console.log('data.message')
                              setRefresh(!refresh)

                              console.log(data.message)
                              //  setCommission(
                              //    filterArrayByMonth(data.message, month.number)
                              //  )
                            } catch (error) {
                              console.log(error)
                            }
                          }

                          fetchData()
                          console.log('month.number')
                          console.log(employee)
                          console.log(month.number)
                        }}
                        class='mb-2 me-2 cursor-pointer rounded-lg bg-red-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'
                      >
                        non payé
                      </p>
                    )}
                  </h3>{' '}
                  <button
                    className='background-transparent mb-1 mr-1 px-6 py-2 text-sm font-bold uppercase text-red-500 outline-none transition-all duration-150 ease-linear focus:outline-none'
                    type='button'
                    onClick={() => {
                      const month = new Date().getMonth() + 1

                      setMonth({
                        label: months[month - 1].label,
                        number: month.toString()
                      })
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
