import React from "react";
import { AiFillHome } from "react-icons/ai";
import { GiScooter } from "react-icons/gi";
import { BsFillTelephoneFill } from "react-icons/bs";
import { AiFillCustomerService } from "react-icons/ai";
export const SmallRoutes = [
  {
    name: "HOME",
    path: "/",
    icon: <AiFillHome />,
  },
  {
    name: "SERVICES",
    path: "/services",
    icon: <GiScooter />,
  }, 
  {
    name: " ABOUT US",
    path: "/about",
    icon: <AiFillCustomerService />,
  },
  {
    name: "CONTACT US",
    path: "/contact",
    icon: <BsFillTelephoneFill />,
  },

  {
    name: "LATEST-NEWS",
    path: "/blogs",
    icon: <BsFillTelephoneFill />,
  },
];
