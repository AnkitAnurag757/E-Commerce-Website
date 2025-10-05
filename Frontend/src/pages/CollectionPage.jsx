import React, { useEffect, useState, useRef } from "react";
import { FaFilter } from "react-icons/fa";
import FilterSidebar from "../components/products/FilterSidebar";
import SortOptions from "../components/products/SortOptions";
import ProductGrid from "../components/products/ProductGrid";
import { useParams, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchProductsByFilters } from "../redux/slices/productSlice";
import { useSelector } from "react-redux";

const CollectionPage = () => {
  const { collection } = useParams();
  const [searchParams] = useSearchParams();

  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const queryParams = Object.fromEntries([...searchParams]);

  const sidebarRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchProductsByFilters({ collection, ...queryParams }));
  }, [dispatch, collection, searchParams]);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleClickOutside = (e) => {
    // close side bar if clicked outside
    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    // Add Event Listner for Clicks
    if (isSidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    // clean event listner
  });

  return (
    <div className="flex flex-col lg:flex-row ">
      {/* Mobile Filter button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden border p-2 flex justify-center items-center "
      >
        <FaFilter />
      </button>
      <div
        ref={sidebarRef}
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 z-50 left-0 w-64 bg-white overflow-y-auto transition-transform duration-300 lg:static lg:translate-x-0`}
      >
        <FilterSidebar />
      </div>
      <div className="flex-grow p-4">
        <h2 className="text-2xl uppercase mb-4 ">All Collections</h2>
        {/* Sort options */}
        <SortOptions />
        <ProductGrid products={products} loading={loading} error={error} />
      </div>
    </div>
  );
};

export default CollectionPage;
