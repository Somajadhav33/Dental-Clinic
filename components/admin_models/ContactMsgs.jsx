"use client";
import { X, Download } from "lucide-react";
import React, { useState } from "react";

const downloadCSV = (data) => {
  if (!data.length) return;
  const headers = ["ID", "Name", "Phone", "Email", "Status", "Date", "Message"];
  const lines = [
    headers.join(","),
    ...data.map((msg) =>
      [
        msg.id,
        `"${msg.name}"`,
        msg.phone,
        msg.email || "",
        msg.status,
        msg.created_at,
        `"${msg.messages?.replace(/"/g, '""')}"`,
      ].join(","),
    ),
  ];
  const blob = new Blob([lines.join("\n")], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `contact-messages-${new Date().toISOString().split("T")[0]}.csv`;
  a.click();
  URL.revokeObjectURL(url);
};

const ContactMessages = () => {
  const [messages, setMessages] = useState({ data: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);

  React.useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch("/api/contact-us");
        if (!response.ok) throw new Error("Failed to fetch messages");
        const data = await response.json();
        setMessages(data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMessages();
  }, []);

  const openModal = (msg) => setSelectedMessage(msg);
  const closeModal = () => setSelectedMessage(null);

  return (
    <div className="p-6">
      {/* ── Header with Download ── */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-gray-800">Contact Messages</h1>
        {!isLoading && messages.data.length > 0 && (
          <button
            onClick={() => downloadCSV(messages.data)}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-white text-sm font-semibold rounded-lg hover:bg-slate-900 active:scale-95 transition-all shadow-sm"
          >
            <Download size={15} />
            Download CSV ({messages.data.length})
          </button>
        )}
      </div>

      {/* ── Table ── */}
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="5" className="px-4 py-8 text-center text-gray-500">
                  Loading messages...
                </td>
              </tr>
            ) : messages.data.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-4 py-8 text-center text-gray-500">
                  No messages found.
                </td>
              </tr>
            ) : (
              messages.data.map((msg) => (
                <tr
                  key={msg.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-3">{msg.created_at}</td>
                  <td className="px-4 py-3 font-medium text-gray-800">
                    {msg.name}
                  </td>
                  <td className="px-4 py-3">{msg.phone}</td>
                  <td className="px-4 py-3">{msg.email}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => openModal(msg)}
                      className="text-blue-600 hover:underline font-medium cursor-pointer"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ── Modal ── */}
      {selectedMessage && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center border-b pb-4 mb-4">
              <h2 className="text-2xl font-bold text-gray-900">
                Message Details
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <X />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-gray-600">
                  ID
                </label>
                <p className="text-gray-900">{selectedMessage.id}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-600">
                  Name
                </label>
                <p className="text-gray-900">{selectedMessage.name}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-600">
                  Phone
                </label>
                <p className="text-gray-900">{selectedMessage.phone}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-600">
                  Email
                </label>
                <p className="text-gray-900">{selectedMessage.email}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-600">
                  Status
                </label>
                <p>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      selectedMessage.status === "new"
                        ? "bg-red-100 text-red-600"
                        : selectedMessage.status === "read"
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-green-100 text-green-600"
                    }`}
                  >
                    {selectedMessage.status}
                  </span>
                </p>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-600">
                  Date
                </label>
                <p className="text-gray-900">{selectedMessage.created_at}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-600">
                  Message
                </label>
                <div className="bg-gray-50 p-4 rounded-lg mt-2">
                  <p className="text-gray-900">{selectedMessage.messages}</p>
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={closeModal}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactMessages;
