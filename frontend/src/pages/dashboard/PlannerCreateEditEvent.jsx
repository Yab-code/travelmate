import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const PlannerCreateEditEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState(id ? 'Meskel Festival Bonfire Celebration' : '');
  const [date, setDate] = useState(id ? '2026-09-27' : '');
  const [location, setLocation] = useState(id ? 'Meskel Square, Addis Ababa' : '');
  const [attendees, setAttendees] = useState(id ? '5200' : '');
  const [desc, setDesc] = useState(
    id
      ? 'Join the spectacular celebration of the Finding of the True Cross, featuring massive bonfires, chants, and traditional dances.'
      : ''
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Event ${id ? 'updated' : 'created'} successfully!`);
    navigate('/dashboard/event-management');
  };

  return (
    <div className="max-w-container-max mx-auto space-y-8">
      {/* Back button */}
      <button
        onClick={() => navigate('/dashboard/event-management')}
        className="flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
      >
        <span className="material-symbols-outlined text-[18px]">arrow_back</span>
        <span>Back to Events</span>
      </button>

      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-on-surface">
          {id ? 'Edit Event Schedule' : 'Create Event Schedule'}
        </h2>
        <p className="text-sm text-on-surface-variant mt-1">
          Coordinate upcoming event dates, locations, expected attendees, and detailed schedules.
        </p>
      </div>

      {/* Form */}
      <div className="bg-white p-8 rounded-xl border border-border-subtle shadow-sm max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-on-surface-variant uppercase block">Event Name</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="e.g. Meskel Festival Bonfire Celebration"
              className="w-full bg-surface-container-low border border-border-subtle rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-on-surface-variant uppercase block">Event Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="w-full bg-surface-container-low border border-border-subtle rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-xs font-bold text-on-surface-variant uppercase block">Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
                placeholder="e.g. Meskel Square, Addis Ababa"
                className="w-full bg-surface-container-low border border-border-subtle rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-on-surface-variant uppercase block">Attendees Cap / Expected</label>
            <input
              type="number"
              value={attendees}
              onChange={(e) => setAttendees(e.target.value)}
              required
              placeholder="e.g. 5000"
              className="w-full bg-surface-container-low border border-border-subtle rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-on-surface-variant uppercase block">Description</label>
            <textarea
              rows="5"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              required
              placeholder="Provide a detailed overview of the cultural event, itineraries, safety instructions..."
              className="w-full bg-surface-container-low border border-border-subtle rounded-lg p-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            ></textarea>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="bg-primary text-white px-6 py-3 rounded-xl text-sm font-semibold hover:brightness-110 active:scale-95 transition-all shadow-sm flex-grow md:flex-grow-0"
            >
              {id ? 'Update Event' : 'Publish Event'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/dashboard/event-management')}
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

export default PlannerCreateEditEvent;
