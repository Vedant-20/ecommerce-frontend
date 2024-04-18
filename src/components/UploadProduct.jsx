import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { FaCloudUploadAlt } from "react-icons/fa";
import { uploadImage } from "../helpers/uploadImage";
import DisplayImage from "./DisplayImage";
import { MdDelete } from "react-icons/md";
import axiosInstance from "../axiosInstance/axiosInstance";
import { toast } from "react-toastify";

function UploadProduct({ onClose }) {
  const productCategory = [
    {
      id: 1,
      label: "Airpods",
      value: "airpods",
    },
    {
      id: 2,
      label: "Camera",
      value: "camera",
    },
    {
      id: 3,
      label: "Earphones",
      value: "earphones",
    },
    {
      id: 4,
      label: "Mobiles",
      value: "mobiles",
    },
    {
      id: 5,
      label: "Mouse",
      value: "mouse",
    },
    {
      id: 6,
      label: "Printers",
      value: "printers",
    },
    {
      id: 7,
      label: "Processor",
      value: "processor",
    },
    {
      id: 8,
      label: "Refrigerator",
      value: "refrigerator",
    },
    {
      id: 9,
      label: "Speakers",
      value: "speakers",
    },
    {
      id: 10,
      label: "Trimmers",
      value: "trimmers",
    },
    {
      id: 11,
      label: "Televisons",
      value: "televisions",
    },
    {
      id: 12,
      label: "Watches",
      value: "watches",
    },
  ];
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: "",
  });

  const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState("");

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleUploadProduct = async (e) => {
    const file = e.target.files[0];
    // console.log("FIle checker", file);

    const uploadImageCloudinary = await uploadImage(file);
    // console.log("cloud images", uploadImageCloudinary);

    setData((prev) => {
      return {
        ...prev,
        productImage: [...prev.productImage, uploadImageCloudinary.secure_url],
      };
    });
  };

  const handleDeleteProductImage = async (index) => {
    const newProductImage = [...data?.productImage];

    newProductImage.splice(index, 1);

    setData((prev) => {
      return {
        ...prev,
        productImage: [...newProductImage],
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("CHecke submission", data);
    try {
      const response = await axiosInstance.post(
        `/products/upload-product`,
        data
      );
      //   console.log("Uploaded REsponse", response);
      toast.success(response?.data?.message);
      onClose();
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="fixed w-full h-full bg-slate-200 bg-opacity-80 top-0 left-0 right-0 bottom-0 flex justify-center items-center">
      <div className="bg-white p-4 rounded-md w-full h-full max-w-2xl max-h-[80%] overflow-hidden">
        <div className="flex justify-between items-center pb-3">
          <h2 className="font-bold text-lg">Upload Product</h2>
          <div
            className="w-fit ml-auto cursor-pointer text-2xl hover:animate-spin"
            onClick={onClose}
          >
            <IoMdClose />
          </div>
        </div>

        <form
          className="grid p-4 gap-3 overflow-y-scroll h-full pb-5"
          onSubmit={handleSubmit}
        >
          <label htmlFor="productName">Product Name: </label>
          <input
            type="text"
            required
            id="productName"
            placeholder="Enter Product Name..."
            name="productName"
            value={data.productName}
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded-sm"
          />
          <label htmlFor="brandName" className="mt-3">
            Brand Name:{" "}
          </label>
          <input
            type="text"
            required
            id="brandName"
            name="brandName"
            placeholder="Enter Brand Name..."
            value={data.brandName}
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded-sm"
          />

          <label htmlFor="category" className="mt-3">
            Category:{" "}
          </label>
          <select
            name="category"
            required
            value={data.category}
            id="category"
            onChange={handleOnChange}
          >
            <option value={""}>Select Category</option>
            {productCategory.map((el, index) => {
              return (
                <option value={el.value} key={el.id}>
                  {el.label}
                </option>
              );
            })}
          </select>

          <label htmlFor="productImage" className="mt-3">
            Product Image:{" "}
          </label>

          <label htmlFor="uploadImageInput">
            <div className="p-2 bg-slate-100 border-2 rounded-md h-32 w-full flex justify-center items-center cursor-pointer">
              <div className="text-slate-500 flex justify-center items-center flex-col gap-2 ">
                <span className="text-4xl">
                  <FaCloudUploadAlt />
                </span>
                <p className="text-sm">Upload Product Image Here !</p>
                <input
                  type="file"
                  required
                  accept="image/*"
                  id="uploadImageInput"
                  className="hidden"
                  onChange={handleUploadProduct}
                />
              </div>
            </div>
          </label>
          <div>
            {data?.productImage[0] ? (
              <div className="flex items-center gap-2">
                {data?.productImage?.map((el, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={el}
                      alt="product image"
                      width={80}
                      height={80}
                      className="bg-slate-200 cursor-pointer"
                      onClick={() => {
                        setOpenFullScreenImage(true);
                        setFullScreenImage(el);
                      }}
                    />
                    <div
                      className="absolute bottom-0 right-0 p-1 text-red-600 hidden group-hover:block"
                      onClick={() => handleDeleteProductImage(index)}
                    >
                      <MdDelete />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-red-600 text-xs">
                *Please Upload Product Image
              </p>
            )}
          </div>

          <label htmlFor="price" className="mt-3">
            Price:{" "}
          </label>
          <input
            type="number"
            id="price"
            required
            name="price"
            placeholder="Enter Price..."
            value={data.price}
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded-sm"
          />
          <label htmlFor="price" className="mt-3">
            Selling Price:{" "}
          </label>
          <input
            type="number"
            required
            id="sellingPrice"
            name="sellingPrice"
            placeholder="Enter Selling Price..."
            value={data.sellingPrice}
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded-sm"
          />

          <label htmlFor="description" className="mt-3">
            Description:{" "}
          </label>

          <textarea
            className="h-28 bg-slate-100 border resize-none p-1"
            placeholder="Enter Product Description"
            name="description"
            value={data.description}
            required
            id="description"
            onChange={handleOnChange}
            cols="30"
            rows="10"
          ></textarea>

          <button className="border-2 border-green-400 bg-green-200 transition-all hover:border-white hover:bg-green-400 py-2 px-4 rounded-md">
            Upload Product
          </button>
        </form>
      </div>

      {/* Display Image Full Screen */}
      {openFullScreenImage && (
        <DisplayImage
          imgUrl={fullScreenImage}
          onClose={() => setOpenFullScreenImage(false)}
        />
      )}
    </div>
  );
}

export default UploadProduct;
