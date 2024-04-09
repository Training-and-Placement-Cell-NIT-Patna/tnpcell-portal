'use-client'

import React from "react";
import Head from "next/head";
import dynamic from 'next/dynamic';

// Dynamically import Lottie with SSR disabled
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

import loadingAnimation from "public/lottie/loadingAnimation";
function Loading({
  keywords = 'NIT Patna || Training || Placement || Cell || NIT Patna || NIT Patna Average Package',
  description = 'Training and Placement Cell Portal, NIT Patna || NITP',
}) {
  return (
    <>
      <Head>
        <title>Training and Placement Cell Portal, NIT Patna</title>
        <meta name='keywords' content={keywords} />
        <meta name='description' content={description} />
      </Head>
      <div className="flex justify-center mt-28 md:grid md:grid-cols-1 md:justify-items-center md:mt-0 bg-white">
        <Lottie
          animationData={loadingAnimation}
          className="flex justify-center items-center w-1/2"
          loop={true}
        />
      </div>
      <div className="text-center">
        <h1 className="font-bold text-yellow-500">Loading...</h1>
      </div>
    </>
  );
}

export default Loading;
