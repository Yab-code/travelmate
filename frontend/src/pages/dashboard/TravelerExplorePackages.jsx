import React, { useEffect, useMemo, useState } from 'react';
import { packageService } from '../../services/api';

const TravelerExplorePackages = () => {
  const [activityType, setActivityType] = useState('all');
  const [price, setPrice] = useState(3000);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadPackages = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await packageService.getPackages({ country: 'Ethiopia' });
        setPackages(data || []);
      } catch (err) {
        console.error('Failed to load packages:', err);
        setError('Unable to load packages from the database.');
      } finally {
        setLoading(false);
      }
    };
    loadPackages();
  }, []);

  const filteredPackages = useMemo(() => packages.filter((pkg) => Number(pkg.price) <= price && (activityType === 'all' || pkg.type === activityType)), [packages, price, activityType]);
  const types = useMemo(() => ['all', ...new Set(packages.map((pkg) => pkg.type).filter(Boolean))], [packages]);

  return (
    <div className="max-w-container-max mx-auto space-y-6">
      <div className="flex justify-between items-end"><div><h2 className="text-3xl font-bold text-on-surface">Explore Packages</h2><p className="text-sm text-on-surface-variant mt-1">Live Ethiopian packages from the database.</p></div></div>
      {error && <div className="p-4 bg-error-container/30 text-error rounded-xl">{error}</div>}
      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="w-full lg:w-64 flex-shrink-0 space-y-8 bg-white p-6 rounded-xl border border-border-subtle shadow-sm">
          <section><h3 className="font-semibold text-xs text-on-surface uppercase tracking-wider mb-4">Price Range</h3><input type="range" min="0" max="5000" value={price} onChange={(e) => setPrice(Number(e.target.value))} className="w-full h-1.5 bg-surface-container rounded-lg appearance-none cursor-pointer accent-primary" /><div className="flex justify-between text-xs text-on-surface-variant mt-2"><span>$0</span><span className="font-bold text-primary">${price}</span><span>$5,000+</span></div></section>
          <section><h3 className="font-semibold text-xs text-on-surface uppercase tracking-wider mb-4">Activity Type</h3><div className="flex flex-wrap gap-2">{types.map((type) => <button key={type} onClick={() => setActivityType(type)} className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${activityType === type ? 'bg-primary text-white' : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'}`}>{type === 'all' ? 'All' : type}</button>)}</div></section>
        </aside>
        <div className="flex-grow">
          {loading ? <div className="grid grid-cols-1 md:grid-cols-2 gap-8">{[1, 2, 3, 4].map((n) => <div key={n} className="bg-white rounded-2xl h-96 animate-pulse border border-border-subtle" />)}</div> : filteredPackages.length === 0 ? <div className="bg-white rounded-xl border border-border-subtle p-12 text-center text-on-surface-variant">No packages found in the database.</div> : <div className="grid grid-cols-1 md:grid-cols-2 gap-8">{filteredPackages.map((pkg) => <div key={pkg.id} className="group bg-white rounded-2xl overflow-hidden border border-border-subtle shadow-sm flex flex-col justify-between"><div><div className="relative h-64 bg-surface-container">{pkg.image ? <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt={pkg.title} src={pkg.image} /> : <div className="w-full h-full flex items-center justify-center text-primary"><span className="material-symbols-outlined text-5xl">travel_explore</span></div>}</div><div className="p-6 space-y-4"><div className="flex justify-between items-start"><h4 className="font-bold text-lg text-on-surface group-hover:text-primary transition-colors">{pkg.title}</h4><div className="flex items-center gap-1 text-accent-yellow shrink-0"><span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span><span className="text-sm font-bold text-on-surface">{pkg.rating}</span></div></div><p className="text-sm text-on-surface-variant line-clamp-3">{pkg.description}</p></div></div><div className="p-6 border-t border-border-subtle flex items-center justify-between bg-surface-gray"><div className="flex gap-4"><span className="text-xs font-semibold text-on-surface-variant">{pkg.duration} Days</span><span className="text-xs font-semibold text-on-surface-variant">{pkg.groupSize}</span></div><div className="text-right"><p className="text-[10px] text-on-surface-variant uppercase font-bold">Starting from</p><p className="text-xl font-extrabold text-primary">${pkg.price}</p></div></div></div>)}</div>}
        </div>
      </div>
    </div>
  );
};

export default TravelerExplorePackages;
