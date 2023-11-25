import React, { useEffect, useState } from 'react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'
import { API_URL } from '@/config/index'
import { toast } from 'react-toastify'
export default function RecruiterRegister({ token = '' }) {
  // @TODO: Fetch Companies from API
  const [recruiter, setRecruiter] = useState([])
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'company',
  })
  const { username, email, password, confirmPassword, role } = formData;
  const [recruiterId, setRecruiterId] = useState(null)
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      toast.error('Passwords do not match!')
      return
    }

    if (confirm('Are you sure you want to add this recruiter?')) {
      handleApprove(recruiterId)
      const res = await fetch(`${API_URL}/api/admin/register-with-role`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          password,
          role,
        }),
      })

      const data = await res.json()

      if (res.ok) {
        toast.success('Recruiter added successfully!')
        setFormData({
          ...formData,
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
        })
      } else {
        toast.error('Something went wrong!')
        setFormData({
          ...formData,
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
        })
      }
    }
  }

  const handleApprove = async (id) => {
    const res = await fetch(`${API_URL}/api/recruiters/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify({
        data: {
          approved: 'approved',
        },
      }),
    })
    // console.log("register=>",data)

    if (!res.ok) {
      toast.warning('Something Went Wrong 1!')
    } else {
      toast.success('Recruiter Approved')
    }
    fetchData()
  }
  const handleShowModal = (id) => {
    setShowModal(true);
    setRecruiterId(id)
  }


  const handleReject = async (id) => {
    const res = await fetch(`${API_URL}/api/recruiters/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify({
        data: {
          approved: 'rejected',
        },
      }),
    })

    // console.log("rejected=>",data)

    if (!res.ok) {
      toast.warning('Something Went Wrong 2!')
    } else {
      toast.info('Successfully Rejected')
    }
    fetchData()
  }

  const fetchData = async () => {
    const res = await fetch(
      `${API_URL}/api/recruiters?filters[approved][$eq]=pending&populate=*`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    )

    const data = await res.json()


    if (res.ok) {
      setRecruiter(data.data)
    } else {
      toast.warning('Something Went Wrong 3!')
    }
  }

  useEffect(() => {
    fetchData()
  }, [])
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  const [columnDefs] = useState([
    // {
    //   headerName: 'S.No.',
    //   valueGetter: 'node.rowIndex + 1',
    // },
    {
      headerName: 'Company',
      field: 'attributes.company',
      //   cellRenderer: function (params) {
      //     return (
      //       <Link href={`/admin/recruiters/${params.data.id}`}>
      //         <a>{params.value}</a>
      //       </Link>
      //     )
      //   },
    },
    // {
    //   headerName: 'Approval Status',
    //   field: 'attributes.status',
    // },
    {
      headerName: 'Recruiter Name',
      field: 'attributes.recruiter_name',
    },
    {
      headerName: 'Email',
      field: 'attributes.email',
    },
    {
      headerName: 'Contact No',
      field: 'attributes.contact_no',
    },
    {
      headerName: 'Register',
      field: 'id',
      cellRenderer: function (params) {
        return (
          <div>
            <button
              type='button'
              onClick={() => handleShowModal(params.value)}
              className='inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
            >
              Register
            </button>
          </div>
        )
      },
    },
    {
      headerName: 'Reject',
      field: 'id',
      cellRenderer: function (params) {
        return (
          <div>
            <button
              type='button'
              onClick={() => handleReject(params.value)}
              className='inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500'
            >
              Reject
            </button>
          </div>
        )
      },
    },
  ])
  return (
    <>
      <div className='md:flex md:items-center md:justify-between'>
        <div className='flex-1 min-w-0'>
          <h2 className='text-xl font-thin leading-7 text-gray-900 sm:text-2xl sm:truncate'>
            Recruiters
          </h2>
        </div>
      </div>
      <div className='ag-theme-alpine mt-4' style={{ height: 300 }}>
        <AgGridReact
          rowData={recruiter}
          columnDefs={columnDefs}
          domLayout='normal'
          defaultColDef={{ sortable: true }}
        ></AgGridReact>
      </div>
      {showModal ? (<>
        <div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none backdrop-blur-sm'>
          <form onSubmit={handleSubmit} className='backdrop-blur-md'>
            <div className='space-y-6 mt-4'>
              <div className='bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6'>
                <div className='md:grid md:grid-cols-3 md:gap-6'>
                  <div className='md:col-span-1'>
                    <h3 className='text-lg font-medium leading-6 text-gray-900'>
                      Recruiter Details
                    </h3>
                    <p className='mt-1 text-sm text-gray-500'>
                      Details about the recruiter
                    </p>
                  </div>
                  <div className='mt-5 md:mt-0 md:col-span-2'>
                    <div className='grid grid-cols-6 gap-6'>
                      <div className='col-span-6 sm:col-span-3'>
                        <label
                          htmlFor='username'
                          className='block text-sm font-medium text-gray-700'
                        >
                          Username
                        </label>
                        <input
                          value={username}
                          onChange={handleChange}
                          type='text'
                          name='username'
                          id='username'
                          autoComplete='username'
                          placeholder='Username used to login'
                          required
                          className='mt-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                        />
                      </div>
                      <div className='col-span-6 sm:col-span-3'>
                        <label
                          htmlFor='email'
                          className='block text-sm font-medium text-gray-700'
                        >
                          Email address
                        </label>
                        <input
                          value={email}
                          onChange={handleChange}
                          type='text'
                          name='email'
                          id='email'
                          autoComplete='email'
                          placeholder='Use email different than student email'
                          required
                          className='mt-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                        />
                      </div>

                      <div className='col-span-6 sm:col-span-3'>
                        <label
                          htmlFor='password'
                          className='block text-sm font-medium text-gray-700'
                        >
                          Password
                        </label>
                        <input
                          value={password}
                          onChange={handleChange}
                          type='password'
                          name='password'
                          id='password'
                          autoComplete='password'
                          required
                          className='mt-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                        />
                      </div>
                      <div className='col-span-6 sm:col-span-3'>
                        <label
                          htmlFor='confirmPassword'
                          className='block text-sm font-medium text-gray-700'
                        >
                          Confirm Password
                        </label>
                        <input
                          value={confirmPassword}
                          onChange={handleChange}
                          type='password'
                          name='confirmPassword'
                          id='confirmPassword'
                          autoComplete=''
                          required
                          className='mt-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='flex justify-end'>
                <button
                  type='submit'
                  className='ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
                >
                  Add
                </button>
                <button
                  type='button'
                  className='ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div> </>) : null}
    </>
  )
}
