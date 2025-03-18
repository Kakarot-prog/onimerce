import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
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
    formDataToSend.append("role", formData.role);
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
    return <h1>Loading...</h1>;
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-purple-400">
          Create an Account
        </h2>
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
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

          <input
            type="text"
            id="name"
            placeholder="Full Name"
            className="w-full px-4 py-2 bg-gray-700 text-gray-300 rounded-lg"
            required
            onChange={handleChange}
          />
          <input
            type="email"
            id="email"
            placeholder="Email"
            className="w-full px-4 py-2 bg-gray-700 text-gray-300 rounded-lg"
            required
            onChange={handleChange}
          />
          <input
            type="password"
            id="password"
            placeholder="Password"
            className="w-full px-4 py-2 bg-gray-700 text-gray-300 rounded-lg"
            required
            onChange={handleChange}
          />
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirm Password"
            className="w-full px-4 py-2 bg-gray-700 text-gray-300 rounded-lg"
            required
            onChange={handleChange}
          />

          <select
            id="role"
            className="w-full px-4 py-2 bg-gray-700 text-gray-300 rounded-lg"
            onChange={handleChange}
            value={formData.role}
          >
            <option value="user">User</option>
            <option value="seller">Seller</option>
            <option value="admin">Admin</option>
          </select>

          <button
            to="/verify"
            type="submit"
            className="w-full px-4 py-2 bg-purple-500 text-white font-semibold rounded-lg hover:bg-purple-600 transition-all duration-300"
          >
            Sign Up
          </button>
        </form>
        <div className="mt-4 text-center">
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
