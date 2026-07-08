import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const TravelerDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const recommendedDestinations = [
    {
      id: 1,
      title: 'Simien Mountains',
      tag: 'Top Rated',
      desc: 'A UNESCO World Heritage site known for its dramatic landscapes and unique endemic wildlife.',
      rating: '4.9',
      price: '$1,200',
      image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&q=80&w=600',
    },
    {
      id: 2,
      title: 'Blue Nile Falls',
      tag: 'Popular',
      desc: "Known as 'Tis Abay', these spectacular falls offer one of Ethiopia's most iconic natural sights.",
      rating: '4.8',
      price: '$850',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=600',
    },
    {
      id: 3,
      title: 'Danakil Depression',
      tag: 'Adventure',
      desc: 'The hottest place on earth, offering surreal landscapes and vibrant multi-colored salt flats.',
      rating: '4.7',
      price: '$2,100',
      image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=600',
    },
  ];

  const savedPackages = [
    {
      id: 1,
      title: 'Cultural Heritage Tour',
      duration: '7 Days in Gondar',
      price: '$1,450',
      image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&q=80&w=200',
    },
    {
      id: 2,
      title: 'Wildlife Safari Elite',
      duration: '5 Days in Omo Valley',
      price: '$2,800',
      image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=200',
    },
    {
      id: 3,
      title: 'Addis Modernism',
      duration: '3 Day City Escape',
      price: '$600',
      image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&q=80&w=200',
    },
  ];

  return (
    <div className="max-w-container-max mx-auto space-y-10">
      {/* Welcome Section */}
      <section className="animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="flex flex-col gap-2">
          <h2 className="font-headline-lg text-3xl font-semibold text-on-surface">
            Welcome back, {user?.name || 'Alex'}!
          </h2>
          <div className="flex items-center gap-2 text-primary font-medium">
            <span className="material-symbols-outlined text-[20px]">tips_and_updates</span>
            <p className="font-body-md text-sm italic text-on-surface-variant">
              Travel Insight: October is the perfect time to visit Ethiopia's northern highlands for clear skies and vibrant festivals.
            </p>
          </div>
        </div>
      </section>

      {/* Bento Layout: Upcoming Trip & Stats */}
      <div className="grid grid-cols-12 gap-6">
        {/* Upcoming Trip Card */}
        <div className="col-span-12 lg:col-span-8 bg-white/70 backdrop-blur-md rounded-xl p-8 relative overflow-hidden group shadow-[0px_4px_20px_rgba(0,0,0,0.05)] border border-border-subtle">
          <div className="absolute top-0 right-0 p-8 z-10 text-right">
            <span className="bg-secondary-container text-on-secondary-container font-label-md text-xs px-3 py-1 rounded-full">
              Coming Soon
            </span>
          </div>

          <div className="relative z-10 flex flex-col h-full justify-between gap-8">
            <div>
              <p className="font-label-sm text-xs text-primary uppercase tracking-widest mb-2 font-semibold">
                Next Destination
              </p>
              <h3 className="text-3xl lg:text-4xl font-bold text-on-surface mb-4">Historical Route, Lalibela</h3>
              <div className="flex items-center gap-6 text-on-surface-variant">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-lg">calendar_today</span>
                  <span className="text-sm font-medium">Oct 15, 2026</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-lg">hourglass_empty</span>
                  <span className="text-sm font-medium">12 Days to departure</span>
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-4">
              <button
                onClick={() => navigate('/dashboard/itinerary')}
                className="bg-primary text-on-primary px-6 py-3 rounded-xl font-label-md text-sm font-semibold flex items-center gap-2 hover:bg-primary-container transition-all active:scale-95 shadow-sm"
              >
                <span className="material-symbols-outlined">receipt_long</span>
                <span>View Itinerary</span>
              </button>
              <button
                onClick={() => navigate('/dashboard/my-bookings')}
                className="border border-border-subtle bg-white text-on-surface-variant px-6 py-3 rounded-xl font-label-md text-sm font-semibold hover:bg-surface-container-low transition-all active:scale-95"
              >
                <span>Manage Booking</span>
              </button>
            </div>
          </div>

          {/* Aesthetic Background Image for Trip */}
          <div className="absolute inset-0 opacity-10 pointer-events-none grayscale group-hover:grayscale-0 group-hover:opacity-20 transition-all duration-700">
            <img
              className="w-full h-full object-cover"
              alt="Lalibela rock-hewn churches"
              src="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&q=80&w=1200"
            />
          </div>
        </div>

        {/* Stats Cards Column */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
          <div className="bg-surface-container p-6 rounded-xl flex items-center gap-4 border border-border-subtle shadow-sm transition-transform hover:-translate-y-1">
            <div className="w-12 h-12 rounded-full bg-primary-container/20 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                travel_explore
              </span>
            </div>
            <div>
              <p className="text-xs text-on-surface-variant font-medium">Total Trips</p>
              <p className="text-2xl text-on-surface font-bold">24</p>
            </div>
          </div>

          <div className="bg-surface-container p-6 rounded-xl flex items-center gap-4 border border-border-subtle shadow-sm transition-transform hover:-translate-y-1">
            <div className="w-12 h-12 rounded-full bg-tertiary-container/20 flex items-center justify-center text-tertiary">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                favorite
              </span>
            </div>
            <div>
              <p className="text-xs text-on-surface-variant font-medium">Wishlist Items</p>
              <p className="text-2xl text-on-surface font-bold">12</p>
            </div>
          </div>

          <div className="bg-surface-container p-6 rounded-xl flex items-center gap-4 border border-border-subtle shadow-sm transition-transform hover:-translate-y-1">
            <div className="w-12 h-12 rounded-full bg-secondary-container/20 flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                speed
              </span>
            </div>
            <div>
              <p className="text-xs text-on-surface-variant font-medium">Miles Traveled</p>
              <p className="text-2xl text-on-surface font-bold">42.5k</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Destinations Grid */}
      <section className="space-y-6">
        <div className="flex justify-between items-end">
          <div>
            <h3 className="text-2xl font-bold text-on-surface">Recommended Destinations</h3>
            <p className="text-sm text-on-surface-variant">Handpicked locations based on your interests.</p>
          </div>
          <button
            onClick={() => navigate('/dashboard/explore-packages')}
            className="text-primary font-semibold text-sm flex items-center gap-1 hover:underline"
          >
            Explore all <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {recommendedDestinations.map((dest) => (
            <div
              key={dest.id}
              className="group bg-white rounded-xl overflow-hidden shadow-[0px_4px_20px_rgba(0,0,0,0.05)] border border-border-subtle hover:shadow-[0px_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300"
            >
              <div className="h-64 overflow-hidden relative">
                <img
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  alt={dest.title}
                  src={dest.image}
                />
                <span className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-primary font-semibold text-xs px-2.5 py-1 rounded-full border border-border-subtle">
                  {dest.tag}
                </span>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <h4 className="text-xl font-bold text-on-surface">{dest.title}</h4>
                  <p className="text-sm text-on-surface-variant mt-2">{dest.desc}</p>
                </div>
                <div className="flex items-center justify-between border-t border-border-subtle pt-4">
                  <div className="flex items-center gap-1 text-accent-yellow">
                    <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      star
                    </span>
                    <span className="text-sm font-semibold text-on-surface">{dest.rating}</span>
                  </div>
                  <div className="text-sm font-bold text-primary">{dest.price}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom Row Bento: Saved Packages & Notifications */}
      <div className="grid grid-cols-12 gap-8">
        {/* Saved Packages Scroll */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-bold text-on-surface">Saved Packages</h3>
          </div>
          <div className="flex gap-6 overflow-x-auto pb-4 custom-scrollbar snap-x">
            {savedPackages.map((pkg) => (
              <div
                key={pkg.id}
                onClick={() => navigate('/dashboard/explore-packages')}
                className="min-w-[280px] snap-start bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-border-subtle flex gap-4 transition-all hover:bg-surface-container-low cursor-pointer shadow-sm"
              >
                <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0">
                  <img className="w-full h-full object-cover" alt={pkg.title} src={pkg.image} />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <p className="font-semibold text-sm text-on-surface">{pkg.title}</p>
                    <p className="text-xs text-on-surface-variant mt-1">{pkg.duration}</p>
                  </div>
                  <div className="flex items-center justify-between text-primary mt-2">
                    <span className="font-bold text-sm">{pkg.price}</span>
                    <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      bookmark
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notifications Card */}
        <div className="col-span-12 lg:col-span-4 bg-white rounded-xl border border-border-subtle shadow-[0px_4px_20px_rgba(0,0,0,0.05)] flex flex-col h-full">
          <div className="p-6 border-b border-border-subtle flex justify-between items-center bg-surface-gray rounded-t-xl">
            <h3 className="text-lg font-bold text-on-surface">Recent Alerts</h3>
            <span className="bg-primary-container text-on-primary-container px-2 py-0.5 rounded-full text-xs font-semibold">
              2 New
            </span>
          </div>
          <div className="p-6 flex-1 space-y-6">
            <div className="flex gap-4 group hover:translate-x-1 transition-transform">
              <div className="w-10 h-10 rounded-full bg-secondary-container/20 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-secondary text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  check_circle
                </span>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-sm text-on-surface">Booking confirmed</p>
                <p className="text-xs text-on-surface-variant mt-0.5">Your flight to Lalibela is set for Oct 15.</p>
                <span className="text-[10px] text-on-surface-variant opacity-60">2 hours ago</span>
              </div>
            </div>

            <div className="flex gap-4 group hover:translate-x-1 transition-transform">
              <div className="w-10 h-10 rounded-full bg-primary-container/20 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-primary text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  stars
                </span>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-sm text-on-surface">New event in Addis</p>
                <p className="text-xs text-on-surface-variant mt-0.5">Meskel Festival celebration starts tomorrow.</p>
                <span className="text-[10px] text-on-surface-variant opacity-60">5 hours ago</span>
              </div>
            </div>

            <div className="flex gap-4 group opacity-60 hover:translate-x-1 transition-transform">
              <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-on-surface-variant text-[20px]">update</span>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-sm text-on-surface">Itinerary Update</p>
                <p className="text-xs text-on-surface-variant mt-0.5">Restaurant 'Yod Abyssinia' added to Day 2.</p>
                <span className="text-[10px] text-on-surface-variant opacity-60">Yesterday</span>
              </div>
            </div>
          </div>
          <button className="w-full py-4 text-sm font-semibold text-primary border-t border-border-subtle hover:bg-surface-container-lowest transition-colors rounded-b-xl">
            Clear All Notifications
          </button>
        </div>
      </div>
    </div>
  );
};

export default TravelerDashboard;
