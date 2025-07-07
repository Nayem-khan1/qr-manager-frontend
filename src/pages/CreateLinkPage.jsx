import React, { useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/AuthProvider";
import { backendUrl } from "../config";

const fallbackImg =
  "https://singingriverhealthsystem.com/wp-content/uploads/2019/10/icon-fallback-physician.png";

const CreateLinkPage = () => {
  const [form, setForm] = useState({
    title: "",
    slug: "",
    bio: "",
    profileImage: "",
    theme: {
      backgroundColor: "#ffffff",
      textColor: "#000000",
      buttonColor: "#007bff",
    },
    links: [],
  });

  const [newLink, setNewLink] = useState({
    title: "",
    url: "",
    icon: "",
    type: "button",
  });

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleThemeChange = (e) => {
    setForm({
      ...form,
      theme: { ...form.theme, [e.target.name]: e.target.value },
    });
  };

  const handleAddLink = () => {
    if (newLink.title && newLink.url) {
      setForm({
        ...form,
        links: [...form.links, { ...newLink, order: form.links.length }],
      });
      setNewLink({ title: "", url: "", icon: "", type: "button" });
    }
  };

  const uploadImageToCloudinary = async (file) => {
    const cloudName = "ddnyqh8uz"; // ✅ replace this
    const uploadPreset = "linkinbio"; // ✅ replace this

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      return data.secure_url; // ✅ return the image URL
    } catch (err) {
      console.error("Upload failed:", err);
      return null;
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const url = await uploadImageToCloudinary(file);
    if (url) {
      setForm({ ...form, profileImage: url });
    } else {
      alert("Image upload failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await user.getIdToken();
    const res = await fetch(`${backendUrl}api/linkpage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (res.ok) navigate("/linkpages");
    else alert(data.message);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 max-w-7xl mx-auto">
      {/* Left: Form */}
      <div className="bg-white shadow-lg rounded-xl p-6 border">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Create Your Link-in-Bio Page
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="title"
            placeholder="Page Title"
            value={form.title}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2"
            required
          />
          <input
            name="slug"
            placeholder="Custom Slug"
            value={form.slug}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2"
            required
          />
          <textarea
            name="bio"
            placeholder="Short Bio"
            value={form.bio}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full border rounded px-4 py-2"
          />

          <div className="grid grid-cols-3 gap-4">
            <input
              type="color"
              name="backgroundColor"
              value={form.theme.backgroundColor}
              onChange={handleThemeChange}
              className="w-full h-10"
            />
            <input
              type="color"
              name="textColor"
              value={form.theme.textColor}
              onChange={handleThemeChange}
              className="w-full h-10"
            />
            <input
              type="color"
              name="buttonColor"
              value={form.theme.buttonColor}
              onChange={handleThemeChange}
              className="w-full h-10"
            />
          </div>

          <div className="mt-4">
            <h3 className="font-semibold">Add Links</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mt-2">
              <input
                placeholder="Title"
                value={newLink.title}
                onChange={(e) =>
                  setNewLink({ ...newLink, title: e.target.value })
                }
                className="border rounded px-2 py-1"
              />
              <input
                placeholder="URL"
                value={newLink.url}
                onChange={(e) =>
                  setNewLink({ ...newLink, url: e.target.value })
                }
                className="border rounded px-2 py-1"
              />
              <input
                placeholder="Icon (e.g. FaYoutube)"
                value={newLink.icon}
                onChange={(e) =>
                  setNewLink({ ...newLink, icon: e.target.value })
                }
                className="border rounded px-2 py-1"
              />
              <select
                value={newLink.type}
                onChange={(e) =>
                  setNewLink({ ...newLink, type: e.target.value })
                }
                className="border rounded px-2 py-1"
              >
                <option value="button">Button</option>
                <option value="social">Social</option>
                <option value="video">Video</option>
              </select>
            </div>
            <button
              type="button"
              onClick={handleAddLink}
              className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              + Add Link
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Create Page
          </button>
        </form>
      </div>

      {/* Right: Live Preview */}
      <div
        className="p-6 rounded-xl shadow border"
        style={{
          backgroundColor: form.theme.backgroundColor,
          color: form.theme.textColor,
        }}
      >
        <h3 className="text-xl font-semibold mb-4">Live Preview</h3>
        <div className="flex flex-col items-center text-center">
          <img
            src={form.profileImage || fallbackImg}
            onError={(e) => (e.target.src = fallbackImg)}
            className="w-20 h-20 rounded-full border object-cover mb-3"
            alt="Profile"
          />
          <h1 className="text-lg font-bold">{form.title || "Your Name"}</h1>
          <p className="text-sm mb-4">
            {form.bio || "Short bio preview here..."}
          </p>
          <div className="flex flex-col gap-2 w-full max-w-xs">
            {form.links.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2 px-4 rounded text-center shadow"
                style={{
                  backgroundColor: form.theme.buttonColor,
                  color: "#fff",
                }}
              >
                {link.icon ? `${link.icon} ` : ""} {link.title}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateLinkPage;
