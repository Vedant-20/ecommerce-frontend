import React from "react";
import CategoryList from "../components/CategoryList";
import BannerProduct from "../components/BannerProduct";
import HorizontalCardProduct from "../components/HorizontalCardProduct";
import VerticalCardProduct from "../components/VerticalCardProduct";

function Home() {
  return (
    <div>
      <CategoryList />
      <BannerProduct />

      <HorizontalCardProduct category={"airpods"} heading={"Top Airpods"} />
      <HorizontalCardProduct category={"watches"} heading={"Popular Watches"} />

      <VerticalCardProduct
        category={"mobiles"}
        heading={"Trending Smartphones"}
      />
      <VerticalCardProduct category={"mouse"} heading={"Popular Mouse"} />
      <VerticalCardProduct
        category={"televisions"}
        heading={"Top Televisions"}
      />
      <VerticalCardProduct
        category={"camera"}
        heading={"Camera & Photography"}
      />
      <VerticalCardProduct
        category={"refrigerator"}
        heading={"Home Appliances"}
      />
      <HorizontalCardProduct
        category={"processor"}
        heading={"Computer Processors"}
      />
      <HorizontalCardProduct
        category={"earphones"}
        heading={"Wired Earphones"}
      />
      <HorizontalCardProduct
        category={"speakers"}
        heading={"Bluetooth Speakers"}
      />
      <VerticalCardProduct
        category={"printers"}
        heading={"Trending Printers"}
      />
      <VerticalCardProduct category={"trimmers"} heading={"Men's Trimmers"} />
    </div>
  );
}

export default Home;
