import { useSelector } from "react-redux";
import { ServiceCard } from "../Services";
import React from "react";
const OurProucts = () => {
  const service = useSelector((st) => st.site.data)?.services?.cards
  return (
    <div className="container" >
      <div   className="headerbackground md:mt-[69px] mt-8 " >
        <h2 className="overview-heading   h2-heading-std">OUR SERVICES</h2>
      </div>
      <p className="text-center text-[16px] md:text-[18px] mb-4">
        Discover Our Range of Exceptional Services.
      </p>
      <div className="p-2 flex justify-center"></div>

      <div className="flex flex-wrap justify-center gap-4">
        {service?.map((ele, i) => (
          <ServiceCard key={i} data={ele} number={i + 1} />
        ))}
      </div>
    </div>
  );
};

export default OurProucts;
