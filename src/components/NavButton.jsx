import "./index.css";
import { Stack } from "@mui/material";
import { useState } from "react";
import React from "react";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { bookUser } from "../features/user/userSlice";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useFormik } from "formik";
import BookNowModal from "./BookNowModal";

export const SmNavButton = () => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();


  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      name: "",
      email: "",
      number: "",
      otp: "",
      state: "",
      city: "",
    },
    onSubmit: (values) => {
      dispatch(bookUser(values));
    },
  });

  const handleClose = () => setShow(false);

  return (
    <Stack
      direction={"column"}
      gap={3}
      textAlign={"center"}
      className="navButtons"
    >
      <Link to={"/testbookride"}>
        <button>
          <span>My Appointment</span>
        </button>
      </Link>
      <Link to={"/dealer"}>
        <button>
          <span>Become a Vendor</span>
        </button>
      </Link>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title
            style={{ display: "flex", alignItems: "center", gap: "10px" }}
          >
            <h1
              style={{
                color: "orangered",
                fontWeight: "bold",
              }}
            >
              Get Quotation
            </h1>
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
                placeholder="enter name"
                autoFocus
                onChange={handleChange}
                value={values.name}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                value={values.email}
                onChange={handleChange}
                name="email"
                placeholder="name@example.com"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control
                type="number"
                value={values.number}
                onChange={handleChange}
                placeholder="Enter Mobile number"
                autoFocus
                name="number"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Enter OTP</Form.Label>
              <Form.Control
                type="number"
                onChange={handleChange}
                value={values.otp}
                placeholder="Enter OTP"
                autoFocus
                name="otp"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Enter State</Form.Label>
              <Form.Control
                type="text"
                onChange={handleChange}
                value={values.state}
                placeholder="Enter state"
                autoFocus
                name="state"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Enter City</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter City"
                autoFocus
                onChange={handleChange}
                value={values.city}
                name="city"
              />
            </Form.Group>
            <Modal.Footer>
              <button type="submit" onClick={handleClose}>
                Save Changes
              </button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </Stack>
  );
};

const NavButton = () => {
  const user = useSelector((s) => s.auth.user);


  const [show, setShow] = useState(false);


  return (
    <Stack direction={"row"} gap={3} className="navButton">

      <a href={'#contact'}>
        <button>
          <span>CONTACT US </span>
          <svg
            width="14"
            height="34"
            viewBox="0 0 74 74"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="37"
              cy="37"
              r="35.5"
              stroke="white"
              strokeWidth="3"
            ></circle>
            <path
              d="M25 35.5C24.1716 35.5 23.5 36.1716 23.5 37C23.5 37.8284 24.1716 38.5 25 38.5V35.5ZM49.0607 38.0607C49.6464 37.4749 49.6464 36.5251 49.0607 35.9393L39.5147 26.3934C38.9289 25.8076 37.9792 25.8076 37.3934 26.3934C36.8076 26.9792 36.8076 27.9289 37.3934 28.5147L45.8787 37L37.3934 45.4853C36.8076 46.0711 36.8076 47.0208 37.3934 47.6066C37.9792 48.1924 38.9289 48.1924 39.5147 47.6066L49.0607 38.0607ZM25 38.5L48 38.5V35.5L25 35.5V38.5Z"
              fill="white"
            ></path>
          </svg>
        </button>
      </a>
      <BookNowModal show={show} onHide={() => setShow(false)} />

    </Stack>
  );
};

export default NavButton;
