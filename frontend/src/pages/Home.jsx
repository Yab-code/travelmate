import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { packageService } from '../services/api';

const Home = () => {
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
        const data = await packageService.getPackages({ limit: 3 });
        // If API returns valid packages, use them; otherwise fallback to default mock packages
        if (data && data.length > 0) {
          setPackages(data);
        } else {
          setPackages(getDefaultPackages());
        }
      } catch (err) {
        console.error('Failed to fetch packages:', err);
        setPackages(getDefaultPackages());
      } finally {
        setLoading(false);
      }
    };
    fetchPackages();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    // Navigate to packages page with search parameters
    navigate(`/packages?destination=${encodeURIComponent(destination)}&date=${encodeURIComponent(date)}&guests=${encodeURIComponent(guests)}`);
  };

  const getDefaultPackages = () => [
    {
      id: 'bali',
      title: 'Bali Gateway',
      price: 1200,
      duration: '7 Days',
      type: 'Relaxation',
      lodging: 'Luxury Resort',
      tags: ['Free Wifi', 'Spa Included'],
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAONR5NkclNYSLpAQ1Ymkk5rSTR12lZsHoSjG4FCZplT3Q_s6GTaGmWvdXILx4QDtrBk9jCVxjTHAS3t19E722SSAQERbd75wETc0RHz30i_yEobq75dYvenPG0jkFg0n6ak28Iq2wD1Z5xMcndLyzOmRjZzkrjmMNnXSdEBA40x0Y4bn9DhwHWAc6WViPCzPvtssBVI49u1iPWIXIR_cEG0jt-2hT5ptHds5ETQsR-C5MMJCnNhGtZWYxeBM1R-wjNMMpl2BSML3HL'
    },
    {
      id: 'tokyo',
      title: 'Tokyo Explorer',
      price: 1650,
      duration: '5 Days',
      type: 'Adventure',
      lodging: 'Boutique Hotel',
      tags: ['Guide Included', 'Daily Breakfast'],
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCufW5oorp8bGOM4AXTCRoMDKlC_h3sSE1BcszUKGWek66b23cX2YcJj4E0f22BLvSq8MMMIHTwb6aUPAzc6PvpUB7QiHTisZyqsev7rfMHTPx5Aru3Ks3NszTcKF4Pk-S_CdBGJk4QiewF_t89v_nRX8N7tgy3Z71m3XElQC3jryHlTNKWJ54E6G3YASnZix-RvykRdYqwlbwuCZIz1-IXUFeuPt3EfdaD5zBNKJNz7r4tDJsWW_6dAS9rl4CMnDvGZKf_UxWpDe2_'
    },
    {
      id: 'swiss-alps',
      title: 'Swiss Alps',
      price: 2450,
      duration: '6 Days',
      type: 'Ski Tour',
      lodging: 'Alpine Chalet',
      tags: ['Gear Provided', 'Ski Pass'],
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAONR5NkclNYSLpAQ1Ymkk5rSTR12lZsHoSjG4FCZplT3Q_s6GTaGmWvdXILx4QDtrBk9jCVxjTHAS3t19E722SSAQERbd75wETc0RHz30i_yEobq75dYvenPG0jkFg0n6ak28Iq2wD1Z5xMcndLyzOmRjZzkrjmMNnXSdEBA40x0Y4bn9DhwHWAc6WViPCzPvtssBVI49u1iPWIXIR_cEG0jt-2hT5ptHds5ETQsR-C5MMJCnNhGtZWYxeBM1R-wjNMMpl2BSML3HL'
    }
  ];

  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <header className="relative w-full h-[650px] flex flex-col items-center justify-center overflow-hidden rounded-3xl shadow-xl">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAONR5NkclNYSLpAQ1Ymkk5rSTR12lZsHoSjG4FCZplT3Q_s6GTaGmWvdXILx4QDtrBk9jCVxjTHAS3t19E722SSAQERbd75wETc0RHz30i_yEobq75dYvenPG0jkFg0n6ak28Iq2wD1Z5xMcndLyzOmRjZzkrjmMNnXSdEBA40x0Y4bn9DhwHWAc6WViPCzPvtssBVI49u1iPWIXIR_cEG0jt-2hT5ptHds5ETQsR-C5MMJCnNhGtZWYxeBM1R-wjNMMpl2BSML3HL')`
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-background via-on-surface/30 to-transparent"></div>
        </div>

        <div className="relative z-10 text-center px-margin-mobile md:px-0 max-w-3xl animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <h1 className="font-display-lg text-4xl md:text-5xl text-white mb-6 drop-shadow-lg font-bold leading-tight">
            Explore the World with Ease
          </h1>
          <p className="font-body-lg text-lg text-white/90 mb-10 drop-shadow-md max-w-xl mx-auto">
            Discover curated experiences and seamless event planning tailored for the modern explorer.
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
                  placeholder="Where to go?"
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
            <h2 className="font-headline-lg text-2xl md:text-3xl text-on-surface mb-2 font-bold">Featured Packages</h2>
            <p className="font-body-md text-on-surface-variant text-sm">Hand-picked luxury experiences designed just for you.</p>
          </div>
          <Link to="/packages" className="text-primary font-label-md text-sm flex items-center gap-1 hover:underline font-semibold">
            View all packages <span class="material-symbols-outlined text-sm">arrow_forward</span>
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
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-on-surface text-white rounded-3xl px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="font-headline-lg text-2xl md:text-3xl text-primary-fixed mb-4 font-bold">Why Choose TravelMate?</h2>
          <p className="font-body-lg text-white/70 max-w-xl mx-auto text-sm">
            We offer premium, stress-free curation and execution of local and international trips.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-container-max mx-auto">
          <div className="flex flex-col items-center text-center">
            <div className="w-14 h-14 bg-primary/20 rounded-2xl flex items-center justify-center mb-6 border border-primary/30 text-primary-fixed">
              <span className="material-symbols-outlined text-3xl">verified_user</span>
            </div>
            <h3 className="font-headline-md text-lg font-semibold mb-3">Expert Curation</h3>
            <p className="font-body-md text-white/70 text-xs leading-relaxed">
              Every hotel, flight, and experience is hand-selected by our global network of travel experts.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-14 h-14 bg-secondary/20 rounded-2xl flex items-center justify-center mb-6 border border-secondary/30 text-secondary-fixed">
              <span className="material-symbols-outlined text-3xl">support_agent</span>
            </div>
            <h3 className="font-headline-md text-lg font-semibold mb-3">24/7 Support</h3>
            <p className="font-body-md text-white/70 text-xs leading-relaxed">
              Wherever you are in the world, our concierge team is just a tap away, ready to assist.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-14 h-14 bg-accent-yellow/20 rounded-2xl flex items-center justify-center mb-6 border border-accent-yellow/30 text-accent-yellow">
              <span className="material-symbols-outlined text-3xl">calendar_today</span>
            </div>
            <h3 className="font-headline-md text-lg font-semibold mb-3">Flexible Booking</h3>
            <p className="font-body-md text-white/70 text-xs leading-relaxed">
              Change your plans with ease. Most of our packages offer free cancellation up to 48 hours.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto overflow-hidden">
        <h2 className="font-headline-lg text-2xl md:text-3xl text-on-surface mb-12 text-center font-bold">Voices of Experience</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          <div className="bg-white p-6 md:p-8 rounded-2xl border border-border-subtle shadow-sm flex flex-col justify-between h-80">
            <div>
              <div className="flex text-accent-yellow mb-4">
                {[1, 2, 3, 4, 5].map((s) => (
                  <span key={s} className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                ))}
              </div>
              <p className="font-body-lg text-on-surface text-sm italic leading-relaxed mb-6">
                "TravelMate turned our honeymoon into a dream. Everything from the private transfers to the hidden local cafes was perfectly organized."
              </p>
            </div>
            <div className="flex items-center gap-4 border-t border-border-subtle/50 pt-4">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-primary-fixed-dim flex items-center justify-center font-bold">SJ</div>
              <div>
                <p className="font-label-md text-sm text-on-surface font-semibold">Sarah Jenkins</p>
                <p className="font-label-sm text-[10px] text-on-surface-variant">Professional Photographer</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 md:p-8 rounded-2xl border border-border-subtle shadow-sm flex flex-col justify-between h-80">
            <div>
              <div className="flex text-accent-yellow mb-4">
                {[1, 2, 3, 4, 5].map((s) => (
                  <span key={s} className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                ))}
              </div>
              <p className="font-body-lg text-on-surface text-sm italic leading-relaxed mb-6">
                "The corporate event planning was flawless. Our team building in the Alps was handled with such professionalism and detail."
              </p>
            </div>
            <div className="flex items-center gap-4 border-t border-border-subtle/50 pt-4">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-primary-fixed-dim flex items-center justify-center font-bold">MT</div>
              <div>
                <p className="font-label-md text-sm text-on-surface font-semibold">Mark Thompson</p>
                <p className="font-label-sm text-[10px] text-on-surface-variant">Operations Director</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 md:p-8 rounded-2xl border border-border-subtle shadow-sm flex flex-col justify-between h-80">
            <div>
              <div className="flex text-accent-yellow mb-4">
                {[1, 2, 3, 4, 5].map((s) => (
                  <span key={s} className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                ))}
              </div>
              <p className="font-body-lg text-on-surface text-sm italic leading-relaxed mb-6">
                "I love how easy it is to find unique cultural events. The Tokyo food tour was the highlight of my year!"
              </p>
            </div>
            <div className="flex items-center gap-4 border-t border-border-subtle/50 pt-4">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-primary-fixed-dim flex items-center justify-center font-bold">ER</div>
              <div>
                <p className="font-label-md text-sm text-on-surface font-semibold">Elena Rodriguez</p>
                <p className="font-label-sm text-[10px] text-on-surface-variant">Food Blogger</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
