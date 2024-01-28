'use client'

import React, { useEffect, useState } from 'react'
import './styles.css'
import { useRouter } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import Select from 'react-select'

import NavBar from '../../components/NavBar'
import { useFormik } from 'formik'

function Employee() {
  const router = useRouter()
  const { data: session } = useSession()

  console.log(session)
  if (!session) {
    redirect('/')
  }
  const [showModal, setShowModal] = React.useState(false)

  const [commission, setCommission] = useState([])

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

  function sommeAttribut(tableau, attribut) {
    // Vérifier si le tableau est vide
    if (tableau.length === 0) {
      return 0
    }

    // Utiliser la méthode reduce pour calculer la somme de l'attribut
    return tableau.reduce((somme, objet) => somme + objet[attribut], 0)
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
        // alert(
        //   JSON.stringify({
        //     serviceNom: values.service.label,
        //     servicePrix: values.service.value,
        //     nom: values.nom,
        //     prenom: values.prenom,
        //     numeroTel: values.numeroTel,
        //     userId: elements[0]._id
        //   })
        // )
        const res = await fetch('/api/commission', {
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
        })
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
  const [elements, setElements] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('1')
        const response = await fetch(`/api/users?email:${session.user.email}`, {
          method: 'GET'
        })

        if (!response.ok) {
          console.log(response)

          throw new Error('Failed to fetch data')
        }
        console.log('3')

        const data = await response.json()
        console.log(data)
        setElements(data.message)
      } catch (error) {
        console.log('4')

        setError(error)
      }
    }

    fetchData()
  }, [refresh])

  const [services, setServices] = useState([])

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `/api/commission?email=${session.user.email}`,
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

    fetchData()
  }, [refresh])
  function transformArray(originalArray) {
    return originalArray.map(obj => {
      return {
        label: obj.nom,
        value: obj.commission
      }
    })
  }

  return (
    <div className='min-h-screen bg-white text-black'>
      <NavBar userName={'walid'} userType={1} title={'Employee'} />

      <div className='mt-16 flex w-full flex-col items-center justify-center'>
        <div
          style={{ width: '75vw' }}
          className='  flex items-center justify-between px-10 '
        >
          <h1 className='text-xl text-black'>
            Le total de mes Commission dans ce mois :{' '}
            <span className='text-green-600'>
              {sommeAttribut(commission, 'servicePrix')} DA
            </span>
          </h1>

          <div>
            <div className='dropdownE'>
              <button className='dropbtnE '>
                janvier <span>&#x22BD;</span>
              </button>
              <div className='dropdown-contentE'>
                {months.map(month => (
                  <a href='#'>{month.label}</a>
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
          <div className=' relative  mb-16 overflow-x-auto shadow-md sm:rounded-lg'>
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
                {commission.map((ele, index) => (
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
                                `/api/commission?id=${ele._id}`,
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
