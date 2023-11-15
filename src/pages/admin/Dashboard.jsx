import { TbBike } from "react-icons/tb";
import { FcCallback } from "react-icons/fc";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { GiTeamIdea } from "react-icons/gi";
import Dashboardchart from "./charts'/Chart";
import { FaUser } from 'react-icons/fa';
import React from "react";
const Dashboard = () => {
  const state = useSelector((st) => st);
  const tabs = [
    // {
    //   path: "/admin/testride",
    //   txt: "Booking Request",
    //   icon: <TbBike fontSize={40} color="green" />,
    //   val: state.testrides.data?.length,
    // },
    // {
    //   path: "/admin/callback",
    //   txt: "Request Callback",
    //   icon: <FcCallback fontSize={35} color="green" />,
    //   val: state.callback.data?.length,
    // },
    {
      path: "/admin/contact-us",
      txt: "Contact Request",
      icon: <GiTeamIdea fontSize={35} color="green" />,
      val: state.contactus?.requests?.length,}
    // },
    // {
    //   path: "/admin/userlist",
    //   txt: "Total Users",
    //   icon: <FaUser fontSize={30} color="green" />,
    //   val: state.userlist.data?.length,
    // },
    
  ];

  return (
    <div className="flex flex-col w-full">
      <h1 className="col-12 h2 font-bold">Dashboard</h1>
      <div className="w-100 row justify-around">
        {tabs.map((itm, i) => (
          <Link
            key={i}
            to={itm.path}
            className=" shadow-md  w-[100%] md:w-[23%] p-4 rounded flex gap-4 flex-col font-bold items-center justify-center"
          >
            <div className="rounded-full w-[65px] h-[65px] p-2 bg-green-100 flex justify-center items-center">
              {itm.icon}
            </div>
            <p className="w-fit text-xl text-center">{itm.txt}</p>
            <p className="pr-3 text-[orangered] text-[30px] h4 font-bold mb-0">
              {itm.val}
            </p>
          </Link>
        ))}

        <Dashboardchart />
      </div>
    </div>
  );
};

export default Dashboard;
