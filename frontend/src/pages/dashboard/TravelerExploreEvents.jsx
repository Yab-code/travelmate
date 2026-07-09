import React, { useEffect, useMemo, useState } from 'react';
import { bookingService, eventService, interestService } from '../../services/api';
import { useToast } from '../../context/ToastContext';

const TravelerExploreEvents = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [busyId, setBusyId] = useState(null);
  const { addToast } = useToast();

  useEffect(() => {
    const loadEvents = async () => {
      setLoading(true);
      setError('');
      try {
        const params = { country: 'Ethiopia' };
        if (activeTab !== 'All') params.category = activeTab;
        const data = await eventService.getEvents(params);
        setEvents(data || []);
      } catch (err) {
        console.error('Failed to load events:', err);
        setError('Unable to load events from the database.');
      } finally {
        setLoading(false);
      }
    };
    loadEvents();
  }, [activeTab]);

  const categories = useMemo(() => ['All', ...new Set(events.map((event) => event.category).filter(Boolean))], [events]);

  const handleSave = async (evt) => {
    try {
      setBusyId(evt.id);
      await interestService.toggleInterest('EVENT', evt.id);
      addToast('Event saved to your wishlist.', 'success');
    } catch (err) {
      addToast(err.response?.data?.message || 'Unable to save event.', 'error');
    } finally {
      setBusyId(null);
    }
  };

  const handleBook = async (evt) => {
    try {
      setBusyId(evt.id);
      await bookingService.createBooking({ type: 'EVENT', itemId: evt.id, quantity: 1 });
      addToast('Booking request submitted successfully.', 'success');
    } catch (err) {
      addToast(err.response?.data?.message || 'Unable to submit booking.', 'error');
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="max-w-container-max mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4"><div><h2 className="text-3xl font-bold text-on-surface">Explore Events</h2><p className="text-sm text-on-surface-variant mt-1">Live events from the database.</p></div></div>
      {error && <div className="p-4 bg-error-container/30 text-error rounded-xl">{error}</div>}
      <div className="flex border-b border-border-subtle overflow-x-auto gap-2 scrollbar-none">{categories.map((cat) => <button key={cat} onClick={() => setActiveTab(cat)} className={`px-6 py-3 text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${activeTab === cat ? 'border-primary text-primary font-bold' : 'border-transparent text-on-surface-variant hover:text-primary hover:border-border-subtle'}`}>{cat}</button>)}</div>
      {loading ? <div className="grid grid-cols-1 md:grid-cols-2 gap-8">{[1, 2, 3, 4].map((n) => <div key={n} className="bg-white rounded-2xl h-80 animate-pulse border border-border-subtle" />)}</div> : events.length === 0 ? <div className="bg-white rounded-xl border border-border-subtle p-12 text-center text-on-surface-variant">No events found in the database.</div> : <div className="grid grid-cols-1 md:grid-cols-2 gap-8">{events.map((evt) => <div key={evt.id} className="group bg-white rounded-2xl overflow-hidden border border-border-subtle shadow-sm transition-all flex flex-col justify-between"><div><div className="relative h-64 bg-surface-container">{evt.image ? <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt={evt.title} src={evt.image} /> : <div className="w-full h-full flex items-center justify-center text-primary"><span className="material-symbols-outlined text-5xl">event</span></div>}<div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm text-primary font-semibold text-xs px-3 py-1 rounded-full border border-border-subtle">{evt.category}</div></div><div className="p-6 space-y-4"><div><div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider"><span className="material-symbols-outlined text-[16px]">calendar_today</span><span>{new Date(evt.date).toLocaleDateString()}</span></div><h4 className="font-bold text-xl text-on-surface mt-2 group-hover:text-primary transition-colors">{evt.title}</h4><div className="flex items-center gap-1.5 text-xs text-on-surface-variant mt-2"><span className="material-symbols-outlined text-[16px]">location_on</span><span>{evt.location}</span></div><p className="text-sm text-on-surface-variant mt-3">{evt.description}</p></div></div></div><div className="p-6 border-t border-border-subtle bg-surface-gray space-y-3"><div className="flex items-center justify-between"><span className="text-xs font-semibold text-on-surface-variant">{evt.organizer || evt.company?.companyName || 'TravelMate planner'}</span><span className="text-sm font-bold text-primary">${Number(evt.price).toLocaleString()}</span></div><div className="flex gap-3"><button onClick={() => handleSave(evt)} disabled={busyId === evt.id} className="flex-1 rounded-lg border border-border-subtle px-3 py-2 text-sm font-semibold text-on-surface-variant hover:bg-surface-container-low">{busyId === evt.id ? 'Working…' : 'Save'}</button><button onClick={() => handleBook(evt)} disabled={busyId === evt.id} className="flex-1 rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-white hover:brightness-110">Book Now</button></div></div></div>)}</div>}
    </div>
  );
};

export default TravelerExploreEvents;
