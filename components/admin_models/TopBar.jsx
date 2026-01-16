import React from "react";

const TopBar = () => {
  const date = new Date();
  const formatted = date.toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return (
    <div className="flex items-center justify-between px-6 py-4 border-b bg-white">
      <div>
        <h3 className="text-lg font-semibold text-gray-800">
          AABHA DENTAL CLINIC
        </h3>
        <p className="text-sm text-gray-500">Login time: {formatted}</p>
      </div>
      <button
        type="button"
        className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded hover:bg-red-600 transition"
      >
        Log Out
      </button>
    </div>
  );
};

export default TopBar;

// ┌──────────────────────────────────────────────┐
// │  DENTAL CLINIC ADMIN            Logout       │
// │  Today: 15 Jan 2026                            │
// └──────────────────────────────────────────────┘
