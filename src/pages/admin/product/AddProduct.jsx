import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import React from "react";
import Dropzone from "react-dropzone";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { uploadDoc } from "./../../../utils/uploadimg";
import { toast } from "react-toastify";
import { toggleLoading } from "../../../features/loading/loadingSlice";
import {
  addAProduct,
  getAllProducts,
} from "../../../features/Product/productSlice";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import ReactQuill from "react-quill";

const AddProduct = () => {
  const dispatch = useDispatch();
  const { values, handleSubmit, handleChange, resetForm, setFieldValue } =
    useFormik({
      initialValues: {
        name: "",
        category: "",
        subcategory: "",
        price: "",
        images: "",
        discount: "",
        description: "",
        brand: "",
        bannerimg: "",
      },
      onSubmit: (values) => {
        if (values.images.length < 1) {
          toast.error("Please select at least 1 product images.");
        } else {
          dispatch(addAProduct(values));
          dispatch(getAllProducts());
          resetForm();
        }
      },
    });
  const handleimgUpload = async (e) => {
    // let totalSize = 0;
    // e.forEach((file) => {
    //   totalSize += file.size;
    // });

    if (values.images.length >= 5) {
      toast.error("You already select 5 images.");
    } else {
      dispatch(toggleLoading(true));
      try {
        const res = await uploadDoc(e);
        const images = [...values.images, ...res];
        setFieldValue("images", images);
      } catch (error) {
        toast.error(error.message);
      }
      dispatch(toggleLoading(false));
    }
  };

  // const handleBannerImage = async (e) => {
  //   const file = [e.target.files[0]];
  //   dispatch(toggleLoading(true));
  //   try {
  //     const res = await uploadDoc(file);
  //     setFieldValue("bannerimg", res[0]);
  //   } catch (error) {
  //     toast.error(error.message);
  //   }
  //   dispatch(toggleLoading(false));
  // };
  //todo code of edit product

  const editproduct = useLocation().state;
  useEffect(() => {
    if (editproduct === null) {
      return;
    } else {
      const keysToExclude = ["_id", "createdAt", "updatedAt", "_v"];
      const updatedData = {};
      Object.keys(editproduct).forEach((fieldName) => {
        if (!keysToExclude.includes(fieldName)) {
          updatedData[fieldName] = editproduct[fieldName];
        }
      });
      Object.keys(updatedData).forEach((fieldName) => {
        setFieldValue(fieldName, updatedData[fieldName]);
      });
    }
  }, [editproduct, setFieldValue]);

  const handleDragStart = (index) => (event) => {
    event.dataTransfer.setData("text/plain", index.toString());
  };

  const handleDragOver = () => (event) => {
    event.preventDefault();
  };

  const handleDrop = (index) => (event) => {
    event.preventDefault();

    const sourceIndex = Number(event.dataTransfer.getData("text/plain"));
    const updatedImages = [...values.images];
    const [movedImage] = updatedImages.splice(sourceIndex, 1);
    updatedImages.splice(index, 0, movedImage);
    setFieldValue("images", updatedImages);
  };

  const handleDeleteImage = (imageIndex) => {
    const updatedImages = [...values.images];
    updatedImages.splice(imageIndex, 1);
    setFieldValue("images", updatedImages);
  };

  return (
    <>
      <div className="col-12">
        <div className="w-full px-4">
          <div className="bg-white col-12 rounded-lg p-8 sm:p-12 shadow-lg">
            <h3 className="h3 text-center">
              {editproduct === null ? "Add" : "Update"} Product
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="row justify-between">
                <div className="mb-6 max-sm:w-[100%] md:w-[33.3%]">
                  <label>Product Name</label>
                  <input
                    type="text"
                    name="name"
                    onChange={handleChange}
                    required
                    value={values.name}
                    className="form-control"
                    id="productname"
                    placeholder="Enter Product name"
                  />
                </div>
                <div className="mb-6 max-sm:w-[100%] md:w-[33.3%]">
                  <label>Category</label>
                  <input
                    type="text"
                    name="category"
                    onChange={handleChange}
                    required="Product category is Required"
                    value={values.category}
                    className="form-control"
                    id="productname"
                    placeholder="Enter Product category"
                  />
                </div>
                <div className="mb-6 max-sm:w-[100%] md:w-[33.3%]">
                  <label>Sub-Category</label>
                  <input
                    type="text"
                    name="subcategory"
                    onChange={handleChange}
                    required
                    value={values.subcategory}
                    className="form-control"
                    id="productname"
                    placeholder="Enter Product subcategory"
                  />
                </div>
                <div className="mb-6 max-sm:w-[100%] md:w-[33.3%]">
                  <label htmlFor="price">Price</label>
                  <input
                    type="number"
                    name="price"
                    value={values.price}
                    onChange={handleChange}
                    required
                    className="form-control"
                    placeholder="Enter Price"
                  />
                </div>
                <div className="mb-6 max-sm:w-[100%] md:w-[33.3%]">
                  <label htmlFor="price">Discount</label>
                  <input
                    type="number"
                    name="discount"
                    value={values.discount}
                    onChange={handleChange}
                    required
                    className="form-control"
                    placeholder="Enter product discount"
                  />
                </div>
                <div className="mb-6 max-sm:w-[100%] md:w-[33.3%]">
                  <label htmlFor="price">Brand</label>
                  <input
                    type="text"
                    name="brand"
                    value={values.brand}
                    onChange={handleChange}
                    required
                    className="form-control"
                    placeholder="Enter product brand"
                  />
                </div>
                <div className="w-full mb-16">
                  <label htmlFor="price">Discription</label>
                  <ReactQuill
                    theme="snow"
                    name="description"
                    onChange={handleChange("description")}
                    value={values.description}
                    required
                    className="h-24"
                  />
                </div>
              </div>
              <div className="mb-6 border-2 border-dotted rounded">
                <Dropzone
                  onDrop={(acceptedFiles) => handleimgUpload(acceptedFiles)}
                >
                  {({ getRootProps, getInputProps }) => (
                    <section>
                      <div
                        {...getRootProps()}
                        className="flex flex-col items-center p-2 pb-4"
                      >
                        <input {...getInputProps()} />
                        <AiOutlineCloudUpload fontSize={60} color="gray" />
                        <p>
                          Drag {"'n'"} drop some files here, or click to select
                          files
                        </p>
                        <p className="text-danger text-sm">
                          Please upload minimum 5 images
                        </p>
                        <p className="text-xs text-danger mb-2">
                          Total images size should not be larger than 3 MB
                        </p>
                      </div>
                    </section>
                  )}
                </Dropzone>
              </div>

              {values.images?.length !== 0 && (
                <div
                  className=" conatiner flex-wrap bg-white d-flex justify-content-center p-4 align-items-center rounded shadow-sm mb-3"
                  style={{ gap: "20px" }}
                >
                  {values.images?.map((image, index) => (
                    <div
                      key={index}
                      draggable
                      style={{ cursor: "grab", position: "relative" }}
                      onDragStart={handleDragStart(index)}
                      onDragOver={handleDragOver(index)}
                      onDrop={handleDrop(index)}
                    >
                      <p
                        className="bg-red-600 px-2 rounded-full text-white py-1 position-absolute right-0 text-sm"
                        onClick={() => handleDeleteImage(index)}
                      >
                        X
                      </p>
                      <img
                        style={{ width: 200 }}
                        className="rounded"
                        src={image}
                        alt={`mage ${index}`}
                      />
                    </div>
                  ))}
                </div>
              )}
              {/* <div className="col-12 mb-6">
                <label htmlFor="banner-img">Upload Banner Image</label>
                <input
                  type="file"
                  name="banner-img"
                  onChange={(e) => handleBannerImage(e)}
                  required={editproduct === null ? true : false}
                  className="form-control"
                />
              </div>
              {values.bannerimg && (
                <div className="row mb-6 p-2 items-center justify-center">
                  <img
                    src={values.bannerimg}
                    alt="product image"
                    className="rounded h-auto"
                  />
                </div>
              )} */}

              <div>
                <button
                  type="submit"
                  className="w-full text-white bg-[orangered] rounded border border-[orangered] p-2 transition hover:bg-opacity-90 "
                >
                  {editproduct === null ? "Add" : "Update"} Product
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
