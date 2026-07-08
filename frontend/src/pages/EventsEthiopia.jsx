import React, { useState, useEffect } from 'react';
import { eventService } from '../services/api';

const EventsEthiopia = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const filters = { country: 'Ethiopia' };
        if (selectedCategory !== 'All') filters.category = selectedCategory;
        const data = await eventService.getEvents(filters);
        if (data && data.length > 0) {
          setEvents(data);
        } else {
          setEvents(getDefaultEthiopiaEvents());
        }
      } catch (err) {
        console.error('Failed to load events:', err);
        setEvents(getDefaultEthiopiaEvents());
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, [selectedCategory]);

  const getDefaultEthiopiaEvents = () => [
    {
      id: 'timkat',
      title: 'Timkat Festival (Ethiopian Epiphany)',
      category: 'Religious',
      price: 'Free',
      date: 'Jan 19, 2027',
      location: 'Gondar & Lalibela',
      organizer: 'Ethiopian Orthodox Church',
      description: 'The grandest celebration in the Ethiopian calendar — a colourful re-enactment of Christ\'s baptism. Priests carry the Tabot to riverside tents the night before, followed by a dawn procession with chanting and ululation.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA7vIJEqWIdD-grjQX1Gm6iYFU_v-aSEVNT_m3SkDFdTXE7WsAD_lj4B68U3SuvzK42QwUAl2jSCZqJNOzX8tvZhTOiEma2N6L4CiU66i88R8fRYZedpUy5VBOTLz-nNQnBZLP9ygifKuHRDlOahGvvxGAlqJBNgv1xXHzniRSbKQmQ6Eg8HE6zROyHiL1CgGl1hHZPcVr_TiBBPRaoKWjW1XwGTWyv-CcQAULr65Bbg355ywNRR03qwt5la4xiDNGlJUkdFB45qkmP',
      featured: true,
      tag: 'UNESCO Intangible Heritage'
    },
    {
      id: 'meskel',
      title: 'Meskel (Finding of the True Cross)',
      category: 'Religious',
      price: 'Free',
      date: 'Sep 27, 2026',
      location: 'Meskel Square, Addis Ababa',
      organizer: 'Ethiopian Government',
      description: 'A UNESCO-recognized festival centred on the enormous bonfire "Demera". Over a million people gather to watch the pyre lit by the Patriarch, predicting harvest fortunes from the direction the smoke falls.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBQ6LyB7r8sYkKsWjOfijAAm2o79rCLoMEKhfuLgIr7X95Y0y91oFkN2ZjdvfB6TGOm63rMltTF9dAihzZD55log3EFrvyjNEDA5CJt2RKL2_dkmkR3LGaxyxteD4koHnEoSjZNYSfvsvWYk3ngplYYW8qABZuvjT2i5Rc1nAT4bOzfDixQgz0TqEJgyZVUrOgoDwVp6BE5YiqkHHYi9H4Sp2vi8OV4UrJw1MlRW18k6Sem57jHh_mdhJWl9rMYcNg8CXDRWN4Br1V0',
      tag: 'UNESCO Heritage'
    },
    {
      id: 'enkutatash',
      title: 'Enkutatash (Ethiopian New Year)',
      category: 'Cultural',
      price: 'Free',
      date: 'Sep 11, 2026',
      location: 'Nationwide, Ethiopia',
      organizer: 'Nationwide Celebration',
      description: 'Welcoming the New Year with flowers, song, and feasting. Children carry bouquets of Adey Abeba yellow daisies door-to-door, while families slaughter a sheep and gather for traditional injera meals.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDXdYcB8205deDMGSyRterEVzvmprl35ix084xwjTzItRJHESAMLuJ8pxHkH7DMn-WzPzmO0xf5Cl6GF28JqJQMnfrEsGLJRPNWKY0igVTrWSEFkX1Zo11mBEZAsot2ZwGGB-cOkKMuuR5STJ4qv-YUebSf78U3cOdlvXOZcW0qD5c0ojLO067TH-0lBjPhjeKUbYNB4v_pEprhlPzoTQh7MyM2dDY168KFBg9fJdSyt_DZvlmGwDfr_R1m6nv9bRzBWc95omHjQ2M5',
      tag: 'Cultural Celebration'
    },
    {
      id: 'genna',
      title: 'Genna (Ethiopian Christmas)',
      category: 'Religious',
      price: 'Free',
      date: 'Jan 7, 2027',
      location: 'Lalibela, Ethiopia',
      organizer: 'Ethiopian Orthodox Church',
      description: 'Ethiopian Christmas is celebrated with unique stick game (Genna game, similar to field hockey), early morning church services, and festive meals. Lalibela is the most famous pilgrimage destination for this day.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC59RN4_nKVqLpH054u19Xhpm4Yakncf2bEJ2k-97UYU8tvcDwNcydVTLEZ58N4AkYk3fXI-2VR1-5OZC1BwHOEdNWRBZoC2vJ0DI6ns9iaI6DZ1eesEsVA0ZCa3Gj_2p-oh5NsqDLmsrhTDjjTlt4cTOtpvg6cM_tYrO5AOmyj6UTIGtEYHYrAYRK7ygy5MWXcBN6zXUTBHkBk8ON5_9omceVTGOSz8nDgRkSphIAF-lRV72aE8dndjcn5Dv9bB6un6WlsxqCWCnaN',
      tag: 'Christmas Pilgrimage'
    },
    {
      id: 'coffee-ceremony',
      title: 'Coffee Ceremony Experience',
      category: 'Cultural',
      price: 25,
      date: 'Daily (Ongoing)',
      location: 'Kaffa, Ethiopia',
      organizer: 'TravelMate Ethiopia',
      description: 'Experience the sacred birthplace of coffee. Participate in a full traditional ceremony from roasting green beans over charcoal, grinding with a mortar, to drinking three ceremonial cups in a local homestead.',
      tag: 'Hands-On Experience'
    }
  ];

  const handleBook = (eventId) => {
    alert(`Event registered! ID: ${eventId}`);
  };

  const categories = [
    { name: 'All', icon: 'grade' },
    { name: 'Religious', icon: 'church' },
    { name: 'Cultural', icon: 'celebration' }
  ];

  const featuredEvent = getDefaultEthiopiaEvents().find((e) => e.featured);
  const filteredEvents = getDefaultEthiopiaEvents().filter(
    (e) => !e.featured && (selectedCategory === 'All' || e.category === selectedCategory)
  );

  return (
    <div className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-10">
      {/* Header */}
      <section className="mb-12 border-b border-border-subtle pb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <h1 className="font-display-lg text-3xl font-bold text-on-surface mb-3">Ethiopian Festivals & Events</h1>
            <p className="text-sm text-on-surface-variant leading-relaxed max-w-xl">
              Witness living history — from the ancient fire of Meskel to the music of Timkat. Immerse yourself in Ethiopia's
              vibrant spiritual and cultural calendar.
            </p>
          </div>
        </div>

        {/* Category Chips */}
        <div className="flex flex-wrap gap-2.5">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setSelectedCategory(cat.name)}
              className={`px-5 py-2 rounded-full font-label-md text-xs transition-all flex items-center gap-1.5 border border-outline-variant/30 ${
                selectedCategory === cat.name
                  ? 'bg-primary text-on-primary font-semibold shadow-sm'
                  : 'bg-white hover:border-primary/50 text-on-surface-variant'
              }`}
            >
              <span className="material-symbols-outlined text-sm">{cat.icon}</span>
              <span>{cat.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Featured Event */}
      {featuredEvent && (
        <section className="mb-16">
          <h2 className="font-headline-lg text-xl font-bold text-on-surface mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">stars</span>
            <span>Signature Event</span>
          </h2>
          <div className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all h-[440px] bg-white">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: `url('${featuredEvent.image}')` }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent"></div>

            <div className="absolute top-4 left-4 flex gap-2">
              <span className="bg-primary text-on-primary px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                {featuredEvent.tag}
              </span>
              <span className="bg-white/95 text-on-surface px-3 py-1 rounded-full text-[10px] font-bold">
                {typeof featuredEvent.price === 'number' ? `$${featuredEvent.price}` : featuredEvent.price}
              </span>
            </div>

            <div className="absolute bottom-0 left-0 p-6 md:p-10 text-white w-full">
              <div className="flex flex-wrap items-center gap-4 mb-3 text-white/80 text-xs">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">calendar_today</span> {featuredEvent.date}
                </span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">location_on</span> {featuredEvent.location}
                </span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-3 leading-tight">{featuredEvent.title}</h3>
              <p className="text-xs text-white/80 leading-relaxed mb-5 max-w-xl line-clamp-2">{featuredEvent.description}</p>
              <div className="flex items-center justify-between gap-4 border-t border-white/15 pt-4">
                <span className="text-xs text-white/70">Organized by {featuredEvent.organizer}</span>
                <button
                  onClick={() => handleBook(featuredEvent.id)}
                  className="bg-primary hover:bg-primary-container text-on-primary px-7 py-2.5 rounded-xl font-semibold text-xs transition-all shadow-lg"
                >
                  Register Interest
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Event Grid */}
      <section className="mb-20">
        <h2 className="font-headline-lg text-xl font-bold text-on-surface mb-6 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">event</span>
          <span>All Ethiopian Events</span>
        </h2>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-white rounded-2xl h-80 animate-pulse border border-border-subtle"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {filteredEvents.map((evt) => (
              <div
                key={evt.id}
                className="bg-white rounded-2xl overflow-hidden border border-border-subtle hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                <div className="relative h-44 w-full bg-surface-container overflow-hidden">
                  {evt.image ? (
                    <img
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      src={evt.image}
                      alt={evt.title}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-primary-fixed-dim">
                      <span className="material-symbols-outlined text-4xl text-primary">celebration</span>
                    </div>
                  )}
                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur px-2.5 py-1 rounded-lg shadow-sm text-xs font-bold text-primary">
                    {typeof evt.price === 'number' ? `$${evt.price}` : evt.price}
                  </div>
                  <div className="absolute top-3 left-3 bg-primary/90 text-on-primary px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wide">
                    {evt.category}
                  </div>
                </div>

                <div className="p-5 flex-grow flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center gap-1.5 text-secondary font-semibold text-xs mb-2">
                      <span className="material-symbols-outlined text-sm">calendar_today</span>
                      {evt.date}
                    </div>
                    <h5 className="text-sm font-bold text-on-surface leading-tight mb-2">{evt.title}</h5>
                    <p className="text-xs text-on-surface-variant leading-relaxed line-clamp-3">{evt.description}</p>
                  </div>

                  <div>
                    <div className="flex items-center gap-1.5 text-xs text-on-surface-variant mb-4">
                      <span className="material-symbols-outlined text-sm">location_on</span>
                      {evt.location}
                    </div>
                    <div className="flex items-center justify-between gap-4 pt-4 border-t border-border-subtle/50">
                      <span className="text-[10px] text-outline font-semibold uppercase tracking-wide">{evt.tag}</span>
                      <button
                        onClick={() => handleBook(evt.id)}
                        className="bg-primary text-on-primary px-4 py-2 rounded-xl text-xs font-semibold hover:opacity-90 transition-all shadow-sm"
                      >
                        {typeof evt.price === 'number' ? 'Book Now' : 'Register'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Cultural Banner */}
      <section className="rounded-2xl bg-primary-container p-10 text-center relative overflow-hidden mb-10">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-[80px] -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary-container rounded-full blur-[80px] -ml-32 -mb-32"></div>
        </div>
        <div className="relative z-10">
          <h2 className="text-xl md:text-2xl font-bold text-on-primary mb-3">Experience Ethiopian Culture First-Hand</h2>
          <p className="text-xs text-on-primary/80 max-w-lg mx-auto mb-6 leading-relaxed">
            Plan your visit around a major Ethiopian festival and witness one of the oldest living cultures on earth.
          </p>
          <button className="px-8 py-3 bg-on-primary text-primary text-sm font-bold rounded-full shadow-xl hover:scale-105 active:scale-95 transition-all">
            Plan My Ethiopia Trip
          </button>
        </div>
      </section>
    </div>
  );
};

export default EventsEthiopia;
