import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Add = ({ token }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Kathmandu");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);

  // New state variables for contact information
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [socialPage, setsocialPage] = useState("");
  const [shopLocation, setShopLocation] = useState("");

  const onsubmitHandeler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));

      // Add contact information to formData
      formData.append("phone", phone);
      formData.append("email", email);
      formData.append("socialPage", socialPage);
      formData.append("shopLocation", shopLocation);

      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      const response = await axios.post(
        `${backendUrl}/api/product/add`,
        formData,
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setName("");
        setDescription("");
        setPrice("");
        setPhone("");
        setEmail("");
        setsocialPage("");
        setShopLocation("");
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <form
      onSubmit={onsubmitHandeler}
      className="flex flex-col w-full items-start gap-3"
    >
      <div>
        <p className="mb-2">Upload Image</p>
        <div className="flex gap-2">
          <label htmlFor="image1">
            <img
              className="w-20"
              src={!image1 ? assets.upload_area : URL.createObjectURL(image1)}
              alt="upload_area"
            />
            <input
              onChange={(e) => setImage1(e.target.files[0])}
              type="file"
              id="image1"
              hidden
            />
          </label>
          <label htmlFor="image2">
            <img
              className="w-20"
              src={!image2 ? assets.upload_area : URL.createObjectURL(image2)}
              alt="upload_area"
            />
            <input
              onChange={(e) => setImage2(e.target.files[0])}
              type="file"
              id="image2"
              hidden
            />
          </label>
          <label htmlFor="image3">
            <img
              className="w-20"
              src={!image3 ? assets.upload_area : URL.createObjectURL(image3)}
              alt="upload_area"
            />
            <input
              onChange={(e) => setImage3(e.target.files[0])}
              type="file"
              id="image3"
              hidden
            />
          </label>
          <label htmlFor="image4">
            <img
              className="w-20"
              src={!image4 ? assets.upload_area : URL.createObjectURL(image4)}
              alt="upload_area"
            />
            <input
              onChange={(e) => setImage4(e.target.files[0])}
              type="file"
              id="image4"
              hidden
            />
          </label>
        </div>
      </div>

      <div className="w-full">
        <p className="mb-2">Name</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="type here"
          required
        />
      </div>

      <div className="w-full">
        <p className="mb-2">Description</p>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="w-full max-w-[500px] px-3 py-2"
          placeholder="write content here"
        />
      </div>

      {/* New Contact Information Section */}
      <div>
        <p className="mb-2">Contact Information</p>
        <div className="flex flex-col gap-2">
          <input
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
            className="w-full max-w-[500px] px-3 py-2"
            type="text"
            placeholder="Phone Number"
          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="w-full max-w-[500px] px-3 py-2"
            type="email"
            placeholder="Email Address"
          />
          <input
            onChange={(e) => setsocialPage(e.target.value)}
            value={socialPage}
            className="w-full max-w-[500px] px-3 py-2"
            type="text"
            placeholder="Social Media URL"
          />
          <input
            onChange={(e) => setShopLocation(e.target.value)}
            value={shopLocation}
            className="w-full max-w-[500px] px-3 py-2"
            type="text"
            placeholder="Shop Location"
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <div>
          <p className="mb-2">Choose Location</p>
          <select
            onChange={(e) => setSubCategory(e.target.value)}
            className="w-full px-3 py-2"
          >
            <option value="Kathmandu">Kathmandu</option>
            <option value="Bhaktapur">Bhaktapur</option>
            <option value="Lalitpur">Lalitpur</option>
          </select>
        </div>

        <div>
          <p className="mb-2">Price/Kg</p>
          <input
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            className="w-full px-3 py-2 sm:w-[120px]"
            type="number"
            placeholder="250/Kg"
          />
        </div>
      </div>

      <div>
        <p className="mb-2">Clothes Types</p>
        <div className="flex gap-3">
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("Mix Clothes")
                  ? prev.filter((item) => item !== "Mix Clothes")
                  : [...prev, "Mix Clothes"]
              )
            }
          >
            <p
              className={`${
                sizes.includes("Mix Clothes") ? "bg-pink-100" : "bg-slate-200"
              } px-3 py-1 cursor-pointer`}
            >
              Mix Clothes
            </p>
          </div>

          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("Wool Clothes")
                  ? prev.filter((item) => item !== "Wool Clothes")
                  : [...prev, "Wool Clothes"]
              )
            }
          >
            <p
              className={`px-3 py-1 cursor-pointer ${
                sizes.includes("Wool Clothes") ? "bg-pink-100" : "bg-slate-200"
              }`}
            >
              Wool Clothes
            </p>
          </div>

          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("Blankets")
                  ? prev.filter((item) => item !== "Blankets")
                  : [...prev, "Blankets"]
              )
            }
          >
            <p
              className={`px-3 py-1 cursor-pointer ${
                sizes.includes("Blankets") ? "bg-pink-100" : "bg-slate-200"
              }`}
            >
              Blankets
            </p>
          </div>

          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("Delicate")
                  ? prev.filter((item) => item !== "Delicate")
                  : [...prev, "Delicate"]
              )
            }
          >
            <p
              className={`px-3 py-1 cursor-pointer ${
                sizes.includes("Delicate") ? "bg-pink-100" : "bg-slate-200"
              }`}
            >
              Delicate
            </p>
          </div>

          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("Heavy Duty")
                  ? prev.filter((item) => item !== "Heavy Duty")
                  : [...prev, "Heavy Duty"]
              )
            }
          >
            <p
              className={`px-3 py-1 cursor-pointer ${
                sizes.includes("Heavy Duty") ? "bg-pink-100" : "bg-slate-200"
              }`}
            >
              Heavy Duty
            </p>
          </div>
        </div>
      </div>

      <div className="flex gap-2 mt-2">
        <input
          onChange={() => setBestseller((prev) => !prev)}
          checked={bestseller}
          type="checkbox"
          id="bestseller"
        />
        <label className="cursor-pointer" htmlFor="bestseller">
          Add to Recently Added
        </label>
      </div>

      <button className="w-28 py-3 mt-4 bg-black text-white" type="submit">
        Add
      </button>
    </form>
  );
};

export default Add;
