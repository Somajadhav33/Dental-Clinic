import React from "react";

const ReviewsComponent = () => {
  const reviews = [
    {
      id: 1,
      patientName: "Rahul",
      service: "Dental Cleaning",
      rating: 5,
      comment:
        "Very smooth experience, doctor explained everything clearly. Clinic was very clean.",
      date: "2024-01-15",
    },
    {
      id: 2,
      patientName: "Anonymous",
      service: "Root Canal",
      rating: 4,
      comment:
        "Professional service. Minimal pain during the procedure. Staff was friendly.",
      date: "2024-01-12",
    },
    {
      id: 3,
      patientName: "Priya",
      service: "Braces",
      rating: 5,
      comment:
        "Excellent consultation. Doctor took time to explain the treatment plan in detail.",
      date: "2024-01-10",
    },
    {
      id: 4,
      patientName: "Amit",
      service: "Tooth Extraction",
      rating: 5,
      comment:
        "Quick and painless extraction. Recovery was smooth. Highly recommend!",
      date: "2024-01-08",
    },
    {
      id: 5,
      patientName: "Anonymous",
      service: "Teeth Whitening",
      rating: 4,
      comment:
        "Good results. Staff was polite and the clinic atmosphere was comfortable.",
      date: "2024-01-05",
    },
    {
      id: 6,
      patientName: "Sneha",
      service: "Cavity Filling",
      rating: 5,
      comment:
        "No pain at all! Doctor was very gentle and explained each step.",
      date: "2024-01-03",
    },
  ];

  const renderStars = (rating) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`text-xl ${
              star <= rating ? "text-yellow-400" : "text-gray-300"
            }`}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="w-7xl mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          Patient Reviews
        </h2>
        <p className="text-gray-600 text-lg">
          See what our patients say about us
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="bg-white rounded-lg shadow-md border border-gray-200 p-8 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">
                  {review.patientName}
                </h3>
                <p className="text-sm text-gray-500 mt-1">{review.service}</p>
              </div>
            </div>

            {renderStars(review.rating)}

            <p className="text-gray-700 text-base leading-relaxed my-4">
              {review.comment}
            </p>

            <p className="text-xs text-gray-400">{formatDate(review.date)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsComponent;
