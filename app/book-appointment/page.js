"use client";

import { useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";

const AppointmentForm = () => {
  const searchParams = useSearchParams();

  const [formData, setFormData] = useState({
    patient_name: "",
    phone: "",
    email: "",
    service: "",
    appointment_date: "",
    appointment_time: "",
    notes: "",
  });

  useEffect(() => {
    const serviceFromUrl = searchParams.get("service");
    if (serviceFromUrl) {
      const decodedService = decodeURIComponent(serviceFromUrl);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData((prev) => ({ ...prev, service: decodedService }));
    }
  }, [searchParams]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Appointment Data:", formData);
    alert("Appointment booked successfully!");
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="bg-blue-600 px-6 py-4">
            <h2 className="text-2xl font-bold text-white">
              Book an Appointment
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Patient Name */}
              <div>
                <label
                  htmlFor="patient_name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Patient Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="patient_name"
                  name="patient_name"
                  value={formData.patient_name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  placeholder="Abhishek Jadhav"
                />
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  placeholder="+91 00000 00000"
                />
              </div>

              {/* Email (Optional) */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email (Optional)
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  placeholder="patient@example.com"
                />
              </div>

              {/* Service */}
              <div>
                <label
                  htmlFor="service"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Service <span className="text-red-500">*</span>
                </label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                >
                  <option value="">Select a service</option>
                  <option value="General Checkup">General Checkup</option>
                  <option value="Dental Cleaning (Scaling)">
                    Dental Cleaning (Scaling)
                  </option>
                  <option value="Eye Exam">Eye Exam</option>
                  <option value="Physiotherapy">Physiotherapy</option>
                  <option value="Vaccination">Vaccination</option>
                  <option value="Blood Test">Blood Test</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Appointment Date */}
              <div>
                <label
                  htmlFor="appointment_date"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Appointment Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  id="appointment_date"
                  name="appointment_date"
                  value={formData.appointment_date}
                  onChange={handleChange}
                  required
                  min={today}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                />
              </div>

              {/* Appointment Time */}
              <div>
                <label
                  htmlFor="appointment_time"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Appointment Time <span className="text-red-500">*</span>
                </label>
                <input
                  type="time"
                  id="appointment_time"
                  name="appointment_time"
                  value={formData.appointment_time}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                />
              </div>
            </div>

            {/* Notes */}
            <div>
              <label
                htmlFor="notes"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Additional Notes
              </label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
                placeholder="Any special requests or medical information..."
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-6">
              <button
                type="submit"
                className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition transform hover:scale-105"
              >
                Book Appointment
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AppointmentForm;