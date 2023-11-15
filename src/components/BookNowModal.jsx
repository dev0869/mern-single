import React from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useFormik } from "formik";
import { addBooking } from "../features/Dummy/dummySlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Stack } from "@mui/material";
import axios from "axios";
import { base_url } from "../utils/baseUrl";

const BookNowModal = (props) => {
  const Navigate = useNavigate();
  const Dispatch = useDispatch();
  const { values, handleChange, handleSubmit, resetForm } = useFormik({
    initialValues: {
      name: "",
      email: "",
      number: "",
      bike: "",
      state: "",
      city: "",
    },
    onSubmit: async (values) => {
      try {
        const res = await axios.post(`${base_url}otp/send`, {
          email: values.email,
        });
        Dispatch(addBooking(values));
        if (res.data.sucess) {
          toast.success(res.data);
          resetForm();
          Navigate("/Otp");
        } else {
          toast.error(res.data);
        }
      } catch (error) {
        toast.error(error.message);
      }
    },
  });
  const productArr = [
    "Alfa k1",
    "Alfa R1",
    "Alfa R3",
    "Alfa R5",
    "Delta R3",
    "Delta V6",
    "Delta E5",
  ];
  return (
    <Modal show={props.show} onHide={props.onHide}>
      <Modal.Header closeButton>
        <Modal.Title
          style={{ display: "flex", alignItems: "center", gap: "10px" }}
        >
          <Stack
            style={{
              justifyContent: "space-between",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <h1
              style={{
                color: "orangered",
                fontWeight: "bold",
              }}
            >
              BOOK A TEST RIDE NOW
            </h1>
          </Stack>

          <AiOutlineArrowRight color="orangered" />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Enter Name"
              autoFocus
              required
              onChange={handleChange}
              value={values.name}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              value={values.email}
              onChange={handleChange}
              name="email"
              required
              placeholder="name@example.com"
              autoFocus
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Mobile Number</Form.Label>
            <Form.Control
              type="number"
              value={values.number}
              required
              onChange={handleChange}
              placeholder="Enter Mobile Number"
              autoFocus
              name="number"
            />
          </Form.Group>

          <Form.Group controlId="formBasicSelect">
            <Form.Label>Select the Bike Modal</Form.Label>
            <Form.Control
              as="select"
              name="bike"
              onChange={handleChange}
              required
            >
              <option value="">-- Select Bike --</option>
              {productArr.map((itm, i) => (
                <option key={i}>{itm}</option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Enter State</Form.Label>
            <Form.Control
              type="text"
              onChange={handleChange}
              value={values.state}
              placeholder="Enter State"
              autoFocus
              required
              name="state"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Enter City</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter City"
              autoFocus
              required
              onChange={handleChange}
              value={values.city}
              name="city"
            />
          </Form.Group>

          <Modal.Footer
            className="items-center"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <button
              style={{ padding: "10px 20px" }}
              className="btn btn-outline-danger"
              onClick={props.onHide}
            >
              close
            </button>

            <button
              style={{ padding: "10px 20px" }}
              type="submit"
              onClick={props.onHide}
              className="btn btn-outline-danger"
            >
              Submit
            </button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default BookNowModal;
