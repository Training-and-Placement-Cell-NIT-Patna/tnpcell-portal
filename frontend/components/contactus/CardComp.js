import { API_URL } from '@/config/index';
import React from 'react'
import { BsLinkedin, BsTwitter } from 'react-icons/bs'

function CardComp({ data }) {
    console.log("this is cardcomp",data)
    const {name ,email,mobile ,image} = data;
    
     return (
        <>
            <div>
                <div className="relative overflow-hidden transition duration-300 transform rounded shadow-lg lg:hover:-translate-y-2 hover:shadow-2xl">
                    <img
                        className="object-cover w-full h-64 md:h-64 xl:h-80"
                        src={`${API_URL}${data.image.url}`}
                        alt="Person"
                    />
                    <div className="absolute inset-0 flex flex-col justify-center px-5 py-4 text-center transition-opacity duration-300 bg-black bg-opacity-75 opacity-0 hover:opacity-100">
                        <p className="mb-1 text-lg font-bold text-gray-100">{data.name}</p>
                        <p className="mb-4 text-xs text-gray-100">{}</p>
                        <p className="mb-4 text-xs text-gray-100">{mobile}</p>
                        <p className="mb-4 text-xs tracking-wide text-gray-400">
                            {/* {data.about} */}
                        </p>
                        <div className="flex items-center justify-center space-x-3">
                            <a
                                // href={data.twitter}
                                className="text-white transition-colors duration-300 hover:text-teal-accent-400"
                            >
                                <BsTwitter />
                            </a>
                            <a
                                // href={data.linkedin}
                                className="text-white transition-colors duration-300 hover:text-teal-accent-400"
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
            </div>

        </>
    )
}

export default CardComp