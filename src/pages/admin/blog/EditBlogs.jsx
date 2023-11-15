import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import React from "react";
import { GrView } from "react-icons/gr";
import ReactHtmlParser from "react-html-parser";
import { getBlogs } from "../../../features/blogs/blogeSlice";
import { useSelector, useDispatch } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { useEffect } from "react";
import { deleteABlog } from "../api";
import { toast } from "react-toastify";

const EditBlogs = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBlogs());
  }, [dispatch]);
  const currentItems = useSelector((state) => state.blog.blogs);

  const handledelete = async (itm) => {
    try {
      const res = await deleteABlog(itm._id);
      toast.success(res);
      dispatch(getBlogs());
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex flex-col col-12">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1 className="h3 font-bold">Edit Blogs </h1>
        <div
          style={{ display: "flex", flexDirection: "row", gap: "12px" }}
        ></div>
      </div>

      <div className="col-12 border overflow-x-auto mt-8">
        <table className="table table-striped col-12 cursor-pointer">
          <thead>
            <tr>
              <th scope="col">Sr No.</th>
              <th scope="col">Date</th>
              <th scope="col">Title</th>
              <th scope="col">Content</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((itm, i) => (
              <tr className="text-[12]" key={itm._id}>
                <th scope="row">{i + 1}</th>
                <td className=" text-capitalize">
                  {itm?.createdAt.split("T")[0]}
                </td>
                <td className=" text-capitalize">{itm?.title.slice(0, 20)}</td>
                <td className=" text-capitalize">
                  {ReactHtmlParser(itm.content.slice(0, 20))}
                </td>
                <td
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: 40,
                    padding: "14px",
                  }}
                >
                  <NavLink to={`/admin/blogs/edit/${itm._id}`} state={itm}>
                    <AiFillEdit fontSize={22} color="green" />
                  </NavLink>
                  <AiFillDelete
                    fontSize={22}
                    color="red"
                    onClick={() => handledelete(itm)}
                  />
                  <Link to={`/blog/${itm._id}`} state={itm}>
                    <GrView
                      // onClick={() =>
                      //   dispatch(
                      //     singleblog({
                      //       itm,
                      //     })
                      //   )
                      // }
                      fontSize={22}
                      color="skyblue"
                    />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EditBlogs;
