import React from "react";
import { Stack } from "@mui/material";
import { useSelector } from "react-redux";
const AboutCard = () => {
  const cardData = useSelector((st) => st.site.data?.aboutus?.values);

  return (
    <>
      <Stack
        display={"flex"}
        justifyContent={"center"}
        flexWrap={"wrap"}
        direction={"row"}
        gap={3}
      >
        {cardData?.map((ele, i) => {
          const { imgurl, title, content } = ele;
          return (
            <Stack key={i} alignItems={"center"} className="aboutCard">
              <img src={imgurl} alt="" width={100} />
              <br />
              <h1>{title}</h1>
              <p>{content}</p>
            </Stack>
          );
        })}
      </Stack>
    </>
  );
};

export default AboutCard;
