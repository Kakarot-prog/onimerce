import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const VerifyUser = () => {
  const { token } = useParams();
  const [message, setMessage] = useState("Verifying your email...");
  const [status, setStatus] = useState("loading"); // 'loading', 'success', 'error'

  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        let response = await fetch(
          `http://localhost:3000/api/v1/verify?token=${token}`
        );

        if (!response.ok) {
          setStatus("error");
          return setMessage("Verification failed. Please try again.");
        }

        response = await response.json();

        if (response.success) {
          setStatus("success");
          setMessage("Email verified successfully! Redirecting...");
          setTimeout(() => navigate("/login"), 3000);
        } else {
          setStatus("error");
          setMessage("Verification failed. Please try again.");
        }
      } catch (error) {
        setStatus("error");
        setMessage("An error occurred. Please try again.");
      }
    };

    if (token) {
      verifyEmail();
    } else {
      setStatus("error");
      setMessage("Invalid verification link.");
    }
  }, [token]);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-center w-96">
        {status === "loading" && (
          <div className="flex justify-center mb-4">
            <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        <h2
          className={`text-lg font-semibold ${
            status === "success"
              ? "text-green-400"
              : status === "error"
              ? "text-red-400"
              : "text-gray-300"
          }`}
        >
          {message}
        </h2>

        {status === "error" && (
          <button
            onClick={() => navigate("/register")}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
};

export default VerifyUser;
