import { useEffect } from "react";
import React from "react";

import Row from "react-bootstrap/Row";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { updateSiteConfig } from "../../../features/Website/configSlice";
import { toggleLoading } from "../../../features/loading/loadingSlice";
import { uploadDoc } from "../../../utils/uploadimg";
import ImageDrager from "../components/ImageDragger";

const SiteData = () => {
  const site = useSelector((st) => st.site.data);
  const dispatch = useDispatch();

  const { values, handleSubmit, handleChange, setFieldValue } = useFormik({
    initialValues: {
      name: "",
      title: "",
      logo: "",
      homepagebanner: [],
    },
    onSubmit: () => {
      dispatch(updateSiteConfig({_id:site._id,changes:values}));
    },
  });
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
      if (fl === "logo") {
        setFieldValue("logo", res[0]);
      }
      if (fl === "banner") {
        const images = [...values.homepagebanner, ...res];
        if (images.length >= 5) {
          toast.info("You already uploaded 5 images");
        }
        setFieldValue("homepagebanner", images);
      }
    } catch (error) {
      toast.error(error.message);
    }
    dispatch(toggleLoading(false));
  };

  useEffect(() => {
    if (site?.name) {
      setFieldValue("name", site?.name);
      setFieldValue("title", site?.title);
      setFieldValue("logo", site?.logo);
      setFieldValue("homepagebanner", site?.homepagebanner);
      
    }
  }, [site, setFieldValue]);

  const handleDeleteImage = (index) => {
    const updatedImages = [...values.homepagebanner];
    updatedImages.splice(index, 1);
    setFieldValue("homepagebanner", updatedImages);
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit}>
        <Row>
          <div className="col-12 col-md-6 mb-3">
            <label className="text-gray-500 text-sm mb-1">
              Add Website Name :
            </label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={values.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-12 col-md-6 mb-3">
            <label className="text-gray-500 text-sm mb-1">
              Add Website Title :
            </label>
            <input
              type="text"
              className="form-control"
              name="title"
              value={values.title}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="col-12 col-md-6 mb-3">
            <label className="text-gray-500 text-sm mb-1">
              Add Website logo :
            </label>
            <div className="flex w-full gap-2">
              <input
                type="file"
                className="w-[80%] form-control"
                name="logo"
                accept="image/*"
                onChange={(e) => handleimgUpload(e, "logo")}
              />
              <a
                href={values.logo}
                target="blank"
                style={{
                  background: site.primarybg,
                  borderColor: site.primarybg,
                }}
                className="btn btn-primary"
              >
                view
              </a>
            </div>
            <span className="text-danger">
              Please upload image ratio of 3:1
            </span>
          </div>
          <div className="col-12 col-md-6 mb-3">
            <label className="text-gray-500 text-sm mb-1">Banner Image :</label>
            <input
              type="file"
              className="form-control"
              name="homepagebanner"
              accept="image/*"
              multiple
              onChange={(e) => handleimgUpload(e, "banner")}
            />
            <span className="text-danger text-sm">
              Limit of banner image is 5 of the size width:1200 to 1920 ,height:
              200 to 400.
            </span>
          </div>
          {values.homepagebanner.length !== 0 && (
            <ImageDrager
              images={values.homepagebanner}
              filed={"homepagebanner"}
              setFieldValue={setFieldValue}
              handleDeleteImage={handleDeleteImage}
            />
          )}
        </Row>
        <button type="submit" className="btn btn-outline-primary">
          Change Occurence
        </button>
      </form>
    </div>
  );
};

export default SiteData;
