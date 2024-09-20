import React from 'react';

const Product = ({ image, title, description, price }) => {
  return (
    <div className="min-h-screen bg-black mt-12 p-8 flex flex-col items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 flex w-full max-w-5xl mb-8">
        {/* Product Image */}
        <div className="w-1/2">
          <img
            src={image}
            alt={title}
            className="w-full h-auto object-cover rounded-md"
          />
        </div>

        {/* Product Info */}
        <div className="w-1/2 pl-8 flex flex-col justify-between">
          {/* Product Title */}
          <h2 className="text-3xl font-bold mb-4">{title}</h2>

          {/* Product Description */}
          <p className="text-gray-600 text-lg mb-6">{description}</p>

          {/* Product Price */}
          <p className="text-2xl font-semibold text-green-600 mb-6">${price}</p>

          {/* Buttons */}
          <div className="flex space-x-4">
            <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition">
              Add to Cart
            </button>
            <button className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition">
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Feedback Section */}
      <div className="card text-white rounded-lg p-6 w-full max-w-5xl">
        <h3 className="text-2xl font-bold mb-4">Customer Feedback</h3>
        
        {/* Example Feedbacks */}
        <div className="space-y-4">
          <div className="bg-gray-700 p-4 rounded-lg">
            <p className="text-gray-300 mb-2"><strong>John Doe:</strong></p>
            <p>"Great product! Really satisfied with the quality."</p>
          </div>

          <div className="bg-gray-700 p-4 rounded-lg">
            <p className="text-gray-300 mb-2"><strong>Jane Smith:</strong></p>
            <p>"Amazing value for the price. Would definitely recommend!"</p>
          </div>

          <div className="bg-gray-700 p-4 rounded-lg">
            <p className="text-gray-300 mb-2"><strong>Mark Lee:</strong></p>
            <p>"The delivery was fast, and the product exceeded my expectations."</p>
          </div>
        </div>

        <div className="flex items-center space-x-4 mt-10">
          <input
            type="text"
            placeholder="Add your feedback..."
            className="w-96 p-2 rounded-md bg-white text-black border-none focus:outline-none"
          />
          <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition">
            Add 
          </button>
        </div>

      </div>
    </div>
  );
};

export default Product;
