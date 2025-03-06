import { useState } from "react";
import {
  ShoppingCartIcon,
  UserIcon,
  HeartIcon,
  MenuIcon,
  XIcon,
} from "@heroicons/react/outline";
import logo from "../image/logo.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-900 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center space-x-2 group">
              <img
                src={logo}
                alt="OniChan Logo"
                className="h-12 w-12 transition-transform duration-300 group-hover:scale-110 rounded-4xl"
              />
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                OniChan
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-300 hover:text-purple-400 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:bg-gray-800"
            >
              Home
            </Link>
            <Link
              to="/products"
              className="text-gray-300 hover:text-purple-400 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:bg-gray-800"
            >
              Products
            </Link>
            <Link
              to="/categories"
              className="text-gray-300 hover:text-purple-400 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:bg-gray-800"
            >
              Categories
            </Link>
            <Link
              to="/contact"
              className="text-gray-300 hover:text-purple-400 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:bg-gray-800"
            >
              Contact
            </Link>
          </div>

          {/* Right Icons Section */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Signup Link */}
            <Link
              to="/register"
              className="p-2.5 text-gray-300 hover:text-purple-400 rounded-full hover:bg-gray-800 transition-all duration-300"
            >
              <UserIcon className="h-6 w-6" />
            </Link>
            <button className="p-2.5 text-gray-300 hover:text-purple-400 rounded-full hover:bg-gray-800 transition-all duration-300">
              <HeartIcon className="h-6 w-6" />
            </button>
            <button className="p-2.5 text-gray-300 hover:text-purple-400 rounded-full hover:bg-gray-800 transition-all duration-300 relative">
              <ShoppingCartIcon className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 bg-purple-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                5
              </span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-gray-300 hover:text-purple-400 hover:bg-gray-800 rounded-lg transition-all duration-300"
            >
              {isOpen ? (
                <XIcon className="h-8 w-8" />
              ) : (
                <MenuIcon className="h-8 w-8" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 bg-gray-800">
            <div className="px-2 pt-2 space-y-1">
              <Link
                to="/"
                className="block text-gray-300 hover:text-purple-400 hover:bg-gray-700 px-4 py-3 rounded-md text-base font-medium transition-colors"
              >
                Home
              </Link>
              <Link
                to="/products"
                className="block text-gray-300 hover:text-purple-400 hover:bg-gray-700 px-4 py-3 rounded-md text-base font-medium transition-colors"
              >
                Products
              </Link>
              <Link
                to="/categories"
                className="block text-gray-300 hover:text-purple-400 hover:bg-gray-700 px-4 py-3 rounded-md text-base font-medium transition-colors"
              >
                Categories
              </Link>
              <Link
                to="/contact"
                className="block text-gray-300 hover:text-purple-400 hover:bg-gray-700 px-4 py-3 rounded-md text-base font-medium transition-colors"
              >
                Contact
              </Link>
            </div>
            <div className="mt-4 px-2 space-y-2">
              {/* Signup Link in Mobile Menu */}
              <Link
                to="/register"
                className="w-full flex items-center justify-between p-3 text-gray-300 hover:text-purple-400 hover:bg-gray-700 rounded-md transition-all"
              >
                <span>Sign Up</span>
                <UserIcon className="h-6 w-6" />
              </Link>
              <button className="w-full flex items-center justify-between p-3 text-gray-300 hover:text-purple-400 hover:bg-gray-700 rounded-md transition-all">
                <span>Wishlist</span>
                <HeartIcon className="h-6 w-6" />
              </button>
              <button className="w-full flex items-center justify-between p-3 text-gray-300 hover:text-purple-400 hover:bg-gray-700 rounded-md transition-all">
                <span>Cart</span>
                <div className="flex items-center">
                  <ShoppingCartIcon className="h-6 w-6 mr-2" />
                  <span className="bg-purple-500 text-white text-xs px-2 py-1 rounded-full">
                    5
                  </span>
                </div>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
