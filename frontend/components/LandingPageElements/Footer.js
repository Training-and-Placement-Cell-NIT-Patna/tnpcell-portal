import React from "react";
import Link from "next/link";

function Footer() {
  return (
    <div className="bg-[#510505] text-stone-400">
      <div className="grid grid-cols-2 md:grid-cols-6 ">
        <div className="col-span-2 p-4">
          <h3 className="font-extrabold p-2 text-xl text-white">
            Get in <span className="text-yellow-400"> Touch</span>
          </h3>
          <p>National Institute of Technology Patna</p>
          <p>Patna, Bihar (800005), India</p>
          <p>Phone: +91-0612-237 1715 / 237 2715</p>
          <p>FAX : +91-0612-2670631 , 0612-2660480</p>
        </div>
        <div className="p-4">
          <h2 className="font-bold p-2 text-xl pl-0 text-white">Know Us</h2>
          <ul>
            <li>
              <Link href="/developers">Technical Team</Link>
            </li>
            <li>
              <Link href="/">NIRF</Link>
            </li>
            <li>
              <Link href="/">RTI</Link>
            </li>
            <li>
              <Link href="/">New Campus</Link>
            </li>
          </ul>
        </div>
        <div className="p-4">
          <h2 className="font-bold p-2 text-xl pl-0 text-white">Other Link</h2>
          <ul>
            <li>
              <Link href="/">Link1</Link>
            </li>
            <li>
              <Link href="/">Link2</Link>
            </li>
            <li>
              <Link href="/">Link3</Link>
            </li>
            <li>
              <Link href="/">Link4</Link>
            </li>
          </ul>
        </div>
        <div className="p-4">
          <h2 className="font-bold p-2 text-xl pl-0 text-white">Extra Link</h2>
          <ul>
            <li>
              <Link href="/">Magazine (Vol.4)</Link>
            </li>
            <li>
              <Link href="/">Digital Map Of NITP</Link>
            </li>
            <li>
              <Link href="/">Annual Reports</Link>
            </li>
            <li>
              <Link href="/">Terms of Use</Link>
            </li>
          </ul>
        </div>
        <div className="p-4">
          <h2 className="font-bold p-2 text-xl pl-0 text-white">Useful Link</h2>
          <ul>
            <li>
              <Link href="/">How to Reach</Link>
            </li>
            <li>
              <Link href="/">Anti Ragging</Link>
            </li>
            <li>
              <Link href="/">Academic Calendar</Link>
            </li>
            <li>
              <Link href="/">Tenders</Link>
            </li>
          </ul>
        </div>
      </div>
      <hr/>
      <div>
        <p className="text-center font-medium">
          National Institute of Technology Patna-800005, Bihar, INDIA ©2023 NIT
          Patna
        </p>
      </div>
    </div>
  );
}

export default Footer;
