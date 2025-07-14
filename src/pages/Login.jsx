import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router";
import { AuthContext } from "../context/AuthProvider";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { logIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await logIn(email, password);
      navigate("/dashboard");
      window.location.reload();
    } catch (err) {
      console.error(err);
      setError("Invalid email or password. Please try again.");
    }
  };

  // Dummy credentials
  const adminCredentials = {
    email: "admin@gmail.com",
    password: "123456",
  };

  const userCredentials = {
    email: "demo@gmail.com",
    password: "123456",
  };

  const autofillCredentials = (type) => {
    if (type === "admin") {
      setEmail(adminCredentials.email);
      setPassword(adminCredentials.password);
    } else if (type === "user") {
      setEmail(userCredentials.email);
      setPassword(userCredentials.password);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6">Sign In</h2>

        {/* Quick login buttons */}
        <div className="flex justify-between mb-4">
          <button
            onClick={() => autofillCredentials("admin")}
            className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 text-sm"
          >
            Admin Login
          </button>
          <button
            onClick={() => autofillCredentials("user")}
            className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 text-sm"
          >
            User Login
          </button>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-800"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-800"
              required
            />
          </div>

          {error && (
            <p className="text-red-600 text-sm text-center -mt-2">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-200 cursor-pointer"
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-5">
          Don’t have an account?{" "}
          <Link
            to="/sign-up"
            className="text-gray-800 font-medium hover:underline"
          >
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
