import { Link } from "react-router-dom";

const Verify = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96 text-center">
        <h2 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-4">
          User registered successfully!
        </h2>
        <p className="text-gray-300 mb-6">
          To verify your account, check your Gmail.
        </p>
        <Link
          to="/"
          className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default Verify;
