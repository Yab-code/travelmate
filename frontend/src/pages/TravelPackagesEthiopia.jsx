import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { packageService } from '../services/api';

const TravelPackagesEthiopia = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Parse URL search parameters
  const queryParams = new URLSearchParams(location.search);
  const initialSearch = queryParams.get('destination') || '';

  // Filter States
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [priceRange, setPriceRange] = useState(3000);
  const [selectedDuration, setSelectedDuration] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('recommended');

  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPackages = async () => {
      setLoading(true);
      try {
        const filters = { country: 'Ethiopia' };
        if (searchTerm) filters.search = searchTerm;
        if (selectedCategory !== 'all') filters.category = selectedCategory;

        const data = await packageService.getPackages(filters);
        if (data && data.length > 0) {
          setPackages(data);
        } else {
          setPackages(getDefaultEthiopiaPackages());
        }
      } catch (err) {
        console.error('Failed to load packages:', err);
        setPackages(getDefaultEthiopiaPackages());
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, [searchTerm, selectedCategory]);

  const getDefaultEthiopiaPackages = () => [
    {
      id: 'lalibela',
      title: 'Lalibela Heritage Tour',
      price: 899,
      duration: 4,
      type: 'Heritage Site',
      lodging: 'Luxury Lodging',
      tags: ['Expert Guide', '5★ Service', 'Transfers Included'],
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA7vIJEqWIdD-grjQX1Gm6iYFU_v-aSEVNT_m3SkDFdTXE7WsAD_lj4B68U3SuvzK42QwUAl2jSCZqJNOzX8tvZhTOiEma2N6L4CiU66i88R8fRYZedpUy5VBOTLz-nNQnBZLP9ygifKuHRDlOahGvvxGAlqJBNgv1xXHzniRSbKQmQ6Eg8HE6zROyHiL1CgGl1hHZPcVr_TiBBPRaoKWjW1XwGTWyv-CcQAULr65Bbg355ywNRR03qwt5la4xiDNGlJUkdFB45qkmP'
    },
    {
      id: 'danakil',
      title: 'Danakil Expedition',
      price: 1150,
      duration: 5,
      type: 'Adventure',
      lodging: 'Camping & Lodges',
      tags: ['4x4 Transport', 'Meals Included', 'Security Support'],
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBQ6LyB7r8sYkKsWjOfijAAm2o79rCLoMEKhfuLgIr7X95Y0y91oFkN2ZjdvfB6TGOm63rMltTF9dAihzZD55log3EFrvyjNEDA5CJt2RKL2_dkmkR3LGaxyxteD4koHnEoSjZNYSfvsvWYk3ngplYYW8qABZuvjT2i5Rc1nAT4bOzfDixQgz0TqEJgyZVUrOgoDwVp6BE5YiqkHHYi9H4Sp2vi8OV4UrJw1MlRW18k6Sem57jHh_mdhJWl9rMYcNg8CXDRWN4Br1V0'
    },
    {
      id: 'blue-nile',
      title: 'Blue Nile Falls Tour',
      price: 650,
      duration: 3,
      type: 'Nature',
      lodging: 'Eco Resort',
      tags: ['Boat Tours', 'Bird Watching', 'Gondar Stopover'],
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDXdYcB8205deDMGSyRterEVzvmprl35ix084xwjTzItRJHESAMLuJ8pxHkH7DMn-WzPzmO0xf5Cl6GF28JqJQMnfrEsGLJRPNWKY0igVTrWSEFkX1Zo11mBEZAsot2ZwGGB-cOkKMuuR5STJ4qv-YUebSf78U3cOdlvXOZcW0qD5c0ojLO067TH-0lBjPhjeKUbYNB4v_pEprhlPzoTQh7MyM2dDY168KFBg9fJdSyt_DZvlmGwDfr_R1m6nv9bRzBWc95omHjQ2M5'
    },
    {
      id: 'simien-mountains',
      title: 'Simien Mountains Trekking',
      price: 950,
      duration: 6,
      type: 'Trekking',
      lodging: 'Mountain Camps',
      tags: ['High Altitude', 'Wildlife', 'Professional Scout'],
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC59RN4_nKVqLpH054u19Xhpm4Yakncf2bEJ2k-97UYU8tvcDwNcydVTLEZ58N4AkYk3fXI-2VR1-5OZC1BwHOEdNWRBZoC2vJ0DI6ns9iaI6DZ1eesEsVA0ZCa3Gj_2p-oh5NsqDLmsrhTDjjTlt4cTOtpvg6cM_tYrO5AOmyj6UTIGtEYHYrAYRK7ygy5MWXcBN6zXUTBHkBk8ON5_9omceVTGOSz8nDgRkSphIAF-lRV72aE8dndjcn5Dv9bB6un6WlsxqCWCnaN'
    }
  ];

  // Client-side filtering
  const filteredPackages = packages
    .filter((pkg) => {
      if (pkg.price > priceRange) return false;

      if (selectedDuration !== 'all') {
        if (selectedDuration === 'short' && pkg.duration > 3) return false;
        if (selectedDuration === 'medium' && (pkg.duration < 4 || pkg.duration > 7)) return false;
        if (selectedDuration === 'long' && pkg.duration < 8) return false;
      }

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
      return 0;
    });

  return (
    <div className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-10">
      {/* Search & Refine Header */}
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border-subtle pb-6">
        <div>
          <h1 className="font-headline-lg text-3xl font-bold text-on-surface mb-2">Ethiopian Packages</h1>
          <p className="font-body-md text-on-surface-variant text-sm">Discover the ancient heritage and landscape of origins.</p>
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
                  placeholder="Where in Ethiopia?"
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
                max="3000"
                min="300"
                step="50"
                type="range"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
              />
              <div className="flex justify-between text-xs text-on-surface-variant">
                <span>$300</span>
                <span>$3,000</span>
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
                  { value: 'long', label: '8+ Days' }
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
                {['all', 'Heritage Site', 'Adventure', 'Nature', 'Trekking'].map((cat) => (
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
                      onClick={() => navigate(`/et/packages/${pkg.id}`)}
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

export default TravelPackagesEthiopia;
