import React, { useState } from "react";
import { Trash2, Edit2, Save, X } from "lucide-react";
import Image from "next/image";

const initialServices = [
  {
    id: 1,
    name: "Dental Check-up",
    category: "Preventive & Diagnostic Care",
    description:
      "Routine examination to assess overall oral health and detect issues early.",
    image_url: "/images/services/dental-checkup.jpg",
    is_active: true,
    display_order: 1,
  },
  {
    id: 2,
    name: "Teeth Whitening",
    category: "Cosmetic Dentistry",
    description: "Professional whitening treatment for a brighter smile.",
    image_url: "/images/services/teeth-whitening.jpg",
    is_active: true,
    display_order: 2,
  },
];

const Services = () => {
  const [services, setServices] = useState(initialServices);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    image_url: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddService = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.category || !formData.description) {
      alert("Please fill in all required fields");
      return;
    }

    const newService = {
      id: Date.now(),
      ...formData,
      is_active: true,
      display_order: services.length + 1,
    };

    setServices((prev) => [...prev, newService]);
    setFormData({ name: "", category: "", description: "", image_url: "" });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      setServices((prev) => prev.filter((service) => service.id !== id));
    }
  };

  const handleEdit = (service) => {
    setEditingId(service.id);
    setFormData({
      name: service.name,
      category: service.category,
      description: service.description,
      image_url: service.image_url,
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    setServices((prev) =>
      prev.map((service) =>
        service.id === editingId ? { ...service, ...formData } : service
      )
    );
    setEditingId(null);
    setFormData({ name: "", category: "", description: "", image_url: "" });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({ name: "", category: "", description: "", image_url: "" });
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          {editingId ? "Update Service" : "Add New Service"}
        </h1>
        <form
          onSubmit={editingId ? handleUpdate : handleAddService}
          className="space-y-4"
        >
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Service Name *
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Category *
            </label>
            <input
              type="text"
              name="category"
              id="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description *
            </label>
            <textarea
              name="description"
              id="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label
              htmlFor="image_url"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Image URL
            </label>
            <input
              type="text"
              name="image_url"
              id="image_url"
              value={formData.image_url}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Save size={18} />
              {editingId ? "Update Service" : "Add Service"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors flex items-center gap-2"
              >
                <X size={18} />
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          Available Services
        </h1>
        <ul className="space-y-4">
          {services.map((service) => (
            <li
              key={service.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    {service.name}
                  </h2>
                  <p className="text-sm text-blue-600 font-medium mb-2">
                    {service.category}
                  </p>
                  <p className="text-gray-600 mb-3">{service.description}</p>
                  {service.image_url && (
                    <Image
                      src={service.image_url}
                      alt={service.name}
                      width={300}
                      height={300}
                      className="w-full max-w-md h-48 object-cover rounded-md"
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(service)}
                    className="p-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors"
                    title="Edit service"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(service.id)}
                    className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                    title="Delete service"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Services;
