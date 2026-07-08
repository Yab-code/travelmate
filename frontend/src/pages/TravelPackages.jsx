import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { packageService } from '../services/api';

const TravelPackages = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Parse URL search parameters
  const queryParams = new URLSearchParams(location.search);
  const initialSearch = queryParams.get('destination') || '';
  const initialGuests = queryParams.get('guests') || '';

  // Filter States
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [priceRange, setPriceRange] = useState(5000);
  const [selectedDuration, setSelectedDuration] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('recommended');

  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPackages = async () => {
      setLoading(true);
      try {
        const filters = {};
        if (searchTerm) filters.search = searchTerm;
        if (selectedCategory !== 'all') filters.category = selectedCategory;

        const data = await packageService.getPackages(filters);
        if (data && data.length > 0) {
          setPackages(data);
        } else {
          setPackages(getDefaultPackages());
        }
      } catch (err) {
        console.error('Failed to load packages:', err);
        setPackages(getDefaultPackages());
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, [searchTerm, selectedCategory]);

  const getDefaultPackages = () => [
    {
      id: 'bali',
      title: 'Bali Gateway',
      price: 1200,
      duration: 7,
      type: 'Relaxation',
      lodging: 'Luxury Resort',
      tags: ['Free Wifi', 'Spa Included', 'Airport Transfer'],
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAONR5NkclNYSLpAQ1Ymkk5rSTR12lZsHoSjG4FCZplT3Q_s6GTaGmWvdXILx4QDtrBk9jCVxjTHAS3t19E722SSAQERbd75wETc0RHz30i_yEobq75dYvenPG0jkFg0n6ak28Iq2wD1Z5xMcndLyzOmRjZzkrjmMNnXSdEBA40x0Y4bn9DhwHWAc6WViPCzPvtssBVI49u1iPWIXIR_cEG0jt-2hT5ptHds5ETQsR-C5MMJCnNhGtZWYxeBM1R-wjNMMpl2BSML3HL'
    },
    {
      id: 'tokyo',
      title: 'Tokyo Explorer',
      price: 1650,
      duration: 5,
      type: 'Adventure',
      lodging: 'Boutique Hotel',
      tags: ['Guide Included', 'Daily Breakfast', 'Subway Pass'],
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCufW5oorp8bGOM4AXTCRoMDKlC_h3sSE1BcszUKGWek66b23cX2YcJj4E0f22BLvSq8MMMIHTwb6aUPAzc6PvpUB7QiHTisZyqsev7rfMHTPx5Aru3Ks3NszTcKF4Pk-S_CdBGJk4QiewF_t89v_nRX8N7tgy3Z71m3XElQC3jryHlTNKWJ54E6G3YASnZix-RvykRdYqwlbwuCZIz1-IXUFeuPt3EfdaD5zBNKJNz7r4tDJsWW_6dAS9rl4CMnDvGZKf_UxWpDe2_'
    },
    {
      id: 'swiss-alps',
      title: 'Swiss Alps Skiing',
      price: 2450,
      duration: 6,
      type: 'Ski Tour',
      lodging: 'Alpine Chalet',
      tags: ['Gear Provided', 'Ski Pass', 'Thermal Bath'],
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAONR5NkclNYSLpAQ1Ymkk5rSTR12lZsHoSjG4FCZplT3Q_s6GTaGmWvdXILx4QDtrBk9jCVxjTHAS3t19E722SSAQERbd75wETc0RHz30i_yEobq75dYvenPG0jkFg0n6ak28Iq2wD1Z5xMcndLyzOmRjZzkrjmMNnXSdEBA40x0Y4bn9DhwHWAc6WViPCzPvtssBVI49u1iPWIXIR_cEG0jt-2hT5ptHds5ETQsR-C5MMJCnNhGtZWYxeBM1R-wjNMMpl2BSML3HL'
    },
    {
      id: 'paris',
      title: 'Parisian Getaway',
      price: 1800,
      duration: 4,
      type: 'Romantic',
      lodging: 'City Center Hotel',
      tags: ['Museum Pass', 'Cruise Ticket'],
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCufW5oorp8bGOM4AXTCRoMDKlC_h3sSE1BcszUKGWek66b23cX2YcJj4E0f22BLvSq8MMMIHTwb6aUPAzc6PvpUB7QiHTisZyqsev7rfMHTPx5Aru3Ks3NszTcKF4Pk-S_CdBGJk4QiewF_t89v_nRX8N7tgy3Z71m3XElQC3jryHlTNKWJ54E6G3YASnZix-RvykRdYqwlbwuCZIz1-IXUFeuPt3EfdaD5zBNKJNz7r4tDJsWW_6dAS9rl4CMnDvGZKf_UxWpDe2_'
    }
  ];

  // Apply Client-side filtering for simulated data or fallback API
  const filteredPackages = packages
    .filter((pkg) => {
      // Filter by Price
      if (pkg.price > priceRange) return false;

      // Filter by Duration
      if (selectedDuration !== 'all') {
        if (selectedDuration === 'short' && pkg.duration > 3) return false;
        if (selectedDuration === 'medium' && (pkg.duration < 4 || pkg.duration > 7)) return false;
        if (selectedDuration === 'long' && (pkg.duration < 8 || pkg.duration > 14)) return false;
        if (selectedDuration === 'extra-long' && pkg.duration < 15) return false;
      }

      // Filter by search text
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        const matchesTitle = pkg.title.toLowerCase().includes(term);
        const matchesType = pkg.type?.toLowerCase().includes(term);
        if (!matchesTitle && !matchesType) return false;
      }

      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      return 0; // Default recommended
    });

  return (
    <div className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-10">
      {/* Search & Refine Header */}
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border-subtle pb-6">
        <div>
          <h1 className="font-headline-lg text-3xl font-bold text-on-surface mb-2">Explore Packages</h1>
          <p className="font-body-md text-on-surface-variant text-sm">Handpicked premium travel experiences across the globe.</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-label-md text-on-surface-variant text-sm font-medium">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-white border border-outline-variant/50 rounded-lg text-body-sm focus:border-primary focus:ring-1 focus:ring-primary px-4 py-2 text-sm outline-none"
          >
            <option value="recommended">Recommended</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-gutter">
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-72 shrink-0 space-y-6">
          <div className="glass-card p-6 rounded-2xl shadow-sm space-y-6 bg-white border border-border-subtle">
            <h3 className="font-label-md text-on-surface font-semibold text-sm border-b border-border-subtle pb-3 uppercase tracking-wider">Filters</h3>

            {/* Keyword Search */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-on-surface-variant uppercase">Keywords</label>
              <div className="relative">
                <input
                  className="w-full pl-10 pr-4 py-2.5 bg-surface border border-outline-variant/50 rounded-lg text-body-md text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                  placeholder="Where to?"
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <span className="material-symbols-outlined absolute left-3 top-2.5 text-outline text-lg">location_on</span>
              </div>
            </div>

            {/* Price Filter */}
            <div className="space-y-3">
              <label className="block text-xs font-semibold text-on-surface-variant uppercase">Max Price (${priceRange})</label>
              <input
                className="w-full accent-primary h-1.5 bg-surface-container rounded-lg appearance-none cursor-pointer"
                max="5000"
                min="500"
                step="100"
                type="range"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
              />
              <div className="flex justify-between text-xs text-on-surface-variant">
                <span>$500</span>
                <span>$5,000</span>
              </div>
            </div>

            {/* Duration Filter */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-on-surface-variant uppercase">Duration</label>
              <div className="flex flex-wrap gap-2">
                {[
                  { value: 'all', label: 'Any' },
                  { value: 'short', label: '1-3 Days' },
                  { value: 'medium', label: '4-7 Days' },
                  { value: 'long', label: '8-14 Days' }
                ].map((d) => (
                  <button
                    key={d.value}
                    onClick={() => setSelectedDuration(d.value)}
                    className={`py-1.5 px-3 rounded-lg text-xs transition-all border ${
                      selectedDuration === d.value
                        ? 'border-primary bg-primary/10 text-primary font-semibold'
                        : 'border-outline-variant/30 hover:border-primary/50 text-on-surface-variant bg-white'
                    }`}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Category Filter */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-on-surface-variant uppercase">Category</label>
              <div className="flex flex-col gap-2">
                {['all', 'Relaxation', 'Adventure', 'Ski Tour', 'Romantic'].map((cat) => (
                  <label key={cat} className="flex items-center gap-2 text-xs text-on-surface-variant cursor-pointer hover:text-on-surface transition-colors">
                    <input
                      type="radio"
                      name="category"
                      checked={selectedCategory === cat}
                      onChange={() => setSelectedCategory(cat)}
                      className="text-primary focus:ring-primary focus:ring-offset-0"
                    />
                    <span>{cat === 'all' ? 'All Categories' : cat}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Packages Grid */}
        <div className="flex-grow">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
              {[1, 2, 4].map((n) => (
                <div key={n} className="bg-white rounded-2xl h-96 animate-pulse border border-border-subtle"></div>
              ))}
            </div>
          ) : filteredPackages.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-border-subtle">
              <span className="material-symbols-outlined text-5xl text-outline mb-4">search_off</span>
              <h3 className="font-headline-md text-lg font-bold text-on-surface mb-1">No Packages Found</h3>
              <p className="text-xs text-on-surface-variant">Try refining your search terms or filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
              {filteredPackages.map((pkg) => (
                <div key={pkg.id} className="card-hover group bg-white rounded-2xl overflow-hidden shadow-sm border border-border-subtle flex flex-col justify-between">
                  <div className="relative h-64 overflow-hidden">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                      style={{ backgroundImage: `url('${pkg.image || 'https://via.placeholder.com/600x400'}')` }}
                    ></div>
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-primary font-label-sm text-xs font-semibold">
                      {pkg.type}
                    </div>
                  </div>
                  <div className="p-6 flex-grow flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-headline-md text-lg font-bold text-on-surface pr-2 truncate">{pkg.title}</h3>
                        <span className="font-headline-md text-lg font-bold text-primary">${pkg.price}</span>
                      </div>
                      <p className="font-body-sm text-on-surface-variant text-xs mb-4">
                        {pkg.duration} Days • {pkg.lodging || 'Hotel'}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {pkg.tags.map((tag, idx) => (
                          <span key={idx} className="bg-surface-variant text-primary px-2.5 py-1 rounded-full font-label-sm text-[10px]">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <button
                      onClick={() => navigate(`/packages/${pkg.id}`)}
                      className="w-full py-3 border border-primary text-primary rounded-xl font-label-md hover:bg-primary hover:text-on-primary transition-all active:scale-95 text-xs font-semibold"
                    >
                      Explore Package
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TravelPackages;
