import React from "react";
import womensCollectionImage from "../../assets/womens-collection.avif";
import menscollectionImage from "../../assets/mens-collection1.jpg";
import { Link } from "react-router-dom";

const GenderCollection = () => {
  return (
    <section className="py-16 px-4 lg:px-0">
      <div className="container mx-auto flex flex-col md:flex-row gap-8">
        {/* womens collection */}
        <div className="relative flex-1">
          <img
            src={womensCollectionImage}
            alt="womens's collection"
            className="w-full h-[700px] object-cover"
          />
          <div className="absolute bottom-8 left-8 bg-white/90 p-4">
            <h2 className="text-2xl font-bold text-gray-500 mb-3">
              {" "}
              Women's Collection
            </h2>
            <Link
              to="/collections/all?gender=women"
              className="text-gray-900 underline"
            >
              {" "}
              Shop Now
            </Link>
          </div>
        </div>
        {/* Men's Collection */}
        <div className="relative flex-1">
          <img
            src={menscollectionImage}
            alt="Men's Collection"
            className="w-full h-[700px] object-cover"
          />
          <div className="absolute bottom-8 left-8 bg-white/90 p-4">
            <h2 className="text-2xl font-bold text-gray-500 mb-3">
              {" "}
              Men's Collection
            </h2>
            <Link
              to="/collections/all?gender=Men"
              className="text-gray-900 underline"
            >
              {" "}
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GenderCollection;
