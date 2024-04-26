import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../axiosInstance/axiosInstance";

function ProductDetails() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const productImageListLoading = new Array(4).fill(null);

  const fetchProductDetails = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.post(
        `/products/get-product-details`,
        {
          productId: id,
        }
      );
      console.log("Product Details", response);
      setData(response?.data?.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, []);
  return (
    <div className="container mx-auto p-4">
      <div className="min-h-[200px]">
        {/* Poduct Image */}
        <div>
          <div>
            {loading ? (
              <div className="flex gap-2">
                {productImageListLoading.map((el, index) => (
                  <div className="h-20 w-20 bg-salte-200 rounded"></div>
                ))}
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>
        {/* Poduct Details */}
        <div></div>
      </div>
    </div>
  );
}

export default ProductDetails;
