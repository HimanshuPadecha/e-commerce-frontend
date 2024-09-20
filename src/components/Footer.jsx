import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'; // Social media icons

const Footer = () => {
  return (
    <footer className="bg-black mt-12 text-white py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Footer Content */}
        <div className="flex flex-col md:flex-row md:justify-between">
          {/* About Section */}
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-bold mb-2">Ecommerce</h2>
            <p className="text-gray-400">
              Your one-stop shop for everything you need. Shop anytime, anywhere with our seamless delivery service.
            </p>
          </div>

          {/* Links Section */}
          <div className="mb-6 md:mb-0">
            <h3 className="text-xl font-semibold mb-2">Links</h3>
            <ul>
              <li><a href="#home" className="text-gray-400 hover:text-white">Home</a></li>
              <li><a href="#about" className="text-gray-400 hover:text-white">About Us</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-white">Contact</a></li>
              <li><a href="#privacy" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
              <li><a href="#terms" className="text-gray-400 hover:text-white">Terms of Service</a></li>
            </ul>
          </div>

          {/* Social Media Section */}
          <div>
            <h3 className="text-xl font-semibold mb-2">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <FaFacebook size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FaTwitter size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FaInstagram size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 border-t border-gray-700 pt-4 text-center text-gray-400">
          <p>&copy; 2024 Ecommerce. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
