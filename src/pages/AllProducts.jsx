import React, { useEffect, useState } from "react";
import UploadProduct from "../components/UploadProduct";
import axiosInstance from "../axiosInstance/axiosInstance";
import { toast } from "react-toastify";

function AllProducts() {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  const [allProduct, setAllProduct] = useState([]);

  const fetchAllProduct = async () => {
    try {
      const response = await axiosInstance.get(`/products/get-all-products`);
      console.log("Produts", response);
      setAllProduct(response?.data?.data);
      toast.success(response?.data?.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllProduct();
  }, []);
  return (
    <div>
      <div className="bg-white py-2 px-4 flex justify-between items-center ">
        <h2 className="font-bold text-lg">All Products</h2>
        <button
          className="border-2 border-green-400 bg-green-200 transition-all hover:border-white hover:bg-green-400 py-2 px-4 rounded-md  "
          onClick={() => setOpenUploadProduct(true)}
        >
          Upload Product
        </button>
      </div>

      <div className="flex items-center gap-3 py-4">
        {allProduct?.map((product, index) => (
          <div className="bg-white p-4 rounded-md " key={index}>
            <img
              src={product?.productImage[0]}
              width={120}
              height={120}
              alt={product?.productName}
            />
          </div>
        ))}
      </div>

      {openUploadProduct && (
        <UploadProduct onClose={() => setOpenUploadProduct(false)} />
      )}
    </div>
  );
}

export default AllProducts;
