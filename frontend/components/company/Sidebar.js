import { Fragment, useState, useContext } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {
  BriefcaseIcon,
  CogIcon,
  DocumentTextIcon,
  FolderIcon,
  IdentificationIcon,
  InboxIcon,
  LogoutIcon,
  MenuIcon,
  UserCircleIcon,
  UsersIcon,
  XIcon,
} from '@heroicons/react/outline'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import AuthContext from '@/context/AuthContext'

const navigation = [
//   {
//     name: 'Home',
//     href: '/admin/home',
//     icon: IdentificationIcon,
//   },
//   {
//     name: 'Students',
//     href: '/admin/students',
//     icon: UsersIcon,
//   },


//   {
//     name: 'Companies',
//     href: '/admin/companies',
//     icon: FolderIcon,
//   },

//   {
//     name: 'Jobs/Internship',
//     href: '/admin/jobs',
//     icon: BriefcaseIcon,
//   },
//   {
//     name: 'Settings',
//     href: '/admin/settings',
//     icon: CogIcon,
//   },
//   {
//     name: 'Requests',
//     href: '/admin/requests',
//     icon: DocumentTextIcon,
//   },
//   {
//     name: 'Coordinators',
//     href: '/admin/coordinators',
//     icon: UserCircleIcon,
//   },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Sidebar({ heading = '', children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const router = useRouter()
  const { user, logout } = useContext(AuthContext)
  

  return (
    <div>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as='div'
          className='fixed inset-0 flex z-40 md:hidden'
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter='transition-opacity ease-linear duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='transition-opacity ease-linear duration-300'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Dialog.Overlay className='fixed inset-0 bg-gray-600 bg-opacity-75' />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter='transition ease-in-out duration-300 transform'
            enterFrom='-translate-x-full'
            enterTo='translate-x-0'
            leave='transition ease-in-out duration-300 transform'
            leaveFrom='translate-x-0'
            leaveTo='-translate-x-full'
          >
            <div className='relative flex-1 flex flex-col max-w-xs w-full bg-cyan-800'>
              <Transition.Child
                as={Fragment}
                enter='ease-in-out duration-300'
                enterFrom='opacity-0'
                enterTo='opacity-100'
                leave='ease-in-out duration-300'
                leaveFrom='opacity-100'
                leaveTo='opacity-0'
              >
                <div className='absolute top-0 right-0 -mr-12 pt-2'>
                  <button
                    type='button'
                    className='ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className='sr-only'>Close sidebar</span>
                    <XIcon className='h-6 w-6 text-white' aria-hidden='true' />
                  </button>
                </div>
              </Transition.Child>
              <div className='flex-1 h-0 pt-5 pb-4 overflow-y-auto'>
                <nav className='mt-5 px-2 space-x-1'>
                      
                  <a
                    onClick={() => logout()}
                    className={classNames(
                      false
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'group flex items-center px-2 py-2 text-base font-medium rounded-md cursor-pointer'
                    )}
                  >
                    <LogoutIcon
                      className={classNames(
                        false
                          ? 'text-gray-300'
                          : 'text-gray-400 group-hover:text-gray-300',
                        'mr-4 flex-shrink-0 h-6 w-6'
                      )}
                      aria-hidden='true'
                    />
                    Logout
                  </a>
                </nav>
              </div>
              <div className='flex-shrink-0 flex bg-gray-700 p-4'>
                <a href='#' className='flex-shrink-0 group block'>
                  <div className='flex items-center'>
                    <div>
                      <img
                        className='inline-block h-10 w-10 rounded-full'
                        src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                        alt=''
                      />
                    </div>
                    <div className='ml-3'>
                      <p className='text-base font-medium text-white'>
                        {user && user.email}
                      </p>
                      <p className='text-sm font-medium text-gray-400 group-hover:text-gray-300 uppercase'>
                        {user && user.username}
                      </p>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </Transition.Child>
          <div className='flex-shrink-0 w-14'>
            {/* Force sidebar to shrink to fit close icon */}
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className='md:pl-64 flex flex-col flex-1'>
        <main className='flex-1'>
          <div className='py-6'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
              <h1 className='text-2xl font-semibold text-gray-900'>
                {heading}
              </h1>
            </div>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 md:px-8'>
              {children}
            
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
