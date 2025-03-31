import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate(); // Initialize navigation

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await axios.post("https://videoapp-production-e517.up.railway.app/api/users/auth/login", {
        email,
        password,
      });

      if (response.status === 200) {
        const token = response.data.token; // Assuming API returns { token: "your_jwt_token" }
        localStorage.setItem("authToken", token); // Save token in localStorage
        localStorage.setItem("username", response.data.user.username);
        localStorage.setItem("userid", response.data.user.id);

        setSuccess("Login successful!");
        console.log("User logged in:", response.data);
        // Redirect user or perform additional actions
        
        navigate("/home");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password");
      console.error("Login error:", err);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-gray-700 via-gray-900 to-black">
      <div className="bg-gray-800 text-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-3xl font-bold mb-4 text-center text-blue-400">Login</h2>

        {error && <p className="text-red-500 text-center mb-2">{error}</p>}
        {success && <p className="text-green-500 text-center mb-2">{success}</p>}

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border border-gray-600 rounded-md mb-4 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border border-gray-600 rounded-md mb-6 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Login
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-gray-400">Don't have an account?</p>
          <a href="/register" className="text-blue-400 hover:text-blue-600">Register</a>
        </div>
      </div>
    </div>
  );
}
