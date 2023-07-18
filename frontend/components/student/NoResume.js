import Link from 'next/link'
import React from 'react'

export default function NotApproved() {
  return (
    <div>
      <h1 className='block text-sm font-medium text-gray-700'>
        Resume not set. Please ensure you have uploaded the resume AND set the resume link fields.
      </h1>
      <div className='mt-4'>
        <Link href='/student/resume'>
          <a className='block text-sm font-medium text-gray-700'>
            <button className='bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded'>
              Upload Resume
            </button>
          </a>
        </Link>
      </div>
    </div>
  )
}
