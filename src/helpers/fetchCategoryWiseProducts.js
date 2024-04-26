import axiosInstance from "../axiosInstance/axiosInstance";

const fetchCategoryWiseProducts = async (category) => {
  try {
    const response = await axiosInstance.post(
      `/products/get-categorywise-products`,
      {
        category,
      }
    );

    return response?.data?.data;
  } catch (error) {
    console.log(error);
  }
};

export default fetchCategoryWiseProducts;
