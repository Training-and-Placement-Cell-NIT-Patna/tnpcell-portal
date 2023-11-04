import React from "react";
import Link from "next/link";

function Footer() {
  return (
    <div className="bg-[#510505] text-stone-400">
      <div className="grid grid-cols-2 md:grid-cols-6 ">
        <div className="col-span-2 p-4">
          <h3 className="font-extrabold px-2 text-xl text-white">
            Get in <span className="text-yellow-400"> Touch</span>
          </h3>
          <p>National Institute of Technology Patna</p>
          <p>Patna, Bihar (800005), India</p>
          <p>Phone: +91-0612-237 1715 / 237 2715</p>
          <p>FAX : +91-0612-2670631 , 0612-2660480</p>
        </div>
        <div className="p-4">
          <h2 className="font-bold p-2 text-xl pl-0 text-white">Know Us</h2>
          <ul className={""}>

            <li className={"py-1"}>
              <Link href="https://www.nitp.ac.in/administration?tab=director">
                <a target={"_tnp"}>
                  Directer's Desk
                </a>
              </Link>
            </li>

            <li className={"py-1"}>
              <Link href="https://www.nitp.ac.in/nirf">
                <a target={"_tnp"}>
                  NIRF
                </a>
              </Link>
            </li>

            {/*<li className={"py-1"}>*/}
            {/*  <Link href="https://www.nitp.ac.in/newcampus">*/}
            {/*    <a target={"_tnp"}>*/}
            {/*      New Campus*/}
            {/*    </a>*/}
            {/*    </Link>*/}
            {/*</li>*/}

            <li className={"py-1"}>
              <Link href="/developers">
                Technical Team
              </Link>
            </li>
          </ul>
        </div>
        <div className="p-4">
          <h2 className="font-bold p-2 text-xl pl-0 text-white">Other Links</h2>
          <ul>
            <li className={"py-1"}>
              <Link href="https://www.nitp.ac.in/bwcminutes" >
                <a target={"_tnp"} >  BOG/FC/BWC Minutes</a>
              </Link>
            </li>
            <li className={"py-1"}>
              <Link href="https://www.nitp.ac.in/senateminutes"  >
                <a target={"_tnp"} >Senate Minutes</a>
              </Link>
            </li>
            {/*  <li className={"py-1"}>*/}
            {/*  <Link href="https://www.nitp.ac.in/acadnotice">*/}
            {/*    <a  target={"_tnp"} >Academics Notices</a>*/}
            {/*  </Link>*/}
            {/*</li>*/}
            <li className={"py-1"}>
              <Link href="https://www.nitp.ac.in/nit_act">
                <a target={"_tnp"} >NIT Act and Statutes</a>
              </Link>
            </li>
          </ul>
        </div>
        <div className="p-4">
          <h2 className="font-bold p-2 text-xl pl-0 text-white">Extra Links</h2>
          <ul>

            <li className={"py-1"}>
              <Link href="https://www.nitp.ac.in/RTI">
                <a target={"_tnp"}>RTI</a>
              </Link>
            </li>
            <li className={"py-1"}>
              <Link href="https://www.nitp.ac.in/terms">
                <a target={"_tnp"}>Terms of Use</a></Link>
            </li>

            <li className={"py-1"}>
              <Link href="https://www.nitp.ac.in/nit_act">
                {/*field to be changed each year*/}
                <a target={"_tnp"} >Convocation 2021</a>
              </Link>
            </li>
            {/*<li className={"py-1"}>*/}
            {/*  <Link href="https://www.nitp.ac.in/annualreports">*/}
            {/*    <a target={"_tnp"}>  Annual Reports</a>*/}
            {/*  </Link>*/}
            {/*</li>*/}
            {/*<li className={"py-1"}>*/}
            {/*  <Link href="https://web.nitp.ac.in//uploads23/Academic_calendar_2023_24%20_Odd_sem.pdf">*/}
            {/*    <a target={"_tnp"}>*/}
            {/*      Academic Calendar*/}
            {/*    </a>*/}
            {/*  </Link>*/}
            {/*</li>*/}
          </ul>
        </div>
        <div className="p-4">
          <h2 className="font-bold p-2 text-xl pl-0 text-white">Useful Links</h2>
          <ul>
            {/*<li className={"py-1"}>*/}
            {/*  <Link href="https://www.google.com/maps/place/National+Institute+of+Technology,+Patna/@25.6207961,85.1719948,17z/data=!3m1!4b1!4m6!3m5!1s0x39ed58dce6732867:0x4059f39a1ac82f06!8m2!3d25.6207961!4d85.1719948!16zL20vMDl2OGJq?entry=ttu">*/}
            {/*    <a target={"_tnp"}>*/}
            {/*      How to Reach*/}
            {/*    </a>*/}
            {/*   </Link>*/}
            {/*</li>*/}
            <li>
              <Link href="https://web.nitp.ac.in/ict/">
                <a target={"_tnp"}>
                  ICT Academy
                </a>
              </Link>
            </li>
            <li className={"py-1"}>
              <Link href="https://www.nitp.ac.in/students/?tab=nss">
                <a target={"_tnp"}>
                  National Service Scheme
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <hr />
      <div className="text-center text-sm font-serif">
        {/* Never remove the following line. No matter who the hell you are */}
        <p>T&P Cell NIT Patna © 2023, Developed by <a href="https://www.linkedin.com/in/krcpr007/" target="_blank" rel="noreferrer" className="hover:underline">Rajan kumar</a>, <a href="https://www.linkedin.com/in/rajdeep-nagar-0873a7206/" target="_blank" rel="noreferrer" className="hover:underline">Rajdeep Nagar</a> & <a href="https://www.linkedin.com/in/ayushi-gupta-604646202/" target="_blank" rel="noreferrer" className="hover:underline">Ayushi Gupta</a></p>
      </div>
    </div>
  );
}

export default Footer;
