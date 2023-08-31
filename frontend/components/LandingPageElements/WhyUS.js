import {React, useEffect} from 'react'
import {
  ChevronLeftIcon, ChevronRightIcon,
  AcademicCapIcon,
  CodeIcon,
  DesktopComputerIcon,
  SortAscendingIcon,
  OfficeBuildingIcon,
  ClockIcon,
} from '@heroicons/react/solid'
import AOS from 'aos';
import 'aos/dist/aos.css'
import Lottie from "lottie-react";
import culture from '/public/lottie/culture.json'
import coding from '/public/lottie/coding.json'
import workshop from '/public/lottie/workshop.json'
import technical from '/public/lottie/technical.json'
import faculty from 'public/lottie/faculty.json'
import allRoundDevelopment from 'public/lottie/allRoundDevelopment.json'
const data = [
  {
    // icon: AcademicCapIcon,
    icon:culture,
    title: 'Best of the best make it!!',
    desc: 'The students are admitted through the esteemed JEE Mains and represents the Top 2% of the candidates that appear for the exam nationwide, they are handpicked from the garden of knowledge and critical thinking. These students are enriched with both qualitative and quantitative skills, thus they make up for the best in class.',
  },
  {
    icon: coding,
    title: 'Coding Culture',
    desc: 'Students from NIT Patna dominate the leader boards of Codechef, Codeforces, Hackerrank, Leetcode etc. Our Coding clubs regularly organize coding competitions on various platforms to help the students strengthen their coding skills. The Google Developer Student Clubs (DSC) of NIT Patna and the Hackslash Club powered by Mozilla frequently organize workshops on trending technologies in Machine learning and Web/Android Development.',
  },
  {
    icon: workshop,
    title: 'Workshop and Industrial',
    desc: 'NIT Patna regularly conducts workshops, industrial lectures and Conferences for Mechanical, Civil, Electrical, Electronics and Computer Science Departments. Students get to interact with pioneers in the respective fields which not only helps them to find their interest but also helps them to choose better career options. Some of the latest workshops and conferences include “Soft computing techniques”, “International Conference on renewable resources”, “Aatmanirbhar Bharat: A road-map for inclusive growth” and “Deep learning and its applications”.',
  },
  {
    icon: technical,
    title: 'Technical Clubs',
    desc: 'NIT Patna technical clubs provide expertise and intercollegiate contests. The American Society of Student Section (ASME) of NIT Patna and the SAE club hold regular training and workshops for mechanical engineering. The IEEE student branch regularly hosts distinguished lectures , hardware hackathons and problem solving using R&D, IoT etc. The ISIE (Imperial Society of Innovative Engineers ) India NIT Patna works on renewable sources of energy. The CESC clubs conducts AutoCAD, design and drafting etc workshops for Civil engineering students.',
  },
  {
    icon: faculty,
    title: 'World Class Faculty!',
    desc: 'NIT Patna is constituted by the best faculties of India who hold exceptional teaching skills and methodologies. Apart from delivering quality education, they motivate students to engage in cutting edge research and are highly inclined towards ideation and innovation',
  },
  {
    icon: allRoundDevelopment,
    title: 'All Round Development',
    desc: 'Participation in Extracurricular Activities throughout the year leads to 360 degree development of an individual. Our annual technical and cultural fest, Corona and Melange, lets the students prepare hard and show their extra curricular skills. Students also participate in NSS and NCC and spread awareness in the society.',
  },

]

function WhyUS() {
  useEffect(() => {
    AOS.init({ duration: 1000 })
  }, [])
  const sliderLeft = () => {
    var slider = document.getElementById('slider')
    slider.scrollLeft = slider.scrollLeft - 500
  }
  const sliderRight = () => {
    var slider = document.getElementById('slider')
    slider.scrollLeft = slider.scrollLeft + 500
  }

  return (
    <>
      <div className='text-center py-10 '>
        <h5 className=' text-yellow-600 m-6 text-sm' data-aos='fade-in'> Why Recruit at NIT Patna?</h5>
        <h1 className='text-4xl w-[60%] mx-auto leading-normal  font-bold mb-12 text-red-900' data-aos='zoom-in-up'> Benefit and Culture of our Institute</h1>
      </div>
      <div className='flex items-center py-10 '>
        <ChevronLeftIcon className='w-10 opacity-50 hover:opacity-100 cursor-pointer' onClick={sliderLeft} />
        <div id='slider' className="overflow-x-scroll whitespace-nowrap  no-scrollbar flex w-screen py-2">
          {data.map((item) => (
            <div className='bg-white/10 grid my-2 mx-4 cursor-pointer hover:scale-105 ease-in-out duration-300 justify-items-center rounded-md shadow-2xl ' data-aos='zoom-in' key={item.title}>

              {/* <item.icon className=' h-24 w-24 inline-block p-2 cursor-pointer hover:scale-105 ease-in-out duration-300 text-red-900' /> */}
              <Lottie
                animationData={item.icon}
                className="flex justify-center items-center w-1/2"
                loop={true}
              />
              <h2 className='font-bold text-2xl w-[20rem] text-center text-red-900'>{item.title}</h2>
              <p className='inline-block p-4 whitespace-normal text-sm text-slate-600 text-justify'>{item.desc}</p>
            </div>
          ))
          }
        </div>

        <ChevronRightIcon className='h-10 w-10 opacity-50 hover:opacity-100 cursor-pointer' onClick={sliderRight} />
      </div>
    </>
  )
}

export default WhyUS
