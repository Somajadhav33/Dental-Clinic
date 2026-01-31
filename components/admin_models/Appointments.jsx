"use client";

import React, { useEffect, useState } from "react";
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

const getAppointments = async () => {
  const response = await fetch("http://localhost:3000/api/book-appointment");
  if (!response.ok) throw new Error("Something went wrong");
  return response.json();
};

const AppointmentsContent = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAppointments()
      .then((data) => {
        setAppointments(data?.data?.rows || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching appointments:", error);
        setLoading(false);
      });
  }, []);

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
        return "bg-teal-50 text-teal-700 border-teal-200";
      case "Pending":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "Completed":
        return "bg-indigo-50 text-indigo-700 border-indigo-200";
      case "Cancelled":
        return "bg-rose-50 text-rose-700 border-rose-200";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  if (loading) {
    return (
      <div className="p-6 md:p-8 bg-slate-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 text-indigo-600 animate-spin mx-auto mb-3" />
          <p className="text-slate-600">Loading appointments...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 bg-slate-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
            Appointments
          </h2>
          <p className="text-slate-600 mt-1">
            Manage and track patient appointments
          </p>
        </div>

        <div className="space-y-5">
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
            >
              <div className="bg-linear-to-r from-indigo-50 to-purple-50 px-6 py-4 border-b border-slate-200">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-white p-2 rounded-lg shadow-sm">
                      <User className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-slate-900">
                        {appointment.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Phone className="w-3.5 h-3.5 text-slate-500" />
                        <span className="text-sm text-slate-600">
                          {appointment.phone}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="font-semibold mt-3">
                    Appointment id : {appointment.appointment_id}
                  </p>
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
                    <div className="bg-violet-50 p-2 rounded-lg">
                      <Stethoscope className="w-4 h-4 text-violet-600" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wide">
                        Service
                      </p>
                      <p className="font-medium text-slate-900">
                        {appointment.service_name}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="bg-emerald-50 p-2 rounded-lg">
                      <Calendar className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wide">
                        Date
                      </p>
                      <p className="font-medium text-slate-900">
                        {appointment.preferred_date}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="bg-cyan-50 p-2 rounded-lg">
                      <Clock className="w-4 h-4 text-cyan-600" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wide">
                        Time
                      </p>
                      <p className="font-medium text-slate-900">
                        {appointment.preferred_time}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-lg p-4 mb-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Bell className="w-4 h-4 text-indigo-600" />
                    <span className="text-sm font-semibold text-slate-700">
                      Reminders
                    </span>
                  </div>
                  <div className="flex gap-6">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          appointment.reminder24h
                            ? "bg-emerald-500"
                            : "bg-slate-300"
                        }`}
                      ></div>
                      <span className="text-sm text-slate-700">
                        24h before:{" "}
                        <span
                          className={
                            appointment.reminder24h
                              ? "text-emerald-600 font-medium"
                              : "text-slate-500"
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
                            ? "bg-emerald-500"
                            : "bg-slate-300"
                        }`}
                      ></div>
                      <span className="text-sm text-slate-700">
                        2h before:{" "}
                        <span
                          className={
                            appointment.reminder2h
                              ? "text-emerald-600 font-medium"
                              : "text-slate-500"
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
                    className="inline-flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm font-medium shadow-sm"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Confirm
                  </button>
                  <button
                    onClick={() =>
                      handleStatusChange(appointment.id, "Completed")
                    }
                    className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium shadow-sm"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Complete
                  </button>
                  <button className="inline-flex items-center gap-2 px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors text-sm font-medium shadow-sm">
                    <RefreshCw className="w-4 h-4" />
                    Reschedule
                  </button>
                  <button className="inline-flex items-center gap-2 px-4 py-2 bg-fuchsia-600 text-white rounded-lg hover:bg-fuchsia-700 transition-colors text-sm font-medium shadow-sm">
                    <Upload className="w-4 h-4" />
                    Upload Report
                  </button>
                  <Link
                    href={`tel:${appointment.phone}`}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-800 transition-colors text-sm font-medium shadow-sm"
                  >
                    <Phone className="w-4 h-4" />
                    Call
                  </Link>
                  <button
                    onClick={() => handleDelete(appointment.id)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors text-sm font-medium shadow-sm"
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
          <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
            <Calendar className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              No appointments scheduled
            </h3>
            <p className="text-slate-600">
              New appointments will appear here when patients book.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentsContent;
