import Link from "next/link";
import React, { useState } from "react";

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

  const AppointmentsContent = () => {
    const appointments = [
      {
        id: 1,
        name: "John Doe",
        phone: "+1 234-567-8900",
        service: "Dental Checkup",
        date: "2026-01-16",
        time: "10:00 AM",
        status: "Pending",
        reminder24h: true,
        reminder2h: false,
      },
      {
        id: 2,
        name: "Jane Smith",
        phone: "+1 234-567-8901",
        service: "Teeth Cleaning",
        date: "2026-01-16",
        time: "2:00 PM",
        status: "Confirmed",
        reminder24h: true,
        reminder2h: true,
      },
      {
        id: 3,
        name: "Bob Johnson",
        phone: "+1 234-567-8902",
        service: "Root Canal",
        date: "2026-01-17",
        time: "11:00 AM",
        status: "Pending",
        reminder24h: false,
        reminder2h: false,
      },
    ];

    return (
      <div className="p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Appointments</h2>

        <div className="space-y-4">
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="font-semibold text-gray-800">
                    {appointment.name}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-semibold text-gray-800">
                    {appointment.phone}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Service</p>
                  <p className="font-semibold text-gray-800">
                    {appointment.service}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                      appointment.status === "Confirmed"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {appointment.status}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="font-semibold text-gray-800">
                    {appointment.date}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Time</p>
                  <p className="font-semibold text-gray-800">
                    {appointment.time}
                  </p>
                </div>
              </div>

              <div className="mb-4 pb-4 border-b border-gray-200">
                <p className="text-sm text-gray-500 mb-2">Reminders</p>
                <div className="flex gap-4">
                  <span className="text-sm">
                    24h: {appointment.reminder24h ? "✓ Sent" : "⏳ Pending"}
                  </span>
                  <span className="text-sm">
                    2h: {appointment.reminder2h ? "✓ Sent" : "⏳ Pending"}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
                  Confirm
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                  Reschedule
                </button>
                <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium">
                  Complete
                </button>
                <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium">
                  Cancel
                </button>
                <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium">
                  Upload Report
                </button>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium">
                  Call
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
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
