import { TextField } from "@mui/material";
import { useState } from "react";
import React from "react";
import Form from "react-bootstrap/Form";
import { addtestride } from "../features/auth/autApi";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import './index.css';
import { useSelector } from "react-redux";
const InputEffect = () => {

  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);
  const { values, handleChange, handleSubmit, resetForm } = useFormik({
    initialValues: {
      name: "",
      email: "",
      number: "",
      service: "",
      state: "",
      city: "",
    },
    onSubmit: async (values) => {
      const res = await addtestride(values);
      if (res.status !== undefined) {
        toast.success("You booking for test service is sucessfully Submitted");
        handleClose();
        resetForm();
      } else {
        toast.error(res);
      }
    },
  });
  const [isFocused, setIsFocused] = useState(false);
  const services = useSelector(st => st.site.data?.services?.cards)
  const service = services?.map(e => e.title)
  const handleFocus = () => {
    setIsFocused(true);
  };
  const labelStyles = {
    color: "white",
  };
  const handleBlur = () => {
    setIsFocused(false);
  };

  const inputStyles = {
    backgroundColor: isFocused ? "transparent" : "transparent",
    color: "white",
  };
  return (
    <>
      <div className="textinputmain">
        <div className="text">
          <h1>Get Quotation</h1>
          <p>Take A Demo Of Our Service</p>
        </div>
        <br />
        {/* dsad */}

        <Form onSubmit={handleSubmit}>
          <div className="textsubfield">
            <TextField
              className="textfield"
              id="standard-basic"
              label="Name"
              name="name"
              required
              onChange={handleChange}
              value={values.name}
              InputProps={{
                style: inputStyles,
                onFocus: handleFocus,
                onBlur: handleBlur,
              }}
              InputLabelProps={{
                style: labelStyles,
              }}
              variant="standard"
            />
            <TextField
              InputProps={{
                style: inputStyles,
                onFocus: handleFocus,
                onBlur: handleBlur,
              }}
              InputLabelProps={{
                style: labelStyles,
              }}
              name="email"
              required
              onChange={handleChange}
              value={values.email}
              type="email"
              id="standard-basic"
              label="Email No."
              variant="standard"
            />
            <TextField
              InputProps={{
                style: inputStyles,
                onFocus: handleFocus,
                onBlur: handleBlur,
              }}
              InputLabelProps={{
                style: labelStyles,
              }}
              name="number"
              required
              onChange={handleChange}
              value={values.number}
              id="standard-basic"
              label="Mobile Number"
              variant="standard"
            />
            <Form.Group controlId="formBasicSelect">
              <Form.Control
                className="select"
                as="select"
                name="service"
                onChange={handleChange}
                required
              >
                <option value="">Select Service</option>
                {service?.map((itm, i) => (
                  <option key={i}>{itm}</option>
                ))}
              </Form.Control>
            </Form.Group>

            <TextField
              InputProps={{
                style: inputStyles,
                onFocus: handleFocus,
                onBlur: handleBlur,
              }}
              InputLabelProps={{
                style: labelStyles,
              }}
              name="state"
              required
              onChange={handleChange}
              value={values.state}
              id="standard-basic"
              label="State"
              variant="standard"
            />
            <TextField
              id="standard-basic"
              label="City"
              InputProps={{
                style: inputStyles,
                onFocus: handleFocus,
                onBlur: handleBlur,
              }}
              name="city"
              required
              onChange={handleChange}
              value={values.city}
              InputLabelProps={{
                style: labelStyles,
              }}
              variant="standard"
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "12px",
              marginTop: "12px",
            }}
          >
            <button
              type="submit"
              onClick={handleClose}
              style={{
                border: "1px solid white",
                color: "white",
                padding: "8px 12px",
                borderRadius: "10px",
              }}
            >
              Submit
            </button>
          </div>
        </Form>
      </div>

      {/* sadad */}
      {/* <div className={!show ? "slidemain" : "slidemainoff"}>
        <button className="slidebut" onClick={() => setShow(!show)}>
          {show ? (
            <svg
              width="38"
              height="38"
              viewBox="0 0 38 38"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="19" cy="19" r="19" fill="white" />
              <path
                d="M26.061 13.5895L19.0066 20.35L11.9522 13.5895L9.13043 14.9416L19.0066 24.4062L28.8828 14.9416L26.061 13.5895Z"
                fill="#EC2028"
              />
            </svg>
          ) : (
            <svg
              width="38"
              height="38"
              viewBox="0 0 38 38"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="19" cy="19" r="19" fill="black" />
              <path
                d="M26.061 13.5895L19.0066 20.35L11.9522 13.5895L9.13043 14.9416L19.0066 24.4062L28.8828 14.9416L26.061 13.5895Z"
                fill="#EC2028"
              />
            </svg>
          )}
        </button>
      </div> */}
    </>
  );
};

export default InputEffect;
