import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axiosInstance from "../axiosInstance/axiosInstance";
import { toast } from "react-toastify";
import loadingGif from "../assets/loading.gif";
import displayINRCurrency from "../helpers/displayCurrency";

function SearchProduct() {
  const query = useLocation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.post(
        `/products/search${query.search}`
      );
      setData(response?.data?.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [query]);
  return (
    <div className="container mx-auto p-4 ">
      {loading && (
        <div className="flex justify-center items-center">
          <img src={loadingGif} alt="Loading..." className="h-96 w-96" />
        </div>
      )}
      <p>Search Results : {data?.length}</p>

      {data?.length === 0 && !loading && (
        <p className="bg-purple-400 text-white text-lg p-4 text-center">
          No Results Found 😞
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {data?.length !== 0 &&
          !loading &&
          data?.map((product, index) => (
            <Link
              to={`/product/${product._id}`}
              key={index + "ProductIdSearch"}
              className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px]  bg-white rounded-md shadow-md "
            >
              <div className="bg-slate-200 rounded-md h-48 p-4 min-w-[280px] md:min-w-[320px]  flex justify-center items-center">
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
                    {displayINRCurrency(product?.sellingPrice)}
                  </p>
                  <p className="text-red-500 text-sm line-through">
                    {displayINRCurrency(product?.price)}
                  </p>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}

export default SearchProduct;
