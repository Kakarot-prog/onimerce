import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const NewPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    // Validate passwords
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:3000/api/v1/auth/forgot/${token}`,
        { token, newPassword }
      );
      console.log("Password reset successful:", response.data);
      setSuccess("Password reset successfully. Redirecting to login...");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to reset password.");
      console.error("Reset password error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col justify-center items-center px-4">
      {/* Reset Password Card */}
      <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
          Reset Password
        </h2>
        <p className="mt-2 text-center text-gray-400">
          Enter your new password to reset.
        </p>

        {/* Reset Password Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div>
            <input
              type="password"
              id="newPassword"
              placeholder="Enter your new password"
              className="mt-1 block w-full px-4 py-2 bg-gray-700 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          <div>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm your new password"
              className="mt-1 block w-full px-4 py-2 bg-gray-700 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="text-red-400 text-sm text-center">{error}</div>
          )}

          {/* Success Message */}
          {success && (
            <div className="text-purple-400 text-sm text-center">{success}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            {loading ? "Resetting Password..." : "Reset Password"}
          </button>
        </form>

        {/* Back to Login Link */}
        <div className="mt-6 text-center">
          <p className="text-gray-400">
            Remember your password?{" "}
            <a href="/login" className="text-purple-400 hover:text-purple-300">
              Log In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NewPassword;
