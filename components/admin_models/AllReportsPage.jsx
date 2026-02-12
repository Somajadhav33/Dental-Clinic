import { useState } from "react";
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
} from "lucide-react";

const dumdata = {
  id: 1,
  data_id: "APT-2026-005",
  patient_name: "Sneha Kulkarni",
  patient_email: "sneha@example.com",
  patient_phone: "+91 77665 44332",
  service: "Scaling & Polishing",
  doctor: "Dr. Rajesh Kumar",
  clinic: "Bedag Clinic",
  data_date: "2026-02-10",
  data_time: "16:15",
  status: "Completed",
  diagnosis: "Moderate calculus and plaque buildup",
  observations: "Bleeding on probing in posterior region. No bone loss.",
  treatment: "Full mouth ultrasonic scaling and hand polishing performed.",
  next_visit: "2026-08-10",
  medicines: [
    { name: "Hexidine Mouthwash", dosage: "Twice daily for 2 weeks" },
  ],
  documents: [],
  payment: { status: "Paid", amount: 1200, mode: "UPI" },
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const AllReportsPage = () => {
  const [search, setSearch] = useState("");
  const [filterMode, setFilterMode] = useState("single");
  const [selectedDate, setSelectedDate] = useState("");
  const [dateRange, setDateRange] = useState({ from: "", to: "" });
  const [statusFilter, setStatusFilter] = useState("all");
  const [data, setData] = useState(dumdata);

  const filterData = {
    search,
    filterMode,
    date: filterMode === "single" ? selectedDate : null,
    fromDate: filterMode === "range" ? dateRange.from : null,
    toDate: filterMode === "range" ? dateRange.to : null,
    status: statusFilter,
  };

  const handleSearch = () => {
    console.log("Applied Filters:", filterData);
  };

  const handleClear = () => {
    setSearch("");
    setSelectedDate("");
    setDateRange({ from: "", to: "" });
    setStatusFilter("all");
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

  return (
    <>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Filter size={16} className="text-gray-400" />
          <span className="text-sm font-semibold text-gray-700">Filters</span>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search patient, service, doctor..."
              className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          {/* Date Mode */}
          <div className="flex rounded-xl overflow-hidden border border-gray-200">
            {["single", "range"].map((mode) => (
              <button
                key={mode}
                onClick={() => setFilterMode(mode)}
                className={`px-4 py-2.5 text-sm font-medium capitalize ${
                  filterMode === mode
                    ? "bg-indigo-600 text-white"
                    : "bg-white text-gray-600"
                }`}
              >
                {mode === "single" ? "Single Date" : "Date Range"}
              </button>
            ))}
          </div>

          {/* Single Date */}
          {filterMode === "single" && (
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm"
            />
          )}

          {/* Date Range */}
          {filterMode === "range" && (
            <div className="flex gap-2">
              <input
                type="date"
                value={dateRange.from}
                onChange={(e) =>
                  setDateRange((p) => ({
                    ...p,
                    from: e.target.value,
                  }))
                }
                className="px-3 py-2.5 border border-gray-200 rounded-xl text-sm"
              />
              <input
                type="date"
                value={dateRange.to}
                onChange={(e) =>
                  setDateRange((p) => ({
                    ...p,
                    to: e.target.value,
                  }))
                }
                className="px-3 py-2.5 border border-gray-200 rounded-xl text-sm"
              />
            </div>
          )}

          {/* Status */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-white"
          >
            <option value="all">All datas</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
          </select>

          {/* Clear */}
          {(search ||
            selectedDate ||
            dateRange.from ||
            dateRange.to ||
            statusFilter !== "all") && (
            <button
              onClick={handleClear}
              className="flex items-center gap-1.5 px-4 py-2.5 text-sm text-red-600 bg-red-50 rounded-xl"
            >
              <X size={14} />
              Clear
            </button>
          )}
        </div>

        {/* Real Search Button */}
        <div className="mt-4">
          <button
            onClick={handleSearch}
            className="flex items-center gap-2 px-6 py-2.5 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition"
          >
            <Search size={16} />
            Search datas
          </button>
        </div>
      </div>
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
        <div className="bg-linear-to-r from-indigo-50 to-purple-50 px-6 py-4 border-b border-slate-200">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white p-2 rounded-lg shadow-sm">
                <User className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-slate-900">
                  {data.patient_name}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <Phone className="w-3.5 h-3.5 text-slate-500" />
                  <span className="text-sm text-slate-600">
                    {data.patient_phone}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <span
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${getStatusStyle(
                  data.status,
                )}`}
              >
                {data.status}
              </span>
              <p className="text-xs text-slate-500">ID: {data.data_id}</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5 mt-5 p-1">
          <div className="flex items-center gap-3">
            <div className="bg-violet-50 p-2 rounded-lg">
              <Stethoscope className="w-4 h-4 text-violet-600" />
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wide">
                Service
              </p>
              <p className="font-medium text-slate-900">{data.service}</p>
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
                {formatDate(data.data_date)}
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
              <p className="font-medium text-slate-900">{data.data_time}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-orange-50 p-2 rounded-lg">
              <Hospital className="w-4 h-4 text-orange-600" />
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wide">
                Clinic
              </p>
              <p className="font-medium text-slate-900">{data.clinic}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-pink-50 p-2 rounded-lg">
              <Mail className="w-4 h-4 text-pink-600" />
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wide">
                Email
              </p>
              <p className="font-medium text-slate-900 text-sm">
                {data.patient_email}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllReportsPage;
