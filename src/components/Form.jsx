import { useFormik } from "formik";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { sendContactRequest } from "../apis";
import contact from "../assets/contact.png"
import { useSelector } from "react-redux";
const Form = () => {
  const site = useSelector((st) => st.site.data);
  const initialvalue = {
    name: "",
    email: "",
    number: "",
    message: "",
  };

  const { values, handleChange, handleSubmit, setFieldValue, resetForm } = useFormik({
    initialValues: initialvalue,
    onSubmit: async (values) => {
      try {
        const res = await sendContactRequest(values)
        if (res.error) {
          toast.error(res.error)
        } else {
          toast.success(res.success)
          resetForm()
        }
      } catch (error) {
        console.log(error);
      }

    },
  });
  const numberChange = (e) => {
    if (values.number.length <= 10) {
      setFieldValue("number", e.target.value);
    } else {
      setFieldValue("number", "");
      toast.error("Invalid mobile number");
    }
  };

  return (
    <>
      <div className="contact_us_6">
        <div className="responsive-container-block container">
          <form className="form-box" onSubmit={handleSubmit}>
            <div className="container-block form-wrapper">
              <div className="mob-text">
                <p className="text-blk contactus-head ">__Connect with us__</p>
                <p className="text-blk contactus-subhead">
                  Just send us your questions or concerns to starting a new
                  project.
                </p>
              </div>
              <div className="responsive-container-block" id="i2cbk">
                <div
                  className="responsive-cell-block wk-tab-12 wk-mobile-12 wk-desk-12 wk-ipadp-12"
                  id="i10mt-3"
                >
                  <p className="text-blk input-title">FIRST NAME</p>
                  <input
                    value={values.name}
                    onChange={handleChange}
                    className="input"
                    id="ijowk-2"
                    name="name"
                    placeholder="Please enter first name..."
                    required
                  />
                </div>
                <div
                  className="responsive-cell-block wk-tab-12 wk-mobile-12 wk-desk-12 wk-ipadp-12"
                  id="ip1yp"
                >
                  <p className="text-blk input-title">EMAIL</p>
                  <input
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                    className="input"
                    id="ipmgh-3"
                    name="email"
                    placeholder="Please enter email..."
                    required
                  />
                </div>
                <div
                  className="responsive-cell-block wk-tab-12 wk-mobile-12 wk-desk-12 wk-ipadp-12"
                  id="ih9wi"
                >
                  <p className="text-blk input-title">PHONE NUMBER</p>
                  <input
                    value={values.number}
                    onChange={numberChange}
                    type="number"
                    className="input"
                    id="imgis-3"
                    name="number"
                    placeholder="Please enter phone number..."
                    required
                  />
                </div>
                <div
                  className="responsive-cell-block wk-tab-12 wk-mobile-12 wk-desk-12 wk-ipadp-12"
                  id="i634i-3"
                >
                  <p className="text-blk input-title">
                    WHAT DO YOU HAVE IN MIND ?
                  </p>
                  <textarea
                    value={values.message}
                    onChange={handleChange}
                    name="message"
                    className="textinput"
                    id="i5vyy-3"
                    placeholder="Please enter query..."
                    required
                  ></textarea>
                </div>
              </div>
              <button
                className="submit-btn"
                type="submit"
                id="w-c-s-bgc_p-1-dm-id-2"
              >
                Submit
              </button>
            </div>
          </form>
          <div
            className="responsive-cell-block wk-desk-7 wk-ipadp-12 wk-tab-12 wk-mobile-12"
            id="i772w"
          >
            <div className="map-box container-block bg-white flex items-center justify-center">
              <img src={site?.address?.contactimg ? contact : site?.address?.contactimg} alt="" />
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Form;
