import "./Slide.css";
import React from "react";
import Marquee from "react-fast-marquee";
import { useSelector } from "react-redux";

const Slide = () => {
  const slider = useSelector((st) => st.site.data?.slider);
  const styles = {
    width: "100px",
    aspectRatio: 4 / 3,
    objectFit: "contain",
  };

  return (
    <>
      <div className="datass container">
        <div className="slidemain">
          <h1>-{slider?.title}-</h1>
        </div>
        <Marquee className="mt-0">
          {slider?.slides.map((e, i) => (
            <img
              key={i}
              style={styles}
              className="m-2"
              src={e.imgurl}
              alt={e.title}
            />
          ))}
        </Marquee>
      </div>
    </>
  );
};

export default Slide;
