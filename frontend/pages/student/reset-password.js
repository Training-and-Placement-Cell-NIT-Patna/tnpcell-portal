import Layout from '@/components/student/Layout'
import { API_URL } from '@/config/index'
import { parseCookies } from '@/helpers/index'
import { useState } from 'react'
import { toast } from 'react-toastify'

export default function ResetPasswordStudent({ token = '' }) {
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (new_pass !== confirm_pass) {
      toast.error('Passwords do not match')
    }
    const res = await fetch(`${API_URL}/api/auth/reset-password`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        old_pass,
        new_pass,
      }),
    })
    const data = await res.json()
    if (res.ok) {
      toast.success('Password changed successfully')
      setOldPass('')
      setNewPass("")
      setConfirmPass("")
    } else {
      if (res.status === 403) {
        toast.error('Old password is incorrect')
      }
      toast.error('Password change failed')
    }
  }
  
  const [old_pass, setOldPass] = useState('')
  const [new_pass, setNewPass] = useState('')
  const [confirm_pass, setConfirmPass] = useState('')
  return (
    <Layout heading='Reset Password'>
      <form onSubmit={handleSubmit}>
        <div className='space-y-6 mt-4'>
          <div className='bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6'>
            <div className='md:grid md:grid-cols-3 md:gap-6'>
              <div className='md:col-span-1'>
                <h3 className='text-lg font-medium leading-6 text-gray-900'>
                  Enter Details
                </h3>
                <p className='mt-1 text-sm text-gray-500'></p>
              </div>
              <div className='mt-5 md:mt-0 md:col-span-2'>
                <div className='grid grid-cols-3 gap-6'>
                  <div className='col-span-6 sm:col-span-3'>
                    <label
                      htmlFor='old_pass'
                      className='block text-sm font-medium text-gray-700'
                    >
                      Old Password
                    </label>
                    <input
                      value={old_pass}
                      onChange={(e) => setOldPass(e.target.value)}
                      type='password'
                      name='old_pass'
                      id='old_pass'
                      autoComplete='password'
                      required
                      placeholder='Old Password'
                      className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                    />
                  </div>

                  <div className='col-span-6 sm:col-span-3'>
                    <label
                      htmlFor='new_pass'
                      className='block text-sm font-medium text-gray-700'
                    >
                      New Password
                      <small className='block'>
                        Must contain at least one number and one uppercase and
                        lowercase letter, and least 8 characters
                      </small>
                    </label>
                    <input
                      value={new_pass}
                      onChange={(e) => setNewPass(e.target.value)}
                      type='password'
                      name='new_pass'
                      id='new_pass'
                      pattern='(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}'
                      autoComplete=''
                      required
                      placeholder='New Password'
                      className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                    />
                  </div>
                  <div className='col-span-6 sm:col-span-3'>
                    <label
                      htmlFor='confirm_pass'
                      className='block text-sm font-medium text-gray-700'
                    >
                      Confirm New Password
                    </label>
                    <input
                      value={confirm_pass}
                      onChange={(e) => setConfirmPass(e.target.value)}
                      type='password'
                      name='confirm_pass'
                      id='confirm_pass'
                      pattern='(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}'
                      autoComplete=''
                      required
                      placeholder='Confirm Password'
                      className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='flex justify-end'>
            <button
              type='submit'
              className='ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            >
              Change Password
            </button>
          </div>
        </div>
      </form>
    </Layout>
  )
}

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req)

  return {
    props: { token: token }, // will be passed to the page component as props
  }
}
