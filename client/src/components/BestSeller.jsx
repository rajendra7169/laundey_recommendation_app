import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestseller, setBestSeller] = useState([]);

  useEffect(() => {
    const bestProduct = products.filter((item) => item.bestseller);
    setBestSeller(bestProduct.slice(0, 5));
  }, [products]);

  return (
    <div className="my-10">
      <div className="py-8 text-center text-3xl">
        <Title text1={"RECENTLY"} text2={"ADDED"} />
        <p className="m-auto w-3/4 text-xs text-gray-600 sm:text-sm md:text-base">
          Explore our "Recently Added" section for the latest laundry services
          and solutions that make your laundry experience easier and more
          efficient!
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 gap-y-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {bestseller.map((item, index) => (
          <ProductItem
            key={index}
            id={item._id}
            image={item.image}
            name={item.name}
            price={`${item.price}/Kg`}
          />
        ))}
      </div>
    </div>
  );
};

export default BestSeller;
