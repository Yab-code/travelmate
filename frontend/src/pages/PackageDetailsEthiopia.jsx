import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { packageService } from '../services/api';

const PackageDetailsEthiopia = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [pkg, setPkg] = useState(null);
  const [loading, setLoading] = useState(true);

  // Booking states
  const [guests, setGuests] = useState(2);
  const [dates, setDates] = useState('Jan 18 - Jan 22, 2027');

  useEffect(() => {
    const fetchPackage = async () => {
      setLoading(true);
      try {
        const data = await packageService.getPackage(id);
        if (data) {
          setPkg(data);
        } else {
          setPkg(getMockEthiopiaPackageDetails(id));
        }
      } catch (err) {
        console.error('Failed to load package details:', err);
        setPkg(getMockEthiopiaPackageDetails(id));
      } finally {
        setLoading(false);
      }
    };

    fetchPackage();
  }, [id]);

  const getMockEthiopiaPackageDetails = (packageId) => {
    const defaults = {
      lalibela: {
        title: 'Lalibela Heritage Tour',
        price: 899,
        duration: '4 Days',
        location: 'Lalibela, Ethiopia',
        difficulty: 'Moderate',
        groupSize: 'Max 12',
        language: 'English, Amharic',
        rating: 4.9,
        reviewsCount: 84,
        description: 'Explore the architectural masterpiece and spiritual legacy of Lalibela. Visit the 11 rock-hewn churches, carved from monolithic volcanic rock in the 12th century, and witness the ancient traditions of Ethiopian Orthodox pilgrims.',
        host: 'Aba G. Medhin',
        hostRole: 'Heritage Guide & Priest • 15 years experience',
        hostQuote: '"Lalibela is not just history; it is a living faith. I will share with you the deep theology and mystery behind the architecture of our rock-hewn sanctuaries."',
        images: [
          'https://lh3.googleusercontent.com/aida-public/AB6AXuA7vIJEqWIdD-grjQX1Gm6iYFU_v-aSEVNT_m3SkDFdTXE7WsAD_lj4B68U3SuvzK42QwUAl2jSCZqJNOzX8tvZhTOiEma2N6L4CiU66i88R8fRYZedpUy5VBOTLz-nNQnBZLP9ygifKuHRDlOahGvvxGAlqJBNgv1xXHzniRSbKQmQ6Eg8HE6zROyHiL1CgGl1hHZPcVr_TiBBPRaoKWjW1XwGTWyv-CcQAULr65Bbg355ywNRR03qwt5la4xiDNGlJUkdFB45qkmP',
          'https://lh3.googleusercontent.com/aida/AP1WRLvV8eRhIrEVe1qRVBri6qozKn5D3qGiBr3TvdfQdiv11O3wPlp2Zwc1XhQTTXcfr_FWPliAyHeW0zu76pkeeIGihENAgj3nrqyLAcAwGRFxKALh58YBSnMAvtDqBzmnVHJVJmI4_kl2lWyfRCqAijpnaIaT03zjiGiOdETvgMCyMsYS2VqY2u33Jh7Pa98SyJT1yhE9swJwOwDCKoms90_aDXhd2Jl-M7_HGj59x4Was292jjvNlCNmcKvr',
          'https://lh3.googleusercontent.com/aida-public/AB6AXuDF-rYWOfhG2O7EUSGvXCFSxdOWO-WuT2QPq0boYvx1KLOjVCSLuPVCitvwiWgdb8qgssoXZJ_mF45QQDgSC79TOE7YtEFFfbw0JPkjcgvzgPfSxn-lfjLbjfi6pzpVUrxuwpO6qg4LhC-aLoHZuLYHhASzo49gteUeNq1s6h4FTelWO0g8E3_hSQcciSnIod3BlGEaksSpgGexyt-aGg2bD914u9LazoKFx98GiG3CQum3IWK9zMgxkn1bzuzMYeIrzIVlbyaYHRq-',
          'https://lh3.googleusercontent.com/aida/AP1WRLv9Ho1NS1kXo0B-TaMDnF-SE7vgb5Q3ln_aO9FuHPoCh_rGWMo3eFBkJsZFD4jyDInD8nusZsezENNqAmPIkyZn3-Hu6BCIXBlhDJDeAmva3PCIWq4tGx9dimFxkwqxSA6V6x_t3dAs829IV5oomYmQrERE3bjDaNrRUE_kbK--uWkvIZ5bxRTPk2yt33n9W55nvGOv_hZsxRyjplwjitYUIyxZP_42rQEYe_beZ81bfx9tGPhIumpAcwye'
        ],
        itinerary: [
          { day: 1, title: 'Arrival & Northern Group Churches', desc: 'Arrive in Lalibela. Visit the spectacular church of St. George (Biete Giyorgis) and the northern cluster of monolithic sanctuaries.' },
          { day: 2, title: 'Asheton Maryam Mountain Trek', desc: 'Trek up the Asheton Maryam mountain by foot or mule for breathtaking valley views and visit the ancient cave church.' },
          { day: 3, title: 'Southern Group & Traditional Coffee', desc: 'Visit the southern group of churches. Evening features a traditional Ethiopian coffee ceremony and cultural honey wine dinner.' }
        ]
      },
      danakil: {
        title: 'Danakil Expedition',
        price: 1150,
        duration: '5 Days',
        location: 'Danakil, Ethiopia',
        difficulty: 'Strenuous',
        groupSize: 'Max 8',
        language: 'English, Amharic, Afar',
        rating: 4.8,
        reviewsCount: 42,
        description: 'Venture into the geological wonderland of the Danakil Depression. Discover colorful volcanic salt springs at Dallol, walk on salt flats, and hike to the active lava lake of Erta Ale volcano.',
        host: 'Mohammed Afar',
        hostRole: 'Expedition Guide & Scout • 10 years experience',
        hostQuote: '"The Danakil is like no other place on earth. My team will guide you safely through the extreme geography, salt caravans, and spectacular hydrothermal lakes."',
        images: [
          'https://lh3.googleusercontent.com/aida-public/AB6AXuBQ6LyB7r8sYkKsWjOfijAAm2o79rCLoMEKhfuLgIr7X95Y0y91oFkN2ZjdvfB6TGOm63rMltTF9dAihzZD55log3EFrvyjNEDA5CJt2RKL2_dkmkR3LGaxyxteD4koHnEoSjZNYSfvsvWYk3ngplYYW8qABZuvjT2i5Rc1nAT4bOzfDixQgz0TqEJgyZVUrOgoDwVp6BE5YiqkHHYi9H4Sp2vi8OV4UrJw1MlRW18k6Sem57jHh_mdhJWl9rMYcNg8CXDRWN4Br1V0',
          'https://lh3.googleusercontent.com/aida-public/AB6AXuA7vIJEqWIdD-grjQX1Gm6iYFU_v-aSEVNT_m3SkDFdTXE7WsAD_lj4B68U3SuvzK42QwUAl2jSCZqJNOzX8tvZhTOiEma2N6L4CiU66i88R8fRYZedpUy5VBOTLz-nNQnBZLP9ygifKuHRDlOahGvvxGAlqJBNgv1xXHzniRSbKQmQ6Eg8HE6zROyHiL1CgGl1hHZPcVr_TiBBPRaoKWjW1XwGTWyv-CcQAULr65Bbg355ywNRR03qwt5la4xiDNGlJUkdFB45qkmP',
          'https://lh3.googleusercontent.com/aida-public/AB6AXuDF-rYWOfhG2O7EUSGvXCFSxdOWO-WuT2QPq0boYvx1KLOjVCSLuPVCitvwiWgdb8qgssoXZJ_mF45QQDgSC79TOE7YtEFFfbw0JPkjcgvzgPfSxn-lfjLbjfi6pzpVUrxuwpO6qg4LhC-aLoHZuLYHhASzo49gteUeNq1s6h4FTelWO0g8E3_hSQcciSnIod3BlGEaksSpgGexyt-aGg2bD914u9LazoKFx98GiG3CQum3IWK9zMgxkn1bzuzMYeIrzIVlbyaYHRq-',
          'https://lh3.googleusercontent.com/aida-public/AB6AXuCeRXUma-lnHA7pEkhaKayWGezOcpXYgl5-S-525m7_RZvZgbq1ykHy8csvAh6aRN0Fpb5_0qHxCoPf14PsHZyK1wPk66LNMx07cjRa0yzjex4mpL0EcpFI8o6R6z69mxtU58h29JBupFDe0RxkysIfw5HG7S7L2IbtE2yLZSaa_E-gckEJWzo74xbwMvrv99mZlaVJoScfnHUAoJTwjM4CYWrzifLnrIHAqu_X1TD7hzA5sJTsatz7617edbbXIgdFp_NgmFvpW1hb'
        ],
        itinerary: [
          { day: 1, title: 'Mekele to Dallol Drive', desc: 'Depart from Mekele. Explore the multi-colored acid ponds of Dallol and the giant salt canyons. Camp under the stars.' },
          { day: 2, title: 'Erta Ale Volcano Ascent', desc: 'Drive to the base of Erta Ale volcano. Hike to the rim at sunset and camp next to the active boiling lava lake.' },
          { day: 3, title: 'Salt Lake Karum & Return', desc: 'Descend Erta Ale at sunrise. Visit salt-mining Afar caravans before heading back to Mekele.' }
        ]
      }
    };
    return defaults[packageId] || defaults['lalibela'];
  };

  const handleBook = () => {
    alert(`Ethiopia Booking Request Submitted! Date: ${dates}, Guests: ${guests}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!pkg) return null;

  return (
    <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-10">
      {/* Gallery Bento */}
      <section className="mb-12">
        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-4 h-[500px] md:h-[600px]">
          <div className="md:col-span-2 md:row-span-2 relative overflow-hidden rounded-2xl shadow-sm group">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: `url('${pkg.images[0]}')` }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            <div className="absolute bottom-6 left-6 text-white">
              <span className="bg-primary/95 text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-full mb-3 inline-block">
                Cultural Masterpiece
              </span>
              <h2 className="font-headline-lg text-2xl md:text-3xl font-bold mb-2">{pkg.title}</h2>
              <div className="flex items-center gap-2 text-xs opacity-90">
                <span className="material-symbols-outlined text-sm">location_on</span>
                <span>{pkg.location}</span>
              </div>
            </div>
          </div>

          <div className="hidden md:block md:col-span-1 relative overflow-hidden rounded-2xl shadow-sm group">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: `url('${pkg.images[1]}')` }}
            ></div>
          </div>

          <div className="hidden md:block md:col-span-1 relative overflow-hidden rounded-2xl shadow-sm group">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: `url('${pkg.images[2]}')` }}
            ></div>
          </div>

          <div className="hidden md:block md:col-span-2 relative overflow-hidden rounded-2xl shadow-sm group">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: `url('${pkg.images[3]}')` }}
            ></div>
          </div>
        </div>
      </section>

      {/* Details & Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-24">
        {/* Left Side: Details & Itinerary */}
        <div className="lg:col-span-8 space-y-12">
          <div className="border-b border-border-subtle pb-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1 text-accent-yellow">
                {[1, 2, 3, 4].map((s) => (
                  <span key={s} className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                ))}
                <span className="material-symbols-outlined text-sm">star_half</span>
              </div>
              <span className="text-sm font-semibold text-on-surface-variant">
                {pkg.rating} ({pkg.reviewsCount} reviews)
              </span>
              <span className="text-outline-variant text-xs">•</span>
              <span className="text-xs font-bold text-secondary uppercase tracking-wider">UNESCO Site</span>
            </div>
            <h3 className="text-xl font-bold text-on-surface mb-4">Experience Overview</h3>
            <p className="font-body-lg text-sm text-on-surface-variant leading-relaxed">
              {pkg.description}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              <div className="flex flex-col items-center p-3.5 bg-surface-container-low rounded-xl">
                <span className="material-symbols-outlined text-primary mb-1.5">schedule</span>
                <span className="text-[10px] text-outline uppercase font-semibold">Duration</span>
                <span className="text-xs font-bold text-on-surface">{pkg.duration}</span>
              </div>
              <div className="flex flex-col items-center p-3.5 bg-surface-container-low rounded-xl">
                <span className="material-symbols-outlined text-primary mb-1.5">group</span>
                <span className="text-[10px] text-outline uppercase font-semibold">Group Size</span>
                <span className="text-xs font-bold text-on-surface">{pkg.groupSize}</span>
              </div>
              <div className="flex flex-col items-center p-3.5 bg-surface-container-low rounded-xl">
                <span className="material-symbols-outlined text-primary mb-1.5">language</span>
                <span className="text-[10px] text-outline uppercase font-semibold">Language</span>
                <span className="text-xs font-bold text-on-surface truncate max-w-full">{pkg.language}</span>
              </div>
              <div className="flex flex-col items-center p-3.5 bg-surface-container-low rounded-xl">
                <span className="material-symbols-outlined text-primary mb-1.5">fitness_center</span>
                <span className="text-[10px] text-outline uppercase font-semibold">Difficulty</span>
                <span className="text-xs font-bold text-on-surface">{pkg.difficulty}</span>
              </div>
            </div>
          </div>

          {/* Itinerary */}
          <section>
            <h3 className="text-xl font-bold text-on-surface mb-8">Curated Itinerary</h3>
            <div className="space-y-6 relative before:absolute before:left-4 before:top-4 before:bottom-4 before:w-[2px] before:bg-border-subtle">
              {pkg.itinerary.map((day, idx) => (
                <div key={idx} className="relative pl-12 group">
                  <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-sm shadow-sm">
                    {day.day}
                  </div>
                  <div className="bg-white p-6 rounded-2xl border border-border-subtle group-hover:border-primary/30 transition-all shadow-sm">
                    <h4 className="text-sm font-semibold text-on-surface mb-2">{day.title}</h4>
                    <p className="text-xs text-on-surface-variant leading-relaxed">{day.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Side: Booking Widget */}
        <aside className="lg:col-span-4 sticky top-28">
          <div className="bg-white rounded-3xl border border-border-subtle shadow-xl p-8 relative overflow-hidden">
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/5 blur-3xl rounded-full"></div>
            <div className="flex justify-between items-end mb-8">
              <div>
                <span className="text-[10px] text-outline block mb-1 uppercase font-semibold">Total price from</span>
                <span className="text-3xl font-bold text-on-surface">${pkg.price}</span>
                <span className="text-on-surface-variant text-xs">/person</span>
              </div>
              <div className="bg-secondary-container/20 text-on-secondary-container text-[10px] px-2 py-1 rounded font-bold uppercase tracking-wider mb-2">
                Guaranteed Departure
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <div className="p-4 border border-border-subtle rounded-xl flex items-center gap-4 cursor-pointer hover:bg-surface-container-low transition-colors">
                <span className="material-symbols-outlined text-outline">calendar_month</span>
                <div className="flex-1">
                  <span className="text-[10px] text-outline block uppercase font-semibold">Dates</span>
                  <input
                    type="text"
                    value={dates}
                    onChange={(e) => setDates(e.target.value)}
                    className="font-semibold text-xs border-none p-0 bg-transparent focus:ring-0 text-on-surface w-full outline-none"
                  />
                </div>
              </div>
              <div className="p-4 border border-border-subtle rounded-xl flex items-center gap-4 cursor-pointer hover:bg-surface-container-low transition-colors">
                <span className="material-symbols-outlined text-outline">person</span>
                <div className="flex-1">
                  <span className="text-[10px] text-outline block uppercase font-semibold">Guests</span>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="font-semibold text-xs border-none p-0 bg-transparent focus:ring-0 text-on-surface w-full outline-none cursor-pointer"
                  >
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <option key={num} value={num}>{num} Adults</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <button
              onClick={handleBook}
              className="w-full bg-primary text-on-primary font-bold py-4 rounded-xl shadow-lg hover:shadow-primary/30 hover:opacity-95 active:scale-[0.98] transition-all mb-4 text-sm"
            >
              Book Now
            </button>
            <p className="text-center text-[10px] text-outline mb-6">Secured via Escrow</p>

            <div className="space-y-3 pt-6 border-t border-border-subtle">
              <div className="flex justify-between text-xs text-on-surface-variant">
                <span>Base package (x{guests})</span>
                <span>${pkg.price * guests}</span>
              </div>
              <div className="flex justify-between text-xs text-on-surface-variant">
                <span>Service & Planning fee</span>
                <span>$180</span>
              </div>
              <div className="flex justify-between font-bold text-on-surface pt-2 border-t border-border-subtle/50 text-sm">
                <span>Total (incl. taxes)</span>
                <span>${pkg.price * guests + 180}</span>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-3 p-4 bg-secondary-container/10 rounded-xl">
              <span className="material-symbols-outlined text-secondary">verified</span>
              <p className="text-[10px] text-on-secondary-fixed-variant leading-tight">
                <strong>Local Assurance:</strong> Full refund if cancelled 30 days before departure.
              </p>
            </div>
          </div>
        </aside>
      </div>

      {/* Hosted By & Review Profiles */}
      <section className="mb-24 pt-20 border-t border-border-subtle">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Host */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-on-surface">Your Local Guide</h3>
            <div className="flex gap-6 items-start">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-primary-fixed-dim flex items-center justify-center font-bold text-primary text-2xl">
                  {pkg.host.charAt(0)}
                </div>
                <div className="absolute -bottom-1 -right-1 bg-secondary text-white p-1 rounded-full border-2 border-white">
                  <span className="material-symbols-outlined text-[12px] font-bold">check</span>
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="text-md font-semibold text-on-surface">{pkg.host}</h4>
                <p className="text-xs text-outline font-medium">{pkg.hostRole}</p>
                <p className="text-xs text-on-surface-variant leading-relaxed italic">
                  {pkg.hostQuote}
                </p>
              </div>
            </div>
          </div>

          {/* Reviews */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-on-surface">Partner Reviews</h3>
            <div className="space-y-6">
              <div className="pb-6 border-b border-border-subtle last:border-0">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center font-bold text-primary text-sm">
                    TG
                  </div>
                  <div>
                    <h5 className="font-semibold text-sm">Tewodros G.</h5>
                    <span className="text-[10px] text-outline">January 2026</span>
                  </div>
                </div>
                <p className="text-xs text-on-surface-variant italic leading-relaxed">
                  "Carving out this monolithic walk was exceptional. The guide spoke fluent English and Amharic, sharing details about St. George's construction that you wouldn't find in textbooks."
                </p>
              </div>
              <div className="pb-6 border-b border-border-subtle last:border-0">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center font-bold text-primary text-sm">
                    AM
                  </div>
                  <div>
                    <h5 className="font-semibold text-sm">Anna M.</h5>
                    <span className="text-[10px] text-outline">December 2025</span>
                  </div>
                </div>
                <p className="text-xs text-on-surface-variant italic leading-relaxed">
                  "Exceeded all expectations. Visiting Lalibela with a local priest added a layer of spirituality and understanding that was unforgettable."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PackageDetailsEthiopia;
