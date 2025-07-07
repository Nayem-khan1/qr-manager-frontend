import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import { backendUrl } from "../config";
import Chart from "react-apexcharts";

const Analytics = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [qrData, setQRData] = useState([]);
  const [linkData, setLinkData] = useState([]);

  useEffect(() => {
    const fetchAnalytics = async () => {
      if (!user) return;
      setLoading(true);
      const token = await user.getIdToken();

      try {
        const [qrRes, linkRes] = await Promise.all([
          fetch(`${backendUrl}api/analytics/qr/user`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${backendUrl}api/analytics/link/user`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        const qrJson = await qrRes.json();
        const linkJson = await linkRes.json();

        setQRData(qrJson.data || []);
        setLinkData(linkJson.data || []);
      } catch (err) {
        console.error("Analytics fetch error", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [user]);

  console.log(linkData, qrData);
  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center text-gray-600 text-lg">
        Loading analytics...
      </div>
    );
  }

  return (
    <div className="p-6 space-y-10">
      <h1 className="text-2xl font-bold text-gray-800">Analytics Overview</h1>

      <section className="grid md:grid-cols-2 gap-6">
        <QRAnalytics data={qrData} />
        <LinkAnalytics data={linkData} />
      </section>
    </div>
  );
};

export default Analytics;

const QRAnalytics = ({ data }) => {
  const chartData = {
    series: [
      {
        name: "Scans",
        data: data.map((qr) => qr.totalScans),
      },
    ],
    options: {
      chart: {
        type: "bar",
        toolbar: { show: false },
      },
      xaxis: {
        categories: data.map((qr) => qr._id),
        title: { text: "QR Code ID", style: { fontSize: "14px" } },
      },
      yaxis: {
        title: { text: "Total Scans" },
      },
      colors: ["#6366F1"],
    },
  };

  return (
    <div className="bg-white border rounded-lg p-6 shadow-md">
      <h2 className="text-xl font-semibold text-indigo-600 mb-4">
        QR Code Analytics
      </h2>

      {data.length === 0 ? (
        <p className="text-sm text-gray-500">No scans yet.</p>
      ) : (
        <Chart
          options={chartData.options}
          series={chartData.series}
          type="bar"
          height={300}
        />
      )}

      {/* Country Summary */}
      <div className="mt-6">
        <h3 className="font-medium text-gray-700 mb-2">Top Countries</h3>
        <ul className="list-disc list-inside text-sm text-gray-600">
          {data
            .flatMap((d) => d.countries || [])
            .map((c, i) => (
              <li key={i}>{c}</li>
            ))}
        </ul>
      </div>
    </div>
  );
};

const LinkAnalytics = ({ data }) => {
  const chartData = {
    series: [
      {
        name: "Views",
        data: data.map((item) => item.totalViews),
      },
    ],
    options: {
      chart: {
        type: "line",
        toolbar: { show: false },
      },
      xaxis: {
        categories: data.map((item) => item._id),
        title: { text: "Link Page ID", style: { fontSize: "14px" } },
      },
      yaxis: {
        title: { text: "Total Views" },
      },
      stroke: {
        curve: "smooth",
      },
      colors: ["#10B981"],
    },
  };

  return (
    <div className="bg-white border rounded-lg p-6 shadow-md">
      <h2 className="text-xl font-semibold text-green-600 mb-4">
        Link Page Analytics
      </h2>

      {data.length === 0 ? (
        <p className="text-sm text-gray-500">No link views recorded.</p>
      ) : (
        <Chart
          options={chartData.options}
          series={chartData.series}
          type="line"
          height={300}
        />
      )}

      {/* Device Summary */}
      <div className="mt-6">
        <h3 className="font-medium text-gray-700 mb-2">Devices Used</h3>
        <ul className="list-disc list-inside text-sm text-gray-600">
          {data
            .flatMap((d) => d.devices || [])
            .map((device, i) => (
              <li key={i}>{device}</li>
            ))}
        </ul>
      </div>
    </div>
  );
};
