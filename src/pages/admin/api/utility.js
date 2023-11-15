import React from "react";
export function getNextWorkingDays(workingDays) {
  const nextWorkingDays = [];
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let currentDate = new Date();
  const getNextDate = (date) => {
    const currentDate = new Date(date);
    const nextDate = new Date(currentDate);
    nextDate.setDate(currentDate.getDate() + 1);
    return nextDate;
  };

  let currentDay = daysOfWeek[currentDate.getDay()];

  for (let i = 0; i < 30; i++) {
    currentDate = getNextDate(currentDate);
    currentDay = daysOfWeek[currentDate.getDay()];

    if (workingDays.includes(currentDay)) {
      nextWorkingDays.push({
        day: currentDay,
        date: currentDate,
      });
    }
  }
  return nextWorkingDays.splice(0, 7);
}

export const getWorkingTimes = (
  startTime,
  endTime,
  interval,
  lunchTimeStart,
  lunchTimeEnd
) => {
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
  let timeStringsWithoutSeconds = workingTimes.map((time) => {
    let parts = time.split(":");
    let formattedTime =
      parts[0] + ":" + parts[1] + " " + parts[2].split(" ")[1];
    return formattedTime;
  });


  return timeStringsWithoutSeconds;
};
