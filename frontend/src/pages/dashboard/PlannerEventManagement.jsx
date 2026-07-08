import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PlannerEventManagement = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Meskel Festival Bonfire Celebration',
      date: 'Sep 27, 2026',
      location: 'Meskel Square, Addis Ababa',
      attendees: 5200,
      status: 'Confirmed',
      image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&q=80&w=200',
    },
    {
      id: 2,
      title: 'Great Ethiopian Run Marathon Group',
      date: 'Nov 19, 2026',
      location: 'Addis Ababa Streets',
      attendees: 45000,
      status: 'In Progress',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=200',
    },
  ]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this event schedule?')) {
      setEvents(events.filter((evt) => evt.id !== id));
    }
  };

  return (
    <div className="max-w-container-max mx-auto space-y-8">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-on-surface">Event Management</h2>
          <p className="text-sm text-on-surface-variant mt-1">
            Create, manage, verify registration slots, and coordinate upcoming tourist events.
          </p>
        </div>
        <button
          onClick={() => navigate('/dashboard/event-new')}
          className="bg-primary text-on-primary px-5 py-3 rounded-xl font-label-md text-sm font-semibold hover:bg-primary-container transition-all shadow-sm flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-[20px]">add</span>
          <span>Create Event Schedule</span>
        </button>
      </div>

      {/* Events table */}
      <div className="bg-white rounded-xl border border-border-subtle shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-gray border-b border-border-subtle text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                <th className="px-6 py-4">Event Name</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Location</th>
                <th className="px-6 py-4">Attendees</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle text-sm text-on-surface">
              {events.map((evt) => (
                <tr key={evt.id} className="hover:bg-surface-container-low transition-colors group">
                  <td className="px-6 py-4 font-bold text-on-surface">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0">
                        <img className="w-full h-full object-cover" alt={evt.title} src={evt.image} />
                      </div>
                      <span className="font-semibold text-on-surface hover:text-primary transition-colors cursor-pointer" onClick={() => navigate(`/dashboard/event-edit/${evt.id}`)}>
                        {evt.title}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium text-xs text-on-surface-variant">{evt.date}</td>
                  <td className="px-6 py-4 font-medium text-on-surface-variant truncate max-w-[200px]">{evt.location}</td>
                  <td className="px-6 py-4 font-bold">{evt.attendees.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                        evt.status === 'Confirmed'
                          ? 'bg-secondary-container text-on-secondary-container'
                          : 'bg-surface-container-highest text-on-primary-fixed-variant'
                      }`}
                    >
                      {evt.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => navigate(`/dashboard/event-edit/${evt.id}`)}
                        className="px-3 py-1.5 border border-border-subtle rounded-lg text-xs font-semibold hover:bg-surface-container-low transition-all"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(evt.id)}
                        className="p-1.5 text-error hover:bg-error/5 rounded-lg transition-all"
                        title="Delete"
                      >
                        <span className="material-symbols-outlined text-[20px]">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PlannerEventManagement;
