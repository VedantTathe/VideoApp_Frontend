import { Link } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-purple-500 to-blue-600 p-4 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-wide">Video Uploader</h1>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6">
          <NavLink to="/home">Home</NavLink>
          <NavLink to="/login">Login</NavLink>
          {/* <NavLink to="/register">Register</NavLink> */}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-2xl focus:outline-none" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden p-4 rounded-md mt-2 text-center flex flex-col">
          <NavLink class="" to="/home" onClick={() => setMenuOpen(false)}>Home</NavLink>
          <NavLink class="" to="/login" onClick={() => setMenuOpen(false)}>Login</NavLink>
          <NavLink class="" to="/register" onClick={() => setMenuOpen(false)}>Register</NavLink>
        </div>
      )}
    </nav>
  );
}

const NavLink = ({ to, children }) => (
  <Link to={to} className="hover:text-gray-300 text-lg font-medium transition duration-300">
    {children}
  </Link>
);
