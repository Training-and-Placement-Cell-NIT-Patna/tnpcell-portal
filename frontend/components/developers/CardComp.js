import React from "react";
import { BsTwitter, BsLinkedin, BsGithub } from "react-icons/bs";
function CardComp({ data }) {
  return (
    <>
      <div className="relative mx-auto  sm:ml-0 w-[80%] sm:w-full overflow-hidden transition duration-300 transform rounded shadow-lg lg:hover:-translate-y-2 hover:shadow-2xl">
        <img
          align={""}
          className="object-cover sm:px-0 sm:object-cover w-full h-64 md:h-64 xl:h-80"
          src={data.image}
          alt="Person"
        />
        <div className="absolute inset-0 flex flex-col justify-center px-5 py-4 text-center transition-opacity duration-300 bg-black bg-opacity-75 opacity-0 hover:opacity-100">
          <p className="mb-1 text-lg font-bold text-gray-100">{data.name}</p>
          <p className="mb-4 text-xs text-gray-100">{data.role}</p>
          <p className="mb-4 text-xs tracking-wide text-gray-400">
            {data.about}
          </p>
          <div className="flex items-center justify-center space-x-3">
            <a
              href={data.twitter}
              className="text-blue-500 transition-colors duration-300 hover:text-teal-accent-400"
            >
              <BsTwitter />
            </a>
            <a
              href={data.linkedin}
              className="text-blue-500 transition-colors duration-300 hover:text-teal-accent-400"
            >
              <BsLinkedin />
            </a>
            {/* <a
                href={data.github}
                className="text-white transition-colors duration-300 hover:text-teal-accent-400"
              >
                <BsGithub />
              </a> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default CardComp;
