import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import { backendUrl } from "../config";
import { User, QrCode, LayoutDashboard, BarChart3, Users } from "lucide-react";
import Chart from "react-apexcharts";
import OverviewCard from "../components/OverviewCard";

const DashboardOverview = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [overview, setOverview] = useState(null);

  useEffect(() => {
    const fetchOverview = async () => {
      if (!user) return;
      setLoading(true);
      try {
        const token = await user.getIdToken();
        const res = await fetch(`${backendUrl}api/dashboard/overview`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setOverview(data);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOverview();
  }, [user]);

  if (loading) {
    return <p className="text-gray-500 text-sm">Loading dashboard...</p>;
  }

  if (!overview) {
    return <p className="text-red-500">Failed to load overview.</p>;
  }

  const isAdmin = overview.role === "admin";

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {isAdmin ? (
          <>
            <OverviewCard
              title="Total Users"
              value={overview.data.totalUsers}
              icon={Users}
              color="indigo"
            />
            <OverviewCard
              title="Paid Users"
              value={overview.data.paidUsers}
              icon={User}
              color="green"
            />
            <OverviewCard
              title="Total QR Codes"
              value={overview.data.totalQRCodes}
              icon={QrCode}
              color="violet"
            />
            <OverviewCard
              title="Total Link Pages"
              value={overview.data.totalLinkPages}
              icon={LayoutDashboard}
              color="blue"
            />
          </>
        ) : (
          <>
            <OverviewCard
              title="Your QR Codes"
              value={overview.data.qrCount}
              icon={QrCode}
              color="indigo"
            />
            <OverviewCard
              title="Your Link Pages"
              value={overview.data.linkPageCount}
              icon={LayoutDashboard}
              color="green"
            />
            <OverviewCard
              title="Total Views"
              value={overview.data.totalViews}
              icon={BarChart3}
              color="blue"
            />
          </>
        )}
      </div>

      {isAdmin && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Chart */}
          <div className="bg-white border border-gray-300 rounded-lg p-6 shadow-md">
            <h4 className="text-lg font-semibold mb-4 text-gray-800">
              📈 QR Code Generation Stats (Last 7 Days)
            </h4>

            <Chart
              type="area"
              height={300}
              series={[
                {
                  name: "QR Codes",
                  data: overview.data.qrStats.map((item) => item.count),
                },
              ]}
              options={{
                chart: {
                  id: "qr-code-stats",
                  toolbar: { show: false },
                  zoom: { enabled: false },
                },
                stroke: {
                  curve: "smooth",
                  width: 3,
                },
                fill: {
                  type: "gradient",
                  gradient: {
                    shadeIntensity: 1,
                    opacityFrom: 0.5,
                    opacityTo: 0,
                    stops: [0, 90, 100],
                    colorStops: [
                      [
                        {
                          offset: 0,
                          color: "#6366f1", // indigo-500
                          opacity: 0.8,
                        },
                        {
                          offset: 100,
                          color: "#6366f1",
                          opacity: 0,
                        },
                      ],
                    ],
                  },
                },
                dataLabels: {
                  enabled: true,
                  style: {
                    colors: ["#4f46e5"], // indigo-600
                  },
                },
                xaxis: {
                  categories: overview.data.qrStats.map((item) => item._id),
                  labels: {
                    style: {
                      colors: "#6b7280", // text-gray-500
                      fontSize: "12px",
                    },
                  },
                  title: {
                    text: "Date",
                    style: {
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "#374151", // text-gray-700
                    },
                  },
                },
                yaxis: {
                  title: {
                    text: "Generated",
                    style: {
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "#374151",
                    },
                  },
                  labels: {
                    style: {
                      colors: "#6b7280",
                      fontSize: "12px",
                    },
                  },
                },
                tooltip: {
                  theme: "light",
                  x: {
                    format: "yyyy-MM-dd",
                  },
                },
                colors: ["#6366f1"], // Primary indigo line
              }}
            />
          </div>

          {/* Recent Users */}
          <div className="bg-white border border-gray-300 rounded-lg shadow-md p-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              Recent Users
            </h4>

            <div className="overflow-x-auto">
              <table className="min-w-full table-auto text-sm text-left">
                <thead>
                  <tr className="text-gray-600 bg-gray-50 border-b">
                    <th className="px-4 py-2 font-medium">Name</th>
                    <th className="px-4 py-2 font-medium">Email</th>
                    <th className="px-4 py-2 font-medium">Join Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {overview.data.recentUsers.map((user) => (
                    <tr key={user._id} className="hover:bg-gray-50 transition">
                      <td className="px-4 py-2 text-gray-800">
                        {user.name || (
                          <span className="text-gray-400">Unnamed</span>
                        )}
                      </td>
                      <td className="px-4 py-2 text-gray-600">{user.email}</td>
                      <td className="px-4 py-2 text-gray-500">
                        {new Date(user.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardOverview;
