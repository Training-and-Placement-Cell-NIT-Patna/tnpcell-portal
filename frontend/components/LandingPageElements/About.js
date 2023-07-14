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
            <p className="px-5 md:px-10 py-28 indent-5 text-center">
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
          <h1 className="text-4xl  mx-auto leading-normal  font-bold mb-4">
            {" "}
            Our Aim, Mission and Vision
          </h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 max-w-5xl mx-auto gap-10 group place-items-center">
          <div className="bg-white/10 group-hover:blur-sm hover:!blur-none mx-5 md:mx-0 cursor-pointer p-8 rounded-sm  flex flex-col place-items-center  group-hover:scale-[0.85] hover:!scale-100">
            <div className="rounded-full border-2 w-[7rem] border-yellow-400 ">
              <PencilAltIcon className="h-20 w-20 rotate-45 m-4 text-yellow-300" />
            </div>
            <h4 className="text-xl font-bold p-3">AIM</h4>
            <p className="text-sm text-center leading-7 my-3 font-light opacity-50">
              The students of National institute of technology have been
              recruited in several international conglomerates along with
              indian corporations and have proved to be a great assets to the
              organizations they joined.
            </p>
          </div>
          <div className="grid place-items-center bg-white/10 cursor-pointer mx-5 md:mx-0 p-8 rounded-sm group-hover:blur-sm hover:!blur-none group-hover:scale-[0.85] hover:!scale-100">
            <div className="rounded-full border-2 w-[7rem] border-yellow-400">
              <PaperAirplaneIcon className="h-20 w-20 rotate-45 m-4 text-yellow-300" />
            </div>
            <h4 className="text-xl font-bold p-3">Mission</h4>
            <p className="text-sm leading-7 my-3 font-light opacity-50">
              To achieve 100% placement of students through dedication, attitude
              and complete involvement is our mission. Training and placement cell
              NIT Patna, arranges and coordinates various programmes that aim at
              moulding the students so as to meet the industry expectation in
              careers building and in turn bring laurels to the parent
              institution. The training and placement cell guided by a set of
              rules and principles, strives to maintain good relationship with
              industry.
            </p>
          </div>
          <div className="grid place-items-center bg-white/10  cursor-pointer p-8 mx-5 md:mx-0 rounded-sm group-hover:blur-sm hover:!blur-none group-hover:scale-[0.85] hover:!scale-100">
            <div className="rounded-full border-2 w-[7rem] border-yellow-400">
              <LightBulbIcon className="h-20 w-20 white m-4 text-yellow-300" />
            </div>
            <h4 className="text-xl font-bold p-3">Vision</h4>
            <p className="text-sm leading-7 my-3 font-light opacity-50">
              Equipping the students with relevant and conceptualized
              professional skills and guiding them towards a bright future and
              career all the around the world with the values of-Sincerity, Hard
              Work and Justice
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
