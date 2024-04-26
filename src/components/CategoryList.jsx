import React, { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance/axiosInstance";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function CategoryList() {
  const [categoryProduct, setCategoryProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  const categoryLoading = new Array(13).fill(null);

  const fetchCategoryProduct = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `/products/get-product-category`
      );
      setCategoryProduct(response?.data?.data);
      setLoading(false);
      // console.log(response);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryProduct();
  }, []);
  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between gap-2 overflow-scroll">
        {loading &&
          categoryLoading.map((el, index) => (
            <div
              key={index + "categoryLoading"}
              className="h-16 w-16 md:h-20 md:w-20 rounded-full overflow-hidden bg-slate-200 animate-pulse"
            ></div>
          ))}
        {categoryProduct?.map((product, index) => (
          <Link
            to={`/product-category/${product?.category}`}
            className="cursor-pointer "
            key={index + "category"}
          >
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden p-4 bg-slate-200 flex items-center justify-center">
              <img
                src={product?.productImage[0]}
                alt={product?.category}
                className="h-full object-scale-down mix-blend-multiply hover:scale-125 transition-all"
              />
            </div>
            <p className="text-center text-sm md:text-base capitalize">
              {product?.category}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CategoryList;
