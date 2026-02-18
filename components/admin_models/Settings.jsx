"use client";

import React, { useState } from "react";
import { toast } from "sonner";

const Settings = () => {
  const [adminData, setAdminData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordLoading, setPasswordLoading] = useState(false);

  const [newAdmin, setNewAdmin] = useState({
    name: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [adminLoading, setAdminLoading] = useState(false);

  const handlePasswordChange = (e) =>
    setAdminData({ ...adminData, [e.target.name]: e.target.value });

  const handleNewAdminChange = (e) =>
    setNewAdmin({ ...newAdmin, [e.target.name]: e.target.value });

  const handlePasswordUpdate = async () => {
    if (
      !adminData.currentPassword ||
      !adminData.newPassword ||
      !adminData.confirmPassword
    ) {
      toast.error("Please fill all password fields");
      return;
    }
    if (adminData.newPassword !== adminData.confirmPassword) {
      toast.error("New password and confirm password do not match");
      return;
    }
    if (adminData.newPassword.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    setPasswordLoading(true);
    try {
      const res = await fetch("/api/admin", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: adminData.currentPassword,
          newPassword: adminData.newPassword,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update password");
      toast.success("Password updated successfully!");
      setAdminData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      toast.error(err.message);
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleAddAdmin = async () => {
    if (
      !newAdmin.name ||
      !newAdmin.username ||
      !newAdmin.password ||
      !newAdmin.confirmPassword
    ) {
      toast.error("Please fill all admin fields");
      return;
    }
    if (newAdmin.password !== newAdmin.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (newAdmin.password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    setAdminLoading(true);
    try {
      const res = await fetch("/api/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newAdmin.name,
          username: newAdmin.username,
          password: newAdmin.password,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to add admin");
      toast.success("New admin added successfully!");
      setNewAdmin({
        name: "",
        username: "",
        password: "",
        confirmPassword: "",
      });
    } catch (err) {
      toast.error(err.message);
    } finally {
      setAdminLoading(false);
    }
  };

  const inputClass =
    "w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-400";

  return (
    <div className="p-8 max-w-4xl">
      <section className="bg-white rounded-lg shadow p-6 mb-8">
        <h3 className="font-semibold text-gray-800 text-lg mb-4">
          Add New Admin
        </h3>
        <div className="space-y-4 max-w-sm">
          <input
            type="text"
            className={inputClass}
            placeholder="Admin Name"
            name="name"
            value={newAdmin.name}
            onChange={handleNewAdminChange}
            disabled={adminLoading}
          />
          <input
            type="text"
            className={inputClass}
            placeholder="Admin Username"
            name="username"
            value={newAdmin.username}
            onChange={handleNewAdminChange}
            disabled={adminLoading}
          />
          <input
            type="password"
            className={inputClass}
            placeholder="Enter Password"
            name="password"
            value={newAdmin.password}
            onChange={handleNewAdminChange}
            disabled={adminLoading}
          />
          <input
            type="password"
            className={inputClass}
            placeholder="Confirm Password"
            name="confirmPassword"
            value={newAdmin.confirmPassword}
            onChange={handleNewAdminChange}
            disabled={adminLoading}
          />
          <button
            onClick={handleAddAdmin}
            disabled={adminLoading}
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {adminLoading ? "Adding..." : "Add Admin"}
          </button>
        </div>
      </section>

      <section className="bg-white rounded-lg shadow p-6">
        <h3 className="font-semibold text-gray-800 text-lg mb-4">
          Update Password
        </h3>
        <div className="space-y-4 max-w-sm">
          <input
            type="password"
            className={inputClass}
            placeholder="Current Password"
            name="currentPassword"
            value={adminData.currentPassword}
            onChange={handlePasswordChange}
            disabled={passwordLoading}
          />
          <input
            type="password"
            className={inputClass}
            placeholder="New Password"
            name="newPassword"
            value={adminData.newPassword}
            onChange={handlePasswordChange}
            disabled={passwordLoading}
          />
          <input
            type="password"
            className={inputClass}
            placeholder="Confirm New Password"
            name="confirmPassword"
            value={adminData.confirmPassword}
            onChange={handlePasswordChange}
            disabled={passwordLoading}
          />
          <button
            onClick={handlePasswordUpdate}
            disabled={passwordLoading}
            className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {passwordLoading ? "Updating..." : "Update Password"}
          </button>
        </div>
      </section>
    </div>
  );
};

export default Settings;
