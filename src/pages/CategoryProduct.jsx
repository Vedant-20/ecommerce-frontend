import React, { useState } from "react";
import { useParams } from "react-router-dom";
import CategoryWiseProductDisplay from "../components/CategoryWiseProductDisplay";

function CategoryProduct() {
  const { categoryName } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
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

  const handleCategoryChange = () => {};
  return (
    <div className="container mx-auto p-4">
      {/* desktop version */}
      <div className=" grid grid-cols-[200px,1fr]">
        {/* left side */}
        <div className="bg-white p-2 min-h-[calc(100vh-120px)] overflow-y-scroll">
          {/* sort by */}
          <div className="">
            <h3 className="text-base uppercase font-medium text-slate-500 border-b border-slate-300 pb-1">
              Sort By :
            </h3>

            <form className="flex text-sm flex-col gap-2 py-2">
              <div className="flex items-center gap-3">
                <input type="radio" name="sortBy" />
                <label>Price - Low to High </label>
              </div>
              <div>
                <input type="radio" name="sortBy" />
                <label>Price - High to Low </label>
              </div>
            </form>
          </div>

          {/* filter by */}
          <div className="">
            <h3 className="text-base uppercase font-medium text-slate-500 border-b border-slate-300 pb-1">
              Category
            </h3>

            <form
              className="flex text-sm flex-col gap-2 py-2"
              onChange={handleCategoryChange}
            >
              {productCategory?.map((category, index) => (
                <div
                  key={index + "categoryIdFilter"}
                  className="flex items-center gap-3"
                >
                  <input
                    type="checkbox"
                    value={category.value}
                    name={"category"}
                    id="category"
                  />
                  <label htmlFor={category?.value}>{category?.label}</label>
                </div>
              ))}
            </form>
          </div>
        </div>
        {/* right side */}
        <div>
          {categoryName && (
            <CategoryWiseProductDisplay
              category={categoryName}
              heading={"Recommended Products"}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default CategoryProduct;
