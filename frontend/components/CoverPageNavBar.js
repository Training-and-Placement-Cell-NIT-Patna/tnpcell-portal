import React, { useState } from 'react'
import Link from 'next/link';
import Image from 'next/image';
function CoverPageNavBar() {
    const MENU_LIST = [
        {
            idx: 1,
            text: "About",
            href: "/#about",
        },
        {
            idx: 2,
            text: "Login",
            href: "/loginPage",
        },
        {
            idx: 3,
            text: "Why Recruit us?",
            href: "/#WhyUS",
        },
        {
            idx: 4,
            text: "Process",
            href: "/#process",
        },
        {
            idx: 5,
            text: "Contact Us",
            href: "/contactus",
        },
    ];
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <div className="top-0 z-50 ">
                <div>
                    <div className="mx-auto z-50 bg-[#2c0707] p-1 flex justify-between w-screen">
                        <div className="flex cursor-pointer">
                            <Link href="">
                                <Image
                                    width={50}
                                    height={50}
                                    alt="NIT Patna"
                                    src="/images/logo.png"
                                    className="w-full"
                                />
                            </Link>
                            <Link href="/">
                                <h1 className=" font-serif font-extrabold sm:text-2xl p-1 sm:p-2 flex items-center min-h-14 text-white ">
                                    Training and Placement Cell
                                </h1>
                            </Link>
                        </div>

                        <div className="hidden lg:block h-10">
                            <div className="flex flex-row-reverse items-center my-2 mr-5">
                                {MENU_LIST.map((menu) => {
                                    return (
                                        <Link href={menu.href} key={menu.idx}>
                                            <p className="text-[#858383] hover:bg-[#67101075] cursor-pointer self-center p-3 rounded-md text-sm font-medium hover:text-yellow-200">
                                                {menu.text}
                                            </p>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="flex lg:hidden ">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                type="button"
                                className=" inline-flex items-center justify-center p-2 rounded-md text-yellow-500 hover:text-white focus:text-white hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-yellow-600 focus:ring-red-900"
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
                    {isOpen ? (
                        <>
                            <div className="lg:hidden relative h-10 z-50 bg-red-950">
                                <div className="">
                                    {MENU_LIST.map((menu) => (
                                        <Link href={menu.href} key={menu.idx}>
                                            <p className="text-[#858383] bg-red-950 self-center p-3 text-sm font-medium hover:text-yellow-200">
                                                {menu.text}
                                            </p>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </>
                    ) : null}
                </div>
            </div>
        </>
    )
}

export default CoverPageNavBar