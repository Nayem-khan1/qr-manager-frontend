import { Outlet } from "react-router";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Top Navbar: Full width */}
      <Navbar />

      {/* Main Section with Sidebar + Content */}
      <div className="flex flex-1 w-full justify-center">
        <div className="flex w-full max-w-screen-2xl mx-auto relative">
          {/* Sidebar */}
          <Sidebar />

          {/* Main Content */}
          <main className="flex-1 p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
