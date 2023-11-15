import React from "react";
import { useSelector } from "react-redux";
import ReactHtmlParser from "react-html-parser";

import { Stack } from "@mui/material";
import { Avatar } from "@mui/material";
import { useLocation } from "react-router-dom";
const Singleblog = () => {
  const data = useLocation().state;
  const site = useSelector((st) => st.site.data);

  let { name, content, image, date } = data;

  return (
    <>
      <div className=" px-[16px] md:py-2 md:px-[90px] ">
        <div className="text-center font-bold my-4 text-xl  md:text-5xl">
          <h1>{name}</h1>
        </div>
        <hr className="border-t-2 border-[#353c42] " />
        <div className="flex justify-between py-3 items-center">
          <Stack
            display={"flex"}
            direction={"row"}
            alignItems={"center"}
            gap={2}
          >
            <Avatar alt="Remy Sharp" src={site?.logo} />
            <p className="font-bold text-[#353c42]">{site?.name}</p>
          </Stack>
          <p className="text-[#2e475d] font-bold">{date}</p>
        </div>
        <hr className="border-t-2 border-[#353c42] " />
        {/* content of blog starts */}

        <div className="md:px-[86px] px-[16px] py-9 text-lg">
          <img src={image} alt="" className="w-[900px] mx-auto" />
          <div className="md:px-[100px] md:py-[25px] px-[10px] py-[20px]">
            {ReactHtmlParser(content)}
          </div>
        </div>
      </div>
    </>
  );
};

export default Singleblog;
