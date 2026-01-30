"use client";

import AppointMentSuccessCard from "@/components/AppointmentSuccessPage";
import { useSearchParams } from "next/navigation";
import React, { useState, useEffect, Suspense } from "react";

const AppointmentFormContent = () => {
  const searchParams = useSearchParams();

  const [categories, setCategories] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [appointmentData, setAppointmentData] = useState(null);

  const [formData, setFormData] = useState({
    patient_name: "",
    phone: "",
    email: "",
    service: "",
    appointment_date: "",
    appointment_time: "",
    notes: "",
    clinic: "",
  });

  // Fetch services
  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch("/api/dental-services", { cache: "no-store" });
      const data = await res.json();
      setCategories(data.categories);
    };

    fetchCategories();
  }, []);

  // Read service from URL
  useEffect(() => {
    const serviceFromUrl = searchParams.get("service");
    if (serviceFromUrl) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData((prev) => ({
        ...prev,
        service: decodeURIComponent(serviceFromUrl),
      }));
    }
  }, [searchParams]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await fetch("/api/book-appointment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (result.ok) {
        const data = await result.json();

        // Store appointment data for success card
        setAppointmentData({
          id: data.appointment.appointment_id,
          name: formData.patient_name,
          clinic: formData.clinic,
          date: formData.appointment_date,
        });

        // Show success card
        setShowSuccess(true);

        // Reset form
        setFormData({
          patient_name: "",
          phone: "",
          email: "",
          service: "",
          appointment_date: "",
          appointment_time: "",
          notes: "",
          clinic: "",
        });
      }
    } catch (error) {
      console.error("Error booking appointment:", error);
    }
  };

  const today = new Date().toISOString().split("T")[0];

  // Show success card if appointment was successful
  if (showSuccess && appointmentData) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <AppointMentSuccessCard
          id={appointmentData.id}
          name={appointmentData.name}
          clinic={appointmentData.clinic}
          date={appointmentData.date}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="bg-teal-600 px-6 py-4">
            <h2 className="text-2xl font-bold text-white">
              Book an Appointment
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
                  placeholder="Abhishek Jadhav"
                />
              </div>
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
                  placeholder="+91 00000 00000"
                />
              </div>
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
                  placeholder="patient@example.com"
                />
              </div>
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
                >
                  <option value="">Select a service</option>
                  {categories.map((service) => (
                    <option key={service.id} value={service.name}>
                      {service.name}
                    </option>
                  ))}
                </select>
              </div>
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
                />
              </div>
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="clinic"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Service Center <span className="text-red-500">*</span>
              </label>
              <select
                id="clinic"
                name="clinic"
                value={formData.clinic}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
              >
                <option value="">Select Clinic</option>
                <option value="Bedag">Bedag</option>
                <option value="Miraj">Miraj</option>
              </select>
            </div>

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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition resize-none"
                placeholder="Any special requests or medical information..."
              />
            </div>

            <div className="flex justify-end pt-6">
              <button
                type="submit"
                className="px-8 py-3 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition transform hover:scale-105"
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

const AppointmentForm = () => {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-gray-600">Loading...</div>
        </div>
      }
    >
      <AppointmentFormContent />
    </Suspense>
  );
};

export default AppointmentForm;
