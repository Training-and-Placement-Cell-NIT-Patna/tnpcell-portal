/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState, useContext } from 'react'
// import { Dialog, Transition } from '@headlessui/react'
import {
  BriefcaseIcon,
  CalendarIcon,
  ChartBarIcon,
  DocumentTextIcon,
  FolderIcon,
  CogIcon,
  HomeIcon,
  IdentificationIcon,
  ArrowLeftIcon,
  InboxIcon,
  LogoutIcon,
  MenuIcon,
  UsersIcon,
  XIcon,
  UserCircleIcon
} from '@heroicons/react/outline'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import AuthContext from '@/context/AuthContext'

const navigation = [
  {
    name: 'Home',
    href: '/coordinator/home',
    icon: IdentificationIcon,
  },
  {
    name: 'Students',
    href: '/coordinator/students',
    icon: BriefcaseIcon,
  },
  {
    name: 'Companies',
    href: '/coordinator/companies',
    icon: FolderIcon,
  },
  {
    name: 'Job/ Internship',
    href: '/coordinator/jobs',
    icon: DocumentTextIcon,
  },
  {
    name: 'Recruiters',
    href: '/coordinator/recruiters',
    icon: UserCircleIcon,

  },
  {
    name: 'Requests',
    href: '/coordinator/requests',
    icon: CogIcon,
  },
  {
    name: 'Reset Password',
    href: '/coordinator/reset-password',
    icon: DocumentTextIcon,
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Sidebar({ heading = '', children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const router = useRouter()
  const { user, logout } = useContext(AuthContext)

  return (
    <div className='flex'>
      <div className='fixed z-50'>
      <div className={`bg-[#F2CD5C] h-screen ${sidebarOpen ? 'sm:w-64 w-52' : 'w-20'} duration-300 relative`}>
        <ArrowLeftIcon className={`text-[#461515] bg-white rounded-full h-5 w-5 absolute -right-3 top-9 border border-[#2f0707] cursor-pointer ${!sidebarOpen && "rotate-180"}`}
          onClick={() => setSidebarOpen(!sidebarOpen)} />
        <div className='inline-flex p-4'>
          <Image
            width={50}
            height={50}
            alt='logo'
            src='/images/logo.png'
            className='float-left block'
          />
          <h1 className={`text-[#555701b2] origin-left p-2 pl-2 font-serif font-semibold text-xl duration-300 ${!sidebarOpen && "hidden"}`}>Coordinator</h1>
        </div>

        <ul className='pt-4 p-5'>
          {navigation.map((item) => (
            <Link href={item.href} key={item.name}>
              <a
                className={classNames(
                  item.href === router.pathname
                    ? 'bg-[#911e1ea8] text-yellow-200'
                    : 'text-[#1c1d00b2] hover:bg-[#471919c5] hover:text-white',
                  `flex items-center font-bold rounded-full py-2 pl-2 ${item.spacing ? 'mt-6' : 'mt-4'}`
                )}
              >
                <item.icon
                  className={classNames(
                    item.href === router.pathname
                      ? 'text-yellow-200'
                      : 'group-hover:text-gray-300',
                    'mr-2 text-2xl rounded-full h-6 w-6'
                  )}

                />
                <h1 className={`text-base font-medium rounded-md duration-300 ${!sidebarOpen && "hidden"}`}>{item.name}</h1>
              </a>
            </Link>
          ))}
        </ul>
        <div className='p-5 cursor-pointer'>
          <a
            onClick={() => logout()}
            className={classNames(
              false
                ? 'bg-[#911e1ea8] text-yellow-200'
                : 'text-[#555701b2] hover:bg-[#471919c5] hover:text-white',
              'flex items-center px-1 my-2 font-bold rounded-full duration-300 py-2 pl-2 mt-7 hover:text-white '
            )}
          >
            <LogoutIcon
              className={classNames(
                false
                ? 'text-yellow-200'
                : 'group-hover:text-gray-300',
                'md:mr-4 flex-shrink-0 h-6 w-6'
              )}
              aria-hidden='true'
            />
            <h1 className={`text-base font-medium rounded-md  duration-300 ${!sidebarOpen && "hidden"}`}>Logout</h1>
          </a>
        </div>
        <div className={`absolute bottom-0 left-0 flex-shrink-0 duration-300 flex bg-[hsl(0,83%,14%)] ${sidebarOpen ? 'sm:w-64 w-52' : 'w-20'}`}>
          <a href='#' className='flex-shrink-0 w-full group block'>
            <div className='flex items-center p-2'>
              <div>
                <img
                  className='h-8 w-8 rounded-full m-4'
                  src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                  alt=''
                />
              </div>
              <div className='px-4'>
                <h1 className={`text-base rounded-md text-white font-bold duration-300 ${!sidebarOpen && "hidden"}`}>
                  {user && user.email}
                </h1>
                <h1 className={`text-base font-medium rounded-md text-white  duration-300 ${!sidebarOpen && "hidden"}`}>
                  {user && user.username}
                </h1>
              </div>
            </div>
          </a>
        </div>
      </div>
      </div>
      <div className={`${sidebarOpen ? 'pl-64' : 'pl-16' } bg-[#f1ff2742] flex flex-col flex-1 `} onClick={() => {
    setSidebarOpen(false);
      }}>
        <main className='flex-1'>
          <div className='py-6'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
              <h1 className='text-2xl font-semibold text-gray-900'>
                {heading}
              </h1>
            </div>
            <div className='max-w-7xl mx-auto px-4 sm:px-4 md:px-6 min-h-screen'>
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
