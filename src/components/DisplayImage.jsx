import React from "react";
import { IoMdClose } from "react-icons/io";

function DisplayImage({ imgUrl, onClose }) {
  return (
    <div className="fixed top-0 bottom-0 right-0 left-0 flex justify-center items-center ">
      <div className="bg-white shadow-lg rounded-md max-w-5xl mx-auto p-4">
        <div
          className="w-fit ml-auto cursor-pointer text-2xl hover:animate-spin "
          onClick={onClose}
        >
          <IoMdClose />
        </div>
      </div>
      <div className="flex justify-center p-4 max-w-[80vh] max-h-[80vh]">
        <img src={imgUrl} className="w-full h-full" />
      </div>
    </div>
  );
}

export default DisplayImage;
