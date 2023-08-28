import { useEffect, useState } from "react";
import { API_URL } from "../../config";
import Head from "next/head";
import CardComp from "@/components/contactus/CardComp";
import { BsLinkedin, BsTwitter } from 'react-icons/bs'
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
    <>
      <Head>
        <title>Contact US</title>
      </Head>
      <CoverPageNavBar />
      <div className=" px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        <div>
          <label htmlFor="" className="px-2">Year</label>
          <select onChange={(e) => setYear(e.target.value)} className="border-2 w-1/2 max-w-xs">
            <option selected value="2023">2023</option>
            <option value="2022">2022</option>
            <option>2021</option>
            <option>2020</option>
            <option>2019</option>
          </select>
        </div>
      </div>
      <div className="bg-gray-400 px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {coordinators.map((data) => {
            return (
              <div key={data.id}>
                <div>
                  <div className="relative overflow-hidden transition duration-300 transform rounded shadow-lg lg:hover:-translate-y-2 hover:shadow-2xl">
                    <img
                      className="object-cover w-full h-64 md:h-64 xl:h-80"
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
    </>
  );
}

export default ContactUS;
