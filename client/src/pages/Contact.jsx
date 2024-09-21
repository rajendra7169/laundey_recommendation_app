import Title from "../components/Title";
import { assets } from "../assets/assets";

const Contact = () => {
  return (
    <div>
      <div className="border-t pt-10 text-center text-2xl">
        <Title text1={"CONTACT"} text2={"US"} />
      </div>

      <div className="my-10 mb-28 flex flex-col justify-center gap-10 md:flex-row">
        <img
          src={assets.contact_img}
          className="w-full md:max-w-[480px]"
          alt="contact_img"
        />
        <div className="flex flex-col items-start justify-center gap-6">
          <p className="text-xl font-semibold text-gray-600">Our Store</p>
          <p className="text-gray-500">
            44600 Chabahil <br /> Kathmandu, Bagmati, Nepal
          </p>
          <p className="text-gray-500">
            Tel: +977 - 1 3425678 <br />
            mailto@laundry.com.np
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
