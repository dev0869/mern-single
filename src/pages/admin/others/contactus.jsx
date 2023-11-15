/* eslint-disable no-unused-vars */
import { useSelector } from "react-redux";
import React from "react";
import { useState } from "react";
import { readUser } from "../../../features/curd/readSlice";
import { useDispatch } from "react-redux";
import { default as datass } from "../../../assets/excel.jpg";
import { useNavigate } from "react-router-dom";
import { downloadExcel } from "../../../components/Downloadexcel";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { GrView } from "react-icons/gr";

import { toast } from "react-toastify";
import { deleteContactus } from "../api";
import Pagination from "@mui/material/Pagination";
import { getEnquiries } from "../../../features/enquiry/enquirySlice";
const ContactUsRequest = () => {
  const contactData = useSelector((st) => st.contactus?.requests);
  console.log(contactData);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filteredData, setFilteredData] = useState(contactData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ReadUser = ({ itm }) => {
    const merge = { ...itm, action: "view contact" };
    dispatch(readUser(merge));
    navigate("/testing");
  };
  const EditUser = ({ itm }) => {
    const merge = { ...itm, action: "edit contact" };
    dispatch(readUser(merge));
    navigate("/testing");
  };
  const handleFilter = () => {
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);
    endDateObj.setHours(23, 59, 59, 999);

    const filteredData = contactData.filter((itm) => {
      const createdAt = new Date(itm.createdAt);
      return createdAt >= startDateObj && createdAt <= endDateObj;
    });

    setFilteredData(filteredData);
  };
  const handledelete = async (itm) => {
    try {
      const res = await deleteContactus({ _id: itm._id });
      toast.success(res);
      dispatch(getEnquiries());
      setFilteredData(contactData);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const resetFilter = () => {
    setStartDate("");
    setEndDate("");
    setFilteredData(contactData);
  };
  const downloaddata = () => {
    if (filteredData.length > 0) {
      // Create a copy of filteredData, format Date, and remove unwanted fields
      const filteredDataCopy = filteredData.map((item) => {
        const { _id, createdAt, updatedAt, __v, ...rest } = item;
        const formattedDate = new Date(createdAt).toISOString().split("T")[0];
        return { Date: formattedDate, ...rest };
      });

      return filteredDataCopy;
    } else {
      // Create a copy of callback, format Date, and remove unwanted fields
      const callbackCopy = contactData.map((item) => {
        const { _id, createdAt, updatedAt, __v, ...rest } = item;
        const formattedDate = new Date(createdAt).toISOString().split("T")[0];
        return { Date: formattedDate, ...rest };
      });

      return callbackCopy;
    }
  };

  const handleDownload = () => {
    const data = downloaddata();
    downloadExcel(data, "my_data.xlsx");
  };

  const [page, setPage] = useState(1);
  const pagecount = Math.ceil(filteredData.length / 15);
  const paginate = (event, value) => {
    setPage(value);
  };
  const indexOfLastItem = page * 15;
  const indexOfFirstItem = indexOfLastItem - 15;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);


  return (
    <div className="flex flex-col col-12">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1 className="h3 font-bold">Contact us Request</h1>
        <div style={{ display: "flex", flexDirection: "row", gap: "12px" }}>
          <button style={{ width: "50px" }} onClick={handleDownload}>
            <img src={datass} alt="" />
          </button>
        </div>
      </div>
      <br />
      <div
        style={{ display: "flex", justifyContent: "space-between" }}
        className="border shadow-md p-3 rounded-[12px]"
      >
        <div className="flex gap-3 flex-row justify-between">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 12,
            }}
          >
            <label htmlFor="" style={{ fontWeight: "bold" }}>
              From Date:
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="mr-2"
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 12,
            }}
          >
            <label htmlFor="" style={{ fontWeight: "bold" }}>
              To Date:
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "row", gap: 10 }}>
          <button className="filterbut" onClick={handleFilter}>
            Filter
          </button>
          <button className="filterbut" onClick={resetFilter}>
            Reset filter
          </button>
        </div>
      </div>
      <br />

      <div className="col-12 border overflow-x-auto mt-4">
        <table className="table table-striped col-12 cursor-pointer">
          <thead>
            <tr>
              <th scope="col">Sr No.</th>
              <th scope="col">Date</th>
              <th scope="col" style={{ minWidth: "90px" }}>
                Name
              </th>
              <th scope="col">Mobile</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems?.map((itm, i) => (
              <tr key={itm._id}>
                <th scope="row">{i + 1}</th>
                <td className=" text-capitalize">
                  {itm?.createdAt.split("T")[0]}
                </td>
                <td className=" text-capitalize">{itm.name.split(" ")[0]}</td>
                <td>{itm.number}</td>
                <td
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    gap: 1,
                    padding: "14px",
                  }}
                >
                  <AiFillEdit
                    onClick={() => EditUser({ itm })}
                    fontSize={22}
                    color="green"
                  />
                  <AiFillDelete
                    fontSize={22}
                    color="red"
                    onClick={() => handledelete(itm)}
                  />
                  <GrView
                    onClick={() => ReadUser({ itm })}
                    fontSize={22}
                    color="skyblue"
                  />
                </td>
              </tr>
            ))}
            {filteredData.length === 0 && contactData.length === 0 && (
              <p className="h4 ml-2 w-full pt-4 pb-2 text-center">
                No Contact us found{" "}
              </p>
            )}
          </tbody>
        </table>
      </div>
      {filteredData?.length > 15 && (
        <div className="flex items-center justify-center p-2">
          <Pagination
            page={page}
            onChange={paginate}
            count={pagecount}
            color="error"
          />
        </div>
      )}
    </div>
  );
};

export default ContactUsRequest;
