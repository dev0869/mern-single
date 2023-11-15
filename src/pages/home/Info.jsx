import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import Masonry from "@mui/lab/Masonry";
const Info = () => {
  const [handleview, setHandleview] = useState("Gallery");
  const imgs = useSelector((st) => st.site.data?.gallery?.images);
  return (
    <>
      <div style={{ gap: "36px" }} className="p-2 m-9  flex justify-center">
        <button
          onClick={() => setHandleview("Gallery")}
          className={
            handleview === "media"
              ? "text-xl font-[600] mb-2 mx-2 border-b-2 px-1 border-red-600 text-red-600"
              : "text-2xl font-[600] mb-2 mx-2 border-b-2 px-1  border-red-600 text-red-800"
          }
        >
          Gallery
        </button>
      </div>
      
      <div className="container">
        
        {imgs &&
          <Masonry columns={{sm:4,xs:2}}  spacing={4}>
          {imgs?.map((item, index) => (
            <div key={index}>
              <img
                src={`${item}?w=162&auto=format`}
                srcSet={`${item}?w=162&auto=format&dpr=2 2x`}
                loading="lazy"
                style={{
                  borderBottomLeftRadius: 4,
                  borderBottomRightRadius: 4,
                  display: "block",
                  width: "100%",
                  mixBlendMode:"darken",
                }}
              />
            </div>
          ))}
        </Masonry>}
      </div>
    </>
  );
};

export default Info;
