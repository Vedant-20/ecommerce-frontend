import React, { useContext, useEffect, useState } from "react";
import axiosInstance from "../axiosInstance/axiosInstance";
import { toast } from "react-toastify";
import Context from "../context";
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";
import displayINRCurrency from "../helpers/displayCurrency";
import { MdDelete } from "react-icons/md";

function Cart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const context = useContext(Context);
  const loadingCart = new Array(context.cartProductCount).fill(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/users/view-cart-product`);
      // console.log(response);
      setData(response?.data?.data);
      toast.success(response?.data?.message);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const increaseQty = async (id, qty) => {
    try {
      const response = await axiosInstance.post(`/users/update-cart-product`, {
        _id: id,
        quantity: qty + 1,
      });
      fetchData();
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const decreaseQty = async (id, qty) => {
    if (qty >= 2) {
      try {
        const response = await axiosInstance.post(
          `/users/update-cart-product`,
          {
            _id: id,
            quantity: qty - 1,
          }
        );
        fetchData();
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  const deleteCartProduct = async (id) => {
    try {
      const response = await axiosInstance.post(`/users/delete-cart-product`, {
        _id: id,
      });
      fetchData();
      context.fetchUserAddToCart();
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const totalQty = data.reduce(
    (previous, current) => previous + current.quantity,
    0
  );

  const totalPrice = data.reduce(
    (previous, current) =>
      previous + current?.quantity * current?.productId?.sellingPrice,
    0
  );
  return (
    <div className="container mx-auto">
      <div className="text-center text-lg my-3">
        {data.length === 0 && !loading && (
          <p className="bg-white py-5">No Items in Cart</p>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-10 lg:justify-between p-4">
        {/* view product */}
        <div className="w-full max-w-3xl">
          {loading
            ? loadingCart.map((el, index) => (
                <div
                  key={index + "cartLoadeing"}
                  className="w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded"
                ></div>
              ))
            : data?.map((product, index) => (
                <div
                  key={product?._id + "cartProductDisplay"}
                  className="w-full bg-white h-32 my-2 border border-slate-300  rounded grid grid-cols-[128px,1fr]"
                >
                  <div className="w-32 h-32 bg-slate-200 ">
                    <img
                      src={product?.productId?.productImage[0]}
                      alt={product?.productId?.productName}
                      className="w-full h-full object-scale-down mix-blend-multiply"
                    />
                  </div>
                  <div className="px-4 py-2 relative">
                    {/* delete product */}
                    <div
                      className="absolute right-0 text-2xl text-red-600 rounded-full cursor-pointer p-2 hover:bg-red-600 hover:text-white"
                      onClick={() => deleteCartProduct(product?._id)}
                    >
                      <MdDelete />
                    </div>
                    <h2 className="text-lg lg:text-xl line-clamp-1 ">
                      {product?.productId?.productName}
                    </h2>
                    <p className="capitalize text-slate-500">
                      {product?.productId?.category}
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="text-green-600 font-medium text-lg">
                        {displayINRCurrency(product?.productId?.sellingPrice)}
                      </p>
                      <p className="text-slate-600 font-semibold text-lg">
                        {displayINRCurrency(
                          product?.productId?.sellingPrice * product?.quantity
                        )}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        className="text-red-600 rounded-full hover:bg-red-600 hover:text-white  w-6 h-6 text-2xl"
                        onClick={() =>
                          decreaseQty(product?._id, product?.quantity)
                        }
                      >
                        <CiCircleMinus />
                      </button>
                      <span className="font-bold text-xl">
                        {product?.quantity}
                      </span>
                      <button
                        className="text-green-600 rounded-full hover:bg-green-600 hover:text-white  w-6 h-6 text-2xl"
                        onClick={() =>
                          increaseQty(product?._id, product?.quantity)
                        }
                      >
                        <CiCirclePlus />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
        </div>
        {/* Total Product */}
        <div className="mt-5 lg:mt-0 w-full max-w-sm">
          {loading ? (
            <div className="h-36 bg-slate-200 border border-slate-300 animate-pulse">
              Total
            </div>
          ) : (
            <div className="h-36 bg-white">
              <h2 className="text-white font-semibold text-lg bg-purple-400 px-4 py-1">
                Summary
              </h2>
              <div className="flex justify-between items-center px-4 gap-2 font-medium text-lg text-black">
                <p>Quantity : </p>
                <p>{totalQty}</p>
              </div>
              <div className="flex justify-between items-center px-4 gap-2 font-medium text-lg text-green-600">
                <p>Total Price :</p>
                <p>{displayINRCurrency(totalPrice)}</p>
              </div>

              <button className="bg-blue-600 p-2 font-semibold text-xl text-white w-full">
                Pay {displayINRCurrency(totalPrice)}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;
