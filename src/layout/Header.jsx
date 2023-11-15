import React from "react";
import { Stack } from "@mui/material";
import { Link } from "react-router-dom";
import pep from "../assets/pep.svg";
import "./Layout.css";
import NavButton from "../components/NavButton";
import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import { SmallRoutes } from "../constants/Routes";

import { SmNavButton } from "../components/NavButton";
import { AiOutlineInstagram, AiOutlineRight } from "react-icons/ai";
import TagManager from "react-gtm-module";
import { useSelector } from "react-redux";

import { RxDashboard } from "react-icons/rx";

import CallIcon from "@mui/icons-material/Call";
import { BsFacebook, BsLinkedin, BsYoutube } from "react-icons/bs";
import PropTypes from "prop-types";

const Togglemenu = ({ tog, onClose }) => {
  const [data] = useState(SmallRoutes);
  const isAdminRoute = useLocation().pathname.includes("admin");
  const handleNavItemClick = () => {
    onClose();
  };

  if (!isAdminRoute) {
    return (
      <>
        <Stack
          onClick={handleNavItemClick}
          className={tog ? "Nav_barTOGGLE" : "Nav_barTOGGLEE"}
          display={"flex"}
          justifyContent={"space- tween"}
          padding={"16px 25px"}
          direction={"row"}
          zIndex={9}
        >
          <Stack
            display={"flex"}
            justifyContent={"space-between"}
            direction={"column"}
            width={"100%"}
            textAlign={"left"}
            gap={2}
          >
            {data.map((ele, i) => {
              const { name, path, icon } = ele;
              return (
                <div key={i}>
                  <NavLink className="navlink" to={path}>
                    <Stack
                      display={"flex"}
                      padding={"12px 0"}
                      justifyContent={"space-between"}
                      direction={"row"}
                      alignItems={"center"}
                    >
                      <Stack
                        direction={"row"}
                        gap={1}
                        display={"flex"}
                        alignItems={"center"}
                      >
                        <p>{icon}</p>
                        <p style={{ position: "relative", top: "2px" }}>
                          {name}
                        </p>
                      </Stack>
                      <AiOutlineRight />
                    </Stack>
                  </NavLink>

                  <hr />
                </div>
              );
            })}
            <SmNavButton />
          </Stack>
        </Stack>
      </>
    );
  }
};

const Header = () => {
  const site = useSelector((st) => st.site.data);

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

  TagManager.dataLayer({
    dataLayer: {
      event: "button_click",
      eventCategory: "Button",
      eventAction: "Click",
      eventLabel: "My Button",
    },
  });
  const [show, setShow] = useState(true);
  const isAdminRoute = useLocation().pathname.includes("admin");

  const handleToggleMenu = () => {
    setShow(!show);
  };

  const user = JSON.parse(localStorage.getItem("user"));

  if (!isAdminRoute) {
    return (
      <div
        className="w-full Nav_bar"
        style={{ boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.3)" }}
      >
        <div className="w-full navs">
          <Stack display={"flex"} justifyContent={"end"} direction={"row"}>
            <Stack
              width={"100%"}
              display={"flex"}
              pl={2}
              pt={0.5}
              pb={0.5}
              pr={2}
              justifyContent={"space-between"}
              direction={"row"}
              alignItems={"center"}
              gap={4}
            >
              <div className="flex">
                <CallIcon className="text-white" />
                <div
                  className="address-col-val text-white b2-text-std"
                  id="phoneNumber"
                >
                  {site?.address?.telephone.slice(0, 1).map((ele, i) => (
                    <a key={i} className="ml-2" href={`Tel:${ele}`}>
                      {ele}
                    </a>
                  ))}
                </div>
              </div>
              <div className="flex gap-4   items-center">
                <div className=" flex gap-3 text-white ">
                  {socialLinks.map((itm, i) => (
                    <a key={i} target="blank" href={itm.link}>
                      {" "}
                      {itm.icon}
                    </a>
                  ))}
                </div>
                {!user ? (
                  <Link
                    style={{ padding: "2px 12px 2px 9px" }}
                    className="border sm:block hidden rounded-lg border-white "
                    to={"./login"}
                  >
                    <Stack
                      display={"flex"}
                      flexDirection={"row"}
                      alignItems={"center"}
                      gap={1}
                    >
                      <img src={pep} alt="" />
                      <p
                        style={{
                          color: "white",
                          fontSize: "15px",
                          fontWeight: "bold",
                        }}
                      >
                        Login
                      </p>
                    </Stack>
                  </Link>
                ) : (
                  <Link to={"/userdetails"}>
                    <div className="flex gap-2  items-center">
                      {user.role === "admin" && (
                        <Link
                          to={"/admin"}
                          className="text-light ms-2 font-bold flex items-center gap-2"
                        >
                          <RxDashboard />
                          Dashboard
                        </Link>
                      )}
                    </div>
                  </Link>
                )}
              </div>
            </Stack>
          </Stack>
        </div>

        {/*  */}
        <Stack
          className=" container"
          display={"flex"}
          padding={"12px"}
          justifyContent={"space-between"}
          direction={"row"}
        >
          <Stack
            width={"100%"}
            display={"flex"}
            justifyContent={"space-between"}
            direction={"row"}
            alignItems={"center"}
            gap={8}
          >
            {site.logo ? (
              <Link to={"/"}>
                <img
                  style={{
                    width: "120px",
                    aspectRatio: 2 / 1,
                    objectFit: "cover",
                  }}
                  src={site.logo}
                  alt="logo"
                />
              </Link>
            ) : (
              <Link
                to={"/"}
                style={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "30px",
                }}
              >
                {site.name}
              </Link>
            )}
            <NavButton />
          </Stack>

          <Link
            className="border flex sm:hidden relative top-3 items-center gap-2 p-2 h-9 px-4  rounded-lg border-black "
            to={"./login"}
          >
            <img src={pep} alt="" />
            Login
          </Link>
        </Stack>
        <Togglemenu tog={show} onClose={handleToggleMenu} />
      </div>
    );
  }
};
Togglemenu.propTypes = {
  tog: PropTypes.any,
  onClose: PropTypes.func.isRequired,
};

export default Header;
