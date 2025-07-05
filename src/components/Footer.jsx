import React from "react";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="flex flex-col items-center justify-center border-t pt-16 pb-8 px-6 lg:px-8 w-full max-w-6xl mx-auto bg-white">
      {/* Divider Line */}
      <div className="w-8 h-1.5 bg-gray-400 rounded-full mb-8" />

      {/* Top Section */}
      <div className="grid gap-12 xl:grid-cols-3 w-full">
        {/* Logo & About */}
        <div className="flex flex-col items-start max-w-xs">
          <div className="text-indigo-600 text-xl font-bold">Linkify</div>
          <p className="text-gray-500 mt-4 text-sm">
            Manage your links with ease.
          </p>
          <span className="mt-4 text-sm text-gray-400">
            Made by{" "}
            <a
              href="https://shreyas-sihasane.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-indigo-500 hover:underline"
            >
              Shreyas
            </a>
          </span>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-2 gap-12 xl:col-span-2">
          {/* Product */}
          <div>
            <h3 className="text-base font-medium text-gray-800">Product</h3>
            <ul className="mt-4 text-sm text-gray-500 space-y-2">
              <li>
                <Link to="/#features" className="hover:text-indigo-600">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/#pricing" className="hover:text-indigo-600">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/#testimonials" className="hover:text-indigo-600">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link to="/#integration" className="hover:text-indigo-600">
                  Integration
                </Link>
              </li>
            </ul>
          </div>

          {/* Integrations */}
          <div>
            <h3 className="text-base font-medium text-gray-800">
              Integrations
            </h3>
            <ul className="mt-4 text-sm text-gray-500 space-y-2">
              <li>
                <a href="#" className="hover:text-indigo-600">
                  Facebook
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-600">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-600">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-600">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-base font-medium text-gray-800">Resources</h3>
            <ul className="mt-4 text-sm text-gray-500 space-y-2">
              <li>
                <Link to="/resources/blog" className="hover:text-indigo-600">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/resources/help" className="hover:text-indigo-600">
                  Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-base font-medium text-gray-800">Company</h3>
            <ul className="mt-4 text-sm text-gray-500 space-y-2">
              <li>
                <Link to="/about" className="hover:text-indigo-600">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-indigo-600">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-indigo-600">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="mt-12 border-t pt-6 w-full text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} Linkify INC. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
