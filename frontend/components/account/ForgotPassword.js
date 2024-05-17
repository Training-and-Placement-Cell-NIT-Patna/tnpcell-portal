import Image from 'next/image'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { API_URL } from '@/config/index'
import 'react-toastify/dist/ReactToastify.css'
// import { useRouter } from 'next/router'
import Link from 'next/link'

export default function ForgotPassword() {

  const [email, setEmail] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (confirm('Are you sure you want to reset your password?')) {
      const res = await fetch(`${API_URL}/api/auth/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
        }),
      })

      if (res.status === 200) {
        toast.success(
          'Password reset link has been sent to your email. Check spam folder if you do not see it in inbox.'
        )
      }
      if (res.status === 400) {
        console.log('error: ', res)
        const error = await res.json()
        toast.error(error.error.message)
      }
    }
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
              alt='NIT Patna Logo'
              src='/images/logo.png'
            />
          </div>

          <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
            Training and Placement Cell
          </h2>
          <h2 className='text-center font-extrabold text-3xl uppercase'>
            NIT Patna
          </h2>
          <p className='mt-2 text-center text-sm text-gray-600'>
            Forgot Password (Only for Students)
          </p>
          <p className='mt-2 text-center text-sm text-yellow-600'>
            <Link href='/loginPage' className='cursor-pointer text-yellow-600'>
              <a>Go to Login</a>
            </Link>
          </p>
        </div>

        <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
          <div className='bg-gray-50 py-8 px-4 shadow sm:rounded-lg sm:px-10'>
            <form className='space-y-6' onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor='email'
                  className='block text-sm font-medium text-gray-700'
                >
                  Email Address
                </label>
                <div className='mt-1'>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value.toLowerCase())}
                    id='email'
                    name='email'
                    // pattern='.+@nitp\.ac\.in' //  @important this should be off because may be coordinator or admin with their personal email wants to reset password
                    type='text'
                    autoComplete='email'
                    required
                    className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm'
                    placeholder='Email address'
                  />
                </div>
              </div>

              <div>
                <button
                  type='submit'
                  className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500'
                >
                  Get password reset email
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
