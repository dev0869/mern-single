import "./Chart.css";
import ReactApexChart from "react-apexcharts";
import React from "react";
const Dashboardchart = () => {
  const chart1 = {
    series: [
      {
        name: "series1",
        data: [31, 40, 25, 3, 4, 34, 5, 5, 5, 533, 0],
      },
    ],
    options: {
      chart: {
        type: "area",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      colors: ["#f0735a"],
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        labels: {
          show: true,
        },
      },
      yaxis: {
        labels: {
          show: true,
        },
      },
    },
  };
  return (
    <>
      <div className="col-12 mt-4 pt-2">
        <div className="card border-0 rounded shadow p-4 w-full">
          <div className="d-flex justify-content-between mb-3">
            <h6 className="align-items-center mb-0">Contact Report </h6>
          </div>
          <div id="rchart-3" style={{ minHeight: "90px" }}>
            <ReactApexChart
              width={"100%"}
              options={chart1.options}
              series={chart1.series}
              type="area"
              height="400px"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboardchart;
