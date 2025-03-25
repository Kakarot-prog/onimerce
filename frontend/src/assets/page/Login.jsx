import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Function to set a cookie manually
  const setCookie = (name, value, days) => {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000); // Convert days to milliseconds
    const expires = "expires=" + date.toUTCString();
    document.cookie = `${name}=${value}; ${expires}; path=/; secure; sameSite=strict`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:3000/api/v1/login", {
        email,
        password,
      });

      if (response.data.token) {
        // Save the token in a cookie manually
        setCookie("token", response.data.token, 7);
        // Expires in 7 days
        localStorage.setItem("token", response.data.token);
        navigate("/"); // Redirect to dashboard or home page
      }
    } catch (err) {
      setError("Invalid email or password");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col justify-center items-center px-4">
      {/* Login Card */}
      <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
          Welcome Back
        </h2>
        <p className="mt-2 text-center text-gray-400">
          Log in to your account to continue.
        </p>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          {/* Email Field */}
          <input
            type="email"
            id="email"
            placeholder="Email"
            className="w-full px-4 py-2 bg-gray-700 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Password Field */}
          <input
            type="password"
            id="password"
            placeholder="Password"
            className="w-full px-4 py-2 bg-gray-700 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Remember Me and Forgot Password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember-me"
                className="h-4 w-4 text-purple-500 rounded focus:ring-purple-500 bg-gray-700 border-gray-600"
              />
              <span className="ml-2 text-sm text-gray-400">Remember me</span>
            </div>

            <Link
              to="/forgotPass"
              className="text-sm text-purple-400 hover:text-purple-300"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Log In
          </button>
        </form>

        {/* Sign Up Link */}
        <div className="mt-6 text-center">
          <p className="text-gray-400">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-purple-400 hover:text-purple-300"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
