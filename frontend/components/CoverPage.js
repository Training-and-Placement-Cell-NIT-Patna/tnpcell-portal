import { React, useState, useEffect, useRef } from "react";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  DocumentDownloadIcon,
} from "@heroicons/react/outline";
import About from "./LandingPageElements/About";
import Footer from "./LandingPageElements/Footer";
import Process from "./LandingPageElements/Process";
import WhyUS from "./LandingPageElements/WhyUS";
import { Typewriter } from "react-simple-typewriter";
import Image from "next/image";
import Link from "next/link";
import ProfessorIncharge from "./LandingPageElements/ProfessorIncharge";
import Statics from "./LandingPageElements/Statics";
import CompaniesMarquee from "./LandingPageElements/CompaniesMarquee";

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

const carouselImage = [
  "/images/img1.jpg",
  "/images/img2.jpg",
  "/images/img3.jpg",
  "/images/img4.jpg",
];

function CoverPage() {
  let i = 0;

  const [currentIndex, setCurrentIndex] = useState(0);

  const slideRef = useRef();

  const removeAnimation = () => {
    slideRef.current.classList.remove("fade-anim");
  };
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    slideRef.current.addEventListener("animationend", removeAnimation);
    startSlider();
  }, []);

  const startSlider = () => {
    setInterval(() => {
      handleOnNextClick();
    }, 5000);
  };

  const handleOnNextClick = () => {
    i = (currentIndex + carouselImage.length + 1) % carouselImage.length;
    setCurrentIndex(i);
    slideRef.current?.classList.add("fade-anim");
  };

  const handleOnPrevClick = () => {
    i = (currentIndex + carouselImage.length - 1) % carouselImage.length;
    setCurrentIndex(i);
    slideRef.current.classList.add("fade-anim");
  };
  return (
    <>
      <div className=" top-0 z-50">
        <div className="">
          <div className=" mx-auto z-50 bg-[#2c0707]  p-1 flex justify-between w-screen">
            <div className="flex">
              <Image
                width={50}
                height={50}
                alt="NIT Patna"
                src="/images/logo.png"
                className="sm:pb-1"
              />

              <div className=" font-serif font-extrabold text-lg sm:text-2xl p-1 sm:p-2 flex items-center min-h-14 text-white ">
                Training and Placement Cell
              </div>
            </div>

            <div className="hidden lg:block h-10">
              <div className="flex flex-row-reverse items-center my-2 mr-5">
                {MENU_LIST.map((menu) => {
                  return (
                    <>
                      <a href={menu.href} key={menu.idx}>
                        <p className="text-[#858383] hover:bg-[#67101075] self-center p-3 rounded-md text-sm font-medium hover:text-yellow-200">
                          {menu.text}
                        </p>
                      </a>
                    </>
                  );
                })}
              </div>
            </div>
            <div className="flex lg:hidden ">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className=" inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
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
              <div className="md:hidden relative h-10 z-50 bg-red-950">
                <div className="">
                  {MENU_LIST.map((menu) => (
                    <a href={menu.href} key={menu.idx}>
                      <p className="text-[#858383] bg-red-950 self-center p-3 text-sm font-medium hover:text-yellow-200">
                        {menu.text}
                      </p>
                    </a>
                  ))}
                </div>
              </div>
            </>
          ) : null}
        </div>
      </div>
      <main>
        {/* carousel  start */}
        <div ref={slideRef} className="w-full select-none">
          <div className="aspect-w-16 aspect-h-7">
            <img src={carouselImage[currentIndex]} alt="" />
            <div className="absolute top-3/4 w-full">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 150">
                <path
                  fill="#820000"
                  fillOpacity="1"
                  d="M0,64L1440,140L1440,320L0,320Z"
                ></path>
              </svg>
            </div>
            <div className="absolute top-3/4 mt-4">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 150">
                <path
                  fill="#ffff"
                  fillOpacity="1"
                  d="M0,64L1445,150L1440,320L0,320Z"
                ></path>
              </svg>
            </div>
            {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#2c0707" fill-opacity="1" d="M0,96L1440,0L1440,0L0,0Z"></path></svg> */}
          </div>
          <div className="absolute top-1/4 flex w-full justify-between items-center">
            <div className=" bg-black/50 md:p-10 w-1/3 h-1/2 md:h-1/4">
              <h1 className="text-white font-bold text-md md:text-4xl">
                <Typewriter
                  words={[
                    "Welcome to",
                    "Training and Placement Cell",
                    "NIT Patna",
                  ]}
                  cursor={true}
                  cursorColor="#F9F54B"
                  loop={5}
                  typeSpeed={70}
                  deleteSpeed={50}
                />
              </h1>
            </div>
            <div className="hidden lg:block md:mr-10 w-1/3 md:w-1/6">
              <div className="rounded-lg bg-amber-400 m-2 p-3 border-2 border-white font-semibold text-sm">
                <Link href="/loginPage">Login</Link>
              </div>
              <div className="rounded-lg bg-amber-400 m-2 p-3 border-2 border-white font-semibold text-sm">
                <Link href="/loginPage">Student Registration</Link>
              </div>
              <div className="rounded-lg bg-amber-400 m-2 p-3 border-2 border-white font-semibold text-sm">
                <Link href="/account/RecruiterSignUp">Company Registration</Link>
              </div>
            </div>
          </div>
          <div className="absolute top-1/2 transform -translate-y-1.2 w-full px-3 justify-between items-center hidden md:flex">
            <button onClick={handleOnPrevClick} type="button">
              <ChevronDoubleLeftIcon className="w-7 h-7 text-white bg-gray-800 rounded-full p-1" />
            </button>
            <button onClick={handleOnNextClick} type="button">
              <ChevronDoubleRightIcon className="w-7 h-7 text-white bg-gray-800 rounded-full p-1" />
            </button>
          </div>
          <div className="hidden lg:flex  lg:absolute top-24 right-24 bg-yellow-400 font-medium px-2  rounded-lg py-1 animate-bounce">
            <a className="" href="/Brochure2022_NIT-Patna.pdf " download>
              Download Brochure{" "}
            </a>
            <DocumentDownloadIcon className="h-7 w-7 p-1 " />
          </div>
        </div>
      </main>
      <div id="about">
        <About />
      </div>
      <div>
        <ProfessorIncharge />
      </div>
      <div>
        <Statics />
      </div>
      <div>
        <CompaniesMarquee />
      </div>
      <div id="process">
        <Process />
      </div>
      <div id="WhyUS">
        <WhyUS />
      </div>
      <Footer />
    </>
  );
}

export default CoverPage;
