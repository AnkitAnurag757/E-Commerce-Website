import React from "react";
import heroImg from "../../assets/hero-section.png";
import { Link } from "react-router-dom";
const Hero = () => {
  return (
    <section className="relative">
      <img
        src={heroImg}
        alt="Rabbit"
        className="w-full h-[400px]  md:h-[600] lg:h-[750px] object-cover"
      />
      <div className="absolute inset-0 bg-black/10 flex flex-col justify-end p-8">
        <div className="text-left text-white md:w-2/3">
          <h1 className="text-4xl md:text-8xl font-bold tracking-tighter uppercase leading-none">
            Vacation <br /> Ready
          </h1>
          <p className="text-lg md:text-xl font-medium mb-6 mt-2">
            Explore our vacation-ready outfits with fast worldwide shipping.
          </p>
          <Link
            to="/collections/all"
            className="bg-[#ea2e0e] text-white px-8 py-3 rounded-lg shadow-lg text-lg font-semibold transform transition-transform hover:scale-105"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
