import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

const backendUrl = import.meta.env.VITE_BACKEND_URL;
const PublicLinkPage = () => {
  const { slug } = useParams();
  const [page, setPage] = useState(null);

  useEffect(() => {
    const fetchPage = async () => {
      const res = await fetch(`${backendUrl}api/linkpage/slug/${slug}`);
      const data = await res.json();
      if (res.ok) setPage(data);
    };
    fetchPage();
  }, [slug]);

  if (!page) return <div className="text-center p-10">Loading...</div>;

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-start py-10 px-4"
      style={{ backgroundColor: page.theme?.backgroundColor || "#f8f8f8" }}
    >
      {page.profileImage && (
        <img
          src={page.profileImage}
          alt="Profile"
          className="w-24 h-24 rounded-full mb-4 shadow-md"
        />
      )}
      <h1
        className="text-2xl font-bold mb-2"
        style={{ color: page.theme?.textColor || "#000" }}
      >
        {page.title}
      </h1>
      <p
        className="text-center text-sm mb-6 max-w-xl"
        style={{ color: page.theme?.textColor }}
      >
        {page.bio}
      </p>

      <div className="w-full max-w-md space-y-4">
        {page.links
          ?.filter((l) => l.isActive)
          .map((link, idx) => (
            <a
              key={idx}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center font-semibold py-3 rounded-xl shadow transition hover:scale-105"
              style={{
                backgroundColor: page.theme?.buttonColor || "#333",
                color: page.theme?.textColor || "#fff",
              }}
            >
              {link.title}
            </a>
          ))}
      </div>
    </div>
  );
};

export default PublicLinkPage;
