import React, { useState } from 'react';

const TravelerItinerary = () => {
  const [selectedDay, setSelectedDay] = useState(1);
  const [newActivity, setNewActivity] = useState('');
  const [timeSlot, setTimeSlot] = useState('09:00 AM');
  
  const [itineraryDays, setItineraryDays] = useState({
    1: [
      { id: 1, time: '09:00 AM', text: 'Airport pickup & check-in at Hilton Hotel' },
      { id: 2, time: '01:00 PM', text: 'Traditional lunch at National Museum restaurant' },
      { id: 3, time: '04:00 PM', text: 'City tour of Holy Trinity Cathedral' },
      { id: 4, time: '07:30 PM', text: 'Cultural dance & buffet at Yod Abyssinia' },
    ],
    2: [
      { id: 5, time: '08:30 AM', text: 'Morning flight to Gondar' },
      { id: 6, time: '11:00 AM', text: 'Check-in at Goha Hotel (High-altitude views)' },
      { id: 7, time: '02:00 PM', text: 'Guided exploration of Fasil Ghebbi (Royal Enclosure)' },
    ],
    3: [
      { id: 8, time: '09:00 AM', text: 'Trek to Debre Birhan Selassie Church' },
      { id: 9, time: '01:00 PM', text: 'Traditional coffee ceremony showcase' },
      { id: 10, time: '04:00 PM', text: 'Evening market walk & local food tasting' },
    ],
  });

  const handleAddActivity = (e) => {
    e.preventDefault();
    if (!newActivity) return;
    const newActObj = {
      id: Date.now(),
      time: timeSlot,
      text: newActivity,
    };
    
    // Sort activity list by time slots roughly
    const dayActivities = [...itineraryDays[selectedDay], newActObj].sort((a, b) => 
      a.time.localeCompare(b.time)
    );
    
    setItineraryDays({
      ...itineraryDays,
      [selectedDay]: dayActivities,
    });
    setNewActivity('');
  };

  const handleDeleteActivity = (id) => {
    setItineraryDays({
      ...itineraryDays,
      [selectedDay]: itineraryDays[selectedDay].filter((act) => act.id !== id),
    });
  };

  return (
    <div className="max-w-container-max mx-auto space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-on-surface">Itinerary Planner</h2>
        <p className="text-sm text-on-surface-variant mt-1">
          Customize your daily schedule, add travel activities, and manage your time slots.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Column: Days Selector */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white p-6 rounded-xl border border-border-subtle shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-on-surface border-b border-border-subtle pb-3">Trip Days</h3>
            <div className="flex flex-col gap-2">
              {[1, 2, 3].map((day) => (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`w-full py-3 px-4 rounded-lg font-semibold text-sm transition-all text-left flex items-center justify-between ${
                    selectedDay === day
                      ? 'bg-primary text-white font-bold shadow-sm'
                      : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
                  }`}
                >
                  <span>Day {day}</span>
                  <span className="text-xs opacity-75">{itineraryDays[day]?.length || 0} activities</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Center Column: Itinerary list */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-xl border border-border-subtle shadow-sm space-y-6">
            <div className="flex justify-between items-center border-b border-border-subtle pb-4">
              <h3 className="text-lg font-bold text-on-surface">Day {selectedDay} Schedule</h3>
              <span className="text-xs text-primary font-bold bg-primary/10 px-3 py-1 rounded-full uppercase tracking-wider">
                Active Itinerary
              </span>
            </div>

            {itineraryDays[selectedDay]?.length === 0 ? (
              <div className="py-12 text-center text-on-surface-variant opacity-60">
                No activities planned for this day yet. Use the planner to add some!
              </div>
            ) : (
              <div className="relative border-l-2 border-border-subtle ml-3 space-y-8 py-2">
                {itineraryDays[selectedDay].map((act) => (
                  <div key={act.id} className="relative pl-8 group">
                    <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-primary border-4 border-white shadow-sm"></div>
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="font-mono text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">
                          {act.time}
                        </span>
                        <p className="text-sm font-semibold text-on-surface mt-2 leading-relaxed">
                          {act.text}
                        </p>
                      </div>
                      <button
                        onClick={() => handleDeleteActivity(act.id)}
                        className="opacity-0 group-hover:opacity-100 text-error hover:bg-error/5 p-1 rounded transition-opacity"
                        title="Delete Activity"
                      >
                        <span className="material-symbols-outlined text-[20px]">delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Add Custom Activity Form */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-xl border border-border-subtle shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-on-surface border-b border-border-subtle pb-3">
              Add Activity
            </h3>
            <form onSubmit={handleAddActivity} className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-on-surface-variant uppercase block">Time Slot</label>
                <div className="relative">
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full appearance-none bg-surface-container-low border border-border-subtle rounded-lg py-2.5 px-4 text-sm font-semibold text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    <option>08:00 AM</option>
                    <option>09:00 AM</option>
                    <option>10:30 AM</option>
                    <option>12:00 PM</option>
                    <option>01:00 PM</option>
                    <option>02:30 PM</option>
                    <option>04:00 PM</option>
                    <option>05:30 PM</option>
                    <option>07:00 PM</option>
                    <option>08:30 PM</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-outline">
                    expand_more
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-on-surface-variant uppercase">Activity Details</label>
                <textarea
                  rows="3"
                  value={newActivity}
                  onChange={(e) => setNewActivity(e.target.value)}
                  placeholder="e.g. Visit Gondar castle, traditional lunch..."
                  className="w-full bg-surface-container-low border border-border-subtle rounded-lg p-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-primary text-white rounded-xl text-sm font-semibold hover:brightness-110 active:scale-95 transition-all shadow-sm"
              >
                Add to Day {selectedDay}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelerItinerary;
