import React from "react";

function ProfessorIncharge() {
  return (
    <>
      <div className="pt-20 pb-10">
        <h1 className="text-4xl underline font-bold text-center text-red-900">
          Professor Incharges
        </h1>
      </div>
      <div className="md:flex md:justify-around md:pb-20  divide-x-2 divide-red-900">
        <div className="p-5">
          <div className="text-center">
            <div className="flex justify-center">
              <img src="/images/Samart_mr.JPG" className="rounded-full w-1/2 md:w-2/5" />
            </div>
            <h1 className="text-2xl">Dr. Samart Mukherjee</h1>
            <h2>Prof. Incharge, T&P Cell NIT Patna</h2>
            <p className="text-gray-500">+919334314098</p>
            <p className="text-gray-500">samart@nitp.ac.in</p>
          </div>
        </div>
        <div className="p-5">
          <div className="text-center">
            <div className="flex justify-center">
              <img src="/images/Shailesh_sir.JPG" className="rounded-full w-1/2 md:w-2/5" />
            </div>
            <h1 className="text-2xl">Dr. Shailesh M Pandey</h1>
            <h2>T&P officer NIT Patna</h2>
            <p className="text-gray-500">+918750111166</p>
            <p className="text-gray-500">smp.me@nitp.ac.in</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfessorIncharge;
