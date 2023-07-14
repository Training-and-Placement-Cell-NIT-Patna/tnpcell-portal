import React from "react";

function ProfessorIncharge() {
  return (
    <>
      <div className="pt-20 pb-10">
        <h1 className="text-4xl underline font-bold text-center text-red-900">
          Professor Incharges
        </h1>
      </div>
      <div className="md:flex md:justify-around md:pb-20">
        <div className="p-5">
          <div className="text-center">
            <div className="flex justify-center">
              <img src="/user.png" className="" />
            </div>
            <h1>Dr. Samart Mukherjee</h1>
            <h2>Prof. Incharge, T&P Cell NIT Patna</h2>
            {/* <p>
              afeowiheheheheheheheheheheheheoiwhef oifheioeiaio faiohoioaioihef
            </p> */}
          </div>
        </div>
        <div className="p-5">
          <div className="text-center">
            <div className="flex justify-center">
              <img src="/user.png" className="" />
            </div>
            <h1>Dr. Shailesh M Pandey</h1>
            <h2>T&P officer NIT Patna</h2>
            {/* <p>
              afeowiheheheheheheheheheheheheoiwhef oifheioeiaio faiohoioaioihef
            </p> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfessorIncharge;
