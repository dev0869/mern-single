import { useSelector } from "react-redux";
import React from "react";
const Service = () => {
  const service = useSelector((st) => st.site.data)?.services;

  return (
    <section className="pt-20 pb-12 lg:pt-[40px] lg:pb-[90px] bg-gray-50">
      <div className="container">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full px-4">
            <div className="mx-auto mb-12 max-w-[510px] text-center lg:mb-20">
              
              <h2 className="mb-4 text-3xl font-bold sm:text-4xl md:text-[40px] text-[orangered]">
                {service?.title}
              </h2>
              <p className="text-base text-body-color text-muted ">
                {service?.subheading}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-4 p-4 justify-center -mx-4">
          {service?.cards?.map((ele,i)=><ServiceCard key={i} data={ele} number={i+1} />)}
        </div>
      </div>
    </section>
  );
};

export default Service;

export const ServiceCard = ({data,number}) => {
    const {title,content,imgurl}= data
  return (
    <div className="service">
      <div className="card">
        {!imgurl&&<p className="number-h1 ">0{number}</p>}
       {imgurl&& <img src={imgurl} width={"50px"} alt="" />}
        <p className="text-lg text-gray-800 font-semibold" >{title}</p>
        <p className="p">
         {content.slice(0,240)}...
        </p>
      </div>
    </div>
  );
};
