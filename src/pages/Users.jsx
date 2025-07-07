import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthProvider";
import { backendUrl } from "../config";
import UsersTable from "../components/UsersTable";
import ComponentCard from "../components/common/ComponentCard";

const Users = () => {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      const token = await user.getIdToken();
      const res = await axios.get(`${backendUrl}api/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(res.data.data);
    } catch (err) {
      console.error("Failed to fetch users:", err);
      setError("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    try {
      const token = await user.getIdToken();
      await axios.delete(`${backendUrl}api/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(users.filter((u) => u._id !== id));
    } catch (err) {
      console.error("Failed to delete user:", err);
      alert("Failed to delete user");
    }
  };

  const handleRoleChange = async (id, role) => {
    try {
      const token = await user.getIdToken();
      const res = await axios.put(
        `${backendUrl}api/users/${id}/role`,
        { role },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUsers(
        users.map((u) =>
          u._id === id ? { ...u, role: res.data.data.role } : u
        )
      );
    } catch (err) {
      console.error("Failed to update role:", err);
      alert("Failed to update role");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const enhancedUsers = users.map((user) => ({
    ...user,
    onDelete: handleDelete,
    onRoleChange: handleRoleChange,
  }));

  if (loading) return <p className="text-center py-10">Loading users...</p>;
  if (error) return <p className="text-red-600 text-center">{error}</p>;
  console.log(enhancedUsers);

  return (
    <>
      <ComponentCard title="User List">
        <UsersTable data={enhancedUsers} type="user" />
      </ComponentCard>
    </>
  );
};
export default Users;
