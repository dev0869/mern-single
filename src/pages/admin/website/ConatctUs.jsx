import { useEffect } from "react";
import React from "react";
import Row from "react-bootstrap/Row";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { updateSiteConfig } from "../../../features/Website/configSlice";
import { toggleLoading } from "../../../features/loading/loadingSlice";
import { uploadDoc } from "../../../utils/uploadimg";
import { toast } from "react-toastify";

const ConatctUs = () => {
  const site = useSelector((st) => st.site.data);
  const dispatch = useDispatch();

  const { values, handleSubmit, handleChange, setFieldValue } = useFormik({
    initialValues: {
      address: {
        location: "",
        telephone: [],
        email: "",
      },
      socialmedia: {
        facebook: "",
        instagram: "",
        youtube: "",
        linkedin: "",
      },
    },
    onSubmit: () => {
      dispatch(
        updateSiteConfig({
          _id: site._id,
          changes: { address: values.address, socialmedia: values.socialmedia },
        })
      );
    },
  });

  useEffect(() => {
    if (site?.address) {
      setFieldValue("address.location", site?.address?.location);
      setFieldValue("address.telephone", site?.address?.telephone);
      setFieldValue("address.email", site?.address?.email);
      setFieldValue("socialmedia.facebook", site?.socialmedia?.facebook);
      setFieldValue("socialmedia.instagram", site?.socialmedia?.instagram);
      setFieldValue("socialmedia.youtube", site?.socialmedia?.youtube);
      setFieldValue("socialmedia.linkedin", site?.socialmedia?.linkedin);
    }
  }, [site, setFieldValue]);

  const handleimgUpload = async (e, fl) => {
    let files = [];
    if (e.target.files.length === 1) {
      files = [e.target.files[0]];
    } else if (e.target.files.length > 1) {
      files = Array.from(e.target.files);
    }
    dispatch(toggleLoading(true));
    try {
      const res = await uploadDoc(files);
      if (fl === "contact") {
        setFieldValue("address.contactimg", res[0]);
      }
      if (fl === "banner") {
        const images = [...values.homepagebanner, ...res];
        if (images.length >= 5) {
          toast.info("You already uploaded 5 images");
        }
        setFieldValue("address.contactimg", images);
      }
    } catch (error) {
      toast.error(error.message);
    }
    dispatch(toggleLoading(false));
  };



  const handleNumber = (e) => {
    let numbersArray = e.target.value.split(/[,;\s]+/);
    setFieldValue("address.telephone", numbersArray);
  };

  return (
    <div className="w-full">
      <h1 className="w-full text-center h3 mb-4 font-semibold -ml-5">
        Contact Information
      </h1>
      <form onSubmit={handleSubmit}>
        <Row>
          <div className="col-12 col-md-6 mb-3">
            <label className="text-gray-500 text-sm mb-1">
              Office Loaction :
            </label>
            <input
              type="address"
              className="form-control"
              name="address.location"
              value={values.address.location}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-12 col-md-6 mb-3">
            <label className="text-gray-500 text-sm mb-1">Contact No. :</label>
            <input
              type="text"
              className="form-control"
              name="telephone"
              onChange={handleNumber}
              required
            />
          </div>
          <div className="col-12 col-md-6 mb-3">
            <label className="text-gray-500 text-sm mb-1">
              Contact Email :
            </label>
            <input
              type="email"
              className="form-control"
              name="address.email"
              value={values.address.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-12 col-md-6 mb-3">
            <label className="text-gray-500 text-sm mb-1">
              Facebook Link :
            </label>
            <input
              type="text"
              className="form-control"
              name="socialmedia.facebook"
              value={values.socialmedia.facebook}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-12 col-md-6 mb-3">
            <label className="text-gray-500 text-sm mb-1">
              Linked-In Link :
            </label>
            <input
              type="text"
              className="form-control"
              name="socialmedia.linkedin"
              value={values.socialmedia.linkedin}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-12 col-md-6 mb-3">
            <label className="text-gray-500 text-sm mb-1">
              Instagram Link :
            </label>
            <input
              type="text"
              className="form-control"
              name="socialmedia.instagram"
              value={values.socialmedia.instagram}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-12 col-md-6 mb-3">
            <label className="text-gray-500 text-sm mb-1">Youtube Link :</label>
            <input
              type="text"
              className="form-control"
              name="socialmedia.youtube"
              value={values.socialmedia.youtube}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-12 col-md-6 mb-3">
            <label className="text-gray-500 text-sm mb-1">
              Contact us image :
            </label>
            <div className="flex w-full gap-2">
              <input
                type="file"
                className="w-[80%] form-control"
                name="address.contactimg"
                accept="image/*"
                onChange={(e) => handleimgUpload(e, "contact")}
              />
              <a
                href={values.address.contactimg}
                target="blank"
                className="btn btn-primary"
              >
                view
              </a>
            </div>
            <span className="text-danger">
              Please upload image ratio of 500*500
            </span>
          </div>
        </Row>
        <button type="submit" className="btn btn-outline-primary">
          Change Occurence
        </button>
      </form>
    </div>
  );
};

export default ConatctUs;
