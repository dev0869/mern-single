
import { RxDashboard } from "react-icons/rx";
import React from "react";
import { FaProductHunt, FaUser ,FaHome} from "react-icons/fa";
import { MdOutlineConnectWithoutContact } from "react-icons/md"
import { BsFillTelephoneFill } from "react-icons/bs";
import { GrServices } from "react-icons/gr";
import { FaImage } from "react-icons/fa6";
import { MdOutlineRateReview } from "react-icons/md";
import SiteData from "./website";
import AboutUs from "./website/AboutUs";
import ConatctUs from "./website/ConatctUs";
import Services from "./website/Services";
import Testimonial from "./website/testimonial";
import Gallery from "./website/Gallery";

import UserList from "./others/UsersList";
import ContactUsRequest from "./others/contactus";

import Dashboard from "./Dashboard";


export const adminRoutes = [
  {
    path: "/",
    icon: <RxDashboard fontSize={22} color="skyblue" />,
    element: <Dashboard />,
    txt: "Dashboard",
    view: ["admin", "employee"],
  },
  {
    path: "/userlist",
    icon: <FaUser fontSize={16} />,
    element: <UserList />,
    txt: "Users List",
    view: ["admin"],
  },
  {
    path: "/contact-us",
    icon: <FaUser fontSize={16} />,
    element: <ContactUsRequest />,
    txt: "Contact us Req.",
    view: ["admin"],
  },
  {
    path: "/site",
    icon: <MdOutlineConnectWithoutContact fontSize={16} />,
    txt: "Website Config",
    view: ["admin"],
    children: [
      {
        path: "/site",
        icons: <FaHome fontSize={16} />,
        txt: "Homepage",
        element: <SiteData />,
      },
      {
        path: "/site-contact",
        icons: <BsFillTelephoneFill fontSize={16} />,
        txt: "Contact US",
        element: <ConatctUs />,
      },
      {
        path: "/site-about",
        icons: <FaProductHunt fontSize={16} />,
        txt: "About US",
        element: <AboutUs />,
      },
      {
        path: "/site-service",
        icons: <GrServices fontSize={16} />,
        txt: "Service",
        element: <Services />,
      },
      {
        path: "/slide",
        icons: <MdOutlineRateReview fontSize={16} />,
        txt: "Testomonial",
        element: <Testimonial />,
      },
      {
        path: "/gallery",
        icons: <FaImage fontSize={16} />,
        txt: "Gallery",
        element: <Gallery />,
      },
    ],
  },
];
