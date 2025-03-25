import React from "react";
import { Link } from "react-router-dom";

const ResetPasswordEmailSent = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col justify-center items-center px-4">
      {/* Reset Password Card */}
      <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
          Reset Password
        </h2>
        <p className="mt-2 text-center text-gray-400">
          An email has been sent to your inbox. Please check your email to reset
          your password.
        </p>

        {/* Message Card */}
        <div className="mt-8 p-6 bg-gray-700 rounded-lg text-center">
          <p className="text-gray-300">
            If you don't see the email, check your spam folder or{" "}
            <Link
              to="/forgotPass"
              className="text-purple-400 hover:text-purple-300"
            >
              try again
            </Link>
            .
          </p>
        </div>

        {/* Back to Login Link */}
        <div className="mt-6 text-center">
          <p className="text-gray-400">
            Remember your password?{" "}
            <Link to="/login" className="text-purple-400 hover:text-purple-300">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordEmailSent;
