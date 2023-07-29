import ResetPassword from '@/components/account/ResetPassword'
import React from 'react'
import { ToastContainer } from 'react-toastify'
import Head from 'next/head'
export default function ResetPasswordPage() {
  return (
    <>
      <Head>
        <title>Reset Password</title>
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
        <ResetPassword />
      </div>
    </>
  )
}
