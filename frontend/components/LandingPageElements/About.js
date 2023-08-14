import React from "react";
import Lottie from "lottie-react";
import eye from "public/lottie/eye.json";
import aim from "public/lottie/aim.json";
import mission from "public/lottie/mission.json";
function About() {
  return (
    <div>
      <div className="text-center mt-5">
        <h1 className="font-bold text-2xl lg:text-4xl text-[#510505] font-serif underline underline-offset-4">
          About Us
        </h1>
        <div className="text-center">
          <div className="text-center">
            <p className="px-5 md:px-10 pt-10 pb-28 md:indent-5 text-justify md:text-center">
              The Training and Placement cell of NIT PATNA forms an integral
              part in shaping the careers of the students of the institute. It
              organizes and coordinates campus placement program to fulfill its
              commitment of a job to every aspirant. Not only that it also
              encourages and works towards the continuing education for the
              college employees. National Institute of Technology, Patna , also
              known as NIT Patna, is an Institute of National Importance . NIT
              Patna marked its humble beginning in 1886 and it is the 6th Oldest
              Engineering Institute of India.
            </p>
          </div>
        </div>
      </div>
      {/* Corousal ends */}

      <div className=" after:bg-[#510505] relative z-[3] top-16">

        <div className=" m-auto relative bg-[#ffa500] flex justify-center items-center w-4/5 h-[3rem] shadow-custOne after:content-[''] after:border-[1.5rem] after:border-[#ffa500] after:border-solid after:relative after:bottom-[-1.43rem] after:z-[-2] after:pl-[0.6rem] after:right-[-2rem] after:border-r-[1.4rem] after:border-r-transparent after:shadow-custTwo before:content-[''] before:border-[1.5rem] before:border-[#ffa500] before:border-solid before:relative before:bottom-[-1.43rem] before:z-[-2] before:pr-[0.6rem] before:left-[-2rem] before:border-l-[1.4rem] before:border-l-transparent before:shadow-custTwo">

          {/* innerShield */}
          <div className="relative z-3 w-full h-4/5 flex py-2 justify-center items-center border-y-[0.09rem] border-dashed border-[#df8a34]" >

            {/* content */}
            <p className=" text-white text-xl font-semibold after:absolute after:content-[''] after:bottom-[-1.8rem] after:z-[-1] after:border-[0.7rem] after:border-solid after:left-[-3.3rem] after:border-t-[#c37322] after:border-r-[#c37322] after:border-b-transparent after:border-l-transparent before:border-t-[#c37322] before:border-r-transparent before:border-b-transparent before:border-l-[#c37322] before:absolute before:right-[-3.3rem] before:z-[-1] before:border-[0.7rem] before:border-solid before:content-[''] before:bottom-[-1.8rem]">
              Vision
            </p>
          </div>
        </div>
    </div>

      <div className="bg-[#510505] text-white pb-20">
        <div className="text-center py-10">
          
          {/* here the changes are needed [pending] */}
          {/* contentBox */}
          {/* bg-[#f6a655] */}
          

         


          <h1 className="text-4xl  mx-auto leading-normal relative top-[3rem] font-bold mb-9">
            {" "}
            Our Aim, Mission and Vision
          </h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 max-w-5xl mx-auto gap-10 group place-items-center">
          <div className="bg-white/10  hover:!blur-none mx-5 md:mx-0 cursor-pointer p-8 rounded-sm  flex flex-col place-items-center  group-hover:scale-[0.85] hover:!scale-100">
            <div className="flex justify-center ">
              <Lottie
                animationData={aim}
                className="flex justify-center items-center"
                loop={true}
              />
            </div>
            <h4 className="text-xl font-bold p-3">AIM</h4>
            <p className="text-sm text-justify leading-7 my-3 font-light opacity-50">
              The students of National institute of technology have been
              recruited in several international conglomerates along with indian
              corporations and have proved to be a great assets to the
              organizations they joined.
            </p>
          </div>
          <div className="grid place-items-center bg-white/10 cursor-pointer mx-5 md:mx-0 p-8 rounded-sm  hover:!blur-none group-hover:scale-[0.85] hover:!scale-100">
            <div className="flex justify-center">
              {/* <PaperAirplaneIcon className="h-20 w-20 rotate-45 m-4 text-yellow-300" /> */}
              <Lottie
                animationData={mission}
                className="flex justify-center items-center w-1/2"
                loop={true}
              />
            </div>
            <h4 className="text-xl font-bold p-3">Mission</h4>
            <p className="text-sm text-justify leading-7 my-3 font-light opacity-50">
              To achieve 100% placement for students through dedication,
              attitude and complete involvement is our mission. T&P Cell NIT
              Patna arranges and coordinates various programmes that aim at
              moulding the students so as to meet the industry expectations in
              career building and in turn bring laurels to the parent
              institution. Inviting corporations for pre-placement talks on the
              campus followed by final placements, and overseeing the process to
              its end,is the responsibility of the T&P Cell.
            </p>
          </div>
          <div className="grid place-items-center bg-white/10  cursor-pointer p-8 mx-5 md:mx-0 rounded-sm  hover:!blur-none group-hover:scale-[0.85] hover:!scale-100">
            <div className="flex justify-center">
              {/* < <LightBulbIcon className="h-20 w-20 white m-4 text-yellow-300" />> */}
              <Lottie
                animationData={eye}
                className="flex justify-center items-center w-1/2"
                loop={true}
              />
            </div>
            <h4 className="text-xl font-bold p-3">Vision</h4>
            <p className="text-sm text-justify leading-7 my-3 font-light opacity-50">
              To develop national and international links with the business
              organizations to be able to create meaningful relationship &
              opportunities for the placement of the students in the global job
              markets. Equipping the students with relevant and conceptualized
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
