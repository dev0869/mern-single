import { useEffect } from "react";
import React from "react";
import { HashLoader } from "react-spinners";
const Loading = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="absolute z-[99] bg-[#bf747416] w-full h-full top-0 flex justify-center items-center min-h-[100vh]">
      <HashLoader color="red" />
    </div>
  );
};

export default Loading;
