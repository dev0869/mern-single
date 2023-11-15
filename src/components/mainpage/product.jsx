import "./Product.css";
import { useSelector } from "react-redux";
import React from "react";
const ProductCard = ({ product }) => {
  return (
    <div className="max-w-[300px] py-2 cursor-pointer">
      <div className="bg-white relative shadow-lg hover:shadow-xl transition duration-500 rounded-lg">
        <img className="rounded-t-lg" src={product?.images[0]} style={{height:"250px",width:"280px",objectFit:"contain"}} alt="" />
        <div className="pb-4 pt-1 px-4 rounded-lg">
          <span className="text-red-500 font-bold text-sm text-capitalize">
            {product?.brand}
          </span>
          <h1 className="text-gray-700 font-bold text-lg hover:text-gray-900 hover:cursor-pointer">
            {product?.name}
          </h1>
          <span className="text-dark font-bold text-sm text-capitalize">
            {product?.category}
          </span>
          <p className="text-gray-900 font-[900] tracking-wide">
            {product?.price - (product?.price * product?.discount) / 100} ₹
          </p>
          <p className="discount mb-0">
            <strike>₹{product?.price}</strike>{" "}
            <sup>{product.discount}% OFF</sup>
          </p>
        </div>
      </div>
    </div>
  );
};

const Store = () => {
  const products = useSelector((st) => st.product.data);

  return (
    <>
      <div className="row items-center justify-center container my-4">
        {products.length !== 0 &&
          products.map((product, i) => (
            <ProductCard key={i} product={product} />
          ))}
      </div>
    </>
  );
};

export default Store;
