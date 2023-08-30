import { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { BellIcon, XIcon } from '@heroicons/react/outline'
import axios from 'axios'
import { API_URL } from '@/config/index'
import { GrAttachment } from 'react-icons/gr'


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
// fetch data from API

export default function SlideOver({ open = false, setOpen }) {
  const [notifications, setNotifications] = useState([])
  // function to fetch the notification 
  const fetchNotifications = async () => {
    const res = await axios.get(`${API_URL}/api/notifications?populate=*&sort=createdAt:desc`)
    setNotifications(res.data.data)
  }
  useEffect(() => {
    fetchNotifications()
  }, [])
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as='div'
        className='fixed inset-0 overflow-hidden'
        onClose={setOpen}
      >
        <div className='absolute inset-0 overflow-hidden'>
          <Dialog.Overlay className='absolute inset-0' />

          <div className='pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16'>
            <Transition.Child
              as={Fragment}
              enter='transform transition ease-in-out duration-300 sm:duration-700'
              enterFrom='translate-x-full'
              enterTo='translate-x-0'
              leave='transform transition ease-in-out duration-300 sm:duration-700'
              leaveFrom='translate-x-0'
              leaveTo='translate-x-full'
            >
              <div className='pointer-events-auto w-screen max-w-md'>
                <div className='flex h-full flex-col overflow-y-scroll bg-white shadow-xl'>
                  <div className='p-6'>
                    <div className='flex items-start justify-between'>
                      <Dialog.Title className='text-lg font-medium text-gray-900'>
                        {' '}
                        Notifications{' '}
                      </Dialog.Title>
                      <div className='ml-3 flex h-7 items-center'>
                        <button
                          type='button'
                          className='rounded-md bg-white text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-yellow-500'
                          onClick={() => setOpen(false)}
                        >
                          <span className='sr-only'>Close panel</span>
                          <XIcon className='h-6 w-6' aria-hidden='true' />
                        </button>
                      </div>
                    </div>
                  </div>

                  <ul
                    role='list'
                    className='flex-1 divide-y divide-gray-200 overflow-y-auto'
                  >
                    {notifications.length === 0 && (
                      <li className='py-6 px-5'>
                        <div className='flex items-center space-x-4'>
                          <div className='flex-shrink-0'>
                            <BellIcon className='h-6 w-6 text-gray-400' />
                          </div>
                          <div className='min-w-0 flex-1'>
                            <p className='text-sm text-gray-500'>
                              No notifications yet.
                            </p>
                          </div>
                        </div>
                      </li>
                    )}
                    {notifications.map((notification) => (
                      <li key={notification.id}>
                        <div className='group relative flex items-center py-6 px-5'>
                          <div
                            className='-m-1 block flex-1 p-1'
                          >
                            <div
                              className='absolute inset-0 group-hover:bg-gray-50'
                              aria-hidden='true'
                            />
                            <div className='relative flex min-w-0 flex-1 items-center'>
                              <span className='relative inline-block flex-shrink-0'>
                                {/* Bell icon */}
                                <BellIcon className={`h-6 w-6 text-gray-400`} />
                                <span
                                  className={classNames(
                                    notification.attributes.user === 'admin'
                                      ? 'bg-red-400'
                                      : 'bg-yellow-400',
                                    'absolute top-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white'
                                  )}
                                  aria-hidden='true'
                                />
                              </span>
                              <div className='ml-4'>
                                <p className='truncate text-sm font-medium text-gray-900'>
                                  {notification.attributes.title}
                                </p>
                                {/* Notification description */}
                                <p className='text-sm text-gray-500'>
                                  {notification.attributes.description}
                                </p>
                                {notification.attributes?.file?.data && (<a className='text-yellow-600' href={`${API_URL}${notification?.attributes?.file?.data?.attributes?.url}`} target='_blank'><GrAttachment className='text-lg inline' fill='blue' />Attachment</a>)}
                                <p className='truncate text-sm text-gray-500 capitalize'>
                                  {new Date(
                                    notification.attributes.createdAt
                                  ).toLocaleDateString('en-US', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric',
                                  })}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
