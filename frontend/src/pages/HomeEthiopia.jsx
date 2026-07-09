import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { eventService, packageService } from '../services/api';

const HomeEthiopia = () => {
  const navigate = useNavigate();
  const [packages, setPackages] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [guests, setGuests] = useState('');

  useEffect(() => {
    const loadHomeData = async () => {
      setLoading(true);
      setError('');
      try {
        const [packageData, eventData] = await Promise.all([
          packageService.getPackages({ country: 'Ethiopia', limit: 3 }),
          eventService.getEvents({ country: 'Ethiopia', limit: 2 }),
        ]);
        setPackages(packageData || []);
        setEvents(eventData || []);
      } catch (err) {
        console.error('Failed to load home data:', err);
        setError('Unable to load live database content right now.');
      } finally {
        setLoading(false);
      }
    };

    loadHomeData();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setError('');
    const trimmedGuests = guests.trim();
    if (trimmedGuests && (!Number.isInteger(Number(trimmedGuests)) || Number(trimmedGuests) < 1)) {
      setError('Guests must be a whole number greater than zero.');
      return;
    }

    const params = new URLSearchParams();
    if (destination.trim()) params.set('destination', destination.trim());
    if (date) params.set('date', date);
    if (trimmedGuests) params.set('guests', trimmedGuests);
    navigate(`/packages?${params.toString()}`);
  };

  return (
    <div className="space-y-20">
      <header className="relative w-full h-[650px] flex flex-col items-center justify-center overflow-hidden rounded-3xl shadow-xl">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC59RN4_nKVqLpH054u19Xhpm4Yakncf2bEJ2k-97UYU8tvcDwNcydVTLEZ58N4AkYk3fXI-2VR1-5OZC1BwHOEdNWRBZoC2vJ0DI6ns9iaI6DZ1eesEsVA0ZCa3Gj_2p-oh5NsqDLmsrhTDjjTlt4cTOtpvg6cM_tYrO5AOmyj6UTIGtEYHYrAYRK7ygy5MWXcBN6zXUTBHkBk8ON5_9omceVTGOSz8nDgRkSphIAF-lRV72aE8dndjcn5Dv9bB6un6WlsxqCWCnaN')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-background via-on-surface/30 to-transparent"></div>
        </div>

        <div className="relative z-10 text-center px-margin-mobile md:px-0 max-w-3xl animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <h1 className="font-display-lg text-4xl md:text-5xl text-white mb-6 drop-shadow-lg font-bold leading-tight">
            Explore the Wonders of Ethiopia
          </h1>
          <p className="font-body-lg text-lg text-white/90 mb-10 drop-shadow-md max-w-xl mx-auto">
            Discover live Ethiopian packages and events from TravelMate planners.
          </p>

          <form onSubmit={handleSearch} className="glass-effect p-3 rounded-2xl shadow-2xl flex flex-col md:flex-row gap-2 max-w-4xl mx-auto border border-white/40">
            <div className="flex-1 flex items-center px-4 py-2 gap-3 border-b md:border-b-0 md:border-r border-border-subtle">
              <span className="material-symbols-outlined text-primary">location_on</span>
              <div className="text-left w-full">
                <p className="text-[10px] font-semibold text-on-surface-variant uppercase tracking-wider">Destination</p>
                <input className="bg-transparent border-none p-0 focus:ring-0 font-body-md text-on-surface w-full text-sm outline-none placeholder:text-outline/65" placeholder="Where in Ethiopia?" type="text" value={destination} onChange={(e) => setDestination(e.target.value)} />
              </div>
            </div>

            <div className="flex-1 flex items-center px-4 py-2 gap-3 border-b md:border-b-0 md:border-r border-border-subtle">
              <span className="material-symbols-outlined text-primary">calendar_month</span>
              <div className="text-left w-full">
                <p className="text-[10px] font-semibold text-on-surface-variant uppercase tracking-wider">Date</p>
                <input className="bg-transparent border-none p-0 focus:ring-0 font-body-md text-on-surface w-full text-sm outline-none placeholder:text-outline/65" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
              </div>
            </div>

            <div className="flex-1 flex items-center px-4 py-2 gap-3">
              <span className="material-symbols-outlined text-primary">group</span>
              <div className="text-left w-full">
                <p className="text-[10px] font-semibold text-on-surface-variant uppercase tracking-wider">Guests</p>
                <input className="bg-transparent border-none p-0 focus:ring-0 font-body-md text-on-surface w-full text-sm outline-none placeholder:text-outline/65" placeholder="How many?" min="1" type="number" value={guests} onChange={(e) => setGuests(e.target.value)} />
              </div>
            </div>

            <button type="submit" className="bg-primary text-on-primary px-8 py-3.5 rounded-xl font-label-md flex items-center justify-center gap-2 hover:bg-primary-container transition-colors shadow-lg active:scale-95 text-sm font-semibold">
              <span className="material-symbols-outlined text-lg">search</span>
              Search
            </button>
          </form>
        </div>
      </header>

      {error && <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto"><div className="bg-error-container/30 border border-error/20 text-error px-4 py-3 rounded-xl text-sm">{error}</div></div>}

      <section className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <h2 className="font-headline-lg text-2xl md:text-3xl text-on-surface mb-2 font-bold">Featured Ethiopian Experiences</h2>
            <p className="font-body-md text-on-surface-variant text-sm">Pulled directly from the travel package database.</p>
          </div>
          <Link to="/packages" className="text-primary font-label-md text-sm flex items-center gap-1 hover:underline font-semibold">View all packages <span className="material-symbols-outlined text-sm">arrow_forward</span></Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">{[1, 2, 3].map((n) => <div key={n} className="bg-white rounded-2xl h-96 animate-pulse border border-border-subtle"></div>)}</div>
        ) : packages.length === 0 ? (
          <div className="bg-white border border-border-subtle rounded-2xl p-12 text-center text-on-surface-variant">No featured packages are available in the database yet.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {packages.map((pkg) => (
              <div key={pkg.id} className="card-hover group bg-white rounded-2xl overflow-hidden shadow-sm border border-border-subtle flex flex-col justify-between">
                <div className="relative h-60 overflow-hidden bg-surface-container">
                  {pkg.image ? <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src={pkg.image} alt={pkg.title} /> : <div className="w-full h-full flex items-center justify-center text-primary"><span className="material-symbols-outlined text-5xl">travel_explore</span></div>}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-primary font-label-sm text-xs font-semibold">{pkg.type}</div>
                </div>
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2"><h3 className="font-headline-md text-lg font-bold text-on-surface truncate pr-2">{pkg.title}</h3><span className="font-headline-md text-lg font-bold text-primary">${pkg.price}</span></div>
                    <p className="font-body-sm text-on-surface-variant text-xs mb-4">{pkg.duration} Days - {pkg.lodging}</p>
                    <div className="flex flex-wrap gap-2 mb-6">{(pkg.tags || []).slice(0, 2).map((tag) => <span key={tag} className="bg-surface-variant text-primary px-2.5 py-1 rounded-full font-label-sm text-[10px]">{tag}</span>)}</div>
                  </div>
                  <button onClick={() => navigate(`/packages/${pkg.id}`)} className="w-full py-3 border border-primary text-primary rounded-xl font-label-md hover:bg-primary hover:text-on-primary transition-all active:scale-95 text-xs font-semibold">Explore Package</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto pb-20">
        <h2 className="font-headline-lg text-2xl md:text-3xl text-on-surface mb-12 text-center font-bold">Upcoming Events in Ethiopia</h2>
        <div className="flex flex-col gap-8 max-w-4xl mx-auto">
          {loading ? <div className="bg-white rounded-2xl h-48 animate-pulse border border-border-subtle"></div> : events.length === 0 ? (
            <div className="bg-white border border-border-subtle rounded-2xl p-12 text-center text-on-surface-variant">No upcoming events are available in the database yet.</div>
          ) : events.map((evt) => (
            <div key={evt.id} className="flex flex-col md:flex-row bg-white border border-border-subtle rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all">
              <div className="md:w-1/3 relative h-48 md:h-auto bg-surface-container">{evt.image ? <img className="w-full h-full object-cover" src={evt.image} alt={evt.title} /> : <div className="w-full h-full flex items-center justify-center text-primary"><span className="material-symbols-outlined text-5xl">event</span></div>}</div>
              <div className="md:w-2/3 p-6 md:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2"><h3 className="font-headline-md text-lg font-bold text-on-surface">{evt.title}</h3><span className="text-primary font-semibold text-xs whitespace-nowrap bg-primary-fixed-dim px-2.5 py-1 rounded-full">{new Date(evt.date).toLocaleDateString()}</span></div>
                  <p className="text-xs text-primary font-medium mb-3 flex items-center gap-1"><span className="material-symbols-outlined text-sm">location_on</span>{evt.location}</p>
                  <p className="font-body-md text-xs text-on-surface-variant leading-relaxed">{evt.description}</p>
                </div>
                <button onClick={() => navigate('/events')} className="mt-6 self-start text-primary font-semibold text-xs flex items-center gap-1 hover:underline">Learn More <span className="material-symbols-outlined text-xs">arrow_forward</span></button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomeEthiopia;
