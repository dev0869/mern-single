import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import React from "react";
import { CheckResetPasswordUser, resetUserPassword } from "../../apis";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirm, setconfirm] = useState("");
  const [message, setmessage] = useState("");
  const [email, setemail] = useState("");
  const token = useLocation().pathname.split("/")[2];
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirm) {
      try {
        const res = await resetUserPassword({ token, password })
        if (res.error) {
          toast.error(res.error)
          navigate("/login")
        } else {
          toast.success(res)
          navigate("/login")
        }
      } catch (error) {
        toast.error(error.message)
      }
      setmessage("");
    } else {
      setmessage("Password and Confirm Password Must be Same !");
    }
  };
  // useEffect(()=>{
  //   checkUser()
  // },[])
  return (
    <div>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center px-6 py-8 mx-auto  lg:py-0">
          <div className="w-full p-6 my-10 sm:my-16 bg-white rounded-lg shadow dark:border sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
            <h2 className="mb-1 text-xl font-bold text-center leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Change Password
            </h2>
            <form
              onSubmit={handleSubmit}
              className="mt-4 space-y-4 lg:mt-5 md:space-y-5"
            >
              {/* <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  disabled
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div> */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Enter Your New Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Confirm password
                </label>
                <input
                  type="password"
                  name="confirm-password"
                  id="confirm-password"
                  placeholder="••••••••"
                  value={confirm}
                  onChange={(e) => setconfirm(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div className="flex items-start">
                {message && (
                  <p className="text-orange-500 text-sm">{message}</p>
                )}
              </div>
              <button type="submit" className="btn btn-outline-danger w-full">
                Reset passwod
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ResetPassword;
