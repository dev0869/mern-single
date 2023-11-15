/* eslint-disable no-unused-vars */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { default as datass } from "../../../assets/excel.jpg";
import { downloadExcel } from "../../../components/Downloadexcel";
import Pagination from "@mui/material/Pagination";
import { unwrapResult } from "@reduxjs/toolkit";
import { getallUserList } from "../../../features/userList";
import { toggleLoading } from "../../../features/loading/loadingSlice";
import axios from "axios";
import { config } from "../../../utils/axiosconfig";
import { base_url } from "../../../utils/baseUrl";

const UserList = () => {
  const dispatch = useDispatch();
  const booktestride = useSelector((st) => st.userlist.data);
  const [userlist, setuserlist] = useState(booktestride);
  useEffect(() => {
    setuserlist(booktestride);
  }, [booktestride]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filteredData, setFilteredData] = useState(userlist);
  const handleFilter = () => {
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);
    endDateObj.setHours(23, 59, 59, 999);

    const filteredData = userlist.filter((itm) => {
      const createdAt = new Date(itm.createdAt);
      return createdAt >= startDateObj && createdAt <= endDateObj;
    });

    setFilteredData(filteredData);
  };

  const resetFilter = () => {
    setStartDate("");
    setEndDate("");
    setFilteredData(booktestride);
  };

  const downloaddata = () => {
    if (filteredData.length > 0) {
      const filteredDataCopy = filteredData.map((item) => {
        const {
          _id,
          createdAt,
          updatedAt,
          __v,
          date,
          password,
          role,
          isBlocked,
          order,
          address,
          refreshToken,
          passwordResetExpire,
          passwordResetToken,
          ...rest
        } = item;
        const formattedDate = new Date(createdAt).toISOString().split("T")[0];
        return {
          Date: formattedDate,
          ...rest,
        };
      });

      return filteredDataCopy;
    } else {
      const callbackCopy = booktestride.map((item) => {
        const {
          _id,
          createdAt,
          updatedAt,
          __v,
          date,
          password,
          role,
          isBlocked,
          order,
          address,
          refreshToken,
          passwordResetExpire,
          passwordResetToken,
          ...rest
        } = item;
        const formattedDate = new Date(createdAt).toISOString().split("T")[0];
        return {
          Date: formattedDate,
          ...rest,
        };
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

  const changeUserType = async (_id, e) => {
    dispatch(toggleLoading(true));
    try {
      await axios.put(
        `${base_url}user/edit-role/${_id}`,
        { role: e.target.value },
        config
      );
      dispatch(getallUserList())
        .then(unwrapResult)
        .then(() => {
          dispatch(toggleLoading(false));
          window.location.reload();
        });
    } catch (error) {

    }
  };

  return (
    <div className="flex flex-col col-12">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1 className="h3 font-bold">List of Registered User</h1>
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
              <th scope="col" style={{ width: "70px" }}>
                Sr No.
              </th>
              <th scope="col">Name</th>
              <th scope="col">E-mail</th>
              <th scope="col">Mobile</th>
              <th scope="col">Role</th>
            </tr>
          </thead>
          <tbody>
            {currentItems?.map((itm, i) => (
              <tr key={itm._id}>
                <th scope="row">{i + 1}</th>
                <td style={{ maxWidth: "80px" }} className="overflow-hidden">
                  {itm.name.split(" ")[0]}
                </td>
                <td>{itm.email}</td>
                <td>{itm.mobile}</td>
                <td>
                  <select
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    value={itm?.role}
                    onChange={(e) => changeUserType(itm._id, e)}
                  >
                    <option value="user">User</option>
                    <option value="              ">Employee</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
              </tr>
            ))}
            {filteredData.length === 0 && booktestride.length === 0 && (
              <p className="h4 ml-2 col-12 pt-4 pb-2">No user found</p>
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

export default UserList;
