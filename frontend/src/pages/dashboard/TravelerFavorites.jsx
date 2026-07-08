import React from 'react';
import { useNavigate } from 'react-router-dom';

const TravelerFavorites = () => {
  const navigate = useNavigate();

  const favoritePackages = [
    {
      id: 1,
      title: 'The Historic Route: Lalibela & Gondar',
      desc: "Journey through the heart of Ethiopia's Christian history, exploring the legendary rock-hewn churches and the royal enclosure of Gondar.",
      rating: '4.9',
      price: '$2,450',
      duration: '10 Days',
      image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&q=80&w=600',
    },
    {
      id: 2,
      title: 'Wildlife Safari: Omo Valley',
      desc: 'A sensitive cultural journey to meet the Mursi, Hamer, and Karo tribes. Experience ancient traditions and vibrant markets in the lush south.',
      rating: '4.9',
      price: '$3,200',
      duration: '12 Days',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=600',
    },
  ];

  return (
    <div className="max-w-container-max mx-auto space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-on-surface">My Wishlist</h2>
        <p className="text-sm text-on-surface-variant mt-1">
          Here are your saved travel packages and experiences.
        </p>
      </div>

      {favoritePackages.length === 0 ? (
        <div className="bg-white rounded-xl border border-border-subtle p-12 text-center max-w-md mx-auto space-y-4">
          <span className="material-symbols-outlined text-4xl text-outline opacity-60">heart_broken</span>
          <h3 className="text-lg font-bold text-on-surface">Your wishlist is empty</h3>
          <p className="text-sm text-on-surface-variant">
            Explore packages and click the heart icon on any destination to save it here!
          </p>
          <button
            onClick={() => navigate('/dashboard/explore-packages')}
            className="bg-primary text-white text-xs font-semibold px-4 py-2.5 rounded-lg hover:brightness-110 active:scale-95 transition-all"
          >
            Explore Packages
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {favoritePackages.map((pkg) => (
            <div
              key={pkg.id}
              onClick={() => navigate('/dashboard/explore-packages')}
              className="group bg-white rounded-2xl overflow-hidden border border-border-subtle shadow-[0px_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0px_8px_30px_rgba(0,0,0,0.08)] transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="relative h-64">
                  <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={pkg.title} src={pkg.image} />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      // Wishlist remove mock action
                    }}
                    className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center text-error shadow-sm"
                  >
                    <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      favorite
                    </span>
                  </button>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-lg text-on-surface group-hover:text-primary transition-colors line-clamp-1">
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
                <span className="text-xs font-semibold text-on-surface-variant flex items-center gap-1">
                  <span className="material-symbols-outlined text-[18px]">schedule</span>
                  {pkg.duration}
                </span>
                <span className="text-lg font-bold text-primary">{pkg.price}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TravelerFavorites;
