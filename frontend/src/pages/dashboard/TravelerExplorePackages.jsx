import React, { useState } from 'react';

const TravelerExplorePackages = () => {
  const [selectedRegions, setSelectedRegions] = useState(['Amhara']);
  const [activityType, setActivityType] = useState('Expedition');
  const [duration, setDuration] = useState('8-14 Days');
  const [price, setPrice] = useState(3000);

  const packagesList = [
    {
      id: 1,
      title: 'The Historic Route: Lalibela & Gondar',
      desc: "Journey through the heart of Ethiopia's Christian history, exploring the legendary rock-hewn churches and the royal enclosure of Gondar.",
      rating: '4.9',
      price: '$2,450',
      duration: '10 Days',
      maxPeople: 'Max 8',
      type: 'History',
      region: 'Amhara',
      image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&q=80&w=600',
      badge: 'Top Rated',
    },
    {
      id: 2,
      title: 'Danakil Expedition: The Alien World',
      desc: 'Experience the hottest place on Earth. Explore Erta Ale\'s lava lake and the surreal Dallol sulfur springs on this once-in-a-lifetime trek.',
      rating: '4.8',
      price: '$1,890',
      duration: '6 Days',
      maxPeople: 'Trekking',
      type: 'Expedition',
      region: 'Afar',
      image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=600',
      badge: 'Epic Adventure',
    },
    {
      id: 3,
      title: 'Simien Highlands & Wildlife Trek',
      desc: 'Trek the "Chessboard of the Gods." Spot the rare Gelada monkeys, Walia ibex, and Ethiopian wolves in a landscape of dramatic cliffs.',
      rating: '4.7',
      price: '$2,100',
      duration: '8 Days',
      maxPeople: 'Wildlife',
      type: 'Hiking',
      region: 'Amhara',
      image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=600',
      badge: '',
    },
    {
      id: 4,
      title: 'Omo Valley: Tribes of the South',
      desc: 'A sensitive cultural journey to meet the Mursi, Hamer, and Karo tribes. Experience ancient traditions and vibrant markets in the lush south.',
      rating: '4.9',
      price: '$3,200',
      duration: '12 Days',
      maxPeople: 'Cultural',
      type: 'Cultural',
      region: 'Oromia',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=600',
      badge: 'Cultural Deep-Dive',
    },
  ];

  const handleRegionChange = (region) => {
    if (selectedRegions.includes(region)) {
      setSelectedRegions(selectedRegions.filter((r) => r !== region));
    } else {
      setSelectedRegions([...selectedRegions, region]);
    }
  };

  return (
    <div className="max-w-container-max mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-3xl font-bold text-on-surface">Explore Packages</h2>
            <p className="text-sm text-on-surface-variant mt-1">
              Discover the breathtaking beauty of Ethiopia through curated expeditions.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-on-surface-variant">Sort by:</span>
            <div className="relative">
              <select className="appearance-none bg-white border border-border-subtle rounded-lg py-2 pl-4 pr-10 text-sm font-semibold text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20">
                <option>Recommended</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Top Rated</option>
              </select>
              <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant">
                expand_more
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filter Sidebar */}
        <aside className="w-full lg:w-64 flex-shrink-0 space-y-8 bg-white p-6 rounded-xl border border-border-subtle shadow-sm">
          <section>
            <h3 className="font-semibold text-xs text-on-surface uppercase tracking-wider mb-4">Region</h3>
            <div className="space-y-3">
              {['Amhara', 'Oromia', 'Tigray', 'Afar'].map((r) => (
                <label key={r} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={selectedRegions.includes(r)}
                    onChange={() => handleRegionChange(r)}
                    className="w-5 h-5 rounded border-border-subtle text-primary focus:ring-primary/20"
                  />
                  <span className="text-sm text-on-surface-variant group-hover:text-primary transition-colors">
                    {r}
                  </span>
                </label>
              ))}
            </div>
          </section>

          <section>
            <h3 className="font-semibold text-xs text-on-surface uppercase tracking-wider mb-4">Price Range</h3>
            <div className="px-2 space-y-2">
              <input
                type="range"
                min="500"
                max="5000"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full h-1.5 bg-surface-container rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-xs text-on-surface-variant">
                <span>$500</span>
                <span className="font-bold text-primary">${price}</span>
                <span>$5,000+</span>
              </div>
            </div>
          </section>

          <section>
            <h3 className="font-semibold text-xs text-on-surface uppercase tracking-wider mb-4">Duration</h3>
            <div className="space-y-3">
              {['1-3 Days', '4-7 Days', '8-14 Days'].map((dur) => (
                <label key={dur} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="radio"
                    name="duration"
                    checked={duration === dur}
                    onChange={() => setDuration(dur)}
                    className="w-5 h-5 border-border-subtle text-primary focus:ring-primary/20"
                  />
                  <span className="text-sm text-on-surface-variant group-hover:text-primary transition-colors">
                    {dur}
                  </span>
                </label>
              ))}
            </div>
          </section>

          <section>
            <h3 className="font-semibold text-xs text-on-surface uppercase tracking-wider mb-4">Activity Type</h3>
            <div className="flex flex-wrap gap-2">
              {['Cultural', 'Hiking', 'Expedition', 'History', 'Wildlife'].map((type) => (
                <button
                  key={type}
                  onClick={() => setActivityType(type)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    activityType === type
                      ? 'bg-primary text-white'
                      : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </section>
        </aside>

        {/* Catalog list */}
        <div className="flex-grow space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {packagesList.map((pkg) => (
              <div
                key={pkg.id}
                className="group bg-white rounded-2xl overflow-hidden border border-border-subtle shadow-[0px_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0px_8px_30px_rgba(0,0,0,0.08)] transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-64">
                    <img
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      alt={pkg.title}
                      src={pkg.image}
                    />
                    <button className="absolute top-4 right-4 w-10 h-10 bg-white/75 backdrop-blur-md rounded-full flex items-center justify-center text-on-surface-variant hover:text-error hover:bg-white transition-all shadow-sm">
                      <span
                        className="material-symbols-outlined text-[20px]"
                        style={{ fontVariationSettings: "'FILL' 0" }}
                      >
                        favorite
                      </span>
                    </button>
                    {pkg.badge && (
                      <div className="absolute bottom-4 left-4 bg-primary/95 text-white px-3 py-1 rounded-lg text-xs font-bold shadow-sm">
                        {pkg.badge}
                      </div>
                    )}
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-lg text-on-surface group-hover:text-primary transition-colors">
                        {pkg.title}
                      </h4>
                      <div className="flex items-center gap-1 text-accent-yellow shrink-0">
                        <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                          star
                        </span>
                        <span className="text-sm font-bold text-on-surface">{pkg.rating}</span>
                      </div>
                    </div>
                    <p className="text-sm text-on-surface-variant line-clamp-3">{pkg.desc}</p>
                  </div>
                </div>

                <div className="p-6 border-t border-border-subtle flex items-center justify-between bg-surface-gray">
                  <div className="flex gap-4">
                    <div className="flex items-center gap-1 text-on-surface-variant">
                      <span className="material-symbols-outlined text-[18px]">schedule</span>
                      <span className="text-xs font-semibold">{pkg.duration}</span>
                    </div>
                    <div className="flex items-center gap-1 text-on-surface-variant">
                      <span className="material-symbols-outlined text-[18px]">group</span>
                      <span className="text-xs font-semibold">{pkg.maxPeople}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-on-surface-variant uppercase font-bold">Starting from</p>
                    <p className="text-xl font-extrabold text-primary">{pkg.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelerExplorePackages;
