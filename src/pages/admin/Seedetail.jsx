import { Stack } from "@mui/material";
import "./Admin.css";
import React from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import { UpdateBookRequest, UpdateCallBack, updateContactus } from "./api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Seedetail = () => {
  const data = useSelector((state) => state.readuser.user);
  const [remark, setRemark] = useState(data.status);
  const navigate = useNavigate();
  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedData = { ...data, status: remark };
    try {
      if (data.action.includes("book")) {
        const res = await UpdateBookRequest(updatedData);
        toast.success(res);
        navigate("/admin/testride");
      }
      if (data.action.includes("call")) {
        const res = await UpdateCallBack(updatedData);
        toast.success(res);
        navigate("/admin/callback");
      }
      if (data.action.includes("contact")) {
        const res = await updateContactus(updatedData);
        toast.success(res);
        navigate("/admin/contact");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="shadowss container">
      <div className="divbox max-sm:mx-4 lg:mx-40 py-5">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            fontSize: "24px",

            color: "orangered",
          }}
        >
          {data?.action?.includes("view") && <h1>View Details </h1>}
          {data?.action?.includes("edit") && <h1>Edit Details </h1>}
        </div>

        {data.action.includes("dealer" || "book" || "call") && (
          <>
           {data?.bookingid&& <Stack
              alignItems={"center"}
              className="seedetail"
              direction={"row"}
              justifyContent={"space-Between"}
            >
              <h1>Booking Id :</h1>
              <p>{data.bookingid}</p>
            </Stack>
            }
          </>
        )}
        <Stack
          alignItems={"center"}
          className="seedetail"
          direction={"row"}
          justifyContent={"space-Between"}
        >
          <h1>NAME :</h1>
          <p>{data.name}</p>
        </Stack>
        <hr />
        <Stack
          alignItems={"center"}
          className="seedetail"
          direction={"row"}
          justifyContent={"space-Between"}
        >
          <h1>EMAIL :</h1>
          <p>{data.email}</p>
        </Stack>
        <hr />
        <Stack
          alignItems={"center"}
          className="seedetail"
          direction={"row"}
          justifyContent={"space-Between"}
        >
          <h1>Number :</h1>
          <p>{data.number}</p>
        </Stack>
        {data.action.includes("call" || "book") && (
          <Stack
            alignItems={"center"}
            className="seedetail"
            direction={"row"}
            justifyContent={"space-Between"}
          >
            <h1>Bike :</h1>
            <p>{data.bike}</p>
          </Stack>
        )}
        <hr />

        {data.action.includes("dealer" || "book" || "call") && (
          <>
            <Stack
              alignItems={"center"}
              className="seedetail"
              direction={"row"}
              justifyContent={"space-Between"}
            >
              <h1>State :</h1>
              <p>{data.state}</p>
            </Stack>
            <hr />
            <Stack
              alignItems={"center"}
              className="seedetail"
              direction={"row"}
              justifyContent={"space-Between"}
            >
              <h1>District :</h1>
              <p>{data.city}</p>
            </Stack>
            <hr />
          </>
        )}
        {data.action.includes("dealer") && (
          <>
            <Stack
              alignItems={"center"}
              className="seedetail"
              direction={"row"}
              justifyContent={"space-Between"}
            >
              <h1>Pin Code:</h1>
              <p>{data.pincode}</p>
            </Stack>
            <hr />
            <Stack
              alignItems={"center"}
              className="seedetail"
              direction={"row"}
              justifyContent={"space-Between"}
            >
              <h1>Comapnay Name :</h1>
              <p>{data.businessname}</p>
            </Stack>
    
            <hr />
            <Stack
              alignItems={"center"}
              className="seedetail"
              direction={"row"}
              justifyContent={"space-Between"}
            >
              <h1>Address :</h1>
              <p>{data.address}</p>
            </Stack>
            <hr />
            <Stack
              alignItems={"center"}
              className="seedetail"
              direction={"row"}
              justifyContent={"space-Between"}
            >
              <h1>Message:</h1>
              <p className="ps-4">{data.message}</p>
            </Stack>
            <hr />
          </>
        )}
        {data.action.includes("contact") && (
          <>
          <Stack
            alignItems={"center"}
            className="seedetail"
            direction={"row"}
            justifyContent={"space-Between"}
          >
            <h1>Message :</h1>
            <p>{data.message}</p>
          </Stack>
          <hr />
          </>
        )}
        {data.action.includes("view") && (
          <Stack
            alignItems={"center"}
            className="seedetail"
            direction={"row"}
            justifyContent={"space-Between"}
          >
            <h1>Remarks :</h1>
            <p>{data.status}</p>
          </Stack>
        )}

        {data.action.includes("edit") && (
          <div className="form-group mt-2 ml-2">
            <label className="mb-2">Enter Remarks</label>
            <textarea
              className="form-control col-12"
              id="exampleFormControlTextarea1"
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
              rows="3"
            ></textarea>
            <button onClick={handleUpdate} className="btn-bg mt-4">
              <p>Update Remark</p>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Seedetail;
