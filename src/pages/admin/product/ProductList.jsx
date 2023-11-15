import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import React from "react";
import { readUser } from "../../../features/curd/readSlice";
import { useDispatch } from "react-redux";
import ".././Admin.css";
import { NavLink, useNavigate } from "react-router-dom";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { GrView } from "react-icons/gr";
import { toast } from "react-toastify";
import Pagination from "@mui/material/Pagination";
import { getAllProducts } from "../../../features/Product/productSlice";
import { deleteProduct } from "../api";
const ProductList = () => {
  const products = useSelector((st) => st.product.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ReadUser = ({ itm }) => {
    const merge = { ...itm, action: "view book" };
    dispatch(readUser(merge));
    navigate("/testing");
  };
  const handledelete = async (itm) => {
    try {
      const res = await deleteProduct({ _id: itm._id });
      toast.success(res);
      dispatch(getAllProducts());
    } catch (error) {
      toast.error(error.message);
    }
  };
  const [page, setPage] = useState(1);
  const pagecount = Math.ceil(products.length / 15);
  const paginate = (event, value) => {
    setPage(value);
  };
  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  const indexOfLastItem = page * 15;
  const indexOfFirstItem = indexOfLastItem - 15;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="flex flex-col col-12">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1 className="h3 font-bold">Products List</h1>
      </div>

      <div className="col-12 border overflow-x-auto mt-4">
        <table className="table table-striped col-12 cursor-pointer">
          <thead>
            <tr>
              <th scope="col">Sr No.</th>
              <th scope="col">Name</th>
              <th scope="col">Category</th>
              <th scope="col">Price</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems?.map((itm, i) => (
              <tr key={itm._id}>
                <th scope="row">{i + 1}</th>
                <td className=" text-capitalize">{itm?.name}</td>
                <td className=" text-capitalize">{itm.category}</td>
                <td className=" text-capitalize">{itm?.price}</td>
                <td
                  style={{
                    display: "flex",
                    justifyContent: "",
                    gap: 4,
                    padding: "14px",
                  }}
                >
                  <NavLink to={"/admin/add-products"} state={itm}>
                    <AiFillEdit
                      fontSize={22}
                      color="green"
                    />
                  </NavLink>

                  <AiFillDelete
                    fontSize={22}
                    color="red"
                    onClick={() => handledelete(itm)}
                  />
                  <GrView
                    onClick={() => ReadUser({ itm })}
                    fontSize={22}
                    color="skyblue"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {products.length === 0 && products.length === 0 && (
          <p className="h4 ml-2 col-12 pt-4 pb-2 text-center">
            No Product found
          </p>
        )}
      </div>

      {products?.length > 15 && (
        <div className="flex items-center justify-center p-2">
          <Pagination
            page={page}
            onChange={paginate}
            count={pagecount}
            color="error"
          />
        </div>
      )}
    </div>
  );
};

export default ProductList;
