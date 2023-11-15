import { Link } from "react-router-dom";
// import forgot from "../../assets/forgot.png"
import React from "react";
import { useState } from "react";
import { forgotPasswordToken } from "../../apis";
import { toast } from 'react-toastify';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const handleSubmit = async(e)=>{
    e.preventDefault();
    try {
      const res = await forgotPasswordToken({email})
      if(res.error){
        toast.error(res.error)
      }else{
        toast.success("Reset PassWord Link is sent to Our Email.")
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
  return (
    <div className="">
      {/* Container */}
      <div className="container mx-auto">
        <div className="flex justify-center px-6 my-12 ">
          {/* Row */}
          <div className="w-full xl:w-3/4 lg:w-11/12 flex shadow rounded">
            {/* Col */}
            <div
              className="w-full h-auto bg-red-600 hidden lg:block lg:w-1/2 bg-cover rounded-l-lg"              
            >
              {/* <img src={forgot} alt="forgot"/> */}
            </div>
            {/* Col */}
            <div className="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none">
              <div className="px-8 mb-4 text-center">
                <h3 className="pt-4 mb-2 text-2xl">Forgot Your Password?</h3>
                <p className="mb-4 text-sm text-gray-700">
                  We get it, stuff happens. Just enter your email address below
                  and {"we'll" }send you a link to reset your password!
                </p>
              </div>
              <form onSubmit={handleSubmit} className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
                <div className="mb-4">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="email"
                    type="email"
                    value={email}
                    required
                    onChange={(e)=>setEmail(e.target.value)}
                    placeholder="Enter Email Address..."
                  />
                </div>
                <div className="mb-6 text-center">
                  <button
                    className="w-full px-2 py-1 font-bold text-white bg-red-500 rounded-full hover:bg-red-700 focus:outline-none focus:shadow-outline"
                    type="sumit"
                  >
                    Reset Password
                  </button>
                </div>
                <hr className="mb-6 border-t" />
                <div className="text-center">
                  <Link
                    className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                    to={"/login"}
                  >
                    Create an Account!
                  </Link>
                </div>
                <div className="text-center">
                  <Link
                    className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                    to={"/login"}
                  >
                    Already have an account? Login!
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
