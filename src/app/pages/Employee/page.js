'use client'
import { format, compareAsc, differenceInMonths } from 'date-fns'
import React, { useEffect, useState } from 'react'
import './styles.css'
import { useRouter } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import Select from 'react-select'

import NavBar from '../../components/navbar'
import { useFormik } from 'formik'
const { isSameMonth } = require('date-fns')
function Employee() {
  const router = useRouter()
  const { data: session } = useSession()

  // console.log(session)
  if (!session) {
    redirect('/')
  }
  const [showModal, setShowModal] = React.useState(false)

  const [commission, setCommission] = useState([])
  const [tousCommission, setTousCommission] = useState([])

  const months = [
    {
      label: 'January',
      number: '1'
    },
    {
      label: 'February',
      number: '2'
    },
    {
      label: 'March',
      number: '3'
    },
    {
      label: 'April',
      number: '4'
    },
    {
      label: 'May',
      number: '5'
    },
    {
      label: 'June',
      number: '6'
    },
    {
      label: 'July',
      number: '7'
    },
    {
      label: 'August',
      number: '8'
    },
    {
      label: 'September',
      number: '9'
    },
    {
      label: 'October',
      number: '10'
    },
    {
      label: 'November',
      number: '11'
    },
    {
      label: 'December',
      number: '12'
    }
  ]

  function sommeAttribut(tableau, attribut) {
    // Vérifier si le tableau est vide
    if (tableau?.length === 0) {
      return 0
    }

    // Utiliser la méthode reduce pour calculer la somme de l'attribut
    return tableau?.reduce((somme, objet) => somme + objet[attribut], 0)
  }

  function sommePoints(tableau) {
    // Vérifier si le tableau est vide
    if (tableau?.length === 0) {
      return 0
    }
    let points = 0
    tableau?.forEach(element => {
      if (element.servicePrix >= 3000) {
        points++
      }
    })

    // Utiliser la méthode reduce pour calculer la somme de l'attribut
    return points
  }
  function commissionPoints(tableau) {
    return sommePoints(tableau) >= 10 ? 5000 : 0
  }
  const formik = useFormik({
    initialValues: {
      service: {},
      nom: '',
      prenom: '',
      numeroTel: ''
    },

    onSubmit: async values => {
      try {
        const res = await fetch(
          'https://commissions-silamarketingagency.vercel.app/api/commission',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              serviceNom: values.service.label,
              servicePrix: values.service.value,
              nomClient: values.nom,
              prenomClient: values.prenom,
              numTelClient: values.numeroTel,
              userEmail: session?.user?.email
            })
          }
        )
        if (res.status === 400) {
          console.log('This commission is already exist')
        }
        if (res.status === 200) {
          setRefresh(!refresh)
          console.log('commission added up succesuly')
          setShowModal(false)
        }
      } catch (error) {
        console.log(error)
      }
      // alert(JSON.stringify(values, null, 2))
    }
  })
  const [refresh, setRefresh] = useState(false)
  const [paye, setPaye] = useState(false)

  const [elements, setElements] = useState({})
  const [error, setError] = useState(null)

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
        console.log('userrrrrrrrrrrrrr')

        console.log(data.message)
        setElements(data.message)
      } catch (error) {
        console.log('4')

        setError(error)
      }
    }

    fetchData()
  }, [])
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
        console.log('userrrrrrrrrrrrrr')

        console.log(data.message)
        setElements(data.message)
      } catch (error) {
        console.log('4')

        setError(error)
      }
    }

    fetchData()
  }, [refresh])

  const [services, setServices] = useState([])
  const [month, setMonth] = useState({})
  // console.log('moth' + month)
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

  useEffect(() => {
    const month = new Date().getMonth() + 1
    setMonth({
      label: months[month - 1].label,
      number: month.toString()
    })
  }, [])

  useEffect(() => {
    console.log('elements?.salaireValide')

    console.log(elements?.salaireValide)
    if (elements?.salaireValide != undefined) {
      setPaye(elements?.salaireValide[parseInt(month?.number - 1)])
    }
  }, [elements, month])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://commissions-silamarketingagency.vercel.app/api/commission?email=${session.user.email}`,
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
        console.log('data.message')

        console.log(data.message)

        // console.log(filterArrayByMonth(data.message, 1))
        setCommission(filterArrayByMonth(data.message, month?.number))
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }, [refresh, month])

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
      return format(item.createdAt, 'M').toString() === targetMonth
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
  return (
    <div className='min-h-screen bg-white text-black'>
      <NavBar
        display={true}
        userName={'walid'}
        userType={1}
        title={'Employee'}
      />

      <div className='mt-16 flex w-full flex-col items-center justify-center'>
        <div
          style={{ width: '75vw' }}
          className='  flex items-center justify-center px-10 '
        >
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
            <button
              className='my-4 rounded border-b-4 border-violet-700 bg-violet-500 px-4 py-2 font-bold text-white hover:border-violet-500 hover:bg-violet-400'
              type='submit'
              onClick={() => setShowModal(true)}
              // disabled={isSubmitting}
            >
              Add Commission
            </button>
          </div>
        </div>

        <div className='  flex items-center justify-center '>
          <div className=' relative  mb-8 overflow-x-auto shadow-md sm:rounded-lg'>
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
                {commission.map((ele, index) => (
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
                      <span className='text-green-600'>
                        {ele.servicePrix} DA{' '}
                      </span>
                    </td>
                    <td className='whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white'>
                      <a
                        onClick={() => {
                          const fetchData = async () => {
                            try {
                              console.log('1')
                              const response = await fetch(
                                `https://commissions-silamarketingagency.vercel.app/api/commission?id=${ele._id}`,
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
                              console.log('commission deleted')
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
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div
          style={{ width: '75vw' }}
          className='  flex flex-col items-center justify-center px-10 '
        >
          <div className='mb-8 flex  w-full  items-center justify-between  '>
            <h1 className='text-xl text-black'>
              Le salaire de ce mois :{' '}
              <span className='text-green-600'>{elements?.salaire} DA</span>
            </h1>
            <h1 className='text-xl text-black'>
              Le total de mes Commission dans ce mois :{' '}
              <span className='text-green-600'>
                {sommeAttribut(commission, 'servicePrix')} DA
              </span>
            </h1>
          </div>
          <div className='flex  w-full  items-center justify-between  '>
            <h1 className='text-xl text-black'>
              Le nombre de points de ce mois :{' '}
              <span className='text-green-600'>
                ({sommePoints(commission)}) - {commissionPoints(commission)} DA
              </span>
            </h1>
            <h1 className='rounded-md border bg-violet-200 p-4 text-center text-xl text-black shadow-lg'>
              Le total de ce mois :{' '}
              <span className='text-green-600'>
                {sommeAttribut(commission, 'servicePrix') +
                  elements?.salaire +
                  commissionPoints(commission)}{' '}
                DA
              </span>
              {paye ? (
                <p className='mb-2 me-2 rounded-lg bg-green-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'>
                  payé
                </p>
              ) : (
                <p class='mb-2 me-2 rounded-lg bg-red-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'>
                  nom payé
                </p>
              )}
            </h1>
          </div>
          {hasAtrip(tousCommission) ? (
            <div class='my-8 w-full rounded-lg bg-blue-500 p-6 text-center text-white shadow-lg'>
              <h2 class='mb-4 text-2xl font-bold'>Congratulations!</h2>
              <p class='text-lg'>You won a trip to Turkey</p>
            </div>
          ) : null}
        </div>
      </div>

      {showModal ? (
        <>
          <div className='fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none'>
            <div className='relative mx-auto my-6 w-auto max-w-3xl'>
              {/*content*/}
              <div className='relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none'>
                {/*header*/}
                <div className='border-blueGray-200 flex items-start justify-between rounded-t border-b border-solid p-5'>
                  <h3 className='text-3xl font-semibold'>
                    Ajouter une Commission
                  </h3>
                </div>
                {/*body*/}
                <div className=' flex w-full flex-col items-center justify-center rounded-2xl p-12'>
                  <form
                    className='flex w-5/6 flex-col items-center justify-center '
                    onSubmit={formik.handleSubmit}
                  >
                    <div className='w-full'>
                      <p className='text-xl'>Service :</p>
                      <Select
                        id='service'
                        name='service'
                        value={formik.values.service}
                        onChange={service =>
                          formik.setFieldValue('service', service)
                        }
                        options={transformArray(services)}
                      />
                    </div>
                    <h3 className='my-4'>Information de client</h3>
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
                      <p className='text-xl'>Numero de Tel :</p>
                      <input
                        className='input mb-2 h-8 w-full rounded-2xl px-4 '
                        type='number'
                        name='numeroTel'
                        onChange={formik.handleChange}
                        value={formik.values.numeroTel}
                      />
                    </div>
                    <button
                      className='my-4 rounded border-b-4 border-violet-700 bg-violet-500 px-4 py-2 font-bold text-white hover:border-violet-500 hover:bg-violet-400'
                      type='submit'
                    >
                      Add Commission
                    </button>
                  </form>
                </div>
                {/*footer*/}
                <div className='border-blueGray-200 flex items-center justify-end rounded-b border-t border-solid p-6'>
                  <button
                    className='background-transparent mb-1 mr-1 px-6 py-2 text-sm font-bold uppercase text-red-500 outline-none transition-all duration-150 ease-linear focus:outline-none'
                    type='button'
                    onClick={() => setShowModal(false)}
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

export default Employee
