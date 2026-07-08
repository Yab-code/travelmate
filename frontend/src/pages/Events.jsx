import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { eventService } from '../services/api';

const Events = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const filters = {};
        if (selectedCategory !== 'All') filters.category = selectedCategory;
        if (searchTerm) filters.search = searchTerm;

        const data = await eventService.getEvents(filters);
        if (data && data.length > 0) {
          setEvents(data);
        } else {
          setEvents(getDefaultEvents());
        }
      } catch (err) {
        console.error('Failed to load events:', err);
        setEvents(getDefaultEvents());
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, [selectedCategory, searchTerm]);

  const getDefaultEvents = () => [
    {
      id: 'music-fest',
      title: 'Electric Horizon Music Festival',
      category: 'Music',
      price: 120,
      date: 'Oct 12, 19:00',
      location: 'Central Park, NYC',
      organizer: 'Lumina Events Group',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDdlb26NlJDBAsmP9YawlayTKkL83Lu1v230Ea_1aYK0NghPqw3u1VJ93gJZIm9WPILr6NulR2B4fnBgEgNi1XthHq8Zvgv-R-wpnol5djvR0oYHtScP6RxijOZhSnu6wCaho7qwjOcHhVeBwPJrIkDZzK7HdQHuaT-PuIV-xDcWujjZsimCEHPmyA7l9jHKAKQHOopyjjOWBW7CPE0IEQXXCl0pX9CRoRDFhCL8B0pkHWewP4izHbaR-eYtFjR9Tb5wTF2M89FH71a',
      featured: true,
      time: '7:00 PM'
    },
    {
      id: 'bakery-workshop',
      title: 'Artisan Bakery Workshop',
      category: 'Food',
      price: 45,
      description: 'Learn the secrets of sourdough from master bakers in this hands-on morning session.',
      time: '10:00 AM',
      featured: false
    },
    {
      id: 'modernism-art',
      title: 'Modernism Reimagined',
      category: 'Art',
      price: 'Free',
      description: 'An exclusive preview of the new digital sculpture wing at the Met with the curator.',
      time: '2:00 PM',
      featured: false
    },
    {
      id: 'omakase',
      title: 'Omakase Experience',
      category: 'Food',
      price: 180,
      date: 'Nov 04 • 6:30 PM',
      location: 'Tokyo Kitchen, LDN',
      tag: 'Global Flavors',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCs8HTnb7C0C8IcCgv7LIe9_C6v-wrYsW5CqU6I5sniDtBE1xc3DuRAg29lKxzaAkxDuW9mswoNf_KHobyzKwUyoxQjv38upxDeXmoQ5FEmjS1nk-9RHOKwfdsg7nKenrT8eB0mm0v6PtTgYmegtZupuyCJnRXWu4AvVFo2TmC_Cr0iDFL2NCfNSJNjjlPWlqcb15iD1iYLRGyd4_oUk_bBxntf7RBww4k4tbmW2fBjIyzPmfKyE6oe0dGet-rUrTD5wLBUfFz-Ms6D'
    },
    {
      id: 'masters-tennis',
      title: 'Grand Slam Masters',
      category: 'Sports',
      price: 250,
      date: 'Nov 12 • 1:00 PM',
      location: 'Arena One, Paris',
      tag: 'ATP Tour',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBf1sOnVD6TrQWWfaPDKt6Wjm-DGHvh6gFBQ5i06GgDu9sOUtD02m3TD3weolQ1dAyClfGkrPZ5UrS90fQzh-P9FZHBKhRUmJiRQvhNzZJDmGdRNd-x5icVy-y4LHd6Wwjk-HJqj8xwNXgyIAXQ07Ncd9XGPkqqEc3Wno9CGxC3xqZIvRFZhCx8K2PVFiyclWtmpki-zJbmOR4t_9AJ9WWoGtQQHnUNWwCFvvlAZDELl1jS5ICzXNr5jqsFN9a2GXHD6XOABtBTi11W'
    },
    {
      id: 'jazz-session',
      title: 'Midnight Jazz Session',
      category: 'Music',
      price: 65,
      date: 'Nov 18 • 9:00 PM',
      location: 'Blue Note, NYC',
      tag: 'Late Night NYC',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCbZ2vH-BtCGXp7Hm95lmT6opyPhUi0PO1gcYHZcXZu-bpUyi0igs7XYv5JMiKI3F2abiLxNcqaeexgbswm4QxZ47wMt7lwOQHaSJ8fpp5-LjUnsmIDp4Crl6tL3VUvS1klpBMkauYZ_7kHTH4kjjxXelatWycP9lH_Jbvy0RP-jgnxGE-iNkFjvvNjqFf6D_4pdWyVTSaSQWYrsGTvIZVwO_Ra0JapzHQBak5zgsAjeWykQHoFOELOQytVHhgqYw_gm_DhB5Apaahu'
    }
  ];

  const handleBookEvent = (eventId) => {
    alert(`Event Booked successfully! ID: ${eventId}`);
  };

  const categories = [
    { name: 'All', icon: 'grade' },
    { name: 'Music', icon: 'music_note' },
    { name: 'Art', icon: 'palette' },
    { name: 'Sports', icon: 'sports_soccer' },
    { name: 'Food', icon: 'restaurant' }
  ];

  const weekendFeatured = events.find((e) => e.featured) || getDefaultEvents()[0];
  const weekendSublist = events.filter((e) => !e.featured && (e.category === selectedCategory || selectedCategory === 'All')).slice(0, 2);
  const nextMonthEvents = events.filter((e) => !e.featured && (e.category === selectedCategory || selectedCategory === 'All'));

  return (
    <div className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-10">
      {/* Hero & Header */}
      <section className="mb-12 border-b border-border-subtle pb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div className="max-w-2xl">
            <h1 className="font-display-lg text-3xl font-bold text-on-surface mb-3">Discover Amazing Events</h1>
            <p className="font-body-lg text-sm text-on-surface-variant leading-relaxed">
              Find the most exciting experiences, from local food festivals to global music tours, curated specifically for your travel style.
            </p>
          </div>
          {/* Keyword Search */}
          <div className="relative w-full md:w-80">
            <input
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-outline-variant/50 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
              placeholder="Search events..."
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-outline text-lg">search</span>
          </div>
        </div>

        {/* Category Chips */}
        <div className="flex flex-wrap gap-2.5">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setSelectedCategory(cat.name)}
              className={`px-5 py-2 rounded-full font-label-md text-xs transition-all flex items-center gap-1.5 border border-outline-variant/30 ${
                selectedCategory === cat.name
                  ? 'bg-primary text-on-primary font-semibold shadow-sm'
                  : 'bg-white hover:border-primary/50 text-on-surface-variant'
              }`}
            >
              <span className="material-symbols-outlined text-sm">{cat.icon}</span>
              <span>{cat.name} Events</span>
            </button>
          ))}
        </div>
      </section>

      {/* This Weekend Section */}
      <section className="mb-16">
        <h2 className="font-headline-lg text-xl font-bold text-on-surface mb-6 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">weekend</span>
          <span>This Weekend</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          {/* Featured Large Card */}
          {weekendFeatured && (
            <div className="md:col-span-8 group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all h-[420px] bg-white flex flex-col justify-end">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url('${weekendFeatured.image}')` }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent z-10"></div>
              <div className="absolute top-4 left-4 z-20 flex gap-2">
                <span className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                  Trending
                </span>
                <span className="bg-white/95 text-on-surface px-3 py-1 rounded-full text-[10px] font-bold">
                  ${weekendFeatured.price}
                </span>
              </div>
              <div className="relative p-6 md:p-8 z-20 w-full text-white">
                <div className="flex flex-wrap items-center gap-4 mb-2 text-white/80 text-xs">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">calendar_today</span> {weekendFeatured.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">location_on</span> {weekendFeatured.location}
                  </span>
                </div>
                <h3 className="font-headline-lg text-xl md:text-2xl font-bold mb-4">{weekendFeatured.title}</h3>
                <div className="flex items-center justify-between gap-4 border-t border-white/20 pt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center font-bold text-[10px]">
                      {weekendFeatured.organizer?.charAt(0)}
                    </div>
                    <span className="text-xs text-white/95 font-medium">{weekendFeatured.organizer}</span>
                  </div>
                  <button
                    onClick={() => handleBookEvent(weekendFeatured.id)}
                    className="bg-primary hover:bg-primary-container text-on-primary px-6 py-2.5 rounded-xl font-label-md text-xs font-semibold transition-all shadow-lg"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Vertical Stack Cards */}
          <div className="md:col-span-4 flex flex-col gap-6">
            {weekendSublist.map((evt) => (
              <div key={evt.id} className="flex-1 bg-white rounded-2xl overflow-hidden border border-border-subtle p-6 flex flex-col justify-between hover:shadow-md transition-all">
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <span className="bg-tertiary-fixed text-on-tertiary-fixed px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                      {evt.category}
                    </span>
                    <span className="text-primary font-bold text-sm">
                      {typeof evt.price === 'number' ? `$${evt.price}` : evt.price}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-on-surface leading-tight">{evt.title}</h4>
                  <p className="text-xs text-on-surface-variant leading-relaxed line-clamp-2">{evt.description}</p>
                </div>
                <div className="mt-4 pt-4 border-t border-border-subtle/50 flex items-center justify-between">
                  <span className="text-xs text-on-surface-variant flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">schedule</span> {evt.time}
                  </span>
                  <button
                    onClick={() => handleBookEvent(evt.id)}
                    className="text-primary font-semibold text-xs hover:bg-primary/5 px-4 py-1.5 rounded-lg border border-primary/20 transition-all"
                  >
                    {evt.price === 'Free' ? 'Register' : 'Book'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Events Section */}
      <section className="mb-20">
        <h2 className="font-headline-lg text-xl font-bold text-on-surface mb-6 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">event_upcoming</span>
          <span>Popular Events Next Month</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {nextMonthEvents.map((evt) => (
            <div key={evt.id} className="bg-white rounded-2xl overflow-hidden border border-border-subtle hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="relative h-44 w-full bg-surface-container">
                  {evt.image ? (
                    <img className="w-full h-full object-cover" src={evt.image} alt={evt.title} />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-primary-fixed-dim text-primary font-bold">
                      {evt.category}
                    </div>
                  )}
                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur px-2.5 py-1 rounded-lg shadow-sm text-xs font-bold text-primary">
                    {typeof evt.price === 'number' ? `$${evt.price}` : evt.price}
                  </div>
                </div>
                <div className="p-6">
                  <span className="text-secondary font-semibold text-xs block mb-1">{evt.date || 'TBD'}</span>
                  <h5 className="text-sm font-bold text-on-surface mb-3 truncate">{evt.title}</h5>
                  <p className="text-xs text-on-surface-variant flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-sm">location_on</span>
                    {evt.location || 'Online'}
                  </p>
                </div>
              </div>
              <div className="px-6 pb-6 pt-4 border-t border-border-subtle/50 flex items-center justify-between gap-4">
                <span className="text-xs text-outline font-semibold uppercase">{evt.tag || evt.category}</span>
                <button
                  onClick={() => handleBookEvent(evt.id)}
                  className="bg-primary text-on-primary px-4 py-2 rounded-xl text-xs font-semibold hover:opacity-90 transition-all shadow-sm"
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Events;
