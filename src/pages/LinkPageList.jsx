import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { FiEdit, FiTrash, FiPlus } from "react-icons/fi";
import { Link } from "react-router";
import { AuthContext } from "../context/AuthProvider";
import { backendUrl } from "../config";
import ComponentCard from "./../components/common/ComponentCard";
import { Switch } from "@headlessui/react";

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

  const togglePublish = async (id, newStatus) => {
    const token = await user.getIdToken();
    await fetch(`${backendUrl}api/linkpage/${id}/publish`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ isPublished: newStatus }),
    });
    fetchPages();
  };

  console.log(pages);
  const fallbackImg =
    "https://singingriverhealthsystem.com/wp-content/uploads/2019/10/icon-fallback-physician.png";

  return (
    <>
      <ComponentCard
        title="Your Link Pages"
        buttonTitle="Create New"
        path={"/linkpages/create"}
      >
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pages.map((page) => (
            <div
              key={page._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-200 p-5"
            >
              <div className="flex items-center gap-4">
                <img
                  src={page.profileImage || fallbackImg}
                  alt="Profile"
                  className="w-14 h-14 rounded-full object-cover border"
                  onError={(e) => (e.target.src = fallbackImg)}
                />
                <div>
                  <h2 className="text-lg font-bold text-gray-800">
                    {page.title}
                  </h2>
                  <p className="text-sm text-gray-500">/{page.slug}</p>
                </div>
              </div>

              <p className="text-sm text-gray-600 mt-3 line-clamp-2">
                {page.bio || "No bio provided."}
              </p>

              <div className="flex items-center justify-between mt-4 text-sm">
                <div className="flex items-center gap-2">
                  <Switch
                    checked={page.isPublished}
                    onChange={() => togglePublish(page._id, !page.isPublished)}
                    className={`${
                      page.isPublished ? "bg-green-500" : "bg-gray-300"
                    } relative inline-flex h-[24px] w-[48px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-300 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75`}
                  >
                    <span
                      aria-hidden="true"
                      className={`${
                        page.isPublished ? "translate-x-6" : "translate-x-0"
                      } pointer-events-none inline-block h-[20px] w-[20px] transform rounded-full bg-white shadow-lg ring-0 transition duration-300 ease-in-out`}
                    />
                  </Switch>
                  <span className="text-gray-700 select-none">
                    {page.isPublished ? "Published" : "Unpublished"}
                  </span>
                </div>
                <span className="text-gray-400">{page.views} views</span>
              </div>

              <div className="flex justify-between pt-4">
                <div className="flex flex-wrap gap-2 mt-3 text-sm">
                  <a
                    href={`/slug/${page.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    🔗 View
                  </a>
                  <button
                    onClick={() => {
                      const fullLink = `${window.location.origin}/slug/${page.slug}`;
                      navigator.clipboard.writeText(fullLink);
                      alert("Link copied to clipboard!");
                    }}
                    className="text-indigo-600 hover:underline cursor-pointer"
                  >
                    📋 Copy
                  </button>
                </div>

                <div className="flex justify-end gap-4 mt-4">
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
      </ComponentCard>
    </>
  );
};

export default LinkPageList;
