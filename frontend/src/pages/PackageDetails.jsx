import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { packageService } from '../services/api';

const PackageDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [pkg, setPkg] = useState(null);
  const [loading, setLoading] = useState(true);

  // Booking form states
  const [guests, setGuests] = useState(2);
  const [dates, setDates] = useState('Aug 12 - Aug 19, 2026');

  useEffect(() => {
    const fetchPackage = async () => {
      setLoading(true);
      try {
        const data = await packageService.getPackage(id);
        if (data) {
          setPkg(data);
        } else {
          setPkg(getMockPackageDetails(id));
        }
      } catch (err) {
        console.error('Failed to load package details:', err);
        setPkg(getMockPackageDetails(id));
      } finally {
        setLoading(false);
      }
    };

    fetchPackage();
  }, [id]);

  const getMockPackageDetails = (packageId) => {
    const defaults = {
      bali: {
        title: 'Bali Gateway',
        price: 1200,
        duration: '7 Days',
        location: 'Ubud, Bali',
        difficulty: 'Easy',
        groupSize: 'Max 10',
        language: 'English, Indonesian',
        rating: 4.8,
        reviewsCount: 96,
        description: 'Escape to the tropical paradise of Bali. Meticulously planned to cover spa retreats, volcanic hikes, and ancient temples in Ubud.',
        host: 'Ketut W.',
        hostRole: 'Local Host • 8 years experience',
        hostQuote: '"Welcome to the Island of the Gods. I will show you the spiritual temples and serene terraces that make Bali so special."',
        images: [
          'https://lh3.googleusercontent.com/aida-public/AB6AXuAONR5NkclNYSLpAQ1Ymkk5rSTR12lZsHoSjG4FCZplT3Q_s6GTaGmWvdXILx4QDtrBk9jCVxjTHAS3t19E722SSAQERbd75wETc0RHz30i_yEobq75dYvenPG0jkFg0n6ak28Iq2wD1Z5xMcndLyzOmRjZzkrjmMNnXSdEBA40x0Y4bn9DhwHWAc6WViPCzPvtssBVI49u1iPWIXIR_cEG0jt-2hT5ptHds5ETQsR-C5MMJCnNhGtZWYxeBM1R-wjNMMpl2BSML3HL',
          'https://lh3.googleusercontent.com/aida-public/AB6AXuDF-rYWOfhG2O7EUSGvXCFSxdOWO-WuT2QPq0boYvx1KLOjVCSLuPVCitvwiWgdb8qgssoXZJ_mF45QQDgSC79TOE7YtEFFfbw0JPkjcgvzgPfSxn-lfjLbjfi6pzpVUrxuwpO6qg4LhC-aLoHZuLYHhASzo49gteUeNq1s6h4FTelWO0g8E3_hSQcciSnIod3BlGEaksSpgGexyt-aGg2bD914u9LazoKFx98GiG3CQum3IWK9zMgxkn1bzuzMYeIrzIVlbyaYHRq-',
          'https://lh3.googleusercontent.com/aida-public/AB6AXuCeRXUma-lnHA7pEkhaKayWGezOcpXYgl5-S-525m7_RZvZgbq1ykHy8csvAh6aRN0Fpb5_0qHxCoPf14PsHZyK1wPk66LNMx07cjRa0yzjex4mpL0EcpFI8o6R6z69mxtU58h29JBupFDe0RxkysIfw5HG7S7L2IbtE2yLZSaa_E-gckEJWzo74xbwMvrv99mZlaVJoScfnHUAoJTwjM4CYWrzifLnrIHAqu_X1TD7hzA5sJTsatz7617edbbXIgdFp_NgmFvpW1hb',
          'https://lh3.googleusercontent.com/aida-public/AB6AXuD0Zszkqi5vphd-aETSMnyiTNovbgUQmZBsOh5o7tbNA1Ph0CsKSf68HKevkf7ggXS3AlRqtaaBLvdjRG6qP8x_05p2jj9Ft_jocH1duRBD842MirbiOrItVfPljDKKTpLQqZyWDdJTpNbZ_LYL4MkX-XWriCcRW0i4ezSTpJUM6SVTmA-MTfumggBx7W5i1kfUL8BqxnEnTNIwW9a5p5gvwCsmgde8Ukb6Co9X7RlXv5vukEshpdVAk02MNjJatmQcMoI_xy7EQ5GO'
        ],
        itinerary: [
          { day: 1, title: 'Arrival & Welcome Dinner', desc: 'Transfer from Denpasar airport to your forest villa. Evening welcome dinner in central Ubud.' },
          { day: 2, title: 'Tegallalang Rice Terrace Trek', desc: 'Explore Bali iconic emerald rice paddies followed by a traditional Balinese organic lunch.' },
          { day: 3, title: 'Temple Blessing Ceremony', desc: 'Visit Tirta Empul for a spiritual water cleansing ceremony led by a local priest.' }
        ]
      },
      'amalfi-coast': {
        title: 'Amalfi Coast Dream Expedition',
        price: 2499,
        duration: '7 Days',
        location: 'Positano, Italy',
        difficulty: 'Moderate',
        groupSize: 'Max 12',
        language: 'English, Italian',
        rating: 4.9,
        reviewsCount: 124,
        description: 'Embark on a curated 7-day odyssey through the vertical wonders of the Amalfi Coast. Private yacht excursions around Capri and exclusive culinary masterclasses in hidden Positano gardens.',
        host: 'Elena Rossi',
        hostRole: 'Senior Event Lead • 12 years experience',
        hostQuote: '"My passion is revealing the hidden soul of Italy. We don\'t just book hotels; we open doors to private estates and curate moments that stay with you forever."',
        images: [
          'https://lh3.googleusercontent.com/aida-public/AB6AXuBIU4bKgpXYviVs8ZMgKpVUPCHzgZlFccKwaAK27Z_UemEex4szz7jlZ_DX49nW96IdrU-eyahZnX2DssjoRfiCvbOmdWd6ORuO8pgM91O26ZTuU-TdHSqqw2AU4aFKf6JzuDkms57etpCkKyTqMuPNznBa0Rh9ZFqGtohOPOsoA4WhkIlIzBgkzZeXQgcphK-X7XfL4mkEwj34xBtFhGpu7m3mUDkgk1gsMWvZ1hy06Ngv1fo7nWb7pM9q5o7WvsTHqDMKa_5X_k5d',
          'https://lh3.googleusercontent.com/aida-public/AB6AXuDF-rYWOfhG2O7EUSGvXCFSxdOWO-WuT2QPq0boYvx1KLOjVCSLuPVCitvwiWgdb8qgssoXZJ_mF45QQDgSC79TOE7YtEFFfbw0JPkjcgvzgPfSxn-lfjLbjfi6pzpVUrxuwpO6qg4LhC-aLoHZuLYHhASzo49gteUeNq1s6h4FTelWO0g8E3_hSQcciSnIod3BlGEaksSpgGexyt-aGg2bD914u9LazoKFx98GiG3CQum3IWK9zMgxkn1bzuzMYeIrzIVlbyaYHRq-',
          'https://lh3.googleusercontent.com/aida-public/AB6AXuCeRXUma-lnHA7pEkhaKayWGezOcpXYgl5-S-525m7_RZvZgbq1ykHy8csvAh6aRN0Fpb5_0qHxCoPf14PsHZyK1wPk66LNMx07cjRa0yzjex4mpL0EcpFI8o6R6z69mxtU58h29JBupFDe0RxkysIfw5HG7S7L2IbtE2yLZSaa_E-gckEJWzo74xbwMvrv99mZlaVJoScfnHUAoJTwjM4CYWrzifLnrIHAqu_X1TD7hzA5sJTsatz7617edbbXIgdFp_NgmFvpW1hb',
          'https://lh3.googleusercontent.com/aida-public/AB6AXuD0Zszkqi5vphd-aETSMnyiTNovbgUQmZBsOh5o7tbNA1Ph0CsKSf68HKevkf7ggXS3AlRqtaaBLvdjRG6qP8x_05p2jj9Ft_jocH1duRBD842MirbiOrItVfPljDKKTpLQqZyWDdJTpNbZ_LYL4MkX-XWriCcRW0i4ezSTpJUM6SVTmA-MTfumggBx7W5i1kfUL8BqxnEnTNIwW9a5p5gvwCsmgde8Ukb6Co9X7RlXv5vukEshpdVAk02MNjJatmQcMoI_xy7EQ5GO'
        ],
        itinerary: [
          { day: 1, title: 'Arrival & Sunset Soirée', desc: 'Private chauffeur transfer from Naples to your luxury villa. Welcome cocktails at our partner terrace overlooking the Tyrrhenian Sea.' },
          { day: 2, title: 'Path of the Gods Hike', desc: 'A guided trek through ancient pathways. Experience panoramic vistas followed by a rustic farm-to-table lunch in Nocelle.' },
          { day: 3, title: 'Capri Island Private Sail', desc: 'Board a bespoke Gozzo boat for a private tour around the Faraglioni rocks and the hidden Blue Grotto.' }
        ]
      }
    };
    return defaults[packageId] || defaults['amalfi-coast'];
  };

  const handleBook = () => {
    alert(`Booking Request Submitted! Date: ${dates}, Guests: ${guests}`);
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
                Editor's Choice
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
              <span className="text-xs font-bold text-secondary uppercase tracking-wider">Eco-Certified</span>
            </div>
            <h3 className="text-xl font-bold text-on-surface mb-4">About this experience</h3>
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
                Limited Space
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
            <p className="text-center text-[10px] text-outline mb-6">You won't be charged yet</p>

            <div className="space-y-3 pt-6 border-t border-border-subtle">
              <div className="flex justify-between text-xs text-on-surface-variant">
                <span>Base package (x{guests})</span>
                <span>${pkg.price * guests}</span>
              </div>
              <div className="flex justify-between text-xs text-on-surface-variant">
                <span>Service & Planning fee</span>
                <span>$240</span>
              </div>
              <div className="flex justify-between font-bold text-on-surface pt-2 border-t border-border-subtle/50 text-sm">
                <span>Total (incl. taxes)</span>
                <span>${pkg.price * guests + 240}</span>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-3 p-4 bg-secondary-container/10 rounded-xl">
              <span className="material-symbols-outlined text-secondary">verified</span>
              <p className="text-[10px] text-on-secondary-fixed-variant leading-tight">
                <strong>TravelMate Assurance:</strong> Full refund if cancelled 30 days before departure.
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
            <h3 className="text-xl font-bold text-on-surface">Hosted by TravelMate Concierge</h3>
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
            <h3 className="text-xl font-bold text-on-surface">Guest Reviews</h3>
            <div className="space-y-6">
              <div className="pb-6 border-b border-border-subtle last:border-0">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center font-bold text-primary text-sm">
                    JD
                  </div>
                  <div>
                    <h5 className="font-semibold text-sm">James D.</h5>
                    <span className="text-[10px] text-outline">September 2025</span>
                  </div>
                </div>
                <p className="text-xs text-on-surface-variant italic leading-relaxed">
                  "The attention to detail was flawless. The private yacht day was the highlight of our entire year. TravelMate truly understands premium service."
                </p>
              </div>
              <div className="pb-6 border-b border-border-subtle last:border-0">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center font-bold text-primary text-sm">
                    SL
                  </div>
                  <div>
                    <h5 className="font-semibold text-sm">Sarah L.</h5>
                    <span className="text-[10px] text-outline">July 2025</span>
                  </div>
                </div>
                <p className="text-xs text-on-surface-variant italic leading-relaxed">
                  "Incredible curation. We saw parts of the coast that most tourists never find. Worth every penny."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PackageDetails;
