import { toast } from "react-toastify";
import axiosInstance from "../axiosInstance/axiosInstance";

const addToCart = async (e, id) => {
  e?.stopPropagation();
  e?.preventDefault();

  try {
    const response = await axiosInstance.post(`/users/addtocart`, {
      productId: id,
    });

    toast.success(response?.data?.message);

    return response;
  } catch (error) {
    console.log(error);
    toast.error("Please Login OR Product Already Exists in Cart");
  }
};

export default addToCart;
