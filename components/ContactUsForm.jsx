"use client";
import React from "react";
import { toast } from "sonner";
import { Phone, Mail, Instagram, Send, Clock } from "lucide-react";

const ContactUsForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Message sent successfully!");
    e.target.reset();
  };

  return (
    <div
      id="contact"
      className="w-full bg-white py-12 border-t border-gray-100"
    >
      <div className="w-full px-6 md:px-12 lg:px-24">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-32">
          {/* Left: Contact Info (Minimalist) */}
          <div className="lg:w-1/3 space-y-12">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-gray-900 font-serif">
                Get in touch
              </h2>
              <p className="text-gray-500 text-lg">
                We&apos;re here to answer any questions you may have about our
                dental services.
              </p>
            </div>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 text-gray-400 mt-1" />
                <div>
                  <p className="text-sm text-gray-400 font-medium uppercase tracking-widest">
                    Phone
                  </p>
                  <a
                    href="tel:7972933329"
                    className="text-xl font-medium text-gray-900 hover:underline"
                  >
                    +91 7972933329
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-gray-400 mt-1" />
                <div>
                  <p className="text-sm text-gray-400 font-medium uppercase tracking-widest">
                    Email
                  </p>
                  <a
                    href="mailto:soma3344@gmail.com"
                    className="text-xl font-medium text-gray-900 hover:underline"
                  >
                    soma3344@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Instagram className="w-6 h-6 text-gray-400 mt-1" />
                <div>
                  <p className="text-sm text-gray-400 font-medium uppercase tracking-widest">
                    Instagram
                  </p>
                  <a
                    href="https://instagram.com/aabha_dental_clinic"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xl font-medium text-gray-900 hover:underline"
                  >
                    @aabha_dental_clinic
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-6 uppercase tracking-widest">
                Hospitals Hours
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between text-gray-600">
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4" /> Miraj Branch
                  </span>
                  <span>9:00 AM – 2:00 PM</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4" /> Bedag Branch
                  </span>
                  <span>4:00 PM – 9:00 PM</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Form (Minimalist and Full Width) */}
          <div className="lg:w-2/3">
            <form onSubmit={handleSubmit} className="space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="group relative">
                  <label
                    htmlFor="name"
                    className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 transition-colors group-focus-within:text-gray-900"
                  >
                    Your Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    placeholder="John Doe"
                    className="w-full bg-transparent border-b border-gray-200 py-3 outline-none focus:border-gray-900 transition-colors placeholder:text-gray-200 text-lg"
                  />
                </div>
                <div className="group relative">
                  <label
                    htmlFor="phone"
                    className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 transition-colors group-focus-within:text-gray-900"
                  >
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    required
                    placeholder="+91 00000 00000"
                    className="w-full bg-transparent border-b border-gray-200 py-3 outline-none focus:border-gray-900 transition-colors placeholder:text-gray-200 text-lg"
                  />
                </div>
              </div>

              <div className="group relative">
                <label
                  htmlFor="email"
                  className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 transition-colors group-focus-within:text-gray-900"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="hello@example.com"
                  className="w-full bg-transparent border-b border-gray-200 py-3 outline-none focus:border-gray-900 transition-colors placeholder:text-gray-200 text-lg"
                />
              </div>

              <div className="group relative">
                <label
                  htmlFor="message"
                  className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 transition-colors group-focus-within:text-gray-900"
                >
                  How can we help?
                </label>
                <textarea
                  id="message"
                  required
                  rows="4"
                  placeholder="I'd like to book an appointment for..."
                  className="w-full bg-transparent border-b border-gray-200 py-3 outline-none focus:border-gray-900 transition-colors placeholder:text-gray-200 text-lg resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="group inline-flex items-center gap-3 bg-gray-900 text-white px-12 py-5 rounded-full font-bold hover:bg-black transition-all duration-300"
              >
                Send Message
                <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsForm;
