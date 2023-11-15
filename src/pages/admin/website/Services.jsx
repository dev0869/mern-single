import { useFormik } from "formik";
import React from "react";
import { useEffect, useState } from "react";
import { updateSiteConfig } from "../../../features/Website/configSlice";
import { useDispatch, useSelector } from "react-redux";
import { AiFillEdit } from "react-icons/ai";
import { Stack } from "@mui/material";
import { Row } from "reactstrap";
import { toggleLoading } from "../../../features/loading/loadingSlice";
import { uploadDoc } from "../../../utils/uploadimg";
import { toast } from "react-toastify";

const Services = () => {
  const site = useSelector((st) => st.site.data);
  const dispatch = useDispatch();
  const { values, handleSubmit, handleChange, setFieldValue } = useFormik({
    initialValues: {
      title: "",
      subheading: "",
      cards: [],
    },
    onSubmit: () => {
      dispatch(
        updateSiteConfig({
          _id: site._id,
          changes: { services: values },
        })
      );
    },
  });

  useEffect(() => {
    if (site?.services) {
      setFieldValue("title", site?.services?.title);
      setFieldValue("cards", site?.services?.cards);
      setFieldValue("subheading", site?.services?.subheading);
    }
  }, [site, setFieldValue]);
  const [vals, setvals] = useState({
    title: "",
    content: "",
    imgurl: "",
  });

  const addVals = (e) => {
    e.preventDefault();
    const prev = [...values.cards, vals];
    if ((vals.title, vals.content)) {
      setFieldValue("cards", prev);
      setvals({
        title: "",
        content: "",
        imgurl: "",
      });
    }
  };
  const editValCard = (i) => {
    const cards = [...values.cards];
    const se = cards.splice(i, 1);
    setvals(se[0]);
    setFieldValue("cards", cards);
  };
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
      if (fl === "vals") {
        setvals({ ...vals, imgurl: res[0] })
      }
    } catch (error) {
      toast.error(error.message);
    }
    dispatch(toggleLoading(false));
  };
  
  return (
    <>
      <div className="w-full">
        <h1 className="w-full text-center h3 mb-4 font-semibold -ml-5">
          Service Page
        </h1>
        <form onSubmit={handleSubmit}>
          <Row>
            <div className="col-12 col-md-6 mb-3">
              <label className="text-gray-500 text-sm mb-1">Page Title:</label>
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
                Sub Heading :
              </label>
              <input
                type="text"
                className="form-control"
                name="subheading"
                value={values.subheading}
                onChange={handleChange}
                required
              />
            </div>
            <h1 className="h5 ">Add Service Card</h1>
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
                  onChange={(e) =>
                    setvals({ ...vals, content: e.target.value })
                  }
                />
              </div>
              {/* img upload icon */}
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
              {values.cards && (
                <Stack
                  display={"flex"}
                  justifyContent={"center"}
                  flexWrap={"wrap"}
                  direction={"row"}
                  gap={3}
                >
                  {values.cards.map((ele, i) => {
                    const { imgurl, title, content } = ele;
                    return (
                      <Stack
                        key={i}
                        alignItems={"center"}
                        className="aboutCard"
                      >
                        <AiFillEdit
                          color="blue"
                          fontSize={25}
                          onClick={() => editValCard(i)}
                          className=" absolute right-2"
                        />
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
    </>
  );
};

export default Services;
