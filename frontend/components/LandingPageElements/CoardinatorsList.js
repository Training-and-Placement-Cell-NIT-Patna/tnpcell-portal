import React, { useEffect, useState } from "react";
import { MdCall } from "react-icons/md";
import { HiMail } from "react-icons/hi";
import { toast } from "react-toastify";
import { API_URL } from "@/config/index";
import { GrLinkedin } from "react-icons/gr";

function CoardinatorsList() {
  const [data, setdata] = useState();
  useEffect(() => {
    fetch(`${API_URL}/api/coordinators?populate=*`)
      .then((res) => res.json())
      .then((val) => {
        // console.log(val);
        setdata(val.data);
      })
      .catch((e) => console.log(e.message));
  }, []);

  return (
    <>
      <div className="text-center mt-5 pt-20 pb-10 ">
        <h1 className="font-bold text-3xl lg:text-4xl text-red-900 font-serif underline ">
          Intership Coardinators
        </h1>
      </div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-5 mx-auto">
          <div className="flex  overflow-x-auto no-scrollbar ">
            <div className=" flex ">
              {data
                ? data.map((item, index) => (
                    <div key={index} style={{ width: "300px", margin: "24px" }}>
                      <div className="h-full flex flex-col items-center text-center">
                        <div
                          style={{
                            textAlign: "center",
                            height: "200px",
                            width: "200px",
                          }}
                        >
                          <img
                            alt={item.attributes.name}
                            className="rounded-full object-cover w-full h-full "
                            src={
                              item.attributes.image.data
                                ? `${API_URL}` +
                                  item.attributes.image.data.attributes.url
                                : ""
                            }
                          />
                        </div>

                        <div className="w-full m-1">
                          <h2 className="title-font font-medium text-lg text-gray-900">
                            {item.attributes.name}
                          </h2>
                          <h3 className="text-gray-500 mb-1">
                            {item.attributes.year} Year
                          </h3>
                          {/* <h3 className="text-gray-500 mb-1">
                            Branch: ECE
                          </h3> */}
                          <h4 className="mb-2">NIT PATNA</h4>
                          <span className="inline-flex">
                            <a
                              href={`tel:+91 ${item.attributes.mobile}`}
                              className={
                                " border-[0.2rem] border-solid rounded-[50%] mx-2 w-9 h-9 border-white hover:text-[#ffa500] hover:bg-white hover:border-[#ffa500] hover:rotate-[360deg] transition duration-500 ease-in-out flex items-center justify-center"
                              }
                            >
                              <MdCall className={"w-[80%] h-[80%]"} />
                            </a>
                            <a
                              href={`mailto:${item.attributes.email}`}
                              className={
                                "border-[0.2rem] border-solid rounded-[50%] mx-2 w-9 h-9 border-white hover:text-[#ffa500] hover:bg-white hover:border-[#ffa500] hover:rotate-[360deg] transition duration-500 ease-in-out flex items-center justify-center"
                              }
                            >
                              <HiMail className={"w-[80%] h-[80%]"} />
                            </a>
                            <a
                              href={item.attributes.linkedin}
                              target="blank"
                              className={
                                "border-[0.2rem] border-solid rounded-[50%] mx-2 w-9 h-9 border-white hover:text-[#ffa500] hover:bg-white hover:border-[#ffa500] hover:rotate-[360deg] transition duration-500 ease-in-out flex items-center justify-center"
                              }
                            >
                              <GrLinkedin className={"w-[80%] h-[80%] "} />
                            </a>
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                : " "}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default CoardinatorsList;
