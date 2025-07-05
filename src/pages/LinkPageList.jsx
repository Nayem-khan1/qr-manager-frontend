import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { FiEdit, FiTrash, FiPlus } from "react-icons/fi";
import { Link } from "react-router";
import { AuthContext } from "../context/AuthProvider";

const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

const LinkPageList = () => {
  const [pages, setPages] = useState([]);
  const { user } = useContext(AuthContext);

  const fetchPages = async () => {
    const token = await user.getIdToken();
    const res = await fetch(`${backendUrl}api/linkpage`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setPages(data);
  };

  const deletePage = async (id) => {
    const token = await user.getIdToken();
    if (!confirm("Are you sure you want to delete this page?")) return;
    await fetch(`${backendUrl}api/linkpage/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchPages();
  };

  useEffect(() => {
    fetchPages();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Your Link Pages</h1>
        <Link
          to="/linkpages/create"
          className="btn btn-primary flex items-center gap-2"
        >
          <FiPlus /> Create New
        </Link>
      </div>

      <div className="grid gap-4">
        {pages.map((page) => (
          <div
            key={page._id}
            className="bg-white rounded-xl shadow-md p-4 border hover:shadow-lg"
          >
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold">{page.title}</h2>
                <p className="text-sm text-gray-500">/{page.slug}</p>

                <div className="flex gap-2 mt-2">
                  <a
                    href={`/slug/${page.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 hover:underline text-sm"
                  >
                    🔗 View Public Page
                  </a>
                  <button
                    onClick={() => {
                      const fullLink = `${window.location.origin}/slug/${page.slug}`;
                      navigator.clipboard.writeText(fullLink);
                      alert("Link copied to clipboard!");
                    }}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    📋 Copy Link
                  </button>
                </div>
              </div>
              <div className="flex gap-3">
                <Link
                  to={`/linkpages/edit/${page._id}`}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <FiEdit size={18} />
                </Link>
                <button
                  onClick={() => deletePage(page._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FiTrash size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LinkPageList;
