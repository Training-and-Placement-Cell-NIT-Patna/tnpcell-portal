import React from "react";
import { MdCall } from "react-icons/md";
import { HiMail } from "react-icons/hi";

function ProfessorIncharge() {
  return (
    <>
      <div className="pt-20 pb-10">
        <h1 className="text-4xl underline font-bold text-center text-red-900">
          Office Bearers
        </h1>
      </div>
      <div className="md:flex md:justify-around md:pb-20  divide-x-2 divide-red-900">
        <div className="p-5">
          <div className="text-center">
            <div className="flex justify-center">
              <img
                src="/images/Samart_mr.JPG"
                className="rounded-full w-1/2 md:w-2/5"
              />
            </div>
            <h1 className="text-2xl">Dr. Samrat Mukherjee</h1>
            <h2>Prof. Incharge, T&P Cell NIT Patna</h2>
            {/*<p className="text-gray-500">+919334314098</p>*/}
            {/*<p className="text-gray-500">samart@nitp.ac.in</p>*/}
            <div
              className={
                " flex mx-auto w-1/2 py-2 justify-evenly animate-appear"
              }
            >
              <a
                href={"tel:+91 9771005232"}
                className={
                  " border-[0.2rem] border-solid rounded-[50%] mx-2 w-9 h-9 border-white hover:text-[#ffa500] hover:bg-white hover:border-[#ffa500] hover:rotate-[360deg] transition duration-500 ease-in-out flex items-center justify-center"
                }
              >
                <MdCall className={"w-[80%] h-[80%]"} />
              </a>

              <a
                href={"mailto:samrat@nitp.ac.in"}
                className={
                  "border-[0.2rem] border-solid rounded-[50%] mx-2 w-9 h-9 border-white hover:text-[#ffa500] hover:bg-white hover:border-[#ffa500] hover:rotate-[360deg] transition duration-500 ease-in-out flex items-center justify-center"
                }
              >
                <HiMail className={"w-[80%] h-[80%]"} />
              </a>
            </div>
          </div>
        </div>
        <div className="p-5">
          <div className="text-center">
            <div className="flex justify-center">
              <img
                src="/images/Shailesh_sir.JPG"
                className="rounded-full w-1/2 md:w-2/5"
              />
            </div>
            <h1 className="text-2xl">Dr. Shailesh M Pandey</h1>
            <h2>T&P officer NIT Patna</h2>
            <div
              className={
                " flex mx-auto w-1/2 py-2 justify-evenly animate-appear"
              }
            >
              <a
                href={"tel:+91 8750111166"}
                className={
                  " border-[0.2rem] border-solid rounded-[50%] mx-2 w-9 h-9 border-white hover:text-[#ffa500] hover:bg-white hover:border-[#ffa500] hover:rotate-[360deg] transition duration-500 ease-in-out flex items-center justify-center"
                }
              >
                <MdCall className={"w-[80%] h-[80%]"} />
              </a>

              <a
                href={"mailto:smp.me@nitp.ac.in"}
                className={
                  "border-[0.2rem] border-solid rounded-[50%] mx-2 w-9 h-9 border-white hover:text-[#ffa500] hover:bg-white hover:border-[#ffa500] hover:rotate-[360deg] transition duration-500 ease-in-out flex items-center justify-center"
                }
              >
                <HiMail className={"w-[80%] h-[80%]"} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfessorIncharge;
