import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { packageService } from '../services/api';

const TravelPackagesEthiopia = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const [searchTerm, setSearchTerm] = useState(queryParams.get('destination') || '');
  const [guests, setGuests] = useState(queryParams.get('guests') || '');
  const [date, setDate] = useState(queryParams.get('date') || '');
  const [priceRange, setPriceRange] = useState(3000);
  const [selectedDuration, setSelectedDuration] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('recommended');
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSearchTerm(params.get('destination') || '');
    setGuests(params.get('guests') || '');
    setDate(params.get('date') || '');
  }, [location.search]);

  useEffect(() => {
    const fetchPackages = async () => {
      setLoading(true);
      setError('');
      try {
        const filters = { country: 'Ethiopia' };
        if (searchTerm.trim()) filters.destination = searchTerm.trim();
        if (selectedCategory !== 'all') filters.category = selectedCategory;
        if (guests) filters.guests = guests;
        if (date) filters.date = date;
        const data = await packageService.getPackages(filters);
        setPackages(data || []);
      } catch (err) {
        console.error('Failed to load packages:', err);
        setError('Unable to load packages from the database.');
        setPackages([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, [searchTerm, selectedCategory, guests, date]);

  const filteredPackages = useMemo(() => packages
    .filter((pkg) => {
      if (Number(pkg.price) > priceRange) return false;
      if (selectedDuration === 'short' && pkg.duration > 3) return false;
      if (selectedDuration === 'medium' && (pkg.duration < 4 || pkg.duration > 7)) return false;
      if (selectedDuration === 'long' && pkg.duration < 8) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'price-asc') return Number(a.price) - Number(b.price);
      if (sortBy === 'price-desc') return Number(b.price) - Number(a.price);
      return 0;
    }), [packages, priceRange, selectedDuration, sortBy]);

  const updateSearchParams = (next) => {
    const params = new URLSearchParams(location.search);
    Object.entries(next).forEach(([key, value]) => {
      if (value) params.set(key, value);
      else params.delete(key);
    });
    navigate(`/packages?${params.toString()}`, { replace: true });
  };

  const handleGuestsChange = (value) => {
    if (value && (!Number.isInteger(Number(value)) || Number(value) < 1)) return;
    setGuests(value);
    updateSearchParams({ guests: value });
  };

  return (
    <div className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-10">
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border-subtle pb-6">
        <div>
          <h1 className="font-headline-lg text-3xl font-bold text-on-surface mb-2">Ethiopian Packages</h1>
          <p className="font-body-md text-on-surface-variant text-sm">Every result below is loaded from the database.</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-label-md text-on-surface-variant text-sm font-medium">Sort by:</span>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="bg-white border border-outline-variant/50 rounded-lg text-body-sm focus:border-primary focus:ring-1 focus:ring-primary px-4 py-2 text-sm outline-none">
            <option value="recommended">Recommended</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {error && <div className="mb-6 bg-error-container/30 border border-error/20 text-error px-4 py-3 rounded-xl text-sm">{error}</div>}

      <div className="flex flex-col lg:flex-row gap-gutter">
        <aside className="w-full lg:w-72 shrink-0 space-y-6">
          <div className="glass-card p-6 rounded-2xl shadow-sm space-y-6 bg-white border border-border-subtle">
            <h3 className="font-label-md text-on-surface font-semibold text-sm border-b border-border-subtle pb-3 uppercase tracking-wider">Filters</h3>
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-on-surface-variant uppercase">Destination</label>
              <div className="relative">
                <input className="w-full pl-10 pr-4 py-2.5 bg-surface border border-outline-variant/50 rounded-lg text-body-md text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" placeholder="Where in Ethiopia?" type="text" value={searchTerm} onChange={(e) => { setSearchTerm(e.target.value); updateSearchParams({ destination: e.target.value }); }} />
                <span className="material-symbols-outlined absolute left-3 top-2.5 text-outline text-lg">location_on</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-on-surface-variant uppercase">Date</label>
                <input className="w-full px-3 py-2.5 bg-surface border border-outline-variant/50 rounded-lg text-sm outline-none" type="date" value={date} onChange={(e) => { setDate(e.target.value); updateSearchParams({ date: e.target.value }); }} />
              </div>
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-on-surface-variant uppercase">Guests</label>
                <input className="w-full px-3 py-2.5 bg-surface border border-outline-variant/50 rounded-lg text-sm outline-none" min="1" type="number" value={guests} onChange={(e) => handleGuestsChange(e.target.value)} />
              </div>
            </div>
            <div className="space-y-3">
              <label className="block text-xs font-semibold text-on-surface-variant uppercase">Max Price (${priceRange})</label>
              <input className="w-full accent-primary h-1.5 bg-surface-container rounded-lg appearance-none cursor-pointer" max="3000" min="0" step="50" type="range" value={priceRange} onChange={(e) => setPriceRange(Number(e.target.value))} />
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-on-surface-variant uppercase">Duration</label>
              <div className="flex flex-wrap gap-2">{[{ value: 'all', label: 'Any' }, { value: 'short', label: '1-3 Days' }, { value: 'medium', label: '4-7 Days' }, { value: 'long', label: '8+ Days' }].map((d) => <button key={d.value} onClick={() => setSelectedDuration(d.value)} className={`py-1.5 px-3 rounded-lg text-xs transition-all border ${selectedDuration === d.value ? 'border-primary bg-primary/10 text-primary font-semibold' : 'border-outline-variant/30 hover:border-primary/50 text-on-surface-variant bg-white'}`}>{d.label}</button>)}</div>
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-on-surface-variant uppercase">Category</label>
              <div className="flex flex-col gap-2">{['all', 'Heritage Site', 'Adventure', 'Nature', 'Trekking'].map((cat) => <label key={cat} className="flex items-center gap-2 text-xs text-on-surface-variant cursor-pointer hover:text-on-surface transition-colors"><input type="radio" name="category" checked={selectedCategory === cat} onChange={() => setSelectedCategory(cat)} className="text-primary focus:ring-primary focus:ring-offset-0" /><span>{cat === 'all' ? 'All Categories' : cat}</span></label>)}</div>
            </div>
          </div>
        </aside>

        <div className="flex-grow">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">{[1, 2, 3, 4].map((n) => <div key={n} className="bg-white rounded-2xl h-96 animate-pulse border border-border-subtle"></div>)}</div>
          ) : filteredPackages.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-border-subtle"><span className="material-symbols-outlined text-5xl text-outline mb-4">search_off</span><h3 className="font-headline-md text-lg font-bold text-on-surface mb-1">No Packages Found</h3><p className="text-xs text-on-surface-variant">No database records match the selected filters.</p></div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
              {filteredPackages.map((pkg) => (
                <div key={pkg.id} className="card-hover group bg-white rounded-2xl overflow-hidden shadow-sm border border-border-subtle flex flex-col justify-between">
                  <div className="relative h-64 overflow-hidden bg-surface-container">{pkg.image ? <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src={pkg.image} alt={pkg.title} /> : <div className="w-full h-full flex items-center justify-center text-primary"><span className="material-symbols-outlined text-5xl">travel_explore</span></div>}<div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-primary font-label-sm text-xs font-semibold">{pkg.type}</div></div>
                  <div className="p-6 flex-grow flex flex-col justify-between"><div><div className="flex justify-between items-start mb-2"><h3 className="font-headline-md text-lg font-bold text-on-surface pr-2 truncate">{pkg.title}</h3><span className="font-headline-md text-lg font-bold text-primary">${pkg.price}</span></div><p className="font-body-sm text-on-surface-variant text-xs mb-4">{pkg.duration} Days - {pkg.lodging}</p><div className="flex flex-wrap gap-2 mb-6">{(pkg.tags || []).map((tag) => <span key={tag} className="bg-surface-variant text-primary px-2.5 py-1 rounded-full font-label-sm text-[10px]">{tag}</span>)}</div></div><button onClick={() => navigate(`/packages/${pkg.id}`)} className="w-full py-3 border border-primary text-primary rounded-xl font-label-md hover:bg-primary hover:text-on-primary transition-all active:scale-95 text-xs font-semibold">Explore Package</button></div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TravelPackagesEthiopia;
