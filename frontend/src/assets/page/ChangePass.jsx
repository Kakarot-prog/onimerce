import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const ChangePassword = () => {
  const [oldPass, setOldPassword] = useState("");
  const [newPass, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validate new password and confirm password
    if (newPass !== confirmPassword) {
      setError("New password and confirm password do not match.");
      return;
    }

    try {
      const token = localStorage.getItem("token"); // Assuming the token is stored in localStorage
      const response = await axios.put(
        "http://localhost:3000/api/v1/resetPass",
        {
          oldPass,
          newPass,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setSuccess("Password changed successfully!");
        setTimeout(() => {
          navigate("/"); // Redirect to home or dashboard after success
        }, 2000);
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to change password. Please try again."
      );
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col justify-center items-center px-4">
      {/* Change Password Card */}
      <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
          Change Password
        </h2>
        <p className="mt-2 text-center text-gray-400">
          Enter your old password and a new password to update your credentials.
        </p>

        {/* Error and Success Messages */}
        {error && (
          <div className="mt-4 p-3 bg-red-500 text-white rounded-lg text-center">
            {error}
          </div>
        )}
        {success && (
          <div className="mt-4 p-3 bg-green-500 text-white rounded-lg text-center">
            {success}
          </div>
        )}

        {/* Change Password Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          {/* Old Password Field */}
          <input
            type="password"
            id="oldPassword"
            placeholder="Old Password"
            className="w-full px-4 py-2 bg-gray-700 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
            value={oldPass}
            onChange={(e) => setOldPassword(e.target.value)}
          />

          {/* New Password Field */}
          <input
            type="password"
            id="newPassword"
            placeholder="New Password"
            className="w-full px-4 py-2 bg-gray-700 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
            value={newPass}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          {/* Confirm New Password Field */}
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirm New Password"
            className="w-full px-4 py-2 bg-gray-700 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Change Password
          </button>
        </form>

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

export default ChangePassword;
