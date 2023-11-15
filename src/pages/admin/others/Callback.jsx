/* eslint-disable no-unused-vars */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { GrView } from "react-icons/gr";
import { default as datass } from "../../../assets/excel.jpg";
import { downloadExcel } from "../../../components/Downloadexcel";
import { useEffect, useRef, useState } from "react";
import { deleteCallback } from "../api";
import { toast } from "react-toastify";
import { getallcalls } from "../../../features/callback";
import { readUser } from "../../../features/curd/readSlice";
import { useNavigate } from "react-router-dom";
import $ from "jquery";
import "datatables.net";

const CallBackRequest = () => {
  const callback = useSelector((st) => st.callback.data);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filteredData, setFilteredData] = useState(callback);

  const handleFilter = () => {
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);
    endDateObj.setHours(23, 59, 59, 999);

    const filteredData = callback.filter((itm) => {
      const createdAt = new Date(itm.createdAt);
      return createdAt >= startDateObj && createdAt <= endDateObj;
    });

    setFilteredData(filteredData);
  };

  const resetFilter = () => {
    setStartDate("");
    setEndDate("");
    setFilteredData([]);
  };

  const navigate = useNavigate();

  const ReadUser = ({ itm }) => {
    const merge = { ...itm, action: "view call" };
    dispatch(readUser(merge));
    navigate("/testing");
  };
  const EditUser = ({ itm }) => {
    const merge = { ...itm, action: "edit call" };
    dispatch(readUser(merge));
    navigate("/testing");
  };

  const downloaddata = () => {
    if (filteredData.length > 0) {
      // Create a copy of filteredData, format Date, and remove unwanted fields
      const filteredDataCopy = filteredData.map((item) => {
        const { _id, bookingid, createdAt, updatedAt, __v, ...rest } = item;
        const formattedDate = new Date(createdAt).toISOString().split("T")[0];
        return { bookingid, Date: formattedDate, ...rest };
      });

      return filteredDataCopy;
    } else {
      // Create a copy of callback, format Date, and remove unwanted fields
      const callbackCopy = callback.map((item) => {
        const { _id, bookingid, createdAt, updatedAt, __v, ...rest } = item;
        const formattedDate = new Date(createdAt).toISOString().split("T")[0];
        return { bookingid, Date: formattedDate, ...rest };
      });

      return callbackCopy;
    }
  };

  const handleDownload = () => {
    const data = downloaddata();
    downloadExcel(data, "my_data.xlsx");
  };
  const dispatch = useDispatch();
  const handledelete = async (itm) => {
    try {
      const res = await deleteCallback({ _id: itm._id });
      toast.success(res);
      dispatch(getallcalls());
    } catch (error) {
      toast.error(error.message);
    }
  };
  const tableRef = useRef(null);
  useEffect(() => {
    $(tableRef.current).DataTable();
  }, [filteredData]);

  useEffect(() => {
    dispatch(getallcalls());
  }, [dispatch]);

  useEffect(() => {
    setFilteredData(callback);
  }, [callback]);
  return (
    <div className="flex flex-col col-12">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1 className="h3 font-bold">Callback Requests</h1>
        <div style={{ display: "flex", flexDirection: "row", gap: "12px" }}>
          <button style={{ width: "40px" }} onClick={handleDownload}>
            <img src={datass} alt="" />
          </button>
        </div>
      </div>

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
      <div className="col-12 mt-2">
        {filteredData.length !== 0 ? (
          <div className="table_scroll overflow-x-hidden rounded mt-2">
            <table
              ref={tableRef}
              className="w-full border-collapse border bg-white text-left text-sm text-gray-500"
            >
              <thead className="bg-gray-200 overflow-x-scroll">
                <tr>
                  <th
                    scope="col"
                    className="px-2 py-1 font-medium btn-primary text-gray-900"
                  >
                    <p className="w-16">Sr. No.</p>
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-1 font-medium text-gray-900"
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-1 font-medium text-gray-900"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-1 font-medium text-gray-900"
                  >
                    Mobile
                  </th>

                  <th
                    scope="col"
                    className="px-2 py-1 font-medium text-gray-900"
                  >
                    Service
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-1 font-medium text-gray-900"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 overflow-x-scroll border-t border-gray-100">
                {filteredData &&
                  filteredData.map((e, i) => {
                    return (
                      <tr key={i} className="hover:bg-gray-50">
                        <td className="px-4 py-4">{i + 1}</td>
                        <td className="px-4 py-4">
                          {e?.createdAt.split("T")[0]}
                        </td>
                        <td className="px-4 py-4">{e?.name}</td>
                        <td className="px-4 py-4">{e?.number}</td>
                        <td className="px-4 py-4">{e?.service}</td>
                        <td className="px-4 py-4 flex">
                          <div className="flex justify-center gap-4">
                            <GrView
                              onClick={() => ReadUser({ itm: e })}
                              fontSize={22}
                              color="skyblue"
                            />
                            <p
                              onClick={() => handledelete(e)}
                              className="text-danger cursor-pointer"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="h-6 w-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                />
                              </svg>
                            </p>
                            <div
                              onClick={() => EditUser({ itm: e })}
                              className="text-primary cursor-pointer"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="h-6 w-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                                />
                              </svg>
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        ) : (
          "Please Wait Product is Loading"
        )}
      </div>
    </div>
  );
};

export default CallBackRequest;
