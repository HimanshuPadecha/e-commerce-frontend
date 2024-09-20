import React from 'react';
import Hero from './Hero';
import ProductDisplay from './ProductDisplay';

const Home = () => {
  return (
    <div className="min-h-screen bg-black text-white p-4">
      <div className="w-full max-w-5xl mx-auto pt-20">
        
        {/* Search Bar with Button */}

        <div className="flex justify-center mb-12 mt-10 space-x-8">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full max-w-xl p-2 text-white bg-transparent border-2 border-gray-300 rounded-full focus:outline-none focus:border-blue-500"
          />
          <button className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600">
            Search
          </button>
        </div>

        <Hero/>

        {/* New Arrivals Heading */}
        <h2 className="text-3xl font-italic text-white mb-12 text-center mt-12">-- New Arrivals --</h2>
        
        <ProductDisplay catagory="Men" />
        <ProductDisplay catagory="Women" />
      </div>

    </div>


            
  );
};

export default Home;
