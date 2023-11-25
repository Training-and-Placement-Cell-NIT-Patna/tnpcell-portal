import SignUpStudent from '@/components/account/SignUpStudent'
import React from 'react'
import { ToastContainer } from 'react-toastify'
import Head from 'next/head'
export default function studentRegistration() {
  return (
    <>
      <Head>
        <title>Student Registration</title>
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
        <SignUpStudent />
      </div>
    </>
  )
}
