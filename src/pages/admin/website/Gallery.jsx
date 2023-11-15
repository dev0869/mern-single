import { useFormik } from "formik";
import { useEffect } from "react";
import React from "react";
import { updateSiteConfig } from "../../../features/Website/configSlice";
import { useDispatch, useSelector } from "react-redux";
import {  AiOutlineCloudUpload } from "react-icons/ai";
import { Row } from "reactstrap";
import { toggleLoading } from "../../../features/loading/loadingSlice";
import { uploadDoc } from "../../../utils/uploadimg";
import { toast } from "react-toastify";
import Dropzone from "react-dropzone";

const Gallery = () => {
  const site = useSelector((st) => st.site.data);
  const dispatch = useDispatch();
  const { values, handleSubmit,  setFieldValue } = useFormik({
    initialValues: {
      images: [],
    },
    onSubmit: () => {
      dispatch(
        updateSiteConfig({
          _id: site._id,
          changes: { gallery: values },
        })
      );
    },
  });

  useEffect(() => {
    if (site) {
      setFieldValue("images", site?.gallery?.images);
    }
  }, [site, setFieldValue]);

  const handleimgUpload = async (e) => { 
      dispatch(toggleLoading(true));
      try {
        const res = await uploadDoc(e);
        const images = [...values.images, ...res];
        setFieldValue("images", images);
      } catch (error) {
        toast.error(error.message);
      }
      dispatch(toggleLoading(false));
  };
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
      <div className="w-full">
        <h1 className="w-full text-center h3 mb-4 font-semibold -ml-5">
          Upload Gallery
        </h1>
        <form onSubmit={handleSubmit}>
          <Row>
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
          </Row>
          <button type="submit" className="btn btn-outline-primary">
            Change Occurence
          </button>
        </form>
      </div>
    </>
  );
};

export default Gallery;
