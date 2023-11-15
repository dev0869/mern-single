import React, { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { postAppointment } from "../../features/appointment/appointmentSlice";
import { Formik, Field, Form, ErrorMessage, useFormik } from "formik";

const AddAppointment = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [selectedDays, setSelectedDays] = useState(Array(7).fill(false));
  const [selectedTimes, setSelectedTimes] = useState([]);

  const formik = useFormik({
    initialValues: {
      Days: "",
    },
    onSubmit: (values) => {
      dispatch(postAppointment(values));
    },
  });

  const getWorkingDates = () => {
    const currentDate = new Date();
    const workingDates = [];

    while (workingDates.length < 7) {
      const day = currentDate.getDay();
      if (selectedDays[day]) {
        workingDates.push(new Date(currentDate));
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return workingDates;
  };

  const handleDayButtonClick = (dayIndex) => {
    const newSelectedDays = [...selectedDays];
    newSelectedDays[dayIndex] = !newSelectedDays[dayIndex];
    setSelectedDays(newSelectedDays);
  };

  const handleCreateDates = () => {
    const workingDays = getWorkingDates();
    setData(workingDays);
    toast.success("Successfully Dates Created");
  };

  const getWorkingTimes = (values) => {
    const { startTime, endTime, interval, lunchTimeStart, lunchTimeEnd } =
      values;
    const startDate = new Date();
    startDate.setHours(Number(startTime.split(":")[0]));
    startDate.setMinutes(Number(startTime.split(":")[1]));

    const lunchStart = new Date();
    lunchStart.setHours(Number(lunchTimeStart.split(":")[0]));
    lunchStart.setMinutes(Number(lunchTimeStart.split(":")[1]));

    const lunchEnd = new Date();
    lunchEnd.setHours(Number(lunchTimeEnd.split(":")[0]));
    lunchEnd.setMinutes(Number(lunchTimeEnd.split(":")[1]));

    const endDate = new Date();
    endDate.setHours(Number(endTime.split(":")[0]));
    endDate.setMinutes(Number(endTime.split(":")[1]));

    const currentTime = new Date(startDate);
    const workingTimes = [];

    while (currentTime < lunchStart) {
      const timeString = currentTime.toLocaleTimeString("en-US");
      workingTimes.push(timeString);
      currentTime.setMinutes(currentTime.getMinutes() + interval);
    }

    currentTime.setHours(lunchEnd.getHours());
    currentTime.setMinutes(lunchEnd.getMinutes());

    while (currentTime <= endDate) {
      const timeString = currentTime.toLocaleTimeString("en-US");
      workingTimes.push(timeString);
      currentTime.setMinutes(currentTime.getMinutes() + interval);
    }

    setSelectedTimes(workingTimes);
  };

  return (
    <div className="flex flex-col w-full">
      <p className="text-2xl font-bold text-gray-700">Configure Appointment</p>
      <div className="shadow-sm mt-3  w-full p-4">
        <div className="mt-4">
          <p className="text-lg font-bold mx-auto text-gray-700">
            Select Working Days:
          </p>

          <div className="flex justify-center">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
              (day, index) => (
                <button
                  key={index}
                  onClick={() => handleDayButtonClick(index)}
                  className={`${
                    selectedDays[index]
                      ? "bg-[orangered] text-white"
                      : "bg-gray-200 text-gray-700"
                  } px-4 py-2 rounded-md m-2`}
                >
                  {day}
                </button>
              )
            )}
          </div>
        </div>

        <div className="mt-4 w-[30%] mx-auto">
          <button
            onClick={handleCreateDates}
            className="w-full text-white bg-[orangered] rounded border border-[orangered] p-2 transition hover:bg-opacity-90"
          >
            Create Dates
          </button>
        </div>

        <div className="mt-4">
          <p className="text-lg font-bold text-gray-700">
            Working Dates (Day, Date):
          </p>
          <div className="flex flex-row gap-3 flex-wrap item-center">
            {data.map((date, index) => (
              <div
                key={index}
                className="mt-3 flex rounded-lg flex-col border-1 border-orange-500 w-[100px] p-2 items-center"
              >
                <p className="text-xl text-orange-500">
                  {date.toLocaleDateString("en-US", { day: "2-digit" })}
                </p>
                <p className="text-xl text-orange-500">
                  {date.toLocaleDateString("en-US", { weekday: "short" })}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="shadow-sm mt-3 w-full p-2">
        <Formik
          initialValues={{
            startTime: "09:00",
            endTime: "17:00",
            interval: 30,
            lunchTimeStart: "12:00",
            lunchTimeEnd: "13:00",
          }}
          onSubmit={(values, { setSubmitting }) => {
            getWorkingTimes(values);
            toast.success("Successfully Times Created");
          }}
        >
          {() => (
            <Form>
              <div className="mt-4">
                <p className="text-lg font-bold text-gray-700">
                  Starting Time:
                </p>
                <Field type="time" name="startTime" />
              </div>

              <div className="mt-4">
                <p className="text-lg font-bold text-gray-700">Ending Time:</p>
                <Field type="time" name="endTime" />
              </div>

              <div className="mt-4">
                <p className="text-lg font-bold text-gray-700">
                  Select Interval (minutes):
                </p>
                <Field type="number" name="interval" />
              </div>

              <div className="mt-4">
                <p className="text-lg font-bold text-gray-700">
                  Lunch Time Start:
                </p>
                <Field type="time" name="lunchTimeStart" />
              </div>

              <div className="mt-4">
                <p className="text-lg font-bold text-gray-700">
                  Lunch Time End:
                </p>
                <Field type="time" name="lunchTimeEnd" />
              </div>

              <div className="mt-4 w-[30%] mx-auto">
                <button
                  type="submit"
                  className="w-full text-white bg-[orangered] rounded border border-[orangered] p-2 transition hover:bg-opacity-90"
                >
                  Create Times
                </button>
              </div>
            </Form>
          )}
        </Formik>

        <div className="mt-4">
          <p className="text-lg font-bold text-gray-700">Working Times:</p>
          <div className="flex flex-row gap-3 flex-wrap item-center">
            {selectedTimes.map((time, index) => (
              <div
                key={index}
                className="mt-3 flex rounded-lg flex-col border-1 border-orange-500 w-[100px] p-2 items-center"
              >
                <p className="text-xl text-orange-500">{time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAppointment;
