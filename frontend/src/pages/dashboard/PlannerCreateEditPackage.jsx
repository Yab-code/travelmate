import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const PlannerCreateEditPackage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [title, setTitle] = useState(id ? 'The Historic Route: Lalibela & Gondar' : '');
  const [price, setPrice] = useState(id ? '2450' : '');
  const [duration, setDuration] = useState(id ? '10 Days' : '5 Days');
  const [desc, setDesc] = useState(id ? 'Journey through the heart of Ethiopia\'s Christian history, exploring the legendary rock-hewn churches.' : '');
  const [region, setRegion] = useState(id ? 'Amhara' : 'Amhara');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Package ${id ? 'updated' : 'created'} successfully!`);
    navigate('/dashboard/package-management');
  };

  return (
    <div className="max-w-container-max mx-auto space-y-8">
      {/* Back link */}
      <button
        onClick={() => navigate('/dashboard/package-management')}
        className="flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
      >
        <span className="material-symbols-outlined text-[18px]">arrow_back</span>
        <span>Back to Packages</span>
      </button>

      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-on-surface">
          {id ? 'Edit Travel Package' : 'Create Travel Package'}
        </h2>
        <p className="text-sm text-on-surface-variant mt-1">
          Provide pricing, durations, descriptions, and regional metadata to build your travel itinerary package.
        </p>
      </div>

      {/* Form */}
      <div className="bg-white p-8 rounded-xl border border-border-subtle shadow-sm max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-on-surface-variant uppercase block">Package Name</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="e.g. Historic Route: Lalibela & Gondar"
              className="w-full bg-surface-container-low border border-border-subtle rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-on-surface-variant uppercase block">Price (USD)</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                placeholder="2450"
                className="w-full bg-surface-container-low border border-border-subtle rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-on-surface-variant uppercase block">Duration</label>
              <input
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                required
                placeholder="10 Days"
                className="w-full bg-surface-container-low border border-border-subtle rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-on-surface-variant uppercase block">Region</label>
              <div className="relative">
                <select
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className="w-full appearance-none bg-surface-container-low border border-border-subtle rounded-lg py-2.5 px-4 text-sm font-semibold text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option>Amhara</option>
                  <option>Oromia</option>
                  <option>Tigray</option>
                  <option>Afar</option>
                </select>
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-outline">
                  expand_more
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-on-surface-variant uppercase block">Description</label>
            <textarea
              rows="5"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              required
              placeholder="Provide a detailed overview of the itinerary, hotels, flight transfers..."
              className="w-full bg-surface-container-low border border-border-subtle rounded-lg p-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            ></textarea>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="bg-primary text-white px-6 py-3 rounded-xl text-sm font-semibold hover:brightness-110 active:scale-95 transition-all shadow-sm flex-grow md:flex-grow-0"
            >
              {id ? 'Update Package' : 'Publish Package'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/dashboard/package-management')}
              className="border border-border-subtle text-on-surface-variant px-6 py-3 rounded-xl text-sm font-semibold hover:bg-surface-container-low transition-all"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PlannerCreateEditPackage;
