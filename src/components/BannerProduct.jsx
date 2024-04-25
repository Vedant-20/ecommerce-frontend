import React, { useEffect, useState } from "react";
import image1 from "../assets/banner/img1.webp";
import image2 from "../assets/banner/img2.webp";
import image5 from "../assets/banner/img5.webp";
import image3 from "../assets/banner/img3.jpg";
import image4 from "../assets/banner/img4.jpg";
import image1Mobile from "../assets/banner/img1_mobile.jpg";
import image3Mobile from "../assets/banner/img3_mobile.jpg";
import image4Mobile from "../assets/banner/img4_mobile.jpg";
import image5Mobile from "../assets/banner/img5_mobile.png";
import image2Mobile from "../assets/banner/img2_mobile.webp";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

function BannerProduct() {
  const [currentImage, setCurrentImage] = useState(0);
  const desktopImages = [image1, image2, image3, image4, image5];
  const mobileImages = [
    image1Mobile,
    image2Mobile,
    image3Mobile,
    image4Mobile,
    image5Mobile,
  ];

  const nextImage = () => {
    if (desktopImages.length - 1 > currentImage) {
      setCurrentImage((prev) => prev + 1);
    }
  };
  const prevImage = () => {
    if (currentImage != 0) {
      setCurrentImage((prev) => prev - 1);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (desktopImages.length - 1 > currentImage) {
        nextImage();
      } else {
        setCurrentImage(0);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mx-auto px-4 rounded-md ">
      <div className="h-60 md:h-72 w-full bg-slate-200 relative">
        <div className="absolute z-10 w-full h-full md:flex hidden items-center">
          <div className="flex justify-between w-full text-2xl ">
            <button
              onClick={prevImage}
              className="bg-white shadow-md rounded-full p-1"
            >
              <FaAngleLeft />
            </button>
            <button
              onClick={nextImage}
              className="bg-white shadow-md rounded-full p-1"
            >
              <FaAngleRight />
            </button>
          </div>
        </div>

        {/* desktop and tablet */}
        <div className="hidden md:flex w-full h-full overflow-hidden">
          {desktopImages.map((el, index) => (
            <div
              className="w-full h-full min-w-full min-h-full transition-all rounded-md "
              key={index + el}
              style={{ transform: `translateX(-${currentImage * 100})` }}
            >
              <img src={el} alt="banners" className="w-full h-full" />
            </div>
          ))}
        </div>
        {/* Mobile */}
        <div className="flex w-full h-full overflow-hidden md:hidden">
          {mobileImages.map((el, index) => (
            <div
              className="w-full h-full min-w-full min-h-full transition-all rounded-md "
              key={index + el}
              style={{ transform: `translateX(-${currentImage * 100})` }}
            >
              <img src={el} alt="banners" className="w-full h-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BannerProduct;
