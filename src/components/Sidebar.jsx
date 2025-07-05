import React from "react";
import { Link, useLocation } from "react-router";
import {
  LayoutDashboard,
  LinkIcon,
  QrCode,
  Settings,
  BarChart2,
} from "lucide-react";

const Sidebar = () => {
  const location = useLocation();

  const navLinks = [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard size={18} />,
    },
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
    {
      title: "Settings",
      path: "/settings",
      icon: <Settings size={18} />,
    },
  ];

  return (
    <aside
      className="
    hidden md:flex flex-col
    w-64 sticky top-16
    h-[calc(100vh-4rem)]
    overflow-y-auto
    bg-white px-4 pt-4 pb-7
    border-r shadow-sm
    rounded-tr-[10px]
  "
    >
      <h2 className="text-xl font-bold text-indigo-600 mb-6">Linkify</h2>

      <nav className="flex flex-col space-y-2">
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

      <div className="mt-auto pt-6 border-t">
        <p className="text-xs text-gray-400">© 2025 Linkify</p>
      </div>
    </aside>
  );
};

export default Sidebar;
