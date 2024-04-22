import React, { useState } from "react";
import { MdModeEdit } from "react-icons/md";
import AdminEditProduct from "./AdminEditProduct";

function AdminProductCard({ data, fetchData }) {
  const [editProduct, setEditProduct] = useState(false);
  return (
    <div className="bg-white p-4 rounded-md ">
      <div className="w-40">
        <img
          src={data?.productImage[0]}
          width={120}
          height={120}
          alt={data?.productName}
          className="w-fit mx-auto"
        />
        <h1>{data?.productName}</h1>

        <div>
          <p className="font-semibold">₹{data?.sellingPrice}.00</p>
          <div
            className="w-fit ml-auto rounded-full cursor-pointer p-2 bg-green-300 hover:bg-green-600 text-black hover:text-white"
            onClick={() => setEditProduct(true)}
          >
            <MdModeEdit />
          </div>
        </div>
      </div>

      {editProduct && (
        <AdminEditProduct
          fetchData={fetchData}
          productData={data}
          onClose={() => setEditProduct(false)}
        />
      )}
    </div>
  );
}

export default AdminProductCard;
