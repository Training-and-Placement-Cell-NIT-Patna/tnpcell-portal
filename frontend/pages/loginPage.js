import SignIn from "@/components/SignIn";
import React from "react";
import { ToastContainer } from "react-toastify";
import Head from "next/head";
export default function loginPage() {
  return (
    <>
      <Head>
        <title>Login | NIT Patna</title>
        <meta name="viewport" content="initial-scale=1.0, width = device-width" />
        <meta name="description" content="Placement portal of nit patna | NIT Patna Training and Placement Portal" />
      </Head>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <SignIn />
    </>
  );
}
