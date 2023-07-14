
/*

Company name

recuriter name

recuriter email Id

recuiter contact no


*/

import Image from 'next/image'
import {useState} from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { API_URL } from '@/config/index'
import { useRouter } from 'next/router'

import Link from 'next/link'

export default function SignUpRecuiter({ token = ''}) {

  const [values, setValues]= useState({
    company: '',
    recruiter_name: '',
    email: '',
    contact_no: '',
    approved: 'pending'
  })
  

  const router = useRouter()


  const handleSubmit = async (e) => {
    e.preventDefault()

    if (confirm('Are you sure you want to submit?')) {
      const res = await fetch(`${API_URL}/api/recruiters`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ data: values }),
      })
      console.log(JSON.stringify({ data: values }))


      if (!res.ok) {
        if (res.status === 403 || res.status === 401) {
          toast.error('No token included')
          return
        }
         
        console.log("xy")
        const profile = await res.json()
        // console.log(JSON.stringify(profile, null, 2))
        toast.error(profile?.error.name)
      } else {
        
        toast.success('Registered ! We Contact You Soon')

        console.log("yz")

        // const profile = await res.json()
        router.push(`/loginPage`)
      }
    }
}

const handleInputChange = (e) => {
  const { name, value } = e.target
  setValues({ ...values, [name]: value })
}

  return (
    <>
      <div className='min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-md'>
          <div className='mx-auto text-center'>
            <Image
              className='mx-auto'
              width={100}
              height={100}
              alt='NIT Patna'
              src='/images/logo.png'
            />
          </div>

          <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
            NIT Patna
          </h2>
          <h2 className='text-center font-extrabold text-3xl uppercase'>
            Placement Portal
          </h2>
          <p className='mt-2 text-center text-sm text-gray-600'>
          Let&apos;s get you registered Or{' '}
            <Link href='/'>
              <a className='font-medium text-indigo-600 hover:text-indigo-500'>
                Login
              </a>
            </Link>
          </p>
        </div>

        <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
          <div className='bg-gray-50 py-8 px-4 shadow sm:rounded-lg sm:px-10'>
            <form
              className='space-y-6'
              action='#'
              method='POST'
              onSubmit={handleSubmit}
            >

              <div>
                <label
                  htmlFor='username'
                  className='block text-sm font-medium text-gray-700'
                >
                  Company
                </label>
                <div className='mt-1'>
                  <input
                    value={values.company}
                    onChange={handleInputChange}
                    id='company'
                    name='company'
                    type='text'
                    autoComplete='company'
                    required
                    className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                    placeholder='Company Name'
                  />
                </div>
              </div>


              <div>
                <label
                  htmlFor='recruiter_name'
                  className='block text-sm font-medium text-gray-700'
                >
                  Recruiter&apos;s Name
                </label>
                <div className='mt-1'>
                  <input
                    value={values.recruiter_name}
                    onChange={handleInputChange}
                    id='recruiter_name'
                    name='recruiter_name'
                    type='text'
                    autoComplete='recruiter_name'
                    required
                    className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                    placeholder='Recruiter Name'
                  />
                </div>
              </div>



              <div>
                <label
                  htmlFor='contact_no'
                  className='block text-sm font-medium text-gray-700'
                >
                  Contact Number
                </label>
                <div className='mt-1'>
                  <input
                    value={values.contact_no}
                    onChange={handleInputChange}
                    id='contact_no'
                    name='contact_no'
                    type='number'
                    autoComplete='contact_no'
                    required
                    className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                    placeholder='Contact Number'
                  />
                </div>
              </div>



              <div>
                <label
                  htmlFor='email'
                  className='block text-sm font-medium text-gray-700'
                >
                  Email
                </label>
                <div className='mt-1'>
                  <input
                    value={values.email}
                    onChange={handleInputChange}
                    id='email'
                    name='email'
                    //  pattern='.+@nitp\.ac\.in'
                    type='email'
                    autoComplete='email'
                    required
                    className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                    placeholder='Official email address'
                  />
                </div>
              </div>

              <div>
                <button
                  type='submit'
                  className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

