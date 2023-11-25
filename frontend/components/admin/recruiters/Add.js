// import Image from 'next/image'
// import AuthContext from '@/context/AuthContext'
import { useContext, useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// import Link from 'next/link'
// import axios from 'axios'
import { API_URL } from '@/config/index'

export default function AddRecruiterComponent({ token = '' }) {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [role, setRole] = useState('company')

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      toast.error('Passwords do not match!')
      return
    }

    if (confirm('Are you sure you want to add this recruiter?')) {
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
        setConfirmPassword('');
        setEmail('');
        setPassword('');
        setUsername('')
      } else {
        toast.error('Something went wrong!')
      }
    }
  }
  
  return (
    <form onSubmit={handleSubmit}>
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
                    onChange={(e) => setUsername(e.target.value.toLowerCase())}
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
                    onChange={(e) => setEmail(e.target.value.toLowerCase())}
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
                    onChange={(e) => setPassword(e.target.value)}
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
                    onChange={(e) => setConfirmPassword(e.target.value)}
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
            className='ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500'
          >
            Add
          </button>
        </div>
      </div>
    </form>
  )
}
