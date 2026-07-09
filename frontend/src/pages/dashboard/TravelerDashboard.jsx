import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { eventService, packageService } from '../../services/api';

const TravelerDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [packages, setPackages] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      setLoading(true);
      try {
        const [packageData, eventData] = await Promise.all([
          packageService.getPackages({ country: 'Ethiopia', limit: 3 }),
          eventService.getEvents({ country: 'Ethiopia', limit: 3 }),
        ]);
        setPackages(packageData || []);
        setEvents(eventData || []);
      } catch (err) {
        console.error('Failed to load traveler dashboard:', err);
        setPackages([]);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };
    loadDashboard();
  }, []);

  return (
    <div className="max-w-container-max mx-auto space-y-10">
      <section><div className="flex flex-col gap-2"><h2 className="font-headline-lg text-3xl font-semibold text-on-surface">Welcome back, {user?.name || 'Traveler'}!</h2><p className="font-body-md text-sm text-on-surface-variant">Your dashboard is showing live Ethiopian packages and events from the database.</p></div></section>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-surface-container p-6 rounded-xl flex items-center gap-4 border border-border-subtle shadow-sm"><div className="w-12 h-12 rounded-full bg-primary-container/20 flex items-center justify-center text-primary"><span className="material-symbols-outlined">travel_explore</span></div><div><p className="text-xs text-on-surface-variant font-medium">Available Packages</p><p className="text-2xl text-on-surface font-bold">{packages.length}</p></div></div>
        <div className="bg-surface-container p-6 rounded-xl flex items-center gap-4 border border-border-subtle shadow-sm"><div className="w-12 h-12 rounded-full bg-secondary-container/20 flex items-center justify-center text-secondary"><span className="material-symbols-outlined">event</span></div><div><p className="text-xs text-on-surface-variant font-medium">Upcoming Events</p><p className="text-2xl text-on-surface font-bold">{events.length}</p></div></div>
        <div className="bg-surface-container p-6 rounded-xl flex items-center gap-4 border border-border-subtle shadow-sm"><div className="w-12 h-12 rounded-full bg-tertiary-container/20 flex items-center justify-center text-tertiary"><span className="material-symbols-outlined">star</span></div><div><p className="text-xs text-on-surface-variant font-medium">Avg. Rating</p><p className="text-2xl text-on-surface font-bold">{packages.length ? (packages.reduce((sum, pkg) => sum + Number(pkg.rating || 0), 0) / packages.length).toFixed(1) : '0.0'}</p></div></div>
      </div>
      <section className="space-y-6"><div className="flex justify-between items-end"><div><h3 className="text-2xl font-bold text-on-surface">Recommended Packages</h3><p className="text-sm text-on-surface-variant">Loaded from active package records.</p></div><button onClick={() => navigate('/dashboard/explore-packages')} className="text-primary font-semibold text-sm flex items-center gap-1 hover:underline">Explore all <span className="material-symbols-outlined text-[18px]">arrow_forward</span></button></div>{loading ? <div className="grid grid-cols-1 md:grid-cols-3 gap-8">{[1, 2, 3].map((n) => <div key={n} className="bg-white rounded-xl h-80 animate-pulse border border-border-subtle" />)}</div> : packages.length === 0 ? <div className="bg-white rounded-xl border border-border-subtle p-12 text-center text-on-surface-variant">No packages found in the database.</div> : <div className="grid grid-cols-1 md:grid-cols-3 gap-8">{packages.map((pkg) => <div key={pkg.id} className="group bg-white rounded-xl overflow-hidden shadow-sm border border-border-subtle"><div className="h-64 overflow-hidden relative bg-surface-container">{pkg.image ? <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt={pkg.title} src={pkg.image} /> : <div className="w-full h-full flex items-center justify-center text-primary"><span className="material-symbols-outlined text-5xl">travel_explore</span></div>}<span className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-primary font-semibold text-xs px-2.5 py-1 rounded-full border border-border-subtle">{pkg.type}</span></div><div className="p-6 space-y-4"><h4 className="text-xl font-bold text-on-surface">{pkg.title}</h4><p className="text-sm text-on-surface-variant line-clamp-3">{pkg.description}</p><div className="flex items-center justify-between border-t border-border-subtle pt-4"><span className="text-sm font-semibold text-on-surface">{pkg.rating}</span><span className="text-sm font-bold text-primary">${pkg.price}</span></div></div></div>)}</div>}</section>
      <section className="space-y-6"><h3 className="text-2xl font-bold text-on-surface">Upcoming Events</h3>{events.length === 0 ? <div className="bg-white rounded-xl border border-border-subtle p-12 text-center text-on-surface-variant">No events found in the database.</div> : <div className="grid grid-cols-1 md:grid-cols-3 gap-6">{events.map((event) => <div key={event.id} className="bg-white rounded-xl border border-border-subtle p-6 shadow-sm"><p className="text-xs text-primary font-bold uppercase mb-2">{new Date(event.date).toLocaleDateString()}</p><h4 className="font-bold text-on-surface mb-2">{event.title}</h4><p className="text-xs text-on-surface-variant line-clamp-3">{event.location}</p></div>)}</div>}</section>
    </div>
  );
};

export default TravelerDashboard;
