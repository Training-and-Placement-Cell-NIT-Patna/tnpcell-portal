import React from "react";
// import Image from "next/image";
// import { CogIcon } from "@heroicons/react/solid";
import Lottie from "lottie-react";
import loadingAnimation from "public/lottie/loadingAnimation";
function Loading() {
  return (
      <div className="flex justify-center mt-28 md:grid md:grid-cols-1 md:justify-items-center md:mt-0 bg-white">
        <Lottie
          animationData={loadingAnimation}
          className="flex justify-center items-center w-1/2"
          loop={true}
        />
    </div>
  );
}

export default Loading;
