import ForgotPassword from '@/components/account/ForgotPassword'
import React from 'react'
import { ToastContainer } from 'react-toastify'
import Head from 'next/head'
export default function forgotPassword() {
  return (
    <>
      <Head>
        <title>Forgot Password</title>
      </Head>
      <div>
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
        <ForgotPassword />
      </div>
    </>
  )
}
