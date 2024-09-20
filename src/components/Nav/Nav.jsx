import React from 'react';
import MoreOptions from './MoreOptions';
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <nav className="bg-white bg-opacity-10 backdrop-blur-md w-full fixed top-0 left-0 z-10 nav">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Brand on the left */}
          <div className="flex-shrink-0 flex items-center">
            <h1 className="text-white text-xl font-bold">Ecommerce</h1>
          </div>

          {/* Links on the right */}
          <div className="sm:flex sm:space-x-8 items-center">
            {/* Link Components for navigation */}
            <Link to="/">
              <span className="text-white hover:text-gray-400 px-3 py-2 rounded-md text-sm font-medium">Home</span>
            </Link>
            <Link to="/ordered">
              <span className="text-white hover:text-gray-400 px-3 py-2 rounded-md text-sm font-medium">Ordered</span>
            </Link>
            <Link to="/deliver">
              <span className="text-white hover:text-gray-400 px-3 py-2 rounded-md text-sm font-medium">Deliver</span>
            </Link>
            <Link to="/login">
              <span className="text-white hover:text-gray-400 px-3 py-2 rounded-md text-sm font-medium">Login</span>
            </Link>
            <Link to="/signup">
              <span className="text-white hover:text-gray-400 px-3 py-2 rounded-md text-sm font-medium">Signup</span>
            </Link>
              <span className="text-white hover:text-gray-400 px-3 py-2 rounded-md text-sm font-medium">Logout</span>
            
            
            {/* More Options */}
            <MoreOptions />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
