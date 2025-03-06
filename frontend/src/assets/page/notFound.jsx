import React from "react";
import { Link } from "react-router-dom"; // Use `next/link` if you're using Next.js

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col justify-center items-center px-4">
      {/* 404 Text */}
      <h1 className="text-9xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
        404
      </h1>
      <p className="text-2xl text-gray-300 mt-4">Oops! Page Not Found</p>
      <p className="text-gray-400 mt-2 text-center">
        The page you're looking for doesn't exist or has been moved.
      </p>

      {/* Back to Home Button */}
      <Link
        to="/" // Replace with your homepage route
        className="mt-8 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl"
      >
        Go Back Home
      </Link>

      {/* Optional: Add a fun illustration or icon */}
      <div className="mt-12">
        <svg
          className="w-32 h-32 text-gray-700"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
    </div>
  );
};

export default NotFound;
