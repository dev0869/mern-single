import { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { updateSiteConfig } from "../../../features/Website/configSlice";
import { toggleLoading } from "../../../features/loading/loadingSlice";
import { uploadDoc } from "../../../utils/uploadimg";
import { toast } from "react-toastify";
import ImageDrager from "../components/ImageDragger";
import { Stack } from "@mui/material";
import { AiFillEdit } from 'react-icons/ai';

const AboutUs = () => {
  const site = useSelector((st) => st.site.data);

  const dispatch = useDispatch();

  const { values, handleSubmit, handleChange, setFieldValue } = useFormik({
    initialValues: {
      images: [],
      firstpara: "",
      secondpara: "",
      mission: "",
      designimg: "",
      vision: "",
      values: "",
    },
    onSubmit: () => {
      dispatch(
        updateSiteConfig({
          _id: site._id,
          changes: { aboutus: values, }
        })
      );
    },
  });

  useEffect(() => {
    if (site?.aboutus) {
      setFieldValue("images", site?.aboutus?.images);
      setFieldValue("designimg", site?.aboutus?.designimg);
      setFieldValue("firstpara", site?.aboutus?.firstpara);
      setFieldValue("secondpara", site?.aboutus?.secondpara);
      setFieldValue("mission", site?.aboutus?.mission);
      setFieldValue("vision", site?.aboutus?.vision);
      setFieldValue("values", site?.aboutus?.values);
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
      if (fl === "india") {
        const images = [...values.designimg, ...res];
        if (images.length >= 5) {
          toast.info("You already uploaded 5 images");
        }
        setFieldValue("designimg", images);
      }
      if (fl === "vals") {
        setvals({ ...vals, imgurl: res[0] });
      }
      if (fl === "about") {
        const images = [...values.images, ...res];
        if (images.length >= 5) {
          toast.info("You already uploaded 5 images");
        }
        setFieldValue("images", images);
      }
    } catch (error) {
      toast.error(error.message);
    }
    dispatch(toggleLoading(false));
  };

  const handleDeleteImageN = (index) => {
    const updatedImages = [...values.images];
    updatedImages.splice(index, 1);
    setFieldValue("images", updatedImages);
  };
  const handleDeleteImageI = (index) => {
    const updatedImages = [...values.designimg];
    updatedImages.splice(index, 1);
    setFieldValue("designimg", updatedImages);
  };
  const [vals, setvals] = useState({
    title: "",
    content: "",
    imgurl: "",
  });

  const addVals = (e) => {
    e.preventDefault();
    const prev = [...values.values, vals];
    if ((vals.title, vals.content)) {
      setFieldValue("values", prev);
      setvals({
        title: "",
        content: "",
        imgurl: "",
      });
    }
  };
  const editValCard = (i) => {
    const cards = [...values.values]
    const se = cards.splice(i, 1)
    setvals(se[0])
    setFieldValue("values", cards);

  }

  return (
    <div className="w-full">
      <h1 className="w-full text-center h3 mb-4 font-semibold -ml-5">
        About Us Information
      </h1>
      <form onSubmit={handleSubmit}>
        <Row>
          <div className="col-12 col-md-6 mb-3">
            <label className="text-gray-500 text-sm mb-1">
              Vision Tagline:
            </label>
            <input
              type="text"
              className="form-control"
              name="vision"
              value={values.vision}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-12 col-md-6 mb-3">
            <label className="text-gray-500 text-sm mb-1">
              About us Image :
            </label>
            <input
              type="file"
              className="form-control"
              name="homepagebanner"
              accept="image/*"
              multiple
              onChange={(e) => handleimgUpload(e, "about")}
            />
            <span className="text-danger text-sm"></span>
          </div>
          {values.images.length !== 0 && (
            <ImageDrager
              images={values.images}
              filed={"images"}
              setFieldValue={setFieldValue}
              handleDeleteImage={handleDeleteImageN}
            />
          )}
          <div className="col-12 mb-3">
            <label className="text-gray-500 text-sm mb-1">Welcome Para :</label>
            <textarea
              className="form-control"
              name="firstpara"
              value={values.firstpara}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="col-12 mb-3">
            <label className="text-gray-500 text-sm mb-1">
              Mission Paragraph :
            </label>
            <textarea
              className="form-control"
              name="mission"
              value={values.mission}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="col-12 mb-3">
            <label className="text-gray-500 text-sm mb-1">
              Designed Paragraph :
            </label>
            <textarea
              className="form-control"
              name="secondpara"
              value={values.secondpara}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="col-12 mb-3">
            <label className="text-gray-500 text-sm mb-1">
              Indian Designed Image :
            </label>
            <input
              type="file"
              className="form-control"
              name="designimg"
              accept="image/*"
              multiple
              onChange={(e) => handleimgUpload(e, "india")}
            />
            <span className="text-danger text-sm"></span>
          </div>
          {values.designimg.length !== 0 && (
            <ImageDrager
              images={values.designimg}
              filed={"designimg"}
              setFieldValue={setFieldValue}
              handleDeleteImage={handleDeleteImageI}
            />
          )}
          <h1 className="h5 ">Add Values</h1>
          <Row className="mb-3">
            <div className="col-12 col-md-6 mb-3">
              <label className="text-gray-500 text-sm mb-1">
                Value tittle:
              </label>
              <input
                type="text"
                className="form-control"
                name="title"
                value={vals.title}
                onChange={(e) => setvals({ ...vals, title: e.target.value })}
              />
            </div>
            <div className="col-12 col-md-6 mb-3">
              <label className="text-gray-500 text-sm mb-1">
                Value content:
              </label>
              <input
                type="text"
                className="form-control"
                name="title"
                value={vals.content}
                onChange={(e) => setvals({ ...vals, content: e.target.value })}
              />
            </div>
            <div className="col-12 col-md-6 mb-3">
              <label className="text-gray-500 text-sm mb-1">
                Value content:
              </label>
              <input
                type="file"
                className="form-control"
                name="url"
                accept="image/*"
                onChange={(e) => handleimgUpload(e, "vals")}
              />
            </div>
            <div className="col-12 col-md-6 mb-3 flex justify-start items-end">
              <label className="text-gray-500 text-sm mb-1"> </label>
              <button className="btn btn-primary" onClick={addVals}>
                Add
              </button>
            </div>
            {values.values && (
              <Stack
                display={"flex"}
                justifyContent={"center"}
                flexWrap={"wrap"}
                direction={"row"}
                gap={3}
              >
                {values.values.map((ele, i) => {
                  const { imgurl, title, content } = ele;
                  return (
                    <Stack key={i} alignItems={"center"} className="aboutCard">
                      <AiFillEdit color="blue" fontSize={25} onClick={() => editValCard(i)} className=" absolute right-2" />
                      <img src={imgurl} alt="" width={100} />
                      <br />
                      <h1>{title}</h1>
                      <p>{content}</p>
                    </Stack>
                  );
                })}
              </Stack>
            )}
          </Row>
        </Row>
        <button type="submit" className="btn btn-outline-primary">
          Change Occurence
        </button>
      </form>
    </div>
  );
};

export default AboutUs;
