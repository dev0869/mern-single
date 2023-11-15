import { useState } from "react";
import "./login.css";
import React from "react";
import { base_url } from "../../utils/baseUrl";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { checkuserSignup } from "../../apis";
import { useDispatch } from "react-redux";
import { addBooking } from "../../features/Dummy/dummySlice";
import { toggleLoading } from "../../features/loading/loadingSlice";

const Login = () => {
  const handleSignUpClick = (e) => {
    e.preventDefault();
    const container = document.getElementById("container");
    container.classList.add("right-panel-active");
  };

  const handleSignInClick = (e) => {
    e.preventDefault();
    const container = document.getElementById("container");
    container.classList.remove("right-panel-active");
  };
  const loginData = {
    email: "",
    password: "",
  };
  const signupData = {
    name: "",
    email: "",
    mobile: "",
    password: "",
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logins, setLogin] = useState(loginData);
  const [signup, setsignup] = useState(signupData);

  //todo this function is used to create user sigup is valid or not
  const handleSignUp = async (e) => {
    e.preventDefault();
    dispatch(toggleLoading(true));
    const res = await checkuserSignup(signup);
    if (res.success) {
      dispatch(addBooking(signup));
      try {
        const res2 = await axios.post(`${base_url}otp/send`, {
          email: signup.email,
        });
        if (res2.data.success) {
          toast.success(res2.data.success);
          navigate("/signup");
          dispatch(toggleLoading(false));
        }
      } catch (error) {
        toast.error(error.mesage);
        dispatch(toggleLoading(false));
      }
    } else {
      toast.error(res.error);
      dispatch(toggleLoading(false));
    }
  };
  // todo Login function to handle userr login
  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await axios.post(`${base_url}user/login`, logins);
    if (res.data.name !== undefined) {
      toast.success("Login Sucessfull");
      localStorage.setItem("user", JSON.stringify(res.data));
      if (res.data.role === "admin") {
        navigate("/admin");
        window.location.reload();
      } else {
        navigate("/");
      }
    } else {
      toast.error(res.data);
    }
  };
  return (
    <div className="registration-tab">
      <div className="container" id="container">
        <div className="form-container sign-up-container">
          <form onSubmit={handleSignUp}>
            <h1>Create Account</h1>

            <span>or use your email for registration</span>
            <input
              className="c"
              required
              onChange={(e) => setsignup({ ...signup, name: e.target.value })}
              type="text"
              name="fullname"
              placeholder="Name"
            />
            <input
              className="c"
              required
              onChange={(e) => setsignup({ ...signup, email: e.target.value })}
              type="email"
              placeholder="Email"
            />
            <input
              className="c"
              required
              onChange={(e) => setsignup({ ...signup, mobile: e.target.value })}
              type="number"
              placeholder="Number"
            />
            <input
              className="c"
              required
              onChange={(e) =>
                setsignup({ ...signup, password: e.target.value })
              }
              type="password"
              placeholder="Password"
            />
            <button type="submit">Sign Up</button>
            <p className="hides">
              Have an Account?{" "}
              <span
                onClick={handleSignInClick}
                style={{
                  color: "orangered",
                  cursor: "pointer",
                  fontSize: "14px",
                }}
              >
                sign in
              </span>{" "}
            </p>
          </form>
        </div>
        <div className="form-container sign-in-container">
          <form>
            <h1>Sign in</h1>
            <span>or use your account</span>
            <input
              className="c"
              onChange={(e) => setLogin({ ...logins, email: e.target.value })}
              type="email"
              placeholder="Email"
            />
            <input
              className="c"
              onChange={(e) =>
                setLogin({ ...logins, password: e.target.value })
              }
              type="password"
              placeholder="Password"
            />
            <Link to="/forgot-password">Forgot your password?</Link>
            <button onClick={handleLogin}>Sign In</button>
            <p className="hides">
              Does not Have an Account?{" "}
              <span
                onClick={handleSignUpClick}
                style={{
                  color: "orangered",
                  cursor: "pointer",
                  fontSize: "14px",
                }}
              >
                Sign Up
              </span>{" "}
            </p>
          </form>
        </div>

        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button className="ghost" onClick={handleSignInClick}>
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start the journey with us</p>
              <button className="ghost" onClick={handleSignUpClick}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
