import React from "react";
import Hero from "../components/layout/Hero";
import GenderCollection from "../components/products/GenderCollection";
import NewArrivals from "../components/products/NewArrivals";
import ProductDetails from "../components/products/ProductDetails";
import ProductGrid from "../components/products/ProductGrid";
import FeaturedCollection from "../components/products/FeaturedCollection";
import FeaturesSection from "../components/products/FeaturesSection";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";

import { fetchProductsByFilters } from "../redux/slices/productSlice";
const Home = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const [bestSellerProduct, setBestSellerProduct] = useState(null);
  useEffect(() => {
    //Fetch products for a specific collection
    dispatch(
      fetchProductsByFilters({
        gender: "Women",
        category: "Bottom Wear",
        limit: 8,
      })
    );

    //Fetch Best seller Product
    const fetchBestSeller = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`
        );
        setBestSellerProduct(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBestSeller();
  }, [dispatch]);
  return (
    <div>
      <Hero />
      <GenderCollection />
      <NewArrivals />
      {/* Best Sellers */}
      <h2 className="text-3xl text-center font-bold mb-4 mt-6">Best Seller</h2>
      {bestSellerProduct ? (
        <ProductDetails productId={bestSellerProduct._id} />
      ) : (
        <p className="text-center">Loading best Seller product...</p>
      )}

      <div className="container mx-auto">
        <h2 className="text-3xl text-center font-bold mb-4">
          Top Wears for Women
        </h2>
        <ProductGrid products={products} loading={loading} error={error} />
      </div>

      <FeaturedCollection />
      <FeaturesSection />
    </div>
  );
};

export default Home;
