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
        <p className="font-semibold">Easy Exchange Policy</p>
        <p className="text-gray-400">We offer hassle free exchange policy</p>
      </div>

      <div>
        <img
          src={assets.quality_icon}
          className="m-auto mb-5 w-12"
          alt="quality_icon"
        />
        <p className="font-semibold">7 Days Return Policy</p>
        <p className="text-gray-400">We provide 7 days free return policy</p>
      </div>

      <div>
        <img
          src={assets.support_img}
          className="m-auto mb-5 w-12"
          alt="support_img"
        />
        <p className="font-semibold">Best customer support</p>
        <p className="text-gray-400">we provide 24/7 customer support</p>
      </div>
    </div>
  );
};

export default OurPolicy;
