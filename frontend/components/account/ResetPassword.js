import Image from 'next/image'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { API_URL } from '@/config/index'
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from 'next/router'

export default function ResetPassword() {
  const router = useRouter()
  const [code, setCode] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  useEffect(() => {
    if (router.query.code) {
      setCode(router.query.code)
    }
  }, [router.query.code])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      toast.error('Passwords do not match')
      return
    }
    const res = await fetch(`${API_URL}/api/auth/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        code: code,
        password: password,
        passwordConfirmation: confirmPassword,
      }),
    })

    if (res.status === 200) {
      toast.success(
        'Password has been reset. You can now login with your new password.'
      )
      // redirect to login page after 5 seconds
      setTimeout(() => {
        router.push('/')
      }, 5000)
    } else {
      console.log('error: ', res)
      const error = await res.json()
      console.log('error details: ', error)
      toast.error(error.error.message)
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
              alt='NIT Patna'
              src='/images/logo.svg'
            />
          </div>

          <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
            Training and Placement Cell
          </h2>
          <h2 className='text-center font-extrabold text-3xl uppercase'>
            NIT Patna
          </h2>
          <p className='mt-2 text-center text-sm text-gray-600'>
            Reset Password
          </p>
        </div>

        <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
          <div className='bg-gray-50 py-8 px-4 shadow sm:rounded-lg sm:px-10'>
            <form className='space-y-6' onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor='code'
                  className='block text-sm font-medium text-gray-700'
                >
                  Secret Code
                </label>
                <div className='mt-1'>
                  <input
                    type='text'
                    id='code'
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    name='code'
                    placeholder='Enter Secret Code'
                    autoComplete='code'
                    className='appearance-none block w-full px-3 py-2 border border-green-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm'
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor='password'
                  className='block text-sm font-medium text-gray-700'
                >
                  New Password
                  <small className='block'>
                    Must contain at least one number and one uppercase and
                    lowercase letter, and least 8 characters
                  </small>
                </label>
                <div className='mt-1'>
                  <input
                    type='password'
                    id='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    pattern='(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}'
                    name='password'
                    placeholder='Enter New Password'
                    autoComplete='new-password'
                    required
                    className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-yellow-500 focus:border-indigo-500 sm:text-sm'
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor='confirmPassword'
                  className='block text-sm font-medium text-gray-700'
                >
                  Confirm Password
                </label>
                <div className='mt-1'>
                  <input
                    type='password'
                    id='confirmPassword'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    name='confirmPassword'
                    placeholder='Confirm Password'
                    autoComplete='confirm-password'
                    required
                    className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm'
                  />
                </div>
              </div>

              <div>
                <button
                  type='submit'
                  className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500'
                >
                  Reset Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
