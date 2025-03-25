import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

const Register = () => {
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    avatar: null,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, avatar: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("password", formData.password);
    if (formData.avatar) {
      formDataToSend.append("avatar", formData.avatar);
    }

    try {
      setLoading(true);
      const response = await fetch("http://localhost:3000/api/v1/register", {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error("Registration failed!");
      }

      if (response.ok) {
        setLoading(false);
      }
      navigate("/verify");
    } catch (error) {
      console.error(error);
      alert("An error occurred during registration.");
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-[100vh] bg-gray-900 flex flex-col justify-center items-center px-4">
      {/* Registration Card */}
      <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
          Create an Account
        </h2>
        <p className="mt-2 text-center text-gray-400">
          Join us to get started.
        </p>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          {/* Avatar Upload */}
          <div className="flex flex-col items-center">
            <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-purple-500">
              <img
                src={avatarPreview || "https://via.placeholder.com/100"}
                alt="Avatar Preview"
                className="w-full h-full object-cover"
              />
              <label
                htmlFor="avatar"
                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 cursor-pointer opacity-0 hover:opacity-100 transition-opacity duration-300"
              >
                <span className="text-white text-xs font-medium">Upload</span>
              </label>
            </div>
            <input
              type="file"
              id="avatar"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
            />
          </div>

          {/* Name Field */}
          <input
            type="text"
            id="name"
            placeholder="Full Name"
            className="w-full px-4 py-2 bg-gray-700 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
            onChange={handleChange}
          />

          {/* Email Field */}
          <input
            type="email"
            id="email"
            placeholder="Email"
            className="w-full px-4 py-2 bg-gray-700 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
            onChange={handleChange}
          />

          {/* Password Field */}
          <input
            type="password"
            id="password"
            placeholder="Password"
            className="w-full px-4 py-2 bg-gray-700 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
            onChange={handleChange}
          />

          {/* Confirm Password Field */}
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirm Password"
            className="w-full px-4 py-2 bg-gray-700 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
            onChange={handleChange}
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Sign Up
          </button>
        </form>

        {/* Login Link */}
        <div className="mt-6 text-center">
          <p className="text-gray-400">
            Already have an account?{" "}
            <Link to="/login" className="text-purple-400 hover:text-purple-300">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
