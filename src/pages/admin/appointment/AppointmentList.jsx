import { useDispatch, useSelector } from "react-redux";
import DataTable from "usereactable";
import { updateAppointment } from "../../../features/appointment/appointmentSlice";
import React from "react";
const AppointmentList = () => {
  const appointments = useSelector((st) => st.appointment.data);
  const user = useSelector((st) => st.userlist.data);
  const employee = user?.filter((ele) => ele.role == "employee");
  const dispatch = useDispatch();

  const cols = [
    {
      field: "time",
      headerName: "Date & Time",
    },
    {
      field: "name",
      headerName: "Name",
    },
    {
      field: "mobile",
      headerName: "Mobile",
    },
    {
      field: "service",
      headerName: "Service",
    },
    {
      field: "handleBy",
      headerName: "Assign to",
      renderCell: (data) => {
        return (
          <select
            className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-44 p-2.5 "
            value={data.handleBy}
            onChange={(e) =>
              dispatch(
                updateAppointment({
                  id: data._id,
                  data: { handleBy: e.target.value },
                })
              )
            }
          >
            <option value="" selected disabled>
              select Employee
            </option>
            {employee?.map((emp, i) => (
              <option key={i} value={emp._id}>
                {emp.name}
              </option>
            ))}
          </select>
        );
      },
    },
    {
      field: "remark",
      headerName: "Remark",
      renderCell: (data) => {
        return (
          <>
            <textarea
              id="myTextarea"
              name="myTextarea"
              rows="1" // You can adjust the number of rows as needed
              className="mt-1 p-2 border w-60 border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter your text here..."
              onBlur={(e) =>
                dispatch(
                  updateAppointment({
                    id: data._id,
                    data: { remark: e.target.value },
                  })
                )
              }
            >
              {data.remark}
            </textarea>
          </>
        );
      },
    },
  ];
  return (
    <div>
      <DataTable
        title="Latest Appointment"
        data={appointments}
        cols={cols}
        pagination
      />
    </div>
  );
};

export default AppointmentList;
