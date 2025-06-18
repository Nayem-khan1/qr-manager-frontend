import React, { useContext, useEffect, useState } from "react";
import QRCard from "../components/QRCard";
import { AuthContext } from "../context/AuthProvider";
import { backendUrl } from "../config";

const Dashboard = () => {
  const [name, setName] = useState("");
  const [redirectUrl, setRedirectUrl] = useState("");
  const [qrcodes, setQRCodes] = useState([]);
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [showLimitModal, setShowLimitModal] = useState(false);

  const fetchQRCodes = async () => {
    if (!user) return;

    const token = await user.getIdToken();
    const res = await fetch(backendUrl + "api/qrcodes", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    setQRCodes(data);
    setLoading(false);
  };

  const createQRCode = async () => {
    if (!name || !redirectUrl) {
      alert("Please Enter Name and URL");
      return;
    }

    const token = await user.getIdToken();

    const res = await fetch(backendUrl + "api/qrcodes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, redirect_url: redirectUrl }),
    });

    const data = await res.json();
    console.log(data);
    if (res.status === 403) {
      setShowLimitModal(true);
      return;
    }

    setName("");
    setRedirectUrl("");
    fetchQRCodes();
  };

  useEffect(() => {
    if (user) {
      setLoading(true);
      fetchQRCodes();
    }
  }, [user]);

  const handleUpgrade = async () => {
    const token = await user.getIdToken();
    const res = await fetch(backendUrl + "api/qrcodes/create-checkout-session", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    if (data.url) {
      window.location.href = data.url; 
    }
  };

  return (
    <div className="min-h-screen sm:py-10 sm:px-4">
      <div className="max-w-6xl mx-auto">
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row gap-6 mb-10">
          {/* QR Form */}
          <div className="bg-white p-6 rounded-xl shadow flex-1">
            <h2 className="text-xl font-semibold mb-6 text-gray-800">
              Create New QR Code
            </h2>
            <div className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="QR Name"
                className="p-3 border rounded-md focus:outline-none focus:ring-1 focus:ring-gray-800"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="url"
                placeholder="Redirect URL"
                className="p-3 border rounded-md focus:outline-none focus:ring-1 focus:ring-gray-800"
                value={redirectUrl}
                onChange={(e) => setRedirectUrl(e.target.value)}
              />
              <button
                className="bg-gray-800 text-white px-6 py-3 rounded-md hover:bg-gray-700 transition duration-200 cursor-pointer"
                onClick={createQRCode}
              >
                Create
              </button>
            </div>
          </div>
          {/* Info Panel */}
          <div className="bg-white rounded-xl shadow p-6 hidden lg:block lg:w-1/2">
            <h3 className="text-xl font-semibold mb-2 text-gray-800">
              Welcome to QR Manager
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Create and manage your QR codes easily. This platform allows you
              to generate QR codes linked to any URL. Each QR code is tied to
              your account via Firebase Authentication. All your codes are
              securely stored in MongoDB.
            </p>
            <ul className="mt-4 text-sm text-gray-700 list-disc list-inside">
              <li>Create QR codes with custom names</li>
              <li>Secure user authentication (Email/Password)</li>
              <li>Stored in real-time using Firebase & MongoDB</li>
              <li>Responsive and optimized dashboard</li>
            </ul>
          </div>
        </div>

        {/* QR Code List */}
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Your QR Codes
        </h2>
        {loading ? (
          <div className="text-center text-gray-500 py-10">
            <p className="text-lg font-medium animate-pulse">
              Loading QR Codes...
            </p>
          </div>
        ) : qrcodes.length <= 0 ? (
          <div className="text-center text-gray-500 py-10">
            <p className="text-lg font-medium">
              You haven't created any QR codes yet.
            </p>
            <p className="text-sm mt-2">
              Use the form above to create your first QR code.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {qrcodes.map((qr) => (
              <QRCard key={qr.id} qr={qr} onUpdate={fetchQRCodes} />
            ))}
          </div>
        )}

        {/* Limit Modal */}
        {showLimitModal && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm text-center">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                QR Limit Reached
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                You can only create up to 5 QR codes. Upgrade for unlimited
                access.
              </p>
              <div className="flex justify-center gap-4">
                <button
                  className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                  onClick={() => setShowLimitModal(false)}
                >
                  Close
                </button>
                <button
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  onClick={handleUpgrade}
                >
                  Upgrade ($5)
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
