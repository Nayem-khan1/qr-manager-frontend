import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import {
  LayoutDashboard,
  LinkIcon,
  QrCode,
  Settings,
  BarChart2,
  Rocket,
  Users2,
} from "lucide-react";
import { AuthContext } from "../context/AuthProvider";
import { backendUrl } from "../config";

const Sidebar = () => {
  const location = useLocation();
  const { userData, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const navLinks = [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard size={18} />,
    },
    ...(userData?.role === "admin"
      ? [
          {
            title: "Users",
            path: "/users",
            icon: <Users2 size={18} />,
          },
        ]
      : []),
    {
      title: "Link Pages",
      path: "/linkpages",
      icon: <LinkIcon size={18} />,
    },
    {
      title: "QR Codes",
      path: "/qrcodes",
      icon: <QrCode size={18} />,
    },
    {
      title: "Analytics",
      path: "/analytics",
      icon: <BarChart2 size={18} />,
    },
  ];

  const handleUpgrade = async () => {
    if (!user) return navigate("/sign-in");
    const token = await user.getIdToken();
    const res = await fetch(
      `${backendUrl}api/qrcodes/create-checkout-session`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    }
  };

  return (
    <aside className="hidden md:flex flex-col w-64 sticky bottom-0 top-20 h-[calc(100vh-5rem)] overflow-y-auto bg-white px-4 pt-4 pb-7 shadow-md rounded-tr-xl rounded-tl-xl">
      <nav className="flex flex-col space-y-2 md:space-y-4">
        {navLinks.map((link) => {
          const isActive = location.pathname.startsWith(link.path);
          return (
            <Link
              key={link.title}
              to={link.path}
              className={`flex items-center gap-3 px-4 py-2 rounded text-sm font-medium transition-all ${
                isActive
                  ? "bg-indigo-100 text-indigo-700"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {link.icon}
              {link.title}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-6 border-t border-gray-300">
        <div className="flex flex-col gap-3 px-2">
          <button
            onClick={() => handleUpgrade()}
            className="flex justify-center items-center w-full text-sm font-semibold bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white py-2 px-4 rounded-md transition cursor-pointer"
          >
            <Rocket size={18} className="mr-2" /> Upgrade to Pro
          </button>

          <div className="text-[11px] text-gray-600 text-center leading-tight">
            <p>
              You're on the{" "}
              <span className="font-semibold text-gray-800">Free</span> plan
            </p>
            <p>Limited access to features</p>
          </div>
        </div>

        <p className="text-[11px] text-gray-500 text-center mt-6">
          © 2025 LinkHub
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
