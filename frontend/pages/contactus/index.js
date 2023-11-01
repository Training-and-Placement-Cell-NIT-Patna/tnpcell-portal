import React, { useEffect, useState } from "react";
import { API_URL } from "../../config";
import Image from "next/image"
import Head from "next/head";
import CardComp from "@/components/contactus/CardComp";
import { BsLinkedin, BsTwitter } from 'react-icons/bs'
import { MdCall } from "react-icons/md";
import { HiMail } from "react-icons/hi";
import CoverPageNavBar from "@/components/CoverPageNavBar";
function ContactUS() {
    const [coordinators, setCoordinators] = useState([])
    const [year, setYear] = useState('2023')
    const getCoordinatorsInfo = async () => {
        try {
            const res = await fetch(`${API_URL}/api/coordinators/year/${year}`);
            const data = await res.json();
            setCoordinators(data)
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        getCoordinatorsInfo()
    }, [year])
    return (
        <div >
            <Head>
                <title>Contact US</title>
            </Head>
            <CoverPageNavBar />
            {/*Image goes here*/}

            <div className=" m-4 shadow-2xl">
                <div className={"m-2  relative pt-9"}>
                    <h1 className="text-3xl sm:text-4xl  font-bold text-center text-red-900 m-8">
                        Training and Placement Officers
                    </h1>
                    <div className=" relative w-[100%] h-[85vh] sm:h-[80vh] md:h-[40rem] lg:h-[20rem] flex flex-wrap justify-center p-2  md:divide-x-1  m-auto  ">
                        <div className="  w-[500px] relative h-[50%] lg:h-[100%] p-2 ">

                            {/*card*/}
                            <div className=" transition ease-in-out duration-300 hover:translate-y-[-0.3rem] bg-[url('../public/images/Samart_mr.JPG')] bg-center bg-no-repeat w-3/4 mx-auto h-full bg-cover border-0 border-neutral rounded-xl">
                                {/*</Image src={"/../public/images/deepak.jpg"}  width={"180rem"} height={"180rem"}></Image>*/}
                                <div className={"bg-black transition ease-in-out duration-500 font-sans opacity-0 hover:opacity-100 hover:bg-opacity-75 w-full h-full text-white flex flex-col items-center justify-center border-[1px] border-black border-solid rounded-lg profileDetails"}>

                                    <div className={"flex flex-wrap animate-appear"}>
                                        <a href={"tel:+91 9771005232"} className={" border-[0.2rem] border-solid rounded-[50%] mx-2 w-9 h-9 border-white hover:text-[#ffa500] hover:bg-white hover:border-[#ffa500] hover:rotate-[360deg] transition duration-500 ease-in-out flex items-center justify-center"}><MdCall className={"w-[80%] h-[80%]"} />
                                        </a>

                                        <a href={"mailto:samrat@nitp.ac.in"} className={"border-[0.2rem] border-solid rounded-[50%] mx-2 w-9 h-9 border-white hover:text-[#ffa500] hover:bg-white hover:border-[#ffa500] hover:rotate-[360deg] transition duration-500 ease-in-out flex items-center justify-center"}><HiMail className={"w-[80%] h-[80%]"} /></a>
                                    </div>
                                    <p className=" text-[0.8rem] md:text-sm py-2 sm:py-0 sm:p-1 text-white font-bold animate-appear ">Dr. Samart Mukherjee</p>
                                    <p className={" text-[0.8rem] md:text-sm  md:p-1 animate-appear"}>Prof. Incharge, T&P Cell NIT Patna</p>
                                </div>

                            </div>

                        </div>

                        <div className="  w-[500px] relative p-2  h-[50%] lg:h-[100%]">
                            {/*card*/}
                            <div className=" transition ease-in-out duration-300 hover:translate-y-[-0.3rem] bg-[url('../public/images/Shailesh_sir.JPG')] bg-center bg-no-repeat w-3/4 mx-auto h-full lg:h-full bg-cover border-0 border-neutral rounded-xl">                        {/*</Image src={"/../public/images/deepak.jpg"}  width={"180rem"} height={"180rem"}></Image>*/}
                                <div className={"bg-black transition ease-in-out duration-500 font-sans  opacity-0 hover:opacity-100 hover:bg-opacity-75 w-full h-full text-white flex flex-col items-center justify-center border-[1px] border-black border-solid rounded-lg profileDetails"}>

                                    <div className={"flex flex-wrap animate-appear"}>
                                        <a href={"tel:+91 8750111166"} className={" border-[0.2rem] border-solid rounded-[50%] mx-2 w-9 h-9 border-white hover:text-[#ffa500] hover:bg-white hover:border-[#ffa500] hover:rotate-[360deg] transition duration-500 ease-in-out flex items-center justify-center"}><MdCall className={"w-[80%] h-[80%]"} />
                                        </a>

                                        <a href={"mailto:smp.me@nitp.ac.in"} className={"border-[0.2rem] border-solid rounded-[50%] mx-2 w-9 h-9 border-white hover:text-[#ffa500] hover:bg-white hover:border-[#ffa500] hover:rotate-[360deg] transition duration-500 ease-in-out flex items-center justify-center"}><HiMail className={"w-[80%] h-[80%]"} /></a>
                                    </div>
                                    <p className="text-sm p-1 text-white font-bold animate-appear ">Dr. Shailesh M Pandey</p>
                                    <p className={"text-sm p-1 animate-appear"}>T&P Officer NIT Patna</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*end*/}
                </div>
                {/* Training and Placement Officers */}
                <div className={"m-1 relative pt-9"}>
                    <h1 className="text-3xl sm:text-4xl  font-bold text-center text-red-900 m-4">
                        Training and Placement Officers
                    </h1>
                    <div className=" relative w-[100%] h-[30rem] md:h-[40rem] lg:h-[20rem] flex flex-wrap justify-center p-2  md:divide-x-1  m-auto  ">
                        <div className="  w-[500px] relative  h-[50%] lg:h-[100%]  p-2 ">

                            {/*card*/}
                            <div className=" transition ease-in-out duration-300 hover:translate-y-[-0.3rem] bg-[url('../public/images/deepak.jpg')] bg-center bg-no-repeat w-3/4 mx-auto h-full bg-cover border-0 border-neutral rounded-xl">
                                {/*</Image src={"/../public/images/deepak.jpg"}  width={"180rem"} height={"180rem"}></Image>*/}
                                <div className={"bg-black transition ease-in-out duration-500 font-sans opacity-0 hover:opacity-100 hover:bg-opacity-75 w-full h-full text-white flex flex-col items-center justify-center border-[1px] border-black border-solid rounded-lg profileDetails"}>

                                    <div className={"flex flex-wrap animate-appear"}>
                                        <a href={"tel:+91 7070701742"} className={" border-[0.2rem] border-solid rounded-[50%] mx-2 w-9 h-9 border-white hover:text-[#ffa500] hover:bg-white hover:border-[#ffa500] hover:rotate-[360deg] transition duration-500 ease-in-out flex items-center justify-center"}><MdCall className={"w-[80%] h-[80%]"} />
                                        </a>

                                        <a href={"mailto:office.tnp@nitp.ac.in"} className={"border-[0.2rem] border-solid rounded-[50%] mx-2 w-9 h-9 border-white hover:text-[#ffa500] hover:bg-white hover:border-[#ffa500] hover:rotate-[360deg] transition duration-500 ease-in-out flex items-center justify-center"}><HiMail className={"w-[80%] h-[80%]"} /></a>
                                    </div>
                                    <p className="text-sm p-1 text-white font-bold animate-appear ">Mr Deepak Kumar</p>
                                    <p className={"text-[0.8rem] font-medium px-2 animate-appear"}>Computer Operator,T&P Cell NIT Patna</p>
                                </div>

                            </div>
                        </div>
                        <div className="  w-[500px] relative p-2  h-[50%] lg:h-[100%]">
                            {/*card*/}
                            <div className=" transition ease-in-out duration-300 hover:translate-y-[-0.3rem] bg-[url('../public/images/chandan.jpg')] bg-center bg-no-repeat w-3/4 mx-auto h-full lg:h-full bg-cover border-0 border-neutral rounded-xl">                        {/*</Image src={"/../public/images/deepak.jpg"}  width={"180rem"} height={"180rem"}></Image>*/}
                                <div className={"bg-black transition ease-in-out duration-500 font-sans  opacity-0 hover:opacity-100 hover:bg-opacity-75 w-full h-full text-white flex flex-col items-center justify-center border-[1px] border-black border-solid rounded-lg profileDetails"}>

                                    <div className={"flex flex-wrap animate-appear"}>
                                        <a href={"tel:+91 9155494408"} className={" border-[0.2rem] border-solid rounded-[50%] mx-2 w-9 h-9 border-white hover:text-[#ffa500] hover:bg-white hover:border-[#ffa500] hover:rotate-[360deg] transition duration-500 ease-in-out flex items-center justify-center"}><MdCall className={"w-[80%] h-[80%]"} />
                                        </a>

                                        <a href={"mailto:office.tnp@nitp.ac.in"} className={"border-[0.2rem] border-solid rounded-[50%] mx-2 w-9 h-9 border-white hover:text-[#ffa500] hover:bg-white hover:border-[#ffa500] hover:rotate-[360deg] transition duration-500 ease-in-out flex items-center justify-center"}><HiMail className={"w-[80%] h-[80%]"} /></a>
                                    </div>
                                    <p className="text-sm p-1 text-white font-bold animate-appear ">Mr Chandan Kumar</p>
                                    <p className={"text-sm p-1 animate-appear"}>Assistant, T&P Cell NIT Patna</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*end*/}
                </div>
                {/* Training and Placement Coordinators */}
                <div className=" px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-10">
                    <h1 className="text-3xl sm:text-4xl  font-bold text-center text-red-900 m-8">
                        Training and Placement Coordinators
                    </h1>

                    <div className={"pt-12"}>
                        <label htmlFor="" className="px-2 ">Year</label>
                        <select onChange={(e) => setYear(e.target.value)} className="border-2 w-1/2 max-w-xs">
                            <option selected value="2023">2023</option>
                            <option value="2022">2022</option>
                            <option>2021</option>
                            <option>2020</option>
                            <option>2019</option>
                        </select>
                    </div>
                </div>
                <div>
                    <div className=" px-4 py-8 mx-auto  sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-7">
                        {/*<div className="grid gap-10  sm:grid-cols-2 lg:grid-cols-4">*/}
                        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">

                            {coordinators?.map((data) => {
                                return (
                                    <div key={data.id} className={""}>
                                        <div>
                                            <div className="relative overflow-hidden transition duration-300 transform rounded shadow-lg lg:hover:-translate-y-2 hover:shadow-2xl">
                                                <img
                                                    className="object-cover mx-auto w-full h-64 md:h-64 xl:h-80"
                                                    src={`${API_URL}${data?.image?.url}`}
                                                    alt="Person"
                                                />
                                                <div className="absolute inset-0 flex flex-col justify-center px-5 py-4 text-center transition-opacity duration-300 bg-black bg-opacity-75 opacity-0 hover:opacity-100">
                                                    <p className="mb-1 text-lg font-bold text-gray-100">{data.name}</p>
                                                    <p className="mb-4 text-xs text-gray-100">{data.email}</p>
                                                    <p className="mb-4 text-xs text-gray-100">{data.mobile}</p>
                                                    <p className="mb-4 text-xs tracking-wide text-gray-400">
                                                        {/* {data.about} */}
                                                    </p>
                                                    <div className="flex items-center justify-center space-x-3">
                                                        <a
                                                            href={data?.twitter}
                                                            className="text-white transition-colors duration-300 hover:text-teal-accent-400"
                                                        >
                                                            <BsTwitter />
                                                        </a>
                                                        <a
                                                            href={data?.linkedin}
                                                            className="text-white transition-colors duration-300 hover:text-teal-accent-400"
                                                        >
                                                            <BsLinkedin />
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>)
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContactUS;
