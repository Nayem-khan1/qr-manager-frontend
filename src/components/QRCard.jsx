import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import { FiEdit2, FiDownload } from "react-icons/fi";
import { backendUrl } from "../config.js";

const QRCard = ({ qr, onUpdate }) => {
  const { user } = useContext(AuthContext);

  const [newUrl, setNewUrl] = useState(qr.redirect_url);
  const [editing, setEditing] = useState(false);
  const [loadingImg, setLoadingImg] = useState(true);

  const updateQRCode = async () => {
    const token = await user.getIdToken();
    await fetch(backendUrl + `api/qrcodes/${qr.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ redirect_url: newUrl }),
    });

    setEditing(false);
    onUpdate();
  };

  const downloadQR = async () => {
    const token = await user.getIdToken();
    const res = await fetch(backendUrl + `api/qrcodes/${qr.id}/image`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const blob = await res.blob();

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${qr.name}.png`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white shadow-md rounded-xl hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1 flex flex-col gap-3 p-4">
      {/* Image Loader + Image */}
      <div className="w-32 h-32 mx-auto relative">
        {loadingImg && (
          <div className="w-32 h-32 bg-gray-200 animate-pulse rounded-md absolute top-0 left-0 z-0" />
        )}
        <img
          src={backendUrl + `api/qrcodes/${qr.id}/image`}
          alt="QR Preview"
          className={`w-32 h-32 object-contain mx-auto transition-opacity duration-500 ${
            loadingImg ? "opacity-0" : "opacity-100"
          }`}
          onLoad={() => setLoadingImg(false)}
        />
      </div>

      <h3 className="text-lg font-semibold text-gray-800 text-center">
        {qr.name}
      </h3>

      {editing ? (
        <>
          <input
            className="border p-2 rounded text-sm w-full"
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
          />
          <button
            className="bg-blue-600 text-white py-1 px-3 rounded hover:bg-blue-500 transition self-end cursor-pointer"
            onClick={updateQRCode}
          >
            Save
          </button>
        </>
      ) : (
        <>
          <p className="text-sm text-gray-600 text-center whitespace-nowrap overflow-hidden text-ellipsis">
            {qr.redirect_url}
          </p>

          <hr className="border-gray-200" />

          <div className="flex justify-between items-center w-full mt-1">
            <button
              onClick={() => setEditing(true)}
              className="flex items-center gap-2 bg-gray-100 hover:bg-yellow-100 text-gray-800 py-1.5 px-4 rounded-full transition cursor-pointer"
              title="Edit URL"
            >
              <FiEdit2 size={16} />
              <span className="text-sm">Edit</span>
            </button>

            <button
              onClick={downloadQR}
              className="flex items-center gap-2 bg-gray-100 hover:bg-green-100 text-gray-800 py-1.5 px-4 rounded-full transition cursor-pointer"
              title="Download QR"
            >
              <FiDownload size={16} />
              <span className="text-sm">Download</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default QRCard;
