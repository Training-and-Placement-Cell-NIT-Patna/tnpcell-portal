import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import { ArrowDownIcon } from "@heroicons/react/outline";
const steps = [
  {
    index: 1,
    title: "REGISTRATION",
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
        <span className="font-bold">Training and placement cell, NITP</span>
      </div>
      <div className="grid justify-items-center">
        <div className="p-5 grid justify-items-center">
          {steps.map((item) => (
            <div
              className="grid justify-items-center md:w-1/2"
              key={item.index}
            >
              <div
                className="p-5 grid justify-items-center"
                data-aos={`${item.index % 2 ? "slide-left" : "slide-right"}`}
              >
                <div className="shadow-2xl rounded-lg ">
                  <div className="bg-yellow-300 p-3 text-center text-red-900 font-bold">
                    {item.title}
                  </div>
                  <div className="p-4 m-1">
                    {item.description}
                    {item.links && (
                      <a
                        href={item.links}
                        className="hover:underline text-blue-500 after:content-['_↗']"
                      >
                        {item.links}
                      </a>
                    )}
                    {item.index === 1 && (
                      <ol className="pl-3">
                        <li>1.{item.st1}</li>
                        <li>2.{item.st2}</li>
                        <li>3.{item.st3}</li>
                        <li>4.{item.st4}</li>
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
