import React from "react";
import { faqs } from "@/SampleData/Faq";

export const FAQComponent = () => {
  return (
    <div className="w-full mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          Frequently Asked Questions
        </h2>
        <p className="text-gray-600 text-lg">
          Everything you need to know about our services
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {faqs.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow-md border border-gray-200 p-8 hover:shadow-lg transition-shadow"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              {item.question}
            </h3>
            <p className="text-gray-600 text-base leading-relaxed">
              {item.answer}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQComponent;
