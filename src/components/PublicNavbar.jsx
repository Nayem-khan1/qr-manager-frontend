import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { Menu, X } from "lucide-react";
import { AuthContext } from "../context/AuthProvider";

const PublicNavbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scroll, setScroll] = useState(false);

  const logOutHandler = () => {
    logOut()
      .then(() => {
        alert("You are now logged out!");
        navigate("/sign-in");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleScroll = () => {
    setScroll(window.scrollY > 8);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scroll ? "bg-white shadow border-b border-gray-300" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-indigo-600">
          LinkHub
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/#features" className="text-gray-600 hover:text-indigo-600">
            Features
          </Link>
          <Link to="/#pricing" className="text-gray-600 hover:text-indigo-600">
            Pricing
          </Link>
          <Link to="/#faqs" className="text-gray-600 hover:text-indigo-600">
            FAQs
          </Link>

          {user ? (
            <>
              <Link
                to="/dashboard"
                className="px-4 py-2 rounded bg-violet-600 hover:bg-violet-700 text-white text-sm"
              >
                Dashboard
              </Link>
              <button
                onClick={logOutHandler}
                className="px-3 py-1.5 rounded border border-gray-300 text-sm hover:bg-gray-100"
              >
                Log Out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/sign-up"
                className="text-sm text-gray-600 hover:text-violet-600"
              >
                Sign Up
              </Link>
              <Link
                to="/sign-in"
                className="px-4 py-2 rounded bg-violet-600 hover:bg-violet-700 text-white text-sm"
              >
                Get Started
              </Link>
            </>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-300 px-4 pb-4 shadow">
          <div className="flex flex-col space-y-2 mt-4">
            <Link
              to="/#features"
              className="text-gray-700 hover:text-indigo-600"
            >
              Features
            </Link>
            <Link
              to="/#pricing"
              className="text-gray-700 hover:text-indigo-600"
            >
              Pricing
            </Link>
            <Link to="/#faqs" className="text-gray-700 hover:text-indigo-600">
              FAQs
            </Link>

            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="mt-2 px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700 text-sm"
                >
                  Dashboard
                </Link>
                <button
                  onClick={logOutHandler}
                  className="mt-2 px-3 py-1.5 rounded border text-sm hover:bg-gray-100"
                >
                  Log Out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/sign-in"
                  className="mt-2 text-sm text-gray-700 hover:text-indigo-600"
                >
                  Sign In
                </Link>
                <Link
                  to="/sign-up"
                  className="mt-2 px-4 py-2 rounded bg-violet-600 hover:bg-violet-700 text-white text-sm"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default PublicNavbar;
