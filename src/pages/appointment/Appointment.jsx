/* eslint-disable react/prop-types */

import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import './index.css';
import { getNextWorkingDays, getWorkingTimes } from "../admin/api/utility";
import { postAppointment } from "../../features/appointment/appointmentSlice";
import { unwrapResult } from "@reduxjs/toolkit";

const Appointment = () => {
  const dispatch = useDispatch();
  const error = useSelector((st) => st.appointment.error);
  const user = JSON.parse(localStorage.getItem("user"));
  const service = useSelector((st) => st.site.data)?.services;

  const [workingDates, setWorkingDates] = useState([]);
  const [workingTimes, setWorkingTimes] = useState([]);

  const schedule = useSelector((st) => st.appointment.schedule);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedServices, setSelectedServices] = useState("");
  console.log(selectedServices);// Store selected services as a string

  if (error) {
    toast.error('The Given Appointment Time already Booked');
  }

  const getTimes = () => {
    if (schedule) {
      const { workingDays, lunchTime, slottime, startingTime, closingTime } = schedule;
      setWorkingDates(getNextWorkingDays(workingDays));
      setWorkingTimes(
        getWorkingTimes(
          startingTime,
          closingTime,
          parseInt(slottime),
          lunchTime.start,
          lunchTime.end
        )
      );
    }
  };

  useEffect(() => {
    getTimes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [schedule]);

  const handleBookAppointment = () => {
    dispatch(postAppointment({
      "service": selectedServices,
      "time": selectedDate.toLocaleDateString() + " " + selectedTime,
      "mobile": user?.mobile,
      "name": user?.name
    })).then(unwrapResult).then(() => {
      toast.success('Appointment Booked Successfully!');
    });
  };

  const isDateSelected = (date) => date === selectedDate;
  const isTimeSelected = (time) => time === selectedTime;

  return (
    <div className="container p-6">
      {schedule ? (
        <div
          style={{
            background:
              "url(https://askbootstrap.com/preview/dactorapp/img/background-blob.svg)",
          }}
          className="rounded-4 p-4 appointment-banner mb-4"
        >
          <div className="d-flex justify-center align-items-center gap-3">
            <img
              src="img/appointment-doctor.png"
              alt=""
              className="img-fluid appointment-doctor-img"
            />
            <div className="text-center">
              <h1 className="text-2xl text-gray-700 font-semibold">
                Consultation Fee
              </h1>
              <h1 className="text-primary text-4xl mb-0 fw-bold">
                ₹{schedule.fees}
              </h1>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading data...</p>
      )}

      <div className="mt-4">
        <p className="text-xl font-bolder text-gray-700">Select working days</p>
        <div className="flex flex-row gap-3 flex-wrap justify-center item-center">
          {workingDates.map((ele, index) => (
            <div
              key={index}
              className={`mt-3 flex cursor-pointer text-orange-500 rounded-lg flex-col border-1 border-orange-500 w-[100px] p-2 items-center ${isDateSelected(ele.date) ? "data text-white" : ""}`}
              onClick={() => setSelectedDate(ele.date)}
            >
              <p className="text-xl ">
                {ele.date.toLocaleDateString("en-US", { day: "2-digit" })}
              </p>
              <p className="text-xl font-semibold ">{ele.day}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <p className="text-xl font-bolder text-gray-700">Select Time Slots</p>
        <div className="flex p-3 justify-center flex-row gap-3 flex-wrap item-center">
          {workingTimes.map((time, i) => (
            <div
              key={i}
              className={`mt-3 cursor-pointer flex rounded-lg text-orange-500 flex-col border-1 border-orange-500 w-[120px] p-2 items-center ${isTimeSelected(time) ? "data text-white " : ""}`}
              onClick={() => setSelectedTime(time)}
            >
              <p className="text-xl ">{time}</p>
            </div>
          ))}
        </div>
      </div>

      <h2 className="mb-4 text-3xl font-bold sm:text-4xl md:text-[40px] text-[orangered]">
        <p className="text-xl font-bolder text-gray-700">Select Services</p>
      </h2>
      <div className="flex justify-center  gap-2">
        {service?.cards?.map((ele, i) => (
          <ServiceCard
            key={i}
            data={ele}
            handleServiceSelection={(title) => setSelectedServices(selectedServices + (selectedServices ? ', ' : '') + title)} // Add services to the string
            isSelected={selectedServices.includes(ele.title)}
          />
        ))}
      </div>
      <button
        className="mt-4 mx-auto data text-white rounded-md p-2 px-4"
        onClick={handleBookAppointment}
      >
        Book Appointment
      </button>

  
    </div>
  );
};

export default Appointment;

export const ServiceCard = ({ data, handleServiceSelection, isSelected }) => {
  const { title } = data;
  return (
    <div
      className={`mt-3 cursor-pointer flex rounded-lg text-orange-500 flex-col border-1 border-orange-500 w-[220px] p-2 items-center ${isSelected ? "data text-white" : ""}`}
      onClick={() => handleServiceSelection(title)}
    >
      <p className="text-xl ">{title}</p>
    </div>
  );
};
