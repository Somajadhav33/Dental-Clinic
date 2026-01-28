"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Phone,
  Calendar,
  Clock,
  CheckCircle2,
  XCircle,
  Upload,
  RefreshCw,
  Bell,
  User,
  Stethoscope,
} from "lucide-react";

const AppointmentsContent = () => {
  const [appointments, setAppointments] = useState([
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
  ]);

  const handleStatusChange = (id, newStatus) => {
    setAppointments(
      appointments.map((apt) =>
        apt.id === id ? { ...apt, status: newStatus } : apt,
      ),
    );
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to cancel this appointment?")) {
      setAppointments(appointments.filter((apt) => apt.id !== id));
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "Confirmed":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "Pending":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "Completed":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "Cancelled":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="p-6 md:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Appointments
          </h2>
          <p className="text-gray-600 mt-1">
            Manage and track patient appointments
          </p>
        </div>

        <div className="space-y-5">
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
            >
              <div className="bg-linear-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-200">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-white p-2 rounded-lg shadow-sm">
                      <User className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900">
                        {appointment.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Phone className="w-3.5 h-3.5 text-gray-500" />
                        <span className="text-sm text-gray-600">
                          {appointment.phone}
                        </span>
                      </div>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${getStatusStyle(
                      appointment.status,
                    )}`}
                  >
                    {appointment.status}
                  </span>
                </div>
              </div>

              <div className="px-6 py-5">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
                  <div className="flex items-center gap-3">
                    <div className="bg-purple-50 p-2 rounded-lg">
                      <Stethoscope className="w-4 h-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">
                        Service
                      </p>
                      <p className="font-medium text-gray-900">
                        {appointment.service}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="bg-green-50 p-2 rounded-lg">
                      <Calendar className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">
                        Date
                      </p>
                      <p className="font-medium text-gray-900">
                        {formatDate(appointment.date)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="bg-orange-50 p-2 rounded-lg">
                      <Clock className="w-4 h-4 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">
                        Time
                      </p>
                      <p className="font-medium text-gray-900">
                        {appointment.time}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg p-4 mb-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Bell className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-semibold text-gray-700">
                      Reminders
                    </span>
                  </div>
                  <div className="flex gap-6">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          appointment.reminder24h
                            ? "bg-green-500"
                            : "bg-gray-300"
                        }`}
                      ></div>
                      <span className="text-sm text-gray-700">
                        24h before:{" "}
                        <span
                          className={
                            appointment.reminder24h
                              ? "text-green-600 font-medium"
                              : "text-gray-500"
                          }
                        >
                          {appointment.reminder24h ? "Sent" : "Pending"}
                        </span>
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          appointment.reminder2h
                            ? "bg-green-500"
                            : "bg-gray-300"
                        }`}
                      ></div>
                      <span className="text-sm text-gray-700">
                        2h before:{" "}
                        <span
                          className={
                            appointment.reminder2h
                              ? "text-green-600 font-medium"
                              : "text-gray-500"
                          }
                        >
                          {appointment.reminder2h ? "Sent" : "Pending"}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() =>
                      handleStatusChange(appointment.id, "Confirmed")
                    }
                    className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium shadow-sm"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Confirm
                  </button>
                  <button
                    onClick={() =>
                      handleStatusChange(appointment.id, "Completed")
                    }
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Complete
                  </button>
                  <button className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium shadow-sm">
                    <RefreshCw className="w-4 h-4" />
                    Reschedule
                  </button>
                  <button className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium shadow-sm">
                    <Upload className="w-4 h-4" />
                    Upload Report
                  </button>
                  <Link
                    href={`tel:${appointment.phone}`}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium shadow-sm"
                  >
                    <Phone className="w-4 h-4" />
                    Call
                  </Link>
                  <button
                    onClick={() => handleDelete(appointment.id)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium shadow-sm"
                  >
                    <XCircle className="w-4 h-4" />
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {appointments.length === 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No appointments scheduled
            </h3>
            <p className="text-gray-600">
              New appointments will appear here when patients book.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentsContent;
