import React, { useState } from 'react';

const TravelerExploreEvents = () => {
  const [activeTab, setActiveTab] = useState('All');

  const categories = ['All', 'Religious', 'Sports', 'Cultural', 'Music', 'Food'];

  const eventsList = [
    {
      id: 1,
      title: 'Meskel Festival',
      category: 'Religious',
      date: 'Sep 27, 2026',
      location: 'Meskel Square, Addis Ababa',
      attendees: '5,000+ expected',
      desc: 'Join the spectacular celebration of the Finding of the True Cross, featuring massive bonfires, chants, and traditional dances.',
      image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&q=80&w=600',
      price: 'Free',
    },
    {
      id: 2,
      title: 'Timket Celebration',
      category: 'Religious',
      date: 'Jan 19, 2027',
      location: 'Gondar, Amhara',
      attendees: '10,000+ expected',
      desc: 'Witness the colorful Epiphany celebration in Gondar\'s historic bath houses, featuring sacred processions and water blessings.',
      image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=600',
      price: '$150 (Guided)',
    },
    {
      id: 3,
      title: 'Great Ethiopian Run',
      category: 'Sports',
      date: 'Nov 19, 2026',
      location: 'Addis Ababa Streets',
      attendees: '45,000 runners',
      desc: 'Run or spectate in Africa\'s biggest road race. Experience the electric energy, music, and community spirit of Addis Ababa.',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=600',
      price: '$45 Entry',
    },
    {
      id: 4,
      title: 'Fano Cultural Festival',
      category: 'Cultural',
      date: 'Dec 12, 2026',
      location: 'Bahir Dar, Gojjam',
      attendees: '2,000+ expected',
      desc: 'Discover authentic northern music, local food, and cultural dress showcases on the shores of Lake Tana.',
      image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=600',
      price: '$30 Entry',
    },
  ];

  const filteredEvents = activeTab === 'All' 
    ? eventsList 
    : eventsList.filter(e => e.category === activeTab);

  return (
    <div className="max-w-container-max mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-on-surface">Explore Events</h2>
          <p className="text-sm text-on-surface-variant mt-1">
            Immerse yourself in the vibrant calendar of events and cultural celebrations.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-on-surface-variant">View:</span>
          <div className="relative">
            <select className="appearance-none bg-white border border-border-subtle rounded-lg py-2 pl-4 pr-10 text-sm font-semibold text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20">
              <option>Upcoming first</option>
              <option>Popularity</option>
              <option>Registration closing</option>
            </select>
            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant">
              expand_more
            </span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border-subtle overflow-x-auto gap-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`px-6 py-3 text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${
              activeTab === cat
                ? 'border-primary text-primary font-bold'
                : 'border-transparent text-on-surface-variant hover:text-primary hover:border-border-subtle'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredEvents.map((evt) => (
          <div
            key={evt.id}
            className="group bg-white rounded-2xl overflow-hidden border border-border-subtle shadow-[0px_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0px_8px_30px_rgba(0,0,0,0.08)] transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="relative h-64">
                <img
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  alt={evt.title}
                  src={evt.image}
                />
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm text-primary font-semibold text-xs px-3 py-1 rounded-full border border-border-subtle">
                  {evt.category}
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider">
                    <span className="material-symbols-outlined text-[16px]">calendar_today</span>
                    <span>{evt.date}</span>
                  </div>
                  <h4 className="font-bold text-xl text-on-surface mt-2 group-hover:text-primary transition-colors">
                    {evt.title}
                  </h4>
                  <div className="flex items-center gap-1.5 text-xs text-on-surface-variant mt-2">
                    <span className="material-symbols-outlined text-[16px]">location_on</span>
                    <span>{evt.location}</span>
                  </div>
                  <p className="text-sm text-on-surface-variant mt-3">{evt.desc}</p>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-border-subtle flex items-center justify-between bg-surface-gray">
              <div className="flex items-center gap-2 text-on-surface-variant">
                <span className="material-symbols-outlined text-[18px]">group</span>
                <span className="text-xs font-semibold">{evt.attendees}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-primary">{evt.price}</span>
                <button className="bg-primary text-white text-xs font-semibold px-4 py-2 rounded-lg hover:brightness-110 active:scale-95 transition-all">
                  Register Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TravelerExploreEvents;
