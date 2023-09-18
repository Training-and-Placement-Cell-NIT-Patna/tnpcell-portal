import { useState } from "react";
import Image from "next/image";
import React from "react";
import Link from "next/link";

function Nav2() {

    const MENU_LIST = [
        {
            idx: 1,
            text: "About",
            href: "#about",
        },
        {
            idx: 2,
            text: "Login",
            href: "/loginPage",
        },
        {
            idx: 3,
            text: "Why Recruit us?",
            href: "#WhyUS",
        },
        {
            idx: 4,
            text: "Process",
            href: "#process",
        },
        {
            idx: 5,
            text: "Contact Us",
            href: "/contactus",
        },
    ];

    // let Login = MENU_LIST[1];

    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div className={"w-[100%] bg-transparent sm:fixed sm:top-6 z-[90] h-15 "}>
                <div className={"h-[100%] bg-red-950 sm:bg-transparent flex flex-col items-center justify-between sm:justify-evenly m-auto"}>
                    <div className={"flex w-[100%] h-[100%] items-center justify-between sm:justify-evenly "}>
                        <div className={"h-full sm:h-[4.5rem] pt-2 sm:pt-0 flex items-center justify-center w-[11%] mx-4 lg:mx-0"}>
                            <Image
                                width={55}
                                height={55}
                                alt="NIT Patna"
                                src="/images/logo.png"
                                className="w-[90%] h-[90%]"
                            />

                        </div>


                        <div className={"border h-[3rem] w-[12%] sm:w-[61%] md:w-[54%] lg:w-[42%] flex items-center justify-center border-solid border-transparent sm:backdrop-blur-2xl rounded-3xl"}>


                            <div className={"absolute hidden sm:flex px-5 h-[1.4rem] overflow-y-hidden "}>

                                {MENU_LIST.map((ele) => {
                                    return (
                                        (ele.idx != 2) ? (<p key={ele.idx} className={`flex h-[3.5rem] overflow-y-hidden text-[rgba(0,0,0,.6)] lg:text-normal hover:text-black transition duration-[450ms] ease-out [&:nth-child(n)]:hover:translate-y-[-1.5rem] flex-col  mx-2 my-auto cursor-pointer `}>
                                            <Link href={ele.href} id={ele.idx} className={" text-[1rem] lg:text-sm  "}>
                                                {ele.text}
                                            </Link>
                                            <Link href={ele.href} id={ele.idx} className={"text-[100%]"}>
                                                {ele.text}
                                            </Link>
                                        </p>) : null
                                    )
                                })}
                            </div>


                            <div className="flex sm:hidden h-[100%] pt-2 sm:h-auto">
                                <button
                                    onClick={() => setIsOpen(!isOpen)}
                                    type="button"
                                    className=" inline-flex items-center justify-center p-2 rounded-md text-yellow-500 hover:text-white focus:text-white hover:bg-yellow-600 focus:border-2 focus:border-solid focus:rounded-3xl focus:ring-offset-2 focus:border-yellow-500"
                                    aria-controls="mobile-menu"
                                    aria-expanded="false"
                                >
                                    <span className="sr-only">Open main menu</span>
                                    {!isOpen ? (
                                        <svg
                                            className="block h-6 w-6"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            aria-hidden="true"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M4 6h16M4 12h16M4 18h16"
                                            />
                                        </svg>
                                    ) : (
                                        <svg
                                            className="block h-6 w-6"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            aria-hidden="true"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>
                        <Link href="/loginPage" className="cursor-pointer">
                            <div className="cursor-pointer hidden sm:flex rounded-3xl hover:bg-amber-300 bg-amber-500 w-[12%] sm:w-[12%] justify-center items-center h-[100%]  p-3 border-2 border-white font-semibold text-sm">
                                <div className={" h-[1.3rem] overflow-y-hidden"}>
                                    <div className={" h-[2.4rem] transition duration-[450ms] ease-in-out flex flex-col hover:translate-y-[-1.4rem] "}>
                                        <span className={" text-[rgba(0,0,0,.6)]"}>Login</span>
                                        <span className={"text-black"}>Login</span>
                                    </div>
                                </div>
                            </div>
                        </Link>

                    </div>

                    {isOpen ? (
                        <>
                            <div className={"w-[100%]  sm:hidden h-[12rem] overflow-y-hidden flex m-auto border-5 border-solid rounded-3xl"}>
                                <div className="flex  flex-col justify-evenly  relative z-50 w-[100%]">
                                    <div className="bg-red-950">
                                        {MENU_LIST.map((menu) => (

                                            <div className={"h-[1.5rem] m-2 overflow-y-hidden"}>
                                                <p className={`flex h-[3.9rem] overflow-y-hidden text-[#858383] lg:text-normal hover:text-white transition duration-[450ms] ease-out [&:nth-child(n)]:hover:translate-y-[-1.5rem] flex-col  mx-2 my-auto cursor-pointer `}>
                                                    <Link href={menu.href} key={menu.idx} className={" text-[1rem] lg:text-sm  "}>
                                                        {menu.text}
                                                    </Link>
                                                    <Link href={menu.href} key={menu.idx} className={"text-[100%]"}>
                                                        {menu.text}
                                                    </Link>
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : null}

                </div>
                {/*Thinghs to be at the down*/}




            </div>
        </>
    )

}


export default Nav2;