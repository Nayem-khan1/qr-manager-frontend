import React from "react";
import PublicNavbar from "../../components/PublicNavbar";
import { Outlet } from "react-router";
import Footer from "../../components/Footer";

const LandingLayout = () => {
  return (
    <div>
      <PublicNavbar />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default LandingLayout;
