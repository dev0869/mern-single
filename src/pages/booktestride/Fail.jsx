import { useSelector } from "react-redux";
import "../../components/index.css";
import React from "react";
const Fail = () => {
  const id = localStorage.getItem("bkid");
  const data = useSelector((state) => state.dummy.bookingtestride);
  // const [ele,setEle]=useState()
  return (
    <div className="cardq my-0 my-md-5">
      <div
        className="flex justify-center "
        style={{
          borderRadius: "50%",
          height: "200px",
          width: "200px",
          background: "#F8FAF5",
          margin: "0 auto",
        }}
      >
        <i className="wrongmark">x</i>
      </div>
      <h1 className="tag">Fail</h1>
      <p className='text-center mb-0'>Mr/Mrs :  {data.name}</p>
      <p className="tag2">Your Booking Has Been failed</p>
      <p style={{ textAlign: "center" }}>
        Due to : <span className="font-bold text-red-500">{id}</span>
      </p>
    </div>
  );
};

export default Fail;
