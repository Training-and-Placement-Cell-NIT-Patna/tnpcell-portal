import React from "react";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  DocumentDownloadIcon,
  PaperAirplaneIcon,
  LightBulbIcon,
  PencilAltIcon,
} from "@heroicons/react/outline";

function About() {
  return (
    <div>
      <div className="text-center mt-5">
        <h1 className="font-bold text-4xl text-[#510505] font-serif underline underline-offset-4">
          About Us
        </h1>
        <div className="text-center">
          <div>
            <img src="" />
          </div>
          <div className="text-center">
            <p className="px-5 py-28 indent-5 text-center">
              The Training and Placement cell of NIT PATNA forms an integral
              part in shaping the careers of the students of the institute. It
              organizes and coordinates campus placement program to fulfill its
              commitment of a job to every aspirant. Not only that it also
              encourages and works towards the continuing education for the
              college employees.
            </p>
          </div>
        </div>
      </div>
      {/* Corousal ends */}

      <div className="bg-[#510505] text-white pb-20">
        <div className="text-center py-10">
          <h3 className=" text-yellow-100 text-xl mb-4"> Our Values</h3>
          <h1 className="text-4xl w-96 mx-auto leading-normal  font-bold mb-4">
            {" "}
            Our Aim, Mission and Vision
          </h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 max-w-5xl mx-auto gap-10 group place-items-center">
        <div className='bg-white/10 group-hover:blur-sm hover:!blur-none mx-5 md:mx-0 cursor-pointer p-8 rounded-sm  flex flex-col place-items-center  group-hover:scale-[0.85] hover:!scale-100'>
            <div className="rounded-full border-2 w-[7rem] border-yellow-400 ">
              <PencilAltIcon className="h-20 w-20 rotate-45 m-4 text-yellow-300" />
            </div>
            <h4 className="text-xl font-bold p-3">AIM</h4>
            <p className="text-sm text-center leading-7 my-3 font-light opacity-50">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
          <div className="grid place-items-center bg-white/10 cursor-pointer mx-5 md:mx-0 p-8 rounded-sm group-hover:blur-sm hover:!blur-none group-hover:scale-[0.85] hover:!scale-100">
            <div className="rounded-full border-2 w-[7rem] border-yellow-400">
              <PaperAirplaneIcon className="h-20 w-20 rotate-45 m-4 text-yellow-300" />
            </div>
            <h4 className="text-xl font-bold p-3">Mission</h4>
            <p className="text-sm leading-7 my-3 font-light opacity-50">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
          <div className="grid place-items-center bg-white/10  cursor-pointer p-8 mx-5 md:mx-0 rounded-sm group-hover:blur-sm hover:!blur-none group-hover:scale-[0.85] hover:!scale-100">
            <div className="rounded-full border-2 w-[7rem] border-yellow-400">
              <LightBulbIcon className="h-20 w-20 white m-4 text-yellow-300" />
            </div>
            <h4 className="text-xl font-bold p-3">Vision</h4>
            <p className="text-sm leading-7 my-3 font-light opacity-50">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
