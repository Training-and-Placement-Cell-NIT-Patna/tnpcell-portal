import { React, useEffect } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  AcademicCapIcon,
  CodeIcon,
  DesktopComputerIcon,
  SortAscendingIcon,
  OfficeBuildingIcon,
  ClockIcon,
} from "@heroicons/react/solid";
import AOS from "aos";
import "aos/dist/aos.css";
const data = [
  {
    icon: AcademicCapIcon,
    title: "Best of the best make it!!",
    desc: "The students are admitted through the esteemed JEE Mains and represents the Top 2% of the candidates that appear for the exam nationwide, they are handpicked from the garden of knowledge and critical thinking. These students are enriched with both qualitative and quantitative skills, thus they make up for the best in class.",
  },
  {
    icon: CodeIcon,
    title: "Coding Culture",
    desc: "Students from NIT Patna dominate the leader boards of Codechef, Codeforces, Hackerrank, Leetcode etc. Our Coding clubs regularly organize coding competitions on various platforms to help the students strengthen their coding skills. The Google Developer Student Clubs (DSC) of NIT Patna and the Hackslash Club powered by Mozilla frequently organize workshops on trending technologies in Machine learning and Web/Android Development.",
  },
  {
    icon: SortAscendingIcon,
    title: "Workshop and Industrial Lecture",
    desc: "The students are admitted through the esteemed JEE Mains and represents the Top 2% of the candidates that appear for the exam nationwide, they are handpicked from the garden of knowledge and critical thinking. These students are enriched with both qualitative and quantitative skills, thus they make up for the best in class.",
  },
  {
    icon: DesktopComputerIcon,
    title: "Technical Clubs",
    desc: "The students are admitted through the esteemed JEE Mains and represents the Top 2% of the candidates that appear for the exam nationwide, they are handpicked from the garden of knowledge and critical thinking. These students are enriched with both qualitative and quantitative skills, thus they make up for the best in class.",
  },
  {
    icon: OfficeBuildingIcon,
    title: "World Class Faculty!",
    desc: "The students are admitted through the esteemed JEE Mains and represents the Top 2% of the candidates that appear for the exam nationwide, they are handpicked from the garden of knowledge and critical thinking. These students are enriched with both qualitative and quantitative skills, thus they make up for the best in class.",
  },
  {
    icon: ClockIcon,
    title: "All Round Development",
    desc: "The students are admitted through the esteemed JEE Mains and represents the Top 2% of the candidates that appear for the exam nationwide, they are handpicked from the garden of knowledge and critical thinking. These students are enriched with both qualitative and quantitative skills, thus they make up for the best in class.",
  },
];

function WhyUS() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
  const sliderLeft = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - 500;
  };
  const sliderRight = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  return (
    <>
      <div className="text-center py-10 bg-yellow-100 ">
        <h5 className=" text-red-900 m-6 text-sm" data-aos="fade-in">
          {" "}
          Why Recruit at NIT Patna?
        </h5>
        <h1
          className="text-4xl w-96 mx-auto leading-normal  font-bold mb-12"
          data-aos="zoom-in-up"
        >
          {" "}
          Benefit and Culture of our Institute
        </h1>
      </div>
      <div className="flex items-center p-10 mb-8 bg-yellow-100 ">
        <ChevronLeftIcon
          className="w-10 opacity-50 hover:opacity-100 cursor-pointer"
          onClick={sliderLeft}
        />
        <div
          id="slider"
          className="overflow-x-scroll whitespace-nowrap scroll flex w-full py-2"
        >
          {data.map((item) => (
            <div
              className="bg-white grid m-2 mx-4 cursor-pointer hover:scale-105 ease-in-out duration-300 justify-items-center rounded-md shadow-2xl "
              data-aos="zoom-in"
              key={item.title}
            >
              <item.icon className=" h-24 w-24 inline-block p-2 cursor-pointer hover:scale-105 ease-in-out duration-300 text-yellow-800" />
              <h2 className="font-bold text-2xl p-4">{item.title}</h2>
              <div className="inline-block p-4 whitespace-normal text-sm">
                {item.desc}
              </div>
            </div>
          ))}
        </div>

        <ChevronRightIcon
          className="h-10 w-10 opacity-50 hover:opacity-100 cursor-pointer"
          onClick={sliderRight}
        />
      </div>
    </>
  );
}

export default WhyUS;
