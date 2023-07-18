import { API_URL } from '@/config/index'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { toast } from 'react-toastify'

export default function CoordinatorsSection({ coordinators = '', token = '' }) {
  const router = useRouter()
  const handleDelete = async (id) => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
      method: 'DELETE',
    }
    if (confirm('Are you sure you want to delete this coordinator?')) {
      const res = await fetch(`${API_URL}/api/users/${id}`, config)
      console.log(token)
      if (res.status === 200) {
        toast.info('Coordinator deleted successfully!')
        router.reload()
      } else {
        toast.error('Error deleting coordinator!')
      }
    }
  }

  return (
    <div>
      <div className='bg-white px-4 py-5 border-b border-gray-200 sm:px-6'>
        <div className='-ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-nowrap'>
          <div className='ml-4 mt-2'>
            <h3 className='text-lg leading-6 font-medium text-gray-900'>
              Coordinators
            </h3>
          </div>
          <div className='ml-4 mt-2 flex-shrink-0'>
            <Link href={`/admin/coordinators/add`}>
              <a
                type='button'
                className='relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500'
              >
                Create new
              </a>
            </Link>
          </div>
        </div>
      </div>
      <div className='flex flex-col'>
        <div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
          <div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
            <div className='shadow overflow-hidden border-b border-gray-200 sm:rounded-lg'>
              <table className='min-w-full divide-y divide-gray-200'>
                <thead className='bg-gray-50'>
                  <tr>
                    <th
                      scope='col'
                      className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                    >
                      username
                    </th>

                    <th
                      scope='col'
                      className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                    >
                      Email
                    </th>

                    <th scope='col' className='relative px-6 py-3'>
                      <span className='sr-only'>Remove</span>
                    </th>
                  </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200'>
                  {coordinators.map((coordinator) => (
                    <tr key={coordinator.email}>
                      <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                        {coordinator.username}
                      </td>

                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                        {coordinator.email}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
                        <Link href={`/admin/coordinators/${coordinator.id}`}>
                          <button className='text-yellow-600 hover:text-yellow-900 cursor-pointer'>
                            Edit
                          </button>
                        </Link>
                      </td>

                      <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
                        <button
                          onClick={() => handleDelete(coordinator.id)}
                          className='text-yellow-600 hover:text-yellow-900 cursor-pointer'
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
