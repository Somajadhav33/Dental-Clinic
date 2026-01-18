import Link from "next/link";
import React, { useState } from "react";
import AppointmentsContent from "./Appointments";
import Services from "./Services";

const AdminPageContent = () => {
  const [activeTab, setActiveTab] = useState("appointments");

  const SideBar = () => {
    return (
      <aside className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col p-6 shadow-sm">
        <h2 className="text-2xl font-bold mb-10 text-gray-800">Admin Panel</h2>

        <nav className="flex flex-col gap-2">
          <button
            onClick={() => setActiveTab("appointments")}
            className={`px-4 py-3 rounded-lg text-left transition-colors duration-200 font-medium ${
              activeTab === "appointments"
                ? "bg-blue-50 text-blue-600"
                : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
            }`}
          >
            Appointments
          </button>
          <button
            onClick={() => setActiveTab("services")}
            className={`px-4 py-3 rounded-lg text-left transition-colors duration-200 font-medium ${
              activeTab === "services"
                ? "bg-blue-50 text-blue-600"
                : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
            }`}
          >
            Services
          </button>
          <button
            onClick={() => setActiveTab("reports")}
            className={`px-4 py-3 rounded-lg text-left transition-colors duration-200 font-medium ${
              activeTab === "reports"
                ? "bg-blue-50 text-blue-600"
                : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
            }`}
          >
            Reports
          </button>
          <button
            onClick={() => setActiveTab("messages")}
            className={`px-4 py-3 rounded-lg text-left transition-colors duration-200 font-medium ${
              activeTab === "messages"
                ? "bg-blue-50 text-blue-600"
                : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
            }`}
          >
            Contact Messages
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`px-4 py-3 rounded-lg text-left transition-colors duration-200 font-medium ${
              activeTab === "settings"
                ? "bg-blue-50 text-blue-600"
                : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
            }`}
          >
            Settings
          </button>
        </nav>
      </aside>
    );
  };

  const RenderContent = () => {
    switch (activeTab) {
      case "appointments":
        return <AppointmentsContent />;
      case "services":
        return (
          <div className="p-8">
            <h2 className="text-3xl font-bold text-gray-800">Services</h2>
            <Services />
          </div>
        );
      case "reports":
        return (
          <div className="p-8">
            <h2 className="text-3xl font-bold text-gray-800">Reports</h2>
          </div>
        );
      case "messages":
        return (
          <div className="p-8">
            <h2 className="text-3xl font-bold text-gray-800">
              Contact Messages
            </h2>
          </div>
        );
      case "settings":
        return (
          <div className="p-8">
            <h2 className="text-3xl font-bold text-gray-800">Settings</h2>
          </div>
        );
      default:
        return (
          <div className="p-8">
            <h2 className="text-3xl font-bold text-gray-800">Welcome</h2>
          </div>
        );
    }
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <SideBar />
      <main className="flex-1 overflow-y-auto">
        <RenderContent />
      </main>
    </div>
  );
};

export default AdminPageContent;
