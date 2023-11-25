import Link from 'next/link'
import React from 'react'

export default function NotApproved() {
  return (
    <div className='grid place-items-center'>
      <h1 className='block text-sm font-medium text-gray-700'>
        Your account is not approved yet. Please wait till admin approves.
      </h1>
      <div className='mt-4 h-screen'>
        <Link href='/student/profile'>
          <a className='block text-sm font-medium text-gray-700'>
            <button className='bg-yellow-400 rounded-xl shadow-lg hover:bg-yellow-500 shadow-yellow-500/80 text-white font-bold py-2 px-4'>
              Go to profile
            </button>
          </a>
        </Link>
      </div>
    </div>
  )
}
