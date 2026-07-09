import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { packageService } from '../services/api';

const PackageDetailsEthiopia = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pkg, setPkg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [guests, setGuests] = useState(2);
  const [dates, setDates] = useState('');

  useEffect(() => {
    const fetchPackage = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await packageService.getPackage(id);
        setPkg(data);
        if (!data) setError('Package not found in the database.');
      } catch (err) {
        console.error('Failed to load package details:', err);
        setError('Unable to load this package from the database.');
        setPkg(null);
      } finally {
        setLoading(false);
      }
    };
    fetchPackage();
  }, [id]);

  const itinerary = useMemo(() => Array.isArray(pkg?.itinerary) ? pkg.itinerary : [], [pkg]);
  const gallery = useMemo(() => [pkg?.image].filter(Boolean), [pkg]);
  const total = pkg ? Number(pkg.price) * guests : 0;

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-background"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div></div>;
  }

  if (!pkg) {
    return (
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-20 text-center">
        <span className="material-symbols-outlined text-6xl text-outline mb-4">travel_explore</span>
        <h1 className="text-2xl font-bold text-on-surface mb-2">Package unavailable</h1>
        <p className="text-sm text-on-surface-variant mb-6">{error}</p>
        <button onClick={() => navigate('/packages')} className="bg-primary text-on-primary px-6 py-3 rounded-xl text-sm font-semibold">Back to Packages</button>
      </div>
    );
  }

  return (
    <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-10">
      <section className="mb-12">
        <div className="relative overflow-hidden rounded-2xl shadow-sm h-[460px] bg-surface-container">
          {gallery[0] ? <img className="absolute inset-0 w-full h-full object-cover" src={gallery[0]} alt={pkg.title} /> : <div className="absolute inset-0 flex items-center justify-center text-primary"><span className="material-symbols-outlined text-7xl">travel_explore</span></div>}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
          <div className="absolute bottom-8 left-8 right-8 text-white">
            <span className="bg-primary/95 text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-full mb-3 inline-block">{pkg.type}</span>
            <h1 className="font-headline-lg text-3xl md:text-4xl font-bold mb-2">{pkg.title}</h1>
            <div className="flex items-center gap-2 text-xs opacity-90"><span className="material-symbols-outlined text-sm">location_on</span><span>{pkg.location}</span></div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-24">
        <div className="lg:col-span-8 space-y-12">
          <div className="border-b border-border-subtle pb-8">
            <div className="flex items-center gap-4 mb-4"><div className="flex items-center gap-1 text-accent-yellow"><span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span><span className="text-sm font-semibold text-on-surface-variant">{pkg.rating} ({pkg.reviewsCount} reviews)</span></div></div>
            <h2 className="text-xl font-bold text-on-surface mb-4">Experience Overview</h2>
            <p className="font-body-lg text-sm text-on-surface-variant leading-relaxed">{pkg.description}</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              {[['schedule', 'Duration', `${pkg.duration} Days`], ['group', 'Group Size', pkg.groupSize], ['language', 'Language', pkg.language], ['fitness_center', 'Difficulty', pkg.difficulty]].map(([icon, label, value]) => <div key={label} className="flex flex-col items-center p-3.5 bg-surface-container-low rounded-xl"><span className="material-symbols-outlined text-primary mb-1.5">{icon}</span><span className="text-[10px] text-outline uppercase font-semibold">{label}</span><span className="text-xs font-bold text-on-surface text-center">{value}</span></div>)}
            </div>
          </div>

          <section>
            <h2 className="text-xl font-bold text-on-surface mb-8">Itinerary</h2>
            {itinerary.length === 0 ? <div className="bg-white p-8 rounded-2xl border border-border-subtle text-sm text-on-surface-variant">No itinerary has been added for this package.</div> : <div className="space-y-6 relative before:absolute before:left-4 before:top-4 before:bottom-4 before:w-[2px] before:bg-border-subtle">{itinerary.map((day, idx) => <div key={`${day.day || idx}-${day.title || 'day'}`} className="relative pl-12 group"><div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-sm shadow-sm">{day.day || idx + 1}</div><div className="bg-white p-6 rounded-2xl border border-border-subtle group-hover:border-primary/30 transition-all shadow-sm"><h3 className="text-sm font-semibold text-on-surface mb-2">{day.title || `Day ${idx + 1}`}</h3><p className="text-xs text-on-surface-variant leading-relaxed">{day.desc || day.description || 'Details not provided.'}</p></div></div>)}</div>}
          </section>
        </div>

        <aside className="lg:col-span-4 sticky top-28">
          <div className="bg-white rounded-3xl border border-border-subtle shadow-xl p-8 relative overflow-hidden">
            <div className="flex justify-between items-end mb-8"><div><span className="text-[10px] text-outline block mb-1 uppercase font-semibold">Total price from</span><span className="text-3xl font-bold text-on-surface">${pkg.price}</span><span className="text-on-surface-variant text-xs">/person</span></div></div>
            <div className="space-y-4 mb-8">
              <div className="p-4 border border-border-subtle rounded-xl flex items-center gap-4"><span className="material-symbols-outlined text-outline">calendar_month</span><div className="flex-1"><span className="text-[10px] text-outline block uppercase font-semibold">Date</span><input type="date" value={dates} onChange={(e) => setDates(e.target.value)} className="font-semibold text-xs border-none p-0 bg-transparent focus:ring-0 text-on-surface w-full outline-none" /></div></div>
              <div className="p-4 border border-border-subtle rounded-xl flex items-center gap-4"><span className="material-symbols-outlined text-outline">person</span><div className="flex-1"><span className="text-[10px] text-outline block uppercase font-semibold">Guests</span><input min="1" type="number" value={guests} onChange={(e) => setGuests(Math.max(1, Number(e.target.value) || 1))} className="font-semibold text-xs border-none p-0 bg-transparent focus:ring-0 text-on-surface w-full outline-none" /></div></div>
            </div>
            <button disabled={!dates} className="w-full bg-primary disabled:opacity-50 text-on-primary font-bold py-4 rounded-xl shadow-lg hover:opacity-95 active:scale-[0.98] transition-all mb-4 text-sm">Request Booking</button>
            <div className="space-y-3 pt-6 border-t border-border-subtle"><div className="flex justify-between text-xs text-on-surface-variant"><span>Base package (x{guests})</span><span>${total}</span></div><div className="flex justify-between font-bold text-on-surface pt-2 border-t border-border-subtle/50 text-sm"><span>Total</span><span>${total}</span></div></div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default PackageDetailsEthiopia;
