import React, { useEffect,useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import { ArrowDownIcon } from "@heroicons/react/outline";
const steps = [
  {
    index: 1,
    title: "Registration",
    description: "Recruiter share these details on ",
    links: "/account/RecruiterSignUp",
    st1: "Companies Full Name",
    st2: "Name of Recruiter",
    st3: "Recruiter Contact No.",
    st4: "Recruiter Official email address",
  },

  {
    index: 2,
    title: "Step 2",
    description:
      "Within 24-hrs, Recruiter will get an Invitation via E-Mail that consist the Username and Password along with a link to the placement portal of NITP.",
  },

  {
    index: 3,
    title: "Step 3",
    description:
      "With the credentials received via mail, the company representative are expected to select Account Type as “Company” on ",
    links: "/loginPage",
  },

  {
    index: 4,
    title: "Step 4",
    description:
      "After login, company representative are expected to fill the Job Application Form (JNF).",
  },

  {
    index: 5,
    title: "Step 5",
    description:
      "For further requirements like arrangement of Pre-Placement Talk or anything else one of our placement coordinator will be in touch with you.",
  },
];
function Process() {




  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
  return (
    <div className="mt-8 h-fit">
      <div className="text-4xl underline font-bold text-center text-red-900">
        {" "}
        Welcome!!
      </div>
      <div className="text-center text-xl font-serif m-3">
        Recruiter should follow following steps to register on{" "}
        <span className="font-bold">Training and placement cell, NIT Patna</span>
      </div>
      <div className="flex flex-col items-center">
        <div className="p-5  flex flex-col items-center ">
          {steps.map((item) => (
            <div
              className=" mockup-browser no-scrollbar flex flex-col items-center sm:w-[78%] w-[58%] md:w-[70%] lg:w-[50%]"
              key={item.index}
            >
              <div
                className="p-5 flex  border-1 font-semibold rounded-xl justify-items-center flex-col w-full"
                data-aos={`${item.index % 2 ? "slide-left" : "slide-right"}`}
              >
                <div>
                  <div className="mockup-browser-toolbar">
                  <div className="input">{item.title}</div>
                  </div>
                  <div className=" justify-center px-4 py-16 bg-base-200">
                    {item.description}
                    {item.links && (

                       <>
                        <a
                          href={item.links}
                          className=" text-yellow-800 link-underline"
                        >
                          <span>{item.links}</span> 
                        </a>
                        <div id="ProcessAnchorTagAnm" className=""></div>
                       </>
                    )}
                    {item.index === 1 && (
                      <ol className="pl-3">
                        <li><span className="text-yellow-800 w-[2rem] px-[0.34rem] m-3 ">1.</span>{item.st1}</li>
                        <li><span className="text-yellow-800 px-1 m-3 " >2.</span>{item.st2}</li>
                        <li><span className="text-yellow-800 px-1 m-3 " >3.</span>{item.st3}</li>
                        <li><span className="text-yellow-800 px-1 m-3 " >4.</span>{item.st4}</li>
                      </ol>
                    )}
                  </div>
                </div>
              </div>
              {item.index !== 5 && (
                <div
                  className="flex justify-center -space-x-8"
                  data-aos="slide-down"
                >
                  <ArrowDownIcon className="h-20 w-11 text-stone-300 " />
                  <ArrowDownIcon className="h-20 w-10 text-red-900 font-bold" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Process;
