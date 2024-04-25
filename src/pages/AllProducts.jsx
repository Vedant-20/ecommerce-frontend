import React, { useEffect, useState } from "react";
import UploadProduct from "../components/UploadProduct";
import axiosInstance from "../axiosInstance/axiosInstance";
import { toast } from "react-toastify";
import AdminProductCard from "../components/AdminProductCard";

function AllProducts() {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  const [allProduct, setAllProduct] = useState([]);

  const fetchAllProduct = async () => {
    try {
      const response = await axiosInstance.get(`/products/get-all-products`);
      // console.log("Produts", response);
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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6  items-center gap-3 py-4">
        {allProduct?.map((product, index) => (
          <AdminProductCard
            data={product}
            key={index + "allProducts"}
            fetchData={fetchAllProduct}
          />
        ))}
      </div>

      {openUploadProduct && (
        <UploadProduct
          onClose={() => setOpenUploadProduct(false)}
          fetchData={fetchAllProduct}
        />
      )}
    </div>
  );
}

export default AllProducts;
