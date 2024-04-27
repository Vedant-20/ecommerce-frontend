import React, { useContext, useEffect, useRef, useState } from "react";
import fetchCategoryWiseProducts from "../helpers/fetchCategoryWiseProducts";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import addToCart from "../helpers/addToCart";
import Context from "../context";

function CategoryWiseProductDisplay({ category, heading }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const loadingList = new Array(13).fill(null);
  const [scroll, setScroll] = useState(0);
  const scrollElement = useRef();
  const { fetchUserAddToCart } = useContext(Context);

  const fetchData = async () => {
    setLoading(true);
    const categoryProduct = await fetchCategoryWiseProducts(category);
    setData(categoryProduct);

    setLoading(false);
    // console.log("Category Card Data", categoryProduct);
  };

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
  };

  useEffect(() => {
    fetchData();
  }, []);

  const scrollRight = () => {
    scrollElement.current.scrollLeft += 300;
  };
  const scrollLeft = () => {
    scrollElement.current.scrollLeft -= 300;
  };
  return (
    <div className="container mx-auto px-4 my-6 relative">
      <h2 className="text-2xl font-semibold py-4 ">{heading}</h2>
      <div
        className="flex items-center gap-4 md:gap-6 overflow-x-scroll transition-all"
        ref={scrollElement}
      >
        <button
          className="bg-white shadow-md rounded-full p-1 absolute left-0 text-lg hidden md:block"
          onClick={scrollLeft}
        >
          <FaAngleLeft />
        </button>
        <button
          className="bg-white shadow-md rounded-full p-1 absolute right-0 text-lg hidden md:block"
          onClick={scrollRight}
        >
          <FaAngleRight />
        </button>
        {data?.map((product, index) => (
          <Link
            to={`/product/${product._id}`}
            key={index + "ProductId"}
            className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px]  bg-white rounded-md shadow-md "
          >
            <div className="bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[320px]  flex justify-center items-center">
              <img
                src={product?.productImage[0]}
                alt={product?.productName}
                className="object-scale-down h-full hover:scale-125 transition-all mix-blend-multiply"
              />
            </div>
            <div className="p-4 grid gap-3">
              <h2 className="font-medium text-base md:text-lg  text-ellipsis line-clamp-1">
                {product?.productName}
              </h2>
              <p className="capitalize text-slate-500">{product?.category}</p>
              <div className="flex gap-3">
                <p className="text-green-600 font-bold ">
                  ₹{product?.sellingPrice}.00
                </p>
                <p className="text-red-500 text-sm line-through">
                  ₹{product?.price}.00
                </p>
              </div>
              <button
                className="bg-green-400 font-semibold hover:text-white hover:bg-green-600 hover:border-2 hover:border-white px-3 py-1 rounded-full"
                onClick={(e) => handleAddToCart(e, product?._id)}
              >
                Add To Cart
              </button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CategoryWiseProductDisplay;
