import Head from 'next/head'
import { ToastContainer } from 'react-toastify'
import Sidebar from '@/components/student/Sidebar'

export default function Layout({
  title = 'NIT Patna Placement Portal',
  keywords = '',
  description = '',
  heading = '',
  children,
}) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name='keywords' content={keywords} />
        <meta name='description' content={description} />
      </Head>
      <div className='overflow-hidden '>
        {/*  Page content */}
        <main className='flex-grow'>
          <Sidebar heading={heading}>{children}</Sidebar>
          <ToastContainer
            position='top-left'
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </main>
        {/*  Site footer */}
      </div>
    </>
  )
}
