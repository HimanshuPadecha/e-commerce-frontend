import React from 'react'
import { Link } from 'react-router-dom'

function ProductDisplay({
    catagory
}) {
  return (

    <>
    <h3 className="text-2xl font-semibold text-white mb-12 text-left">{catagory}</h3>

    <div className="relative mb-12">
    <div className="flex space-x-8 overflow-x-auto scrollable-container">
      {/* Example product card */}
      {Array.from({ length: 8 }).map((_, index) => (
        <Link to="/product/:id">
        <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-lg w-80 flex-shrink-0 inline-block card">
          <img
            src={`https://via.placeholder.com/150?text=Product+${index + 1}`}
            alt={`Product ${index + 1}`}
            className="w-full h-60 object-cover rounded-md mb-4"
          />
          <h2 className="text-lg font-bold mb-2">Product {index + 1}</h2>
          <p className="text-gray-400 mb-4">$99.99</p>
          <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
            Buy Now
          </button>
        
        </div>
        </Link>
      ))}
    </div>
  </div>
  </>
  )
}

export default ProductDisplay
