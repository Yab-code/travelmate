import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { eventService } from '../../services/api';

const PlannerEventManagement = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchEvents = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await eventService.getEvents({ country: 'Ethiopia' });
      setEvents(data || []);
    } catch (err) {
      console.error('Failed to load events:', err);
      setError(err.response?.data?.message || 'Failed to load events from the database.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchEvents(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this event schedule?')) return;
    try {
      await eventService.deleteEvent(id);
      fetchEvents();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete event');
    }
  };

  return (
    <div className="max-w-container-max mx-auto space-y-8">
      <div className="flex justify-between items-end"><div><h2 className="text-3xl font-bold text-on-surface">Event Management</h2><p className="text-sm text-on-surface-variant mt-1">Create, manage, and coordinate database event schedules.</p></div><button onClick={() => navigate('/dashboard/event-new')} className="bg-primary text-on-primary px-5 py-3 rounded-xl font-label-md text-sm font-semibold hover:bg-primary-container transition-all shadow-sm flex items-center gap-2"><span className="material-symbols-outlined text-[20px]">add</span><span>Create Event Schedule</span></button></div>
      {error && <div className="p-4 bg-error-container/30 text-error rounded-xl">{error}</div>}
      <div className="bg-white rounded-xl border border-border-subtle shadow-sm overflow-hidden">
        {loading ? <div className="flex items-center justify-center p-12"><div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div></div> : <div className="overflow-x-auto"><table className="w-full text-left border-collapse"><thead><tr className="bg-surface-gray border-b border-border-subtle text-xs font-bold text-on-surface-variant uppercase tracking-wider"><th className="px-6 py-4">Event Name</th><th className="px-6 py-4">Date</th><th className="px-6 py-4">Location</th><th className="px-6 py-4">Price</th><th className="px-6 py-4">Category</th><th className="px-6 py-4 text-right">Actions</th></tr></thead><tbody className="divide-y divide-border-subtle text-sm text-on-surface">{events.length === 0 ? <tr><td colSpan="6" className="px-6 py-12 text-center text-on-surface-variant">No events found in the database.</td></tr> : events.map((evt) => <tr key={evt.id} className="hover:bg-surface-container-low transition-colors group"><td className="px-6 py-4 font-bold text-on-surface"><div className="flex items-center gap-3"><div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-surface-container">{evt.image ? <img className="w-full h-full object-cover" alt={evt.title} src={evt.image} /> : null}</div><span className="font-semibold text-on-surface hover:text-primary transition-colors cursor-pointer" onClick={() => navigate(`/dashboard/event-edit/${evt.id}`)}>{evt.title}</span></div></td><td className="px-6 py-4 font-medium text-xs text-on-surface-variant">{new Date(evt.date).toLocaleDateString()}</td><td className="px-6 py-4 font-medium text-on-surface-variant truncate max-w-[200px]">{evt.location}</td><td className="px-6 py-4 font-bold">${evt.price}</td><td className="px-6 py-4"><span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-secondary-container text-on-secondary-container">{evt.category}</span></td><td className="px-6 py-4 text-right"><div className="flex items-center justify-end gap-2"><button onClick={() => navigate(`/dashboard/event-edit/${evt.id}`)} className="px-3 py-1.5 border border-border-subtle rounded-lg text-xs font-semibold hover:bg-surface-container-low transition-all">Edit</button><button onClick={() => handleDelete(evt.id)} className="p-1.5 text-error hover:bg-error/5 rounded-lg transition-all" title="Delete"><span className="material-symbols-outlined text-[20px]">delete</span></button></div></td></tr>)}</tbody></table></div>}
      </div>
    </div>
  );
};

export default PlannerEventManagement;
