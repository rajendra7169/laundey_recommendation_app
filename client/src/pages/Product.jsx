import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  const fetchProductData = () => {
    const foundProduct = products.find((item) => item._id === productId);
    if (foundProduct) {
      setProductData(foundProduct);
      setImage(foundProduct.image[0]); // Set the first image as default
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]); // Add products as a dependency

  return productData ? (
    <div className="border-t-2 pt-10 opacity-100 transition-opacity duration-500 ease-in">
      <div className="flex flex-col gap-12 sm:flex-row sm:gap-12">
        {/* product images */}
        <div className="flex flex-1 flex-col-reverse gap-3 sm:flex-row">
          <div className="flex w-full justify-between overflow-x-auto sm:w-[18.7%] sm:flex-col sm:justify-normal sm:overflow-y-scroll">
            {productData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                key={index}
                src={item}
                className="w-[24%] flex-shrink-0 cursor-pointer sm:mb-3 sm:w-full"
                alt={`Product image ${index + 1}`}
              />
            ))}
          </div>

          <div className="w-full sm:w-[80%]">
            <img src={image} className="h-auto w-full" alt="Selected product" />
          </div>
        </div>

        {/* product info */}
        <div className="flex-1">
          <h1 className="mt-2 text-2xl font-medium">{productData.name}</h1>
          <div className="mt-2 flex items-center gap-1">
            <img src={assets.star_icon} alt="star_icon" className="5 w-3" />
            <img src={assets.star_icon} alt="star_icon" className="5 w-3" />
            <img src={assets.star_icon} alt="star_icon" className="5 w-3" />
            <img src={assets.star_icon} alt="star_icon" className="5 w-3" />
            <img
              src={assets.star_dull_icon}
              alt="star_dull_icon"
              className="5 w-3"
            />
            <p className="pl-2">(122)</p>
          </div>
          <p className="mt-5 text-3xl font-medium">
            {currency}
            {`${productData.price}/Kg`}
          </p>
          <p className="mt-5 text-gray-500 md:w-4/5">
            {productData.description}
          </p>

          {/* Contact Information Section */}
          <div className="my-8 rounded border bg-gray-100 p-4">
            <h2 className="text-lg font-semibold">Contact Information</h2>
            <p>Phone: {productData.phone}</p>
            <p>Email: {productData.email}</p>
            <p>
              Social Media Page:{" "}
              <a
                href={productData.socialPage}
                target="_blank"
                rel="noopener noreferrer"
              >
                {productData.socialPage}
              </a>
            </p>
            <p>Shop Location: {productData.shopLocation}</p>
          </div>

          <div className="my-8 flex flex-col gap-4">
            <p>Select Cloths Type</p>
            <div className="flex gap-2">
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  className={`border bg-gray-100 px-4 py-2 ${item === size ? "border-orange-500" : ""}`}
                  key={index}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={() => addToCart(productData._id, size)}
            className="bg-black px-8 py-3 text-sm text-white active:bg-gray-700"
          >
            ADD TO CART
          </button>
          <hr className="mt-8 sm:w-4/5" />
          <div className="mt-5 flex flex-col gap-1 text-sm text-gray-500">
            <p>100% Satisfaction Guaranteed.</p>
            <p>Cash on Delivery is Available on this Product</p>
            <p>Free Re-wash if You're Not Satisfied</p>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="opacity-0">Product</div>
  );
};

export default Product;
