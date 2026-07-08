import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { packageService } from '../services/api';

const HomeEthiopia = () => {
  const navigate = useNavigate();
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search form state
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [guests, setGuests] = useState('');

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        // Query packages with region/country filter if backend supports it
        const data = await packageService.getPackages({ country: 'Ethiopia', limit: 3 });
        if (data && data.length > 0) {
          setPackages(data);
        } else {
          setPackages(getDefaultEthiopiaPackages());
        }
      } catch (err) {
        console.error('Failed to fetch packages:', err);
        setPackages(getDefaultEthiopiaPackages());
      } finally {
        setLoading(false);
      }
    };
    fetchPackages();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/et/packages?destination=${encodeURIComponent(destination)}&date=${encodeURIComponent(date)}&guests=${encodeURIComponent(guests)}`);
  };

  const getDefaultEthiopiaPackages = () => [
    {
      id: 'lalibela',
      title: 'Lalibela Heritage',
      price: 899,
      duration: '4 Days',
      type: 'Heritage Site',
      lodging: 'Luxury Lodging',
      tags: ['Expert Guide', '5★ Service'],
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA7vIJEqWIdD-grjQX1Gm6iYFU_v-aSEVNT_m3SkDFdTXE7WsAD_lj4B68U3SuvzK42QwUAl2jSCZqJNOzX8tvZhTOiEma2N6L4CiU66i88R8fRYZedpUy5VBOTLz-nNQnBZLP9ygifKuHRDlOahGvvxGAlqJBNgv1xXHzniRSbKQmQ6Eg8HE6zROyHiL1CgGl1hHZPcVr_TiBBPRaoKWjW1XwGTWyv-CcQAULr65Bbg355ywNRR03qwt5la4xiDNGlJUkdFB45qkmP'
    },
    {
      id: 'danakil',
      title: 'Danakil Expedition',
      price: 1150,
      duration: '5 Days',
      type: 'Adventure',
      lodging: 'Full Support',
      tags: ['4x4 Transport', 'Meals Included'],
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBQ6LyB7r8sYkKsWjOfijAAm2o79rCLoMEKhfuLgIr7X95Y0y91oFkN2ZjdvfB6TGOm63rMltTF9dAihzZD55log3EFrvyjNEDA5CJt2RKL2_dkmkR3LGaxyxteD4koHnEoSjZNYSfvsvWYk3ngplYYW8qABZuvjT2i5Rc1nAT4bOzfDixQgz0TqEJgyZVUrOgoDwVp6BE5YiqkHHYi9H4Sp2vi8OV4UrJw1MlRW18k6Sem57jHh_mdhJWl9rMYcNg8CXDRWN4Br1V0'
    },
    {
      id: 'blue-nile',
      title: 'Blue Nile Falls',
      price: 650,
      duration: '3 Days',
      type: 'Nature',
      lodging: 'Eco Resort',
      tags: ['Boat Tours', 'Bird Watching'],
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDXdYcB8205deDMGSyRterEVzvmprl35ix084xwjTzItRJHESAMLuJ8pxHkH7DMn-WzPzmO0xf5Cl6GF28JqJQMnfrEsGLJRPNWKY0igVTrWSEFkX1Zo11mBEZAsot2ZwGGB-cOkKMuuR5STJ4qv-YUebSf78U3cOdlvXOZcW0qD5c0ojLO067TH-0lBjPhjeKUbYNB4v_pEprhlPzoTQh7MyM2dDY168KFBg9fJdSyt_DZvlmGwDfr_R1m6nv9bRzBWc95omHjQ2M5'
    }
  ];

  const upcomingEvents = [
    {
      title: 'Timket Celebration (Epiphany)',
      date: 'Jan 19, 2027',
      location: 'Gondar, Ethiopia',
      description: 'Experience one of the most colourful religious festivals in the world, featuring spectacular processions, song, and dance.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB-CVb0aMt4UREuSfTuDV-hDi5E6ZKhuxW_j8fbhNDwRCD1bQ-1lfPzvLoPygpP-gCmXPZouShw4AfxZGiGDojepLIHBXy0dyb-mzslkhNBctWdXsq45Sy7DdIyupc32rxXjxc5KkrSH54nrUwuoqoLAUNoFASjzwNaSAt1pwpzRXZJGm-edjHS0oxFQP1Vk11ydYv_88TIqAzH3SdD_S7zvQS1mzzQqPERdX8QVCdEdt79hJQS1z9i6MYoXANkzivyf5QnHruMYReO'
    },
    {
      title: 'Meskel Festival',
      date: 'Sep 27, 2026',
      location: 'Addis Ababa, Meskel Square',
      description: 'The festival commemorates the finding of the True Cross. Join thousands in Meskel Square to witness the Demera bonfire lighting ceremony.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB1Ec6Gy3l3he8C0V8ImcxXt5-Thhr-gevrhs1cJfsuh4bFS2WoUD8YsHROraU4kdOOsBdDu-zH6xuVufmTpnB-OZJ9K9MEdE2PXmy0dRGp23MumG4fIOVDZWqH8Zd4K-OV0yDh4oyhThV30MhqfIQLuhJmVpbz6VpENXHEeH9BMRkhoGX1hGyUfPG5xs89aY99TilvvFJUeMjOD2Sd1p4vTa3tpYNW-YAtTQKodVUOmF47HVg8o-SK0L9BGO-mTcCe4AlfnSEX2x9W'
    }
  ];

  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <header className="relative w-full h-[650px] flex flex-col items-center justify-center overflow-hidden rounded-3xl shadow-xl">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuC59RN4_nKVqLpH054u19Xhpm4Yakncf2bEJ2k-97UYU8tvcDwNcydVTLEZ58N4AkYk3fXI-2VR1-5OZC1BwHOEdNWRBZoC2vJ0DI6ns9iaI6DZ1eesEsVA0ZCa3Gj_2p-oh5NsqDLmsrhTDjjTlt4cTOtpvg6cM_tYrO5AOmyj6UTIGtEYHYrAYRK7ygy5MWXcBN6zXUTBHkBk8ON5_9omceVTGOSz8nDgRkSphIAF-lRV72aE8dndjcn5Dv9bB6un6WlsxqCWCnaN')`
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-background via-on-surface/30 to-transparent"></div>
        </div>

        <div className="relative z-10 text-center px-margin-mobile md:px-0 max-w-3xl animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <h1 className="font-display-lg text-4xl md:text-5xl text-white mb-6 drop-shadow-lg font-bold leading-tight">
            Explore the Wonders of Ethiopia
          </h1>
          <p className="font-body-lg text-lg text-white/90 mb-10 drop-shadow-md max-w-xl mx-auto">
            Discover the land of origins, from ancient heritage to breathtaking landscapes and vibrant culture.
          </p>

          {/* Search Bar Component */}
          <form
            onSubmit={handleSearch}
            className="glass-effect p-3 rounded-2xl shadow-2xl flex flex-col md:flex-row gap-2 max-w-4xl mx-auto border border-white/40"
          >
            <div className="flex-1 flex items-center px-4 py-2 gap-3 border-b md:border-b-0 md:border-r border-border-subtle">
              <span className="material-symbols-outlined text-primary">location_on</span>
              <div className="text-left w-full">
                <p className="text-[10px] font-semibold text-on-surface-variant uppercase tracking-wider">Destination</p>
                <input
                  className="bg-transparent border-none p-0 focus:ring-0 font-body-md text-on-surface w-full text-sm outline-none placeholder:text-outline/65"
                  placeholder="Where in Ethiopia?"
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>
            </div>

            <div className="flex-1 flex items-center px-4 py-2 gap-3 border-b md:border-b-0 md:border-r border-border-subtle">
              <span className="material-symbols-outlined text-primary">calendar_month</span>
              <div className="text-left w-full">
                <p className="text-[10px] font-semibold text-on-surface-variant uppercase tracking-wider">Date</p>
                <input
                  className="bg-transparent border-none p-0 focus:ring-0 font-body-md text-on-surface w-full text-sm outline-none placeholder:text-outline/65"
                  placeholder="When?"
                  type="text"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
            </div>

            <div className="flex-1 flex items-center px-4 py-2 gap-3">
              <span className="material-symbols-outlined text-primary">group</span>
              <div className="text-left w-full">
                <p className="text-[10px] font-semibold text-on-surface-variant uppercase tracking-wider">Guests</p>
                <input
                  className="bg-transparent border-none p-0 focus:ring-0 font-body-md text-on-surface w-full text-sm outline-none placeholder:text-outline/65"
                  placeholder="How many?"
                  type="text"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              className="bg-primary text-on-primary px-8 py-3.5 rounded-xl font-label-md flex items-center justify-center gap-2 hover:bg-primary-container transition-colors shadow-lg active:scale-95 text-sm font-semibold"
            >
              <span className="material-symbols-outlined text-lg">search</span>
              Search
            </button>
          </form>
        </div>
      </header>

      {/* Featured Packages Section */}
      <section className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <h2 className="font-headline-lg text-2xl md:text-3xl text-on-surface mb-2 font-bold">Featured Ethiopian Experiences</h2>
            <p className="font-body-md text-on-surface-variant text-sm">Exclusive tours curated to showcase the very best of Ethiopia.</p>
          </div>
          <Link to="/et/packages" className="text-primary font-label-md text-sm flex items-center gap-1 hover:underline font-semibold">
            View all packages <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-white rounded-2xl h-96 animate-pulse border border-border-subtle"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {packages.map((pkg) => (
              <div key={pkg.id} className="card-hover group bg-white rounded-2xl overflow-hidden shadow-sm border border-border-subtle flex flex-col justify-between">
                <div className="relative h-60 overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-115"
                    style={{ backgroundImage: `url('${pkg.image || 'https://via.placeholder.com/600x400'}')` }}
                  ></div>
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-primary font-label-sm text-xs font-semibold">
                    {pkg.type || 'Travel'}
                  </div>
                </div>
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-headline-md text-lg font-bold text-on-surface truncate pr-2">{pkg.title}</h3>
                      <span className="font-headline-md text-lg font-bold text-primary">${pkg.price}</span>
                    </div>
                    <p className="font-body-sm text-on-surface-variant text-xs mb-4">
                      {pkg.duration} • {pkg.lodging || 'Hotel'}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {(pkg.tags || []).slice(0, 2).map((tag, idx) => (
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
      </section>

      {/* Popular Destinations Asymmetric Grid */}
      <section className="py-24 bg-surface-container-low rounded-3xl px-6 md:px-12">
        <div className="max-w-container-max mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-headline-lg text-2xl md:text-3xl text-on-surface mb-4 font-bold">Iconic Ethiopian Destinations</h2>
            <p className="font-body-md text-on-surface-variant text-sm max-w-2xl mx-auto">
              From the bustling energy of the capital to the ancient secrets of the north.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-6 h-[700px]">
            <div className="md:col-span-2 md:row-span-2 relative rounded-3xl overflow-hidden group cursor-pointer">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuB1Ec6Gy3l3he8C0V8ImcxXt5-Thhr-gevrhs1cJfsuh4bFS2WoUD8YsHROraU4kdOOsBdDu-zH6xuVufmTpnB-OZJ9K9MEdE2PXmy0dRGp23MumG4fIOVDZWqH8Zd4K-OV0yDh4oyhThV30MhqfIQLuhJmVpbz6VpENXHEeH9BMRkhoGX1hGyUfPG5xs89aY99TilvvFJUeMjOD2Sd1p4vTa3tpYNW-YAtTQKodVUOmF47HVg8o-SK0L9BGO-mTcCe4AlfnSEX2x9W')` }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-on-surface/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-8 left-8 text-white">
                <h4 className="font-headline-md text-xl font-bold">Addis Ababa</h4>
                <p className="text-white/80 text-xs">The Diplomatic Capital of Africa</p>
              </div>
            </div>

            <div className="md:col-span-2 relative rounded-3xl overflow-hidden group cursor-pointer">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuB-CVb0aMt4UREuSfTuDV-hDi5E6ZKhuxW_j8fbhNDwRCD1bQ-1lfPzvLoPygpP-gCmXPZouShw4AfxZGiGDojepLIHBXy0dyb-mzslkhNBctWdXsq45Sy7DdIyupc32rxXjxc5KkrSH54nrUwuoqoLAUNoFASjzwNaSAt1pwpzRXZJGm-edjHS0oxFQP1Vk11ydYv_88TIqAzH3SdD_S7zvQS1mzzQqPERdX8QVCdEdt79hJQS1z9i6MYoXANkzivyf5QnHruMYReO')` }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-on-surface/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h4 className="font-headline-md text-lg font-bold">Gondar</h4>
                <p className="text-white/80 text-xs">The Camelot of Africa</p>
              </div>
            </div>

            <div className="relative rounded-3xl overflow-hidden group cursor-pointer">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuA7vIJEqWIdD-grjQX1Gm6iYFU_v-aSEVNT_m3SkDFdTXE7WsAD_lj4B68U3SuvzK42QwUAl2jSCZqJNOzX8tvZhTOiEma2N6L4CiU66i88R8fRYZedpUy5VBOTLz-nNQnBZLP9ygifKuHRDlOahGvvxGAlqJBNgv1xXHzniRSbKQmQ6Eg8HE6zROyHiL1CgGl1hHZPcVr_TiBBPRaoKWjW1XwGTWyv-CcQAULr65Bbg355ywNRR03qwt5la4xiDNGlJUkdFB45qkmP')` }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-on-surface/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h4 className="font-headline-md text-lg font-bold">Lalibela</h4>
                <p className="text-white/80 text-xs">Monolithic Churches</p>
              </div>
            </div>

            <div className="relative rounded-3xl overflow-hidden group cursor-pointer">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDXdYcB8205deDMGSyRterEVzvmprl35ix084xwjTzItRJHESAMLuJ8pxHkH7DMn-WzPzmO0xf5Cl6GF28JqJQMnfrEsGLJRPNWKY0igVTrWSEFkX1Zo11mBEZAsot2ZwGGB-cOkKMuuR5STJ4qv-YUebSf78U3cOdlvXOZcW0qD5c0ojLO067TH-0lBjPhjeKUbYNB4v_pEprhlPzoTQh7MyM2dDY168KFBg9fJdSyt_DZvlmGwDfr_R1m6nv9bRzBWc95omHjQ2M5')` }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-on-surface/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h4 className="font-headline-md text-lg font-bold">Bahir Dar</h4>
                <p className="text-white/80 text-xs">Lake Tana & Nile Source</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events in Ethiopia */}
      <section className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <h2 className="font-headline-lg text-2xl md:text-3xl text-on-surface mb-12 text-center font-bold">Upcoming Events in Ethiopia</h2>
        <div className="flex flex-col gap-8 max-w-4xl mx-auto">
          {upcomingEvents.map((evt, idx) => (
            <div key={idx} className="flex flex-col md:flex-row bg-white border border-border-subtle rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all">
              <div className="md:w-1/3 relative h-48 md:h-auto">
                <img className="w-full h-full object-cover" src={evt.image} alt={evt.title} />
              </div>
              <div className="md:w-2/3 p-6 md:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-headline-md text-lg font-bold text-on-surface">{evt.title}</h3>
                    <span className="text-primary font-semibold text-xs whitespace-nowrap bg-primary-fixed-dim px-2.5 py-1 rounded-full">{evt.date}</span>
                  </div>
                  <p className="text-xs text-primary font-medium mb-3 flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">location_on</span>
                    {evt.location}
                  </p>
                  <p className="font-body-md text-xs text-on-surface-variant leading-relaxed">
                    {evt.description}
                  </p>
                </div>
                <button
                  onClick={() => navigate('/et/events')}
                  className="mt-6 self-start text-primary font-semibold text-xs flex items-center gap-1 hover:underline"
                >
                  Learn More <span className="material-symbols-outlined text-xs">arrow_forward</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomeEthiopia;
