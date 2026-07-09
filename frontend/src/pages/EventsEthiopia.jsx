import React, { useEffect, useMemo, useState } from 'react';
import { eventService } from '../services/api';

const categories = [
  { name: 'All', icon: 'grade' },
  { name: 'Religious', icon: 'church' },
  { name: 'Cultural', icon: 'celebration' },
  { name: 'Sports', icon: 'directions_run' },
  { name: 'Music', icon: 'music_note' },
  { name: 'Food', icon: 'restaurant' },
];

const EventsEthiopia = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      setError('');
      try {
        const filters = { country: 'Ethiopia' };
        if (selectedCategory !== 'All') filters.category = selectedCategory;
        const data = await eventService.getEvents(filters);
        setEvents(data || []);
      } catch (err) {
        console.error('Failed to load events:', err);
        setError('Unable to load events from the database.');
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, [selectedCategory]);

  const featuredEvent = useMemo(() => events.find((event) => event.featured), [events]);
  const listEvents = useMemo(() => events.filter((event) => !event.featured), [events]);

  return (
    <div className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-10">
      <section className="mb-12 border-b border-border-subtle pb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <h1 className="font-display-lg text-3xl font-bold text-on-surface mb-3">Ethiopian Festivals & Events</h1>
            <p className="text-sm text-on-surface-variant leading-relaxed max-w-xl">Live events published by approved TravelMate planners.</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2.5">
          {categories.map((cat) => (
            <button key={cat.name} onClick={() => setSelectedCategory(cat.name)} className={`px-5 py-2 rounded-full font-label-md text-xs transition-all flex items-center gap-1.5 border border-outline-variant/30 ${selectedCategory === cat.name ? 'bg-primary text-on-primary font-semibold shadow-sm' : 'bg-white hover:border-primary/50 text-on-surface-variant'}`}>
              <span className="material-symbols-outlined text-sm">{cat.icon}</span><span>{cat.name}</span>
            </button>
          ))}
        </div>
      </section>

      {error && <div className="mb-6 bg-error-container/30 border border-error/20 text-error px-4 py-3 rounded-xl text-sm">{error}</div>}

      {featuredEvent && (
        <section className="mb-16">
          <h2 className="font-headline-lg text-xl font-bold text-on-surface mb-6 flex items-center gap-2"><span className="material-symbols-outlined text-primary">stars</span><span>Signature Event</span></h2>
          <div className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all h-[440px] bg-surface-container">
            {featuredEvent.image ? <img className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src={featuredEvent.image} alt={featuredEvent.title} /> : <div className="absolute inset-0 flex items-center justify-center text-primary"><span className="material-symbols-outlined text-6xl">event</span></div>}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent"></div>
            <div className="absolute top-4 left-4 flex gap-2"><span className="bg-primary text-on-primary px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">{featuredEvent.category}</span><span className="bg-white/95 text-on-surface px-3 py-1 rounded-full text-[10px] font-bold">${featuredEvent.price}</span></div>
            <div className="absolute bottom-0 left-0 p-6 md:p-10 text-white w-full">
              <div className="flex flex-wrap items-center gap-4 mb-3 text-white/80 text-xs"><span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">calendar_today</span>{new Date(featuredEvent.date).toLocaleDateString()}</span><span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">location_on</span>{featuredEvent.location}</span></div>
              <h3 className="text-xl md:text-2xl font-bold mb-3 leading-tight">{featuredEvent.title}</h3>
              <p className="text-xs text-white/80 leading-relaxed mb-5 max-w-xl line-clamp-2">{featuredEvent.description}</p>
              <div className="flex items-center justify-between gap-4 border-t border-white/15 pt-4"><span className="text-xs text-white/70">Organized by {featuredEvent.organizer || featuredEvent.company?.companyName || 'TravelMate planner'}</span></div>
            </div>
          </div>
        </section>
      )}

      <section className="mb-20">
        <h2 className="font-headline-lg text-xl font-bold text-on-surface mb-6 flex items-center gap-2"><span className="material-symbols-outlined text-primary">event</span><span>All Ethiopian Events</span></h2>
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter">{[1, 2, 3].map((n) => <div key={n} className="bg-white rounded-2xl h-80 animate-pulse border border-border-subtle"></div>)}</div>
        ) : listEvents.length === 0 && !featuredEvent ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-border-subtle"><span className="material-symbols-outlined text-5xl text-outline mb-4">event_busy</span><h3 className="font-headline-md text-lg font-bold text-on-surface mb-1">No Events Found</h3><p className="text-xs text-on-surface-variant">No database records match the selected category.</p></div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {listEvents.map((evt) => (
              <div key={evt.id} className="bg-white rounded-2xl overflow-hidden border border-border-subtle hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col">
                <div className="relative h-44 w-full bg-surface-container overflow-hidden">{evt.image ? <img className="w-full h-full object-cover" src={evt.image} alt={evt.title} /> : <div className="w-full h-full flex items-center justify-center bg-primary-fixed-dim"><span className="material-symbols-outlined text-4xl text-primary">celebration</span></div>}<div className="absolute top-3 right-3 bg-white/95 backdrop-blur px-2.5 py-1 rounded-lg shadow-sm text-xs font-bold text-primary">${evt.price}</div><div className="absolute top-3 left-3 bg-primary/90 text-on-primary px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wide">{evt.category}</div></div>
                <div className="p-5 flex-grow flex flex-col justify-between space-y-3"><div><div className="flex items-center gap-1.5 text-secondary font-semibold text-xs mb-2"><span className="material-symbols-outlined text-sm">calendar_today</span>{new Date(evt.date).toLocaleDateString()}</div><h5 className="text-sm font-bold text-on-surface leading-tight mb-2">{evt.title}</h5><p className="text-xs text-on-surface-variant leading-relaxed line-clamp-3">{evt.description}</p></div><div><div className="flex items-center gap-1.5 text-xs text-on-surface-variant mb-4"><span className="material-symbols-outlined text-sm">location_on</span>{evt.location}</div><div className="flex items-center justify-between gap-4 pt-4 border-t border-border-subtle/50"><span className="text-[10px] text-outline font-semibold uppercase tracking-wide">{evt.organizer || evt.company?.companyName || 'TravelMate planner'}</span></div></div></div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default EventsEthiopia;
