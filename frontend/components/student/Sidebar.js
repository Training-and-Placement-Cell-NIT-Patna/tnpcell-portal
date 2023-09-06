/* This example requires Tailwind CSS v2.0+ */
import { useState, useContext, useEffect } from 'react'
import { API_URL } from "@/config/index";
import {
  BriefcaseIcon,
  DocumentTextIcon,
  ArrowLeftIcon,
  LogoutIcon,
  ShieldCheckIcon,
  ClipboardCheckIcon,
  UserIcon,
} from '@heroicons/react/outline'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import AuthContext from '@/context/AuthContext'
import axios from 'axios';

const navigation = [
  {
    name: 'Profile',
    href: '/student/profile',
    icon: UserIcon,
  },

  // {
  //   name: 'All Jobs',
  //   href: '/student/all-jobs',
  //   icon: ClipboardListIcon,
  // },

  {
    name: 'Eligible Jobs',
    href: '/student/eligible-jobs',
    icon: BriefcaseIcon,
  },

  {
    name: 'Jobs Applied',
    href: '/student/jobs-applied',
    icon: ClipboardCheckIcon,
  },

  {
    name: 'Resume & Transcript',
    href: '/student/resume',
    icon: DocumentTextIcon,
  },
  {
    name: 'Reset Password',
    href: '/student/reset-password',
    icon: ShieldCheckIcon,
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Sidebar({ heading = '', children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const router = useRouter()
  const { user, logout } = useContext(AuthContext)
  const [profilePicUrl, setProfilePicUrl] = useState('')
  const getProfilePicUrl = async () => {
    const resp = await axios.post(`${API_URL}/api/students/profile-pic-url`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjkxNTAxMzg0LCJleHAiOjE2OTQwOTMzODR9.Fb1m4gj2FJimvlyTwkMwQJjNCYcboV4VW8Lw6Jrnl_g'}`,
      },
      email: user?.email
    })
    setProfilePicUrl(resp.data?.profilePicUrl?.url)
  }
  useEffect(() => {
    getProfilePicUrl()
  }, [user?.email])
  return (
    <div className='flex '>
      <div className='fixed z-50'>
        <div className={`bg-gray-900 h-screen duration-300 ${sidebarOpen ? 'sm:w-64 w-52' : 'w-20'} duration-300 relative`}>
          <ArrowLeftIcon className={`text-[#2f0707] bg-white rounded-full h-5 w-5 absolute -right-3 top-9 border border-[#2f0707] cursor-pointer ${!sidebarOpen && "rotate-180"}`}
            onClick={() => setSidebarOpen(!sidebarOpen)} />
          <div className='inline-flex p-4'>
            <Image
              width={50}
              height={50}
              alt='logo'
              src='/images/logo.png'
              className='float-left block'
            />
            <h1 className={`text-white origin-left p-2 pl-2 font-serif font-semibold text-xl duration-300 ${!sidebarOpen && "hidden"}`}>Student Portal</h1>
          </div>

          <ul className='pt-4 p-5'>
            {navigation.map((item) => (
              <Link href={item.href} key={item.name}>
                <a
                  className={classNames(
                    item.href === router.pathname
                      ? 'bg-gray-800 text-yellow-200'
                      : 'text-gray-100 hover:bg-slate-800 hover:text-white',
                    `flex items-center font-bold rounded-full py-2 pl-2 ${item.spacing ? 'mt-6' : 'mt-4'}`
                  )}
                >
                  <item.icon
                    className={classNames(
                      item.href === router.pathname
                        ? 'text-yellow-20'
                        : 'text-gray-400 group-hover:text-gray-300',
                      'mr-2 text-2xl rounded-full h-6 w-6'
                    )}

                  />
                  <h1 className={`text-base font-medium rounded-md  duration-300 ${!sidebarOpen && "hidden"}`}>{item.name}</h1>
                </a>
              </Link>
            ))}
          </ul>
          <div className='p-5 cursor-pointer'>
            <a
              onClick={() => logout()}
              className={classNames(
                false
                  ? 'bg-gray-800 text-yellow-200'
                  : 'text-gray-300 hover:bg-slate-800 hover:text-white',
                'flex items-center px-1 my-2 font-bold rounded-full py-2 pl-2 mt-7 '
              )}
            >
              <LogoutIcon
                className={classNames(
                  false
                    ? 'text-yellow-20'
                    : 'text-gray-400 group-hover:text-gray-300',
                  'md:mr-4 flex-shrink-0 h-6 w-6'
                )}
                aria-hidden='true'
              />
              <h1 className={`text-base font-medium rounded-md  duration-300 ${!sidebarOpen && "hidden"}`}>Logout</h1>
            </a>
          </div>
          <div className={`absolute bottom-0 left-0 flex-shrink-0 duration-300 flex bg-[#030000] ${sidebarOpen ? 'sm:w-64 w-52' : 'w-20'}`}>
            <a href='#' className='flex-shrink-0 w-full group block'>
              <div className='flex items-center'>
                <div>
                  <img
                    className='h-8 w-8 rounded-full m-4'
                    src={profilePicUrl?API_URL + profilePicUrl: 'https://www.w3schools.com/howto/img_avatar.png'}
                    alt='student-profile'
                  />
                </div>


                <div className={`px-4 w-4/5  flex flex-col m-0 justify-center  overflow-visible ${!sidebarOpen && "hidden"
                  }`}>
                  <h1 className={`text-sm md:text-sm font-bold rounded-md text-white  duration-300 ${!sidebarOpen && "hidden"
                    }`}>
                    {user && user.username}
                  </h1>
                  <h1 className={`text-sm break-words hover:text-clip rounded-md overflow-visible   text-white font-bold duration-300  ${!sidebarOpen && "hidden"
                    }`}>

                    {user && user.email}
                  </h1>
                </div>


              </div>
            </a>
          </div>
        </div>
      </div>
      <div className={`${sidebarOpen ? 'pl-64' : 'pl-16'} flex bg-[#dfdeec78] min-h-screen flex-col flex-1 `} onClick={() => setSidebarOpen(false)}>
        <main className='flex-1'>
          <div className='py-6'>
            <div className=' max-w-6xl mx-auto px-1 pl-8 sm:px-6 lg:px-2'>
              <h1 className='text-3xl font-bold text-gray-900'>
                {heading}
              </h1>
            </div>
            <div className='max-w-6xl mx-auto px-1 pl-8 sm:px-6 lg:px-2'>
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  )

}
