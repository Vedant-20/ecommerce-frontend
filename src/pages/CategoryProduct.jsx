import React from "react";
import { useParams } from "react-router-dom";

function CategoryProduct() {
  const { categoryName } = useParams();
  return <div>CategoryProduct</div>;
}

export default CategoryProduct;
