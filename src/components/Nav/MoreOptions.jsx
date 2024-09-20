import React from 'react';
import { Link } from 'react-router-dom';

const MoreOptions = () => {
  return (
    <div className="relative inline-block text-left">
      {/* Kebab Menu Button */}
      <div className="flex items-center justify-center w-10 h-10  rounded-full focus:outline-none hover:bg-gray-600 cursor-pointer ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="white"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm6 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm6 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
          />
        </svg>
      </div>

      {/* Menu Dropdown */}
      <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg z-10 opacity-0 hover:opacity-100 hover:block transition-opacity duration-150">
        <ul className="py-2">
          <li><Link to="/add-product">
            <span
              className="block px-4 py-2 hover:bg-gray-200"
              >
              Add Product
            </span>
              </Link>
          </li>
          <li><Link to="change-password">
            <span
              className="block px-4 py-2 hover:bg-gray-200"
              >
              Change Password
            </span>
              </Link>
          </li>
          <li><Link to="/my-products">
            <span
              className="block px-4 py-2 hover:bg-gray-200"
              >
              My Products
            </span>
              </Link>
          </li>
          <li><Link to="/edit-details">
            <span
              className="block px-4 py-2 hover:bg-gray-200"
              >
              Edit Details
            </span>
              </Link>
          </li>
          <li><Link to="/cart">
            <span
              className="block px-4 py-2 hover:bg-gray-200"
              >
              Cart 
            </span>
              </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MoreOptions;
