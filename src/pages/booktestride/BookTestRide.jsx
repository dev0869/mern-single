import axios from "axios";
import { useState } from "react";
import React from "react";
import { districtsByState, states } from "../../components/DropdownComponent";
import Form from "react-bootstrap/Form";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { addBooking } from "../../features/Dummy/dummySlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { base_url } from "../../utils/baseUrl";
import { Stack } from "@mui/material";
import { AiOutlineArrowRight } from "react-icons/ai";
import { toggleLoading } from "../../features/loading/loadingSlice";
const BookTestRide = () => {
  const Navigate = useNavigate();
  const Dispatch = useDispatch();
  const { values, handleChange, handleSubmit, setFieldValue, resetForm } =
    useFormik({
      initialValues: {
        name: "",
        email: "",
        number: "",
        service: "",
        state: "",
        city: "",
      },
      onSubmit: async (values) => {

        Dispatch(toggleLoading(true));
        try {
          const res = await axios.post(`${base_url}otp/send`, {
            email: values.email,
          });
          Dispatch(addBooking(values));
          if (res.data.success) {
            toast.success(res.data);
            resetForm();
            Navigate("/Otp");
          } else {
            toast.error(res.data);
          }
        } catch (error) {
          toast.error(error.message);
        }
        Dispatch(toggleLoading(false));
      },
    });
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "number") {
      const numericValue = value.replace(/\D/g, ""); // Remove non-digits
      if (numericValue.length <= 10) {
        setInputValue(numericValue);
        handleChange(event); // Update formik values
      }
    } else {
      // For other fields, update the state normally
      setInputValue(value);
      handleChange(event); // Update formik values
    }
  };

  const handleStateChange = (event) => {
    const state = event.target.value;
    setFieldValue("state", state);
    setFieldValue("city", ""); // Reset selected district when state changes
  };
  const handleDistrictChange = (event) => {
    const city = event.target.value;
    setFieldValue("city", city);
  };
  const services = useSelector(st => st.site.data?.services?.cards)
  const service = services?.map(e => e.title)
  return (
    // <div className="container p-4">
    //   <div>
    //     <Stack
    //       className="h3 mb-4"
    //       style={{
    //         justifyContent: "space-between",
    //         display: "flex",
    //         flexDirection: "row",
    //       }}
    //     >
    //       <h1
    //         style={{
    //           color: "orangered",
    //           fontWeight: "bold",
    //         }}
    //       >
    //         BOOK NOW
    //       </h1>
    //       <AiOutlineArrowRight color="orangered" />
    //     </Stack>
    //   </div>
    //   <Form onSubmit={handleSubmit}>
    //     <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
    //       <Form.Label>Name</Form.Label>
    //       <Form.Control
    //         type="text"
    //         name="name"
    //         placeholder="Enter Name"
    //         autoFocus
    //         required
    //         onChange={handleChange}
    //         value={values.name}
    //       />
    //     </Form.Group>
    //     <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
    //       <Form.Label>Email Address</Form.Label>
    //       <Form.Control
    //         type="email"
    //         value={values.email}
    //         onChange={handleChange}
    //         name="email"
    //         required
    //         placeholder="name@example.com"
    //         autoFocus
    //       />
    //     </Form.Group>
    //     <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
    //       <Form.Label>Mobile Number</Form.Label>
    //       <Form.Control
    //         type="number"
    //         value={values.number}
    //         required
    //         maxLength="10"
    //         onChange={handleInputChange}
    //         placeholder="Enter Mobile Numberss"
    //         autoFocus
    //         name="number"
    //       />
    //     </Form.Group>

    //     <Form.Group controlId="formBasicSelect">
    //       <Form.Label>Select the Service</Form.Label>
    //       <Form.Control
    //         as="select"
    //         name="service"
    //         onChange={handleChange}
    //         required
    //       >
    //         <option value="">-- Select Service --</option>
    //         {service.map((itm, i) => (
    //           <option key={i}>{itm}</option>
    //         ))}
    //       </Form.Control>
    //     </Form.Group>
    //     <Form.Group className="mb-3 mt-3" controlId="exampleForm.ControlInput1">
    //       <Form.Label>Enter State</Form.Label>
    //       <Form.Control
    //         as="select"
    //         name="state"
    //         onChange={handleStateChange}
    //         required
    //       >
    //         <option value="">Select state </option>
    //         {states.map((itm, i) => (
    //           <option key={i}>{itm}</option>
    //         ))}
    //       </Form.Control>
    //     </Form.Group>
    //     <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
    //       <Form.Label>Enter City</Form.Label>
    //       <Form.Control
    //         as="select"
    //         name="city"
    //         onChange={handleDistrictChange}
    //         required
    //       >
    //         <option value="">Select District </option>
    //         {values.state &&
    //           districtsByState[values.state].map((district, index) => (
    //             <option key={index} value={district}>
    //               {district}
    //             </option>
    //           ))}
    //       </Form.Control>
    //     </Form.Group>

    //     <button
    //       style={{ padding: "10px 20px" }}
    //       type="submit"
    //       className="btn btn-outline-danger"
    //     >
    //       Submit
    //     </button>
    //   </Form>
    // </div>
    <>

    </>
  );
};

export default BookTestRide;
