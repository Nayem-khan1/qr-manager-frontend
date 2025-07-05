import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const EditLinkPage = () => {
  const { id } = useParams();
  const [form, setForm] = useState({
    title: "",
    slug: "",
    bio: "",
    profileImage: "",
  });
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  const fetchPage = async () => {
    const token = await user.getIdToken();
    const res = await fetch(`${backendUrl}api/linkpage`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    const page = data.find((p) => p._id === id);
    if (page) setForm(page);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    const token = await user.getIdToken();
    e.preventDefault();
    const res = await fetch(`${backendUrl}api/linkpage/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (res.ok) navigate("/dashboard");
    else alert(data.message);
  };

  useEffect(() => {
    fetchPage();
  }, [id]);

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Link Page</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          placeholder="Page Title"
          value={form.title}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />
        <input
          name="slug"
          placeholder="Custom Slug (e.g., john)"
          value={form.slug}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />
        <textarea
          name="bio"
          placeholder="Short bio"
          value={form.bio}
          onChange={handleChange}
          className="textarea textarea-bordered w-full"
        ></textarea>
        <input
          name="profileImage"
          placeholder="Profile Image URL"
          value={form.profileImage}
          onChange={handleChange}
          className="input input-bordered w-full"
        />
        <button className="btn btn-primary w-full">Update Page</button>
      </form>
    </div>
  );
};

export default EditLinkPage;
