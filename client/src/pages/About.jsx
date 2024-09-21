import Title from "../components/Title";
import { assets } from "../assets/assets";

const About = () => {
  return (
    <div>
      <div className="border-t pt-8 text-center text-2xl">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>

      <div className="my-10 flex flex-col gap-16 md:flex-row">
        <img
          src={assets.about_img}
          className="w-full md:max-w-[450px]"
          alt="about_img"
        />
        <div className="flex flex-col justify-center gap-6 text-gray-600 md:w-2/4">
          <p>
            We're passionate about making laundry day a breeze. Our journey
            started with a simple idea: to revolutionize the way people handle
            their laundry, offering convenience and quality right at their
            doorstep.
          </p>
          <p>
            Since our inception, we've worked tirelessly to perfect our laundry
            services, catering to every fabric and care requirement. From
            everyday wear to delicate garments and household linens, we handle
            your laundry with the utmost care and attention.
          </p>
          <strong className="text-gray-800">Our Mission</strong>
          <p>
            Our mission is to provide you with a hassle-free laundry experience
            that saves you time and energy. We're dedicated to delivering
            exceptional service, from pickup to delivery, ensuring your clothes
            are returned to you fresh, clean, and ready to wear.
          </p>
        </div>
      </div>

      <div className="py-4 text-xl">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>

      <div className="mb-20 flex flex-col text-sm md:flex-row">
        <div className="flex flex-col gap-5 border px-10 py-8 sm:py-20 md:px-16">
          <strong>Expert Care:</strong>
          <p className="text-gray-600">
            We meticulously select and vet each product to ensure it meets our
            stringent quality standards.
          </p>
        </div>

        <div className="flex flex-col gap-5 border px-10 py-8 sm:py-20 md:px-16">
          <strong>Convinience:</strong>
          <p className="text-gray-600">
            Schedule a pickup and delivery at your convenience. We'll handle the
            rest.
          </p>
        </div>

        <div className="flex flex-col gap-5 border px-10 py-8 sm:py-20 md:px-16">
          <strong>Affordability:</strong>
          <p className="text-gray-600">
            Our transparent pricing ensures you get the best value for your
            money.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
