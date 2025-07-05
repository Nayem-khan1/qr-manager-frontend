import React from "react";
import { Outlet } from "react-router";
import PublicNavbar from "../../components/PublicNavbar";

const Main = () => {
  return (
    <div>
      {/* Full width Navbar */}
      <div className="w-full bg-gray-100 py-4 fixed top-0 z-20">
        <PublicNavbar />
      </div>

      {/* Max width content */}
      <div className="mt-20 px-4">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Main;
