import React, { useState } from 'react';

const TravelerReviews = () => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [reviews, setReviews] = useState([
    {
      id: 1,
      packageName: 'Historic Route: Lalibela & Gondar',
      rating: 5,
      date: 'Aug 25, 2026',
      comment: 'An absolutely magical experience! The stone churches of Lalibela were breathtaking, and the guide was extremely knowledgeable. Highly recommend!',
    },
    {
      id: 2,
      packageName: 'Addis Modern City Tour',
      rating: 4,
      date: 'Jun 10, 2026',
      comment: 'Great city escape. Loved the traditional coffee ceremony and Yod Abyssinia restaurant. The traffic was a bit rough, but overall a fun tour.',
    },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comment) return;
    const newReview = {
      id: Date.now(),
      packageName: 'Historic Route: Lalibela & Gondar',
      rating,
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' }),
      comment,
    };
    setReviews([newReview, ...reviews]);
    setComment('');
    setRating(5);
  };

  return (
    <div className="max-w-container-max mx-auto space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-on-surface">Reviews & Ratings</h2>
        <p className="text-sm text-on-surface-variant mt-1">
          Share your travel experiences and view your past reviews.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Create Review Form */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-xl border border-border-subtle shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-on-surface border-b border-border-subtle pb-3">
              Write a Review
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-on-surface-variant uppercase">Select Package</label>
                <div className="relative">
                  <select className="w-full appearance-none bg-surface-container-low border border-border-subtle rounded-lg py-2.5 px-4 text-sm font-semibold text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20">
                    <option>Historic Route: Lalibela & Gondar</option>
                    <option>Wildlife Safari: Omo Valley</option>
                    <option>Danakil Expedition</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-outline">
                    expand_more
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-on-surface-variant uppercase block">Your Rating</label>
                <div className="flex gap-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className={`hover:scale-110 transition-transform ${
                        star <= rating ? 'text-accent-yellow' : 'text-on-surface-variant opacity-30'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                        star
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-on-surface-variant uppercase">Your Feedback</label>
                <textarea
                  rows="4"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Share details of your tour experience, including guides, transport, stays..."
                  className="w-full bg-surface-container-low border border-border-subtle rounded-lg p-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-primary text-white rounded-xl text-sm font-semibold hover:brightness-110 active:scale-95 transition-all shadow-sm"
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Past Reviews */}
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-xl font-bold text-on-surface">Your Past Reviews</h3>
          <div className="space-y-6">
            {reviews.map((rev) => (
              <div key={rev.id} className="bg-white p-6 rounded-xl border border-border-subtle shadow-sm space-y-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-border-subtle pb-3">
                  <div>
                    <h4 className="font-bold text-base text-on-surface">{rev.packageName}</h4>
                    <p className="text-xs text-on-surface-variant font-semibold mt-1">{rev.date}</p>
                  </div>
                  <div className="flex text-accent-yellow">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className="material-symbols-outlined text-[20px]"
                        style={{ fontVariationSettings: star <= rev.rating ? "'FILL' 1" : "'FILL' 0" }}
                      >
                        star
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  {rev.comment}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelerReviews;
