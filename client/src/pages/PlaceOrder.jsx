import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const {
    navigate,
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    products,
  } = useContext(ShopContext);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      let orderItems = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items),
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };

      switch (method) {
        // api calls for COD
        case "cod":
          const response = await axios.post(
            backendUrl + "/api/order/place",
            orderData,
            { headers: { token } },
          );

          if (response.data.success) {
            setCartItems({});
            navigate("/orders");
          } else {
            toast.error(response.data.message);
          }
          break;

        case "stripe":
          const responseStripe = await axios.post(
            backendUrl + "/api/order/stripe",
            orderData,
            { headers: { token } },
          );
          if (responseStripe.data.success) {
            const { session_url } = responseStripe.data;
            window.location.replace(session_url);
          } else {
            toast.error(responseStripe.data.message);
          }
          break;

        default:
          break;
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex min-h-[80vh] flex-col justify-between gap-4 border-t pt-5 sm:flex-row sm:pt-14"
    >
      {/* left side */}
      <div className="flex w-full flex-col gap-4 sm:max-w-[480px]">
        <div className="my-3 text-xl sm:text-2xl">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>
        <div className="flex gap-3">
          <input
            onChange={onChangeHandler}
            name="firstName"
            value={formData.firstName}
            className="w-full rounded border border-gray-300 px-3.5 py-1.5"
            type="text"
            placeholder="first name"
            required
          />

          <input
            onChange={onChangeHandler}
            name="lastName"
            value={formData.lastName}
            className="w-full rounded border border-gray-300 px-3.5 py-1.5"
            type="text"
            placeholder="last name"
            required
          />
        </div>
        <input
          onChange={onChangeHandler}
          name="email"
          value={formData.email}
          className="w-full rounded border border-gray-300 px-3.5 py-1.5"
          type="email"
          placeholder="email address"
          required
        />

        <input
          onChange={onChangeHandler}
          name="street"
          value={formData.street}
          className="w-full rounded border border-gray-300 px-3.5 py-1.5"
          type="text"
          placeholder="street name"
          required
        />
        <div className="flex gap-3">
          <input
            onChange={onChangeHandler}
            name="city"
            value={formData.city}
            className="w-full rounded border border-gray-300 px-3.5 py-1.5"
            type="text"
            placeholder="city"
            required
          />

          <input
            onChange={onChangeHandler}
            name="state"
            value={formData.state}
            className="w-full rounded border border-gray-300 px-3.5 py-1.5"
            type="text"
            placeholder="state"
            required
          />
        </div>
        <div className="flex gap-3">
          <input
            onChange={onChangeHandler}
            name="zipcode"
            value={formData.zipcode}
            className="w-full rounded border border-gray-300 px-3.5 py-1.5"
            type="number"
            placeholder="zip code"
            required
          />

          <input
            onChange={onChangeHandler}
            name="country"
            value={formData.country}
            className="w-full rounded border border-gray-300 px-3.5 py-1.5"
            type="text"
            placeholder="country"
            required
          />
        </div>
        <input
          onChange={onChangeHandler}
          name="phone"
          value={formData.phone}
          className="w-full rounded border border-gray-300 px-3.5 py-1.5"
          type="number"
          placeholder="phone number"
          required
        />
      </div>
      {/* right side */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        <div className="mt-12">
          <Title text1={"PAYMENT"} text2={"METHOD"} />
          {/* payment method selection */}
          <div className="flex flex-col gap-3 lg:flex-row">
            <div
              onClick={() => setMethod("stripe")}
              className="flex cursor-pointer items-center gap-3 border p-2 px-3"
            >
              <p
                className={`h-3.5 min-w-3.5 rounded-full border ${method === "stripe" ? "bg-green-400" : ""}`}
              ></p>
              <img
                src={assets.stripe_logo}
                className="mx-4 h-5"
                alt="stripe_logo"
              />
            </div>

            <div
              onClick={() => setMethod("cod")}
              className="flex cursor-pointer items-center gap-3 border p-2 px-3"
            >
              <p
                className={`h-3.5 min-w-3.5 rounded-full border ${method === "cod" ? "bg-green-400" : ""}`}
              ></p>
              <p className="mx-4 text-sm font-medium text-gray-500">
                CASH ON DELIVERY
              </p>
            </div>
          </div>
          <div className="mt-8 w-full text-end">
            <button
              type="submit"
              className="bg-black px-16 py-3 text-sm text-white"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
