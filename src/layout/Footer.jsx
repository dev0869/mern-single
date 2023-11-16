// import React from 'react';
import { FiMail } from "react-icons/fi";
import React from "react";
import { BsFillTelephoneFill } from "react-icons/bs";
import { AiOutlineInstagram } from "react-icons/ai";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { BsFacebook, BsLinkedin, BsYoutube } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";
import TagManager from "react-gtm-module";

import { useSelector } from "react-redux";
const Footer = () => {

  const site = useSelector((st) => st.site.data);
  const service = useSelector((st) => st.site.data)?.services?.cards?.slice(
    0,
    5
  );

  TagManager.dataLayer({
    dataLayer: {
      event: "button_click",
      eventCategory: "Button",
      eventAction: "Click",
      eventLabel: "My Button",
    },
  });

  const usefullLinks = [
    { path: "#services", text: "Services" },
    { path: "#contact", text: "Contact Us" },
    { path: "#about", text: "About-Us" },

  ];

  const socialLinks = [
    {
      link: site?.socialmedia?.facebook,
      icon: <BsFacebook fontSize={20} />,
    },
    {
      link: site?.socialmedia?.instagram,
      icon: <AiOutlineInstagram fontSize={20} />,
    },
    {
      link: site?.socialmedia?.youtube,
      icon: <BsYoutube fontSize={20} />,
    },
    {
      link: site?.socialmedia?.linkedin,
      icon: <BsLinkedin fontSize={20} />,
    },
  ];
  function getCurrentYear() {
    const currentDate = new Date();
    return currentDate.getFullYear();
  }
  const currentYear = getCurrentYear();
  const isAdminRoute = useLocation().pathname.includes("admin");

  if (!isAdminRoute) {
    return (
    
      <div
        className="flex justify-center items-center text-white mt-2"
        style={{ background: "#111827" }}
      >
        <div className="container row p-4 sm:p-0 p-md-4 ">
          <div className="col-12 col-md-6 col-xl-3 mb-4">
            <div className="flex items-center justify-start col-12 mb-4">
              {site.logo ? (
                <Link to={"/"}>
                  <img
                    style={{
                      width: "120px",
                      aspectRatio:2/1,
                      objectFit: "cover",
                      filter: "invert(1)",
                    }}
                    className="mt-2"
                    src={site.logo}
                    alt="logo"
                  />
                </Link>
              ) : (
                <Link
                  to={"/"}
                  style={{
                    color: site.primarybg,
                    fontWeight: "bold",
                    fontSize: "30px",
                  }}
                >
                  {site.name}
                </Link>
              )}
            </div>
            <div className="col-12 flex gap-4 mt-4 justify-start">
              {socialLinks.map((itm, i) => (
                <a key={i} target="blank" className="" href={itm?.link?.toString()}>
                  {" "}
                  {itm.icon}
                </a>
              ))}
            </div>
          </div>
          <div className="col-12 col-md-6 col-xl-3 mb-4">
            <h1 className="text-2xl " >
              Services
            </h1>
            <hr className="w-[40%]" />
            {service?.map((itm, i) => (
              <div key={i} className="col-12 mt-3 foot-link mb-1 flex">
                <a href={"#services"} className="flex gap-2 items-center">
                  {itm.title}
                </a>
              </div>
            ))}
          </div>

          <div className="col-12 col-md-6 col-xl-3 mb-4">
            <h1 className="text-2xl" style={{ fontWeight: "300" }}>
              Usefull Links
            </h1>
            <hr className="w-[40%]" />
            {usefullLinks.map((itm, i) => (
              <div key={i} className="col-12  mt-3   foot-link mb-1 flex">
                <a href={itm.path} className="flex gap-2 items-center">
                  {itm.text}
                </a>
              </div>
            ))}
          </div>
          <div className="col-12 col-md-6 col-xl-3 mb-4">
            <h1 className="text-2xl" style={{ fontWeight: "300" }}>
              contact us
            </h1>
            <hr className="w-[40%]" />
            <div className="foot-link">
              <div className="flex gap-2 mt-3 items-start mb-1">
                <HiOutlineLocationMarker fontSize={48} color="white" />
                <a className="mb-1 text-md">{site?.address?.location}</a>
              </div>
              <div className="flex gap-2 mt-3 items-center mb-1">
                <BsFillTelephoneFill fontSize={15} color="white" />
                <div>
                  {site?.address?.telephone.map((ele, i) => (
                    <a key={i} href={`Tel:${ele}`}>
                      {ele}{" "}
                    </a>
                  ))}
                  <br />
                </div>
              </div>
              <div className="flex gap-2 mt-3 items-center mb-1">
                <FiMail fontSize={20} color="white" />
                <a href={`mailto:${site?.address?.email}`}>{site?.address?.email}</a>

              </div>
            </div>
          </div>
          <hr />
          <div className="col-12 text-md text-gray-200 font-lighter text-center mt-3">
            Copyright © {currentYear} {site.name}, All Rights Reserved  ||
            Design and Developed By Deepnap Softech
          </div>
        </div>
      </div>
    );
  }
};

export default Footer;
