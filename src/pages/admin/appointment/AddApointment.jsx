import { Formik, Field, Form, ErrorMessage } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createAppointmentSchedule } from "../../../features/appointment/appointmentSlice";
import React from "react";
const AddAppointment = () => {
  const dispatch = useDispatch();
  const schedule = useSelector((st) => st.appointment.schedule);
  const [initialValues, setinitialValues] = useState({
    fees: "",
    lunchTime: {
      start: "",
      end: "",
    },
    closingTime: "",
    startingTime: "",
    slottime: "",
    workingDays: [],
  });

  const handleSubmit = (values, { setSubmitting }) => {
    dispatch(createAppointmentSchedule(values));
    setSubmitting(false);
  };

  const [selectedDays, setselectedDays] = useState([]);
  const handleWorkingDays = (day, setField) => {
    const alreadySelected = selectedDays.includes(day);

    let updatedDays;

    if (alreadySelected) {
      updatedDays = selectedDays.filter((selectedDay) => selectedDay !== day);
    } else {
      updatedDays = [...selectedDays, day];
    }

    setselectedDays(updatedDays);
    setField("workingDays", updatedDays);
  };

  useEffect(() => {
    if (schedule?.lunchTime) {
      setinitialValues(schedule);
    }
  }, []);

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ setFieldValue }) => (
        <Form className="border  p-4 w-full rounded shadow-md row">
          <p className="h4 text-center mb-4">Create Appointment Schedule</p>
          <div className="mb-4 w-1/2">
            <label
              htmlFor="startingTime"
              className="block text-sm font-semibold text-gray-600 mb-1"
            >
              Starting Time:
            </label>
            <Field
              type="time"
              id="startingTime"
              name="startingTime"
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
            <ErrorMessage
              name="startingTime"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>
          <div className="mb-4 w-1/2">
            <label
              htmlFor="closingTime"
              className="block text-sm font-semibold text-gray-600 mb-1"
            >
              Closing Time:
            </label>
            <Field
              type="time"
              id="closingTime"
              name="closingTime"
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
            <ErrorMessage
              name="closingTime"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>
          <div className="mb-4 w-1/2">
            <label
              htmlFor="lunchTime.start"
              className="block text-sm font-semibold text-gray-600 mb-1"
            >
              Lunch Start Time:
            </label>
            <Field
              type="time"
              id="lunchTime.start"
              name="lunchTime.start"
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
            <ErrorMessage
              name="lunchTime.start"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>
          <div className="mb-4 w-1/2">
            <label
              htmlFor="lunchTime.end"
              className="block text-sm font-semibold text-gray-600 mb-1"
            >
              Lunch End Time:
            </label>
            <Field
              type="time"
              id="lunchTime.end"
              required
              name="lunchTime.end"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
            <ErrorMessage
              name="lunchTime.end"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>
          <div className="mb-4 w-1/2">
            <label
              htmlFor="slottime"
              className="block text-sm font-semibold text-gray-600 mb-1"
            >
              Slot Time:
            </label>
            <Field
              type="text"
              id="slottime"
              name="slottime"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
            <ErrorMessage
              name="slottime"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>
          <div className="mb-4 w-1/2">
            <label
              htmlFor="fees"
              className="block text-sm font-semibold text-gray-600 mb-1"
            >
              Fees: (charges of service)
            </label>
            <Field
              type="number"
              id="fees"
              required
              name="fees"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
            <ErrorMessage
              name="fees"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          <div className="flex justify-center">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
              (day, index) => (
                <p
                  key={index}
                  onClick={() => handleWorkingDays(day, setFieldValue)}
                  className={`${
                    selectedDays?.includes(day)
                      ? "bg-[orangered] text-white"
                      : "bg-gray-200 text-gray-700"
                  } px-4 py-2 rounded-md m-2 cursor-pointer`}
                >
                  {day}
                </p>
              )
            )}
          </div>

          <div className="mb-4 flex w-full justify-center mt-4">
            <button type="submit" className="btn btn-outline-danger">
              Create Appointment Schedule
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AddAppointment;
