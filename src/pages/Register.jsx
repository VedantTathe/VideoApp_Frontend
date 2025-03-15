import { useState } from "react";
import axios from "axios";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await axios.post("https://adaptable-delight-production.up.railway.app/api/users", {
        username,
        email,
        password,
      });

      setSuccess("Registration successful!");
      console.log("Registered user:", response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed!");
      console.error("Registration error:", err);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-gray-700 via-gray-900 to-black">
      <div className="bg-gray-800 text-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-3xl font-bold mb-4 text-center text-green-400">Register</h2>

        {error && <p className="text-red-500 text-center mb-2">{error}</p>}
        {success && <p className="text-green-500 text-center mb-2">{success}</p>}

        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Username"
            className="w-full p-3 border border-gray-600 rounded-md mb-4 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border border-gray-600 rounded-md mb-4 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border border-gray-600 rounded-md mb-6 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full p-3 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            Register
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-gray-400">Already have an account?</p>
          <a href="/login" className="text-green-400 hover:text-green-600">Login</a>
        </div>
      </div>
    </div>
  );
}
