import { assets } from "../assets/assets";

const OurPolicy = () => {
  return (
    <div className="flex flex-col justify-around gap-12 py-20 text-center text-xs text-gray-700 sm:flex-row sm:gap-2 sm:text-sm md:text-base">
      <div>
        <img
          src={assets.exchange_icon}
          className="m-auto mb-5 w-12"
          alt="exchange_icon"
        />
        <p className="font-semibold">Easy Re-wash Policy</p>
        <p className="text-gray-400">
          We offer a hassle-free re-wash if you're not satisfied.
        </p>
      </div>

      <div>
        <img
          src={assets.quality_icon}
          className="m-auto mb-5 w-12"
          alt="quality_icon"
        />
        <p className="font-semibold">Express Service Available</p>
        <p className="text-gray-400">
          We provide same-day or next-day laundry service.
        </p>
      </div>

      <div>
        <img
          src={assets.support_img}
          className="m-auto mb-5 w-12"
          alt="support_img"
        />
        <p className="font-semibold">Dedicated Customer Support</p>
        <p className="text-gray-400">
          We're here to help with any questions or concerns.
        </p>
      </div>
    </div>
  );
};

export default OurPolicy;
