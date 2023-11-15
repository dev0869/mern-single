import { useState } from "react";
import "./index.css";
import React from "react";
import { Link } from "react-router-dom";
import { Stack } from "@mui/material";
import { useSelector } from "react-redux";
const Cart = () => {
  const [interestRate, setInterestRate] = useState(5); // Initial interest rate is set to 5%
  const [months, setMonths] = useState(12);

  const maxPrincipal = 100000; // Set your maximum principal amount here
  const maxInterestRate = 20; // Set your maximum interest rate here
  const maxMonths = 48; // Set your maximum number of months here

  const data = useSelector((state) => state.cart.product);
  const { price } = data;
  const maxprice = parseInt(price?.replace(/,/g, "").toLocaleString());

  const [number, setNumber] = useState(2100);
  const TotalLoanAmt = -1 * (number - data.price);
  const principal = TotalLoanAmt;
  const calculateEMI = () => {
    // EMI Calculation logic here
    const monthlyInterest = interestRate / 12 / 100;

    const emi =
      (principal * monthlyInterest) /
      (1 - Math.pow(1 + monthlyInterest, -months));
    return emi.toFixed(2);
  };

  const extrapay = calculateEMI() * months - TotalLoanAmt;
  const payable = extrapay + TotalLoanAmt;

  return (
    <>
      <Stack
        display={"flex"}
        direction={"row"}
        flexWrap={"wrap"}
        className="cartmain"
        gap={8}
      >
        <Stack flex={4} justifyContent={"center"} className="cartimg">
          <img src={data.img} alt="" />
        </Stack>
        <Stack flex={6} width={"100%"} className="cartdetail">
          <h1>{data.name}</h1>
          <p style={{ color: "#282825" }}>
            ₹{data.price} <span className="sp">(Ex-Showroom Price)</span>{" "}
          </p>

          <p style={{ color: "black" }}>Advance Payment</p>
          <Stack
            display={"flex"}
            sx={{
              flexWrap: {
                xs: "wrap",
                md: "nowrap",
              },
              gap: {
                xs: 3,
                md: 6,
              },
            }}
            direction={"row"}
            alignItems={"center"}
          >
            {/* slider................................ */}
            <Stack
              sx={{
                width: { xs: "100%", md: "50%" },
                gap: 2,
              }}
            >
              <Stack
                display={"flex"}
                justifyContent={"space-between"}
                direction={"row"}
              >
                <span
                  style={{
                    color: "orangered",
                    textAlign: "center",
                    fontSize: "12px",
                  }}
                >
                  &#8377;2,100
                  <br />
                  (Advance Payment)
                </span>
                <span
                  style={{
                    color: "orangered",
                    textAlign: "center",
                    fontSize: "12px",
                  }}
                >
                  &#8377;{data.price}
                  <br />
                  (Ex-showroom Price)
                </span>
              </Stack>
              <input
                className="slider"
                type="range"
                min={2100}
                max={maxprice}
                step={50}
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
            </Stack>

            <div className="stylediv">
              <input
                type="text"
                style={{ outline: "none" }}
                value={number.toLocaleString()}
                min={2100}
                onChange={(e) => setNumber(e.target.value)}
              />
            </div>
          </Stack>
          <br />
          <Stack display={"flex"} direction={"row"} gap={2}>
            <input type="checkbox" />
            <p style={{ color: "#282825" }}>
              I agree to the{" "}
              <Link to={"/terms-and-conditon"} style={{ fontWeight: "bold" }}>
                <span style={{ color: "orangered" }}>Terms & Conditions</span>
              </Link>
            </p>
          </Stack>
          <span style={{ color: "orangered" }}>
            Please agree to the terms and conditions to proceed.
          </span>
          <br />
          <br />
          <div className="navButtonss navwidth">
            <button className="submit subpad">Pay Now</button>
          </div>
        </Stack>
      </Stack>

      {/* Emi calculator */}

      <div
        className="Emi"
        style={{
          boxShadow: "0 3px 10px rgba(0, 0, 0, 0.16)",
          margin: "35px",
          borderRadius: "10px",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <h1
          style={{
            fontSize: "30px",
            textAlign: "center",
            padding: "30px",
            fontWeight: "bold",
          }}
        >
          Calculate your Loan EMI for {data.name}
        </h1>
        {/* Principal Amount Slider */}
        {/* payment */}

        <Stack
          sx={{
            width: { xs: "100%", md: "50%" },
            gap: 2,
            margin: "14px auto",
          }}
        >
          <Stack
            display={"flex"}
            justifyContent={"space-between"}
            direction={"row"}
          >
            <span
              style={{
                color: "orangered",
                textAlign: "center",
                fontSize: "12px",
              }}
            >
              &#8377;2,100
              <br />
              (Advance Payment)
            </span>

            <div className="stylediv">
              <input
                type="text"
                style={{ outline: "none", width: "100%" }}
                value={number.toLocaleString()}
                min={2100}
                onChange={(e) => setNumber(e.target.value)}
              />
            </div>
          </Stack>
          <input
            className="slider"
            type="range"
            min={2100}
            max={maxprice}
            step={50}
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
        </Stack>

        {/* Display EMI */}
        {/* Interest Rate Slider */}

        <Stack
          sx={{
            width: { xs: "100%", md: "50%" },
            gap: 2,
            margin: "14px auto",
          }}
        >
          <Stack
            display={"flex"}
            justifyContent={"space-between"}
            direction={"row"}
          >
            <span
              style={{
                color: "orangered",
                textAlign: "center",
                fontSize: "12px",
              }}
            >
              {interestRate}%<br />
              (Interest Rate)
            </span>
            <div className="stylediv">
              <input
                type="text"
                style={{ outline: "none", width: "100%" }}
                value={interestRate.toFixed(1)}
                min={0}
                onChange={(e) => setInterestRate(parseFloat(e.target.value))}
              />
            </div>
          </Stack>
          <input
            className="slider"
            type="range"
            min={0}
            max={maxInterestRate}
            step={0.1}
            value={interestRate}
            onChange={(e) => setInterestRate(parseFloat(e.target.value))}
          />
        </Stack>

        {/* Number of Months Slider */}

        <Stack
          sx={{
            width: { xs: "100%", md: "50%" },
            gap: 2,
            margin: "14px auto",
          }}
        >
          <Stack
            display={"flex"}
            justifyContent={"space-between"}
            direction={"row"}
          >
            <span
              style={{
                color: "orangered",
                textAlign: "center",
                fontSize: "12px",
              }}
            >
              {months} months
              <br />
              (Loan Tenure)
            </span>

            <div className="stylediv">
              <input
                type="text"
                style={{ outline: "none", width: "100%" }}
                value={months}
                min={1}
                onChange={(e) => setMonths(parseInt(e.target.value))}
              />
            </div>
          </Stack>
          <input
            className="slider"
            type="range"
            min={1}
            max={maxMonths}
            step={1}
            value={months}
            onChange={(e) => setMonths(parseInt(e.target.value))}
          />
        </Stack>

        <div
          className="container2"
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "20PX 10PX",
            }}
          >
            <p>Ex-Showroom Price:</p>
            <p>&#8377;{data?.price} </p>
          </div>
          <hr />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "20PX 10PX",
            }}
          >
            <p>Total Loan Amount: </p>
            <p>&#8377;{TotalLoanAmt}</p>
          </div>
          <hr />

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "20PX 10PX",
            }}
          >
            <h2>Payable Amount: </h2>
            <p>&#8377;{Math.round(payable)}</p>
          </div>
          <hr />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "20PX 10PX",
            }}
          >
            <h2>You will pay Extra</h2>
            <p> {Math.round(extrapay)}</p>
          </div>
          <hr />
          <div
            style={{
              display: "flex",
              justifyContent: "Center",
              alignItems: "center",
              padding: "20PX 10PX",
            }}
          >
            <p>
              {" "}
              <h2
                style={{
                  fontSize: "30px",
                  fontWeight: "bold",
                  padding: "10px",
                  borderRight: "2px solid black",
                }}
              >
                EMI:
                <br />
                <span
                  style={{
                    fontSize: "12px",
                    position: "relative",
                    top: "-12px",
                  }}
                >
                  Per Month
                </span>
              </h2>
            </p>
            <p style={{ fontSize: "50px", padding: "10px" }}>
              &#8377;{calculateEMI()}
            </p>
          </div>
          <hr />
        </div>
      </div>
    </>
  );
};

export default Cart;
