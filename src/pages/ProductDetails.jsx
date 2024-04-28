import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../axiosInstance/axiosInstance";
import { toast } from "react-toastify";
import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa";

import CategoryWiseProductDisplay from "../components/CategoryWiseProductDisplay";
import addToCart from "../helpers/addToCart";
import Context from "../context";

function ProductDetails() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [activeImage, setActiveImage] = useState("");
  const { fetchUserAddToCart } = useContext(Context);
  const { id } = useParams();
  const productImageListLoading = new Array(4).fill(null);
  const [zoomImageCoordinate, setZoomImageCoordinate] = useState({
    x: 0,
    y: 0,
  });

  const fetchProductDetails = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.post(
        `/products/get-product-details`,
        {
          productId: id,
        }
      );
      // console.log("Product Details", response);
      setData(response?.data?.data);
      toast.success(response?.data?.message);
      setLoading(false);
      setActiveImage(response?.data?.data?.productImage[0]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, [id]);

  const handleMouseEnterProduct = (image) => {
    setActiveImage(image);
  };

  const handleZoomImage = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();

    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;

    setZoomImageCoordinate({ ...zoomImageCoordinate, x, y });
  };

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
  };
  return (
    <div className="container mx-auto p-4">
      <div className="min-h-[200px] flex flex-col lg:flex-row gap-4">
        {/* Poduct Image */}
        <div className="h-96 flex flex-col lg:flex-row-reverse gap-4">
          <div className="h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 relative">
            <img
              src={activeImage}
              alt="product image"
              className="h-full w-full object-scale-down mix-blend-multiply"
              onMouseEnter={handleZoomImage}
            />

            {/* product image zoom */}
            {/* <div className="hidden lg:block overflow-hidden absolute min-w-[400px] min-h-[400px] bg-slate-200 p-1 -right-[410px] top-0">
              <div
                className="w-full h-full scale-125 min-w-[400px] min-h-[400px] mix-blend-multiply"
                style={{
                  backgroundImage: `url(${activeImage})`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: `${zoomImageCoordinate.x * 100}% ${
                    zoomImageCoordinate.y * 100
                  }%`,
                }}
              ></div>
            </div> */}
          </div>
          <div className="h-full">
            {loading ? (
              <div className="flex gap-2 lg:flex-col overflow-scroll h-full">
                {productImageListLoading.map((el, index) => (
                  <div
                    className="h-20 w-20 bg-salte-200 rounded animate-pulse"
                    key={"loadingImg" + index}
                  ></div>
                ))}
              </div>
            ) : (
              <div className="flex gap-2 lg:flex-col overflow-scroll h-full">
                {data?.productImage?.map((img, index) => (
                  <div
                    key={index + "productImages"}
                    onClick={() => setActiveImage(img)}
                    className="h-20 w-20 bg-salte-200 rounded p-1 cursor-pointer"
                  >
                    <img
                      src={img}
                      className="w-full h-full object-scale-down mix-blend-multiply"
                      alt="productImage"
                      onMouseEnter={() => handleMouseEnterProduct(img)}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        {/* Poduct Details */}
        {loading ? (
          <div className="flex flex-col gap-1 animate-pulse ">
            <p className="px-2 text-blue-800 font-extrabold text-center inline-block w-fit bg-blue-300 rounded-full "></p>
            <h2 className="text-2xl p-1 lg:text-4xl font-medium"></h2>
            <p className="capitalize text-slate-400 p-1"></p>
            <div className="text-yellow-300 flex items-center gap-1 p-1">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStarHalf />
            </div>
            <div className="flex items-center gap-2 text-2xl lg:text-3xl my-1 font-medium">
              <p className="text-green-600 p-1"></p>
              <p className="text-red-600 line-through p-1"></p>
            </div>
            <div className="flex items-center gap-3 my-2">
              <button className="border-2 border-black font-bold hover:bg-orange-600 hover:text-white bg-slate-400 rounded-lg px-3 py-1 min-w-[120px]"></button>
              <button className="border-2 border-black font-bold hover:bg-green-600 hover:text-white bg-slate-400 rounded-lg px-3 py-1 min-w-[120px]"></button>
            </div>
            <div>
              <p className="text-slate-600 font-medium my-1">Description: </p>
              <p className="p-1"></p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-1 ">
            <p className="px-2 text-blue-800 font-extrabold text-center inline-block w-fit bg-blue-300 rounded-full">
              {data?.brandName}
            </p>
            <h2 className="text-2xl lg:text-4xl font-medium">
              {data?.productName}
            </h2>
            <p className="capitalize text-slate-400">{data?.category}</p>
            <div className="text-yellow-300 flex items-center gap-1 ">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStarHalf />
            </div>
            <div className="flex items-center gap-2 text-2xl lg:text-3xl my-1 font-medium">
              <p className="text-green-600">₹{data?.sellingPrice}.00</p>
              <p className="text-red-600 line-through">₹{data?.price}.00</p>
            </div>
            <div className="flex items-center gap-3 my-2">
              <button
                className="border-2 border-black font-bold hover:bg-orange-600 hover:text-white bg-orange-400 rounded-lg px-3 py-1 min-w-[120px]"
                onClick={(e) => handleAddToCart(e, data?._id)}
              >
                Buy Now
              </button>
              <button
                className="border-2 border-black font-bold hover:bg-green-600 hover:text-white bg-green-400 rounded-lg px-3 py-1 min-w-[120px]"
                onClick={(e) => handleAddToCart(e, data?._id)}
              >
                Add To Cart
              </button>
            </div>
            <div>
              <p className="text-slate-600 font-medium my-1">Description: </p>
              <p>{data?.description}</p>
            </div>
          </div>
        )}
      </div>
      {data?.category && (
        <CategoryWiseProductDisplay
          category={data?.category}
          heading={"Recommended Products"}
        />
      )}
    </div>
  );
}

export default ProductDetails;
