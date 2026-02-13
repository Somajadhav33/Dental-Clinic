"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import {
  Search,
  Filter,
  X,
  User,
  Phone,
  Stethoscope,
  Calendar,
  Clock,
  Hospital,
  Mail,
  Download,
  Loader2,
  FileText,
  AlertCircle,
} from "lucide-react";

const toDateString = (d) => {
  if (!d) return "";
  return String(d).slice(0, 10);
};

const formatDate = (d) => {
  if (!d) return "—";
  const ymd = toDateString(d);
  if (!ymd) return "—";
  return new Date(`${ymd}T00:00:00`).toLocaleDateString("en-IN", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const STATUS_STYLES = {
  Confirmed: "bg-teal-50 text-teal-700 border-teal-200",
  Pending: "bg-amber-50 text-amber-700 border-amber-200",
  Completed: "bg-indigo-50 text-indigo-700 border-indigo-200",
  Cancelled: "bg-rose-50 text-rose-700 border-rose-200",
};

const downloadCSV = (rows) => {
  if (!rows.length) return;
  const headers = [
    "Appointment ID",
    "Patient Name",
    "Email",
    "Phone",
    "Service",
    "Date",
    "Time",
    "Clinic",
    "Status",
  ];
  const lines = [
    headers.join(","),
    ...rows.map((r) =>
      [
        r.appointment_id,
        r.name,
        r.email,
        r.phone,
        `"${r.service_name}"`,
        r.preferred_date,
        r.preferred_time,
        `"${r.at}"`,
        r.status,
      ].join(","),
    ),
  ];
  const blob = new Blob([lines.join("\n")], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `appointments-${new Date().toISOString().split("T")[0]}.csv`;
  a.click();
  URL.revokeObjectURL(url);
};

const AppointmentCard = ({ apt }) => (
  <div className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
    <div className="bg-linear-to-r from-slate-50 to-gray-50 px-6 py-4 border-b border-slate-100">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="bg-white p-2 rounded-lg shadow-sm shrink-0">
            <User className="w-5 h-5 text-indigo-600" />
          </div>
          <div className="min-w-0">
            <h3 className="font-semibold text-slate-900 truncate">
              {apt.name}
            </h3>
            <div className="flex items-center gap-1.5 mt-0.5">
              <Phone className="w-3 h-3 text-slate-400 shrink-0" />
              <span className="text-sm text-slate-500 truncate">
                {apt.phone}
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1.5 shrink-0">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold border ${
              STATUS_STYLES[apt.status] ||
              "bg-slate-50 text-slate-600 border-slate-200"
            }`}
          >
            {apt.status}
          </span>
          <p className="text-xs text-slate-400 font-mono">
            {apt.appointment_id}
          </p>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-5">
      <InfoItem
        icon={<Stethoscope className="w-4 h-4 text-violet-600" />}
        bg="bg-violet-50"
        label="Service"
        value={apt.service_name}
      />
      <InfoItem
        icon={<Calendar className="w-4 h-4 text-emerald-600" />}
        bg="bg-emerald-50"
        label="Date"
        value={formatDate(apt.preferred_date)}
      />
      <InfoItem
        icon={<Clock className="w-4 h-4 text-cyan-600" />}
        bg="bg-cyan-50"
        label="Time"
        value={apt.preferred_time?.substring(0, 5)}
      />
      <InfoItem
        icon={<Hospital className="w-4 h-4 text-orange-600" />}
        bg="bg-orange-50"
        label="Clinic"
        value={apt.at}
      />
      <InfoItem
        icon={<Mail className="w-4 h-4 text-pink-600" />}
        bg="bg-pink-50"
        label="Email"
        value={apt.email}
        small
      />
    </div>
  </div>
);

const InfoItem = ({ icon, bg, label, value, small }) => (
  <div className="flex items-center gap-3">
    <div className={`${bg} p-2 rounded-lg shrink-0`}>{icon}</div>
    <div className="min-w-0">
      <p className="text-xs text-slate-400 uppercase tracking-wide font-medium">
        {label}
      </p>
      <p
        className={`font-medium text-slate-800 truncate ${small ? "text-sm" : ""}`}
      >
        {value || "—"}
      </p>
    </div>
  </div>
);

const Chip = ({ label, onRemove }) => (
  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-full text-xs font-semibold">
    {label}
    <button
      onClick={onRemove}
      className="hover:text-indigo-900 transition-colors"
    >
      <X size={10} />
    </button>
  </span>
);

const AllReportsPage = () => {
  const [search, setSearch] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [debouncedSearch, setDebouncedSearch] = useState("");
  const debounceRef = useRef(null);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch("/api/book-appointment");
        if (!res.ok) throw new Error(`Server error: ${res.status}`);
        const json = await res.json();
        if (!json.success) throw new Error(json.error || "Unknown error");
        setAllData(json.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  const handleSearchInput = (value) => {
    setSearch(value);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setDebouncedSearch(value);
    }, 300);
  };

  const handleDateChange = (value) => {
    setSelectedDate(value);
    setFromDate("");
    setToDate("");
  };

  const handleFromDate = (value) => {
    setFromDate(value);
    setSelectedDate("");
  };

  const handleToDate = (value) => {
    setToDate(value);
    setSelectedDate("");
  };

  const handleClear = () => {
    setSearch("");
    setDebouncedSearch("");
    setSelectedDate("");
    setFromDate("");
    setToDate("");
    setStatusFilter("all");
    clearTimeout(debounceRef.current);
  };

  const isDirty =
    debouncedSearch ||
    selectedDate ||
    fromDate ||
    toDate ||
    statusFilter !== "all";

  const results = useMemo(() => {
    let data = allData;

    if (debouncedSearch.trim()) {
      const q = debouncedSearch.trim().toLowerCase();
      data = data.filter(
        (apt) =>
          apt.name?.toLowerCase().includes(q) ||
          apt.phone?.toLowerCase().includes(q) ||
          apt.email?.toLowerCase().includes(q) ||
          apt.service_name?.toLowerCase().includes(q) ||
          apt.appointment_id?.toLowerCase().includes(q) ||
          apt.at?.toLowerCase().includes(q),
      );
    }

    if (statusFilter !== "all") {
      data = data.filter((apt) => apt.status === statusFilter);
    }

    if (selectedDate) {
      data = data.filter(
        (apt) => toDateString(apt.preferred_date) === selectedDate,
      );
    }

    if (fromDate) {
      data = data.filter((apt) => toDateString(apt.preferred_date) >= fromDate);
    }
    if (toDate) {
      data = data.filter((apt) => toDateString(apt.preferred_date) <= toDate);
    }

    return data;
  }, [allData, debouncedSearch, statusFilter, selectedDate, fromDate, toDate]);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {/* ── Header ── */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Appointment Reports
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              {loading
                ? "Loading appointments…"
                : `${results.length} appointment${results.length !== 1 ? "s" : ""} ${
                    isDirty ? "matching filters" : "total"
                  }`}
            </p>
          </div>
          {results.length > 0 && !loading && (
            <button
              onClick={() => downloadCSV(results)}
              className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 text-white text-sm font-semibold rounded-xl hover:bg-slate-900 active:scale-95 transition-all shadow-sm"
            >
              <Download size={15} />
              Download CSV ({results.length})
            </button>
          )}
        </div>

        {/* ── Filter panel ── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Filter size={15} className="text-gray-400" />
              <span className="text-sm font-semibold text-gray-700">
                Filters
              </span>
              <span className="text-xs text-gray-400">
                — use any combination, or none
              </span>
            </div>
            {isDirty && (
              <button
                onClick={handleClear}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-red-600 font-semibold bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
              >
                <X size={11} /> Clear all
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Search */}
            <div className="relative sm:col-span-2">
              <Search
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                value={search}
                onChange={(e) => handleSearchInput(e.target.value)}
                placeholder="Search by name, phone, email, service, ID…"
                className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
              />
            </div>

            {/* Status */}
            <div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
              >
                <option value="all">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

            {/* Single date */}
            <div className="relative">
              <label className="absolute -top-2 left-3 text-[10px] font-semibold text-gray-400 bg-white px-1 uppercase tracking-wide">
                Date
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => handleDateChange(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
              />
            </div>

            {/* From date */}
            <div className="relative">
              <label className="absolute -top-2 left-3 text-[10px] font-semibold text-gray-400 bg-white px-1 uppercase tracking-wide">
                From
              </label>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => handleFromDate(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
              />
            </div>

            {/* To date */}
            <div className="relative">
              <label className="absolute -top-2 left-3 text-[10px] font-semibold text-gray-400 bg-white px-1 uppercase tracking-wide">
                To
              </label>
              <input
                type="date"
                value={toDate}
                onChange={(e) => handleToDate(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
              />
            </div>
          </div>

          {/* Active filter chips */}
          {isDirty && (
            <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-100">
              {debouncedSearch && (
                <Chip
                  label={`"${debouncedSearch}"`}
                  onRemove={() => {
                    setSearch("");
                    setDebouncedSearch("");
                  }}
                />
              )}
              {statusFilter !== "all" && (
                <Chip
                  label={statusFilter}
                  onRemove={() => setStatusFilter("all")}
                />
              )}
              {selectedDate && (
                <Chip
                  label={formatDate(selectedDate)}
                  onRemove={() => setSelectedDate("")}
                />
              )}
              {fromDate && (
                <Chip
                  label={`From ${formatDate(fromDate)}`}
                  onRemove={() => setFromDate("")}
                />
              )}
              {toDate && (
                <Chip
                  label={`To ${formatDate(toDate)}`}
                  onRemove={() => setToDate("")}
                />
              )}
            </div>
          )}
        </div>

        {error && (
          <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 px-5 py-4 rounded-xl mb-6 text-sm">
            <AlertCircle size={16} className="shrink-0" />
            <span>
              <strong>Error:</strong> {error}
            </span>
          </div>
        )}

        {loading && (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-slate-100 p-5 animate-pulse"
              >
                <div className="flex gap-3 mb-4">
                  <div className="w-9 h-9 rounded-full bg-slate-100 shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-slate-100 rounded w-1/3" />
                    <div className="h-3 bg-slate-100 rounded w-1/4" />
                  </div>
                  <div className="h-6 w-20 bg-slate-100 rounded-full" />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {[1, 2, 3].map((j) => (
                    <div key={j} className="h-12 bg-slate-100 rounded-lg" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Results ── */}
        {!loading &&
          !error &&
          (results.length > 0 ? (
            <div className="space-y-4">
              {results.map((apt) => (
                <AppointmentCard key={apt.id} apt={apt} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-100 p-16 text-center">
              <FileText size={40} className="text-slate-200 mx-auto mb-3" />
              <p className="text-slate-500 font-medium">
                No appointments found
              </p>
              <p className="text-slate-400 text-sm mt-1">
                {isDirty
                  ? "Try removing some filters"
                  : "No appointments exist yet"}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AllReportsPage;
