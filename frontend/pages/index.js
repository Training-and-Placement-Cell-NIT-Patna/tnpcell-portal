import Head from 'next/head'
import Image from 'next/image'
import { ToastContainer } from 'react-toastify'
import SignIn from '@/components/SignIn'
import CoverPage from '@/components/CoverPage'

export default function Home({
  title = 'Training and Placement Cell NIT Patna',
  keywords = 'NIT Patna || Training || Placement || Cell || NIT Patna || NIT Patna Average Package',
  description = 'Training and Placement Cell NIT Patna || NIT Patna',
}) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name='keywords' content={keywords} />
        <meta name='description' content={description} />
      </Head>
      <div className='overflow-hidden'>
        {/*  Page content */}
        <main className='flex-grow'>
          <ToastContainer
            position='top-right'
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <CoverPage />
        </main>
        {/*  Site footer */}
      </div>
    </>
  )
}






