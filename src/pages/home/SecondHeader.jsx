import { imgmain } from "../../assets";
import React from "react";
const SecondHeader = () => {
  return (
    <>

      <div className="container flex-wrap flex-col sm:flex-row flex p-4">
        <div className="flex-[5]" >
          <div className="   flex items-center gap-0 flex-col ">
            <p className="font-bold text-[#ee2326] text-3xl lg:text-2xl xl:text-5xl xl:mt-11 lg:mt-[80px]">
              The New Standard in Customer Reviews
            </p>
            <p className=" text-justify text-lg mt-6  lg:text-lg xl:text-xl text-gray-600 ">
              When your team needs to kick off o project,
              br hire a new employee.
              deploy some code, review a soles contract, finalize next year's
              budget, measure an A/H test plan your next office opening, and
              more, Slack covered.
              deploy some code, review a soles contract, finalize next year's
              budget, measure an A/H test plan your next office opening, and
              more, Slack covered.
            </p>
          </div>
        </div>
        <div className="flex-[5]" >
          <div className="flex justify-center relative ">
            <img src={imgmain} width={400} alt="gif" />
          </div>
        </div>
      </div>
    </>
  );
  
};

export default SecondHeader;
