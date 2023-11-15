import ReactQuill from "react-quill";
import React from "react";
import "react-quill/dist/quill.snow.css";
import { useDispatch } from "react-redux";
import { addBlogs, updateBlogs } from "../../../features/blogs/blogeSlice";
import { useFormik } from "formik";
import { getBlogs } from "../../../features/blogs/blogeSlice";
import { useEffect } from "react";
import { toggleLoading } from "../../../features/loading/loadingSlice";
import { uploadDoc } from "../../../utils/uploadimg";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
const Blogs = () => {
  const editblog = useLocation().state;
  const Disptach = useDispatch();
  const { values, handleSubmit, handleChange, resetForm, setFieldValue } =
    useFormik({
      initialValues: {
        title: "",
        content: "",
        image: "",
      },
      onSubmit: (values) => {
        if (editblog) {
          const merge = { ...values, _id: editblog._id };
          Disptach(updateBlogs(merge));
        } else {
          Disptach(addBlogs(values));
        }
        resetForm();
      },
    });
  const handleimgChange = async (e) => {
    const file = [e.target.files[0]];
    Disptach(toggleLoading(true));
    try {
      const res = await uploadDoc(file);
      setFieldValue("image", res[0]);
    } catch (error) {
      toast.error(error.message);
    }
    Disptach(toggleLoading(false));
  };
  useEffect(() => {
    Disptach(getBlogs());
  }, [Disptach]);

  useEffect(() => {
    if (editblog) {
      setFieldValue("title", editblog.title);
      setFieldValue("content", editblog.content);
      setFieldValue("image", editblog.image);
    }
  }, [editblog]);
  return (
    <div className="col-12">
      <div className="w-full px-4">
        <div className="bg-white col-12 rounded-lg p-8 sm:p-12 shadow-lg">
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              {/* <label>Title</label> */}
              <input
                type="text"
                name="title"
                onChange={handleChange}
                value={values.title}
                className="form-control"
                id="Enter Title Name "
                aria-describedby="emailHelp"
                placeholder="Enter Title"
              />
            </div>
            <div className="mb-6 h-32">
              <ReactQuill
                theme="snow"
                name="content"
                onChange={handleChange("content")}
                value={values.content}
                required
                className="h-24"
              />
            </div>
            <div className="mb-6">
              {/* <label>Title</label> */}
              <input
                type="file"
                name="image"
                onChange={handleimgChange}
                className="form-control"
                id="Enter Title Name "
                aria-describedby="emailHelp"
                placeholder="Enter Title"
              />
            </div>
            {values.image && (
              <div className="row mb-6 p-2 items-center justify-center">
                <img
                  src={values.image}
                  alt="product image"
                  className=" rounded h-auto"
                />
              </div>
            )}
            <div>
              <button
                type="submit"
                className="w-full text-white bg-[orangered] rounded border border-[orangered] p-2 transition hover:bg-opacity-90 "
              >
                {editblog === null ? "Add" : "Update"} Blog
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
