import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  const stats = [
    { value: '10k+', label: 'Destinations', color: 'text-primary-fixed' },
    { value: '500k+', label: 'Happy Travelers', color: 'text-secondary-fixed-dim' },
    { value: '200+', label: 'Global Partners', color: 'text-tertiary-fixed-dim' }
  ];

  const values = [
    {
      icon: 'verified',
      iconColor: 'text-primary',
      bgColor: 'bg-primary/10',
      title: 'Quality',
      description: 'Every experience is manually vetted by our experts to ensure the highest standards of hospitality and safety.'
    },
    {
      icon: 'payments',
      iconColor: 'text-secondary',
      bgColor: 'bg-secondary/10',
      title: 'Value',
      description: 'We negotiate direct rates with global partners to bring you exclusive pricing without hidden fees.'
    },
    {
      icon: 'auto_awesome',
      iconColor: 'text-accent-yellow',
      bgColor: 'bg-accent-yellow/10',
      title: 'Simplicity',
      description: 'Our intuitive interface makes booking complex multi-city trips as easy as sending a message.'
    }
  ];

  const team = [
    {
      name: 'Elena Rodriguez',
      role: 'CEO & Founder',
      bio: 'Former travel journalist with a passion for sustainable tourism and cultural heritage.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBrIjk7UE4sttsWYy3Sdda2_wgJk0rcwxNY_XfjcEW7WgxYvI3M2qJl3DbCct0KCy79oOORyEHKxP211-FYjE8hOMylebRq99LiC3wHPBnv08z4IS6a6QiX9dec7sP6HL35koLKj1QisQQV8wCupMn8-QOyJ1IDn-6rWGGJdlGOePtrYbjgX0CkOuPOOIkaD1XxlrR-Q2INyuRSarqJHrDFc8oAqokqwMVvtejKMvDraPLj5cKXbUlZU8O8plrLL_FL9w3PkRXhDGhy'
    },
    {
      name: 'David Chen',
      role: 'CTO & Co-Founder',
      bio: 'Previously led engineering teams at top-tier global booking platforms.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC4KTV_0eBUOOKNX75WKqktvmJfsopSQaCSIKAuNgTlOoAuDV4SWgNXasVnZ2nH70qyY74Slbc_ErAnK07WoAT6prMb8rMr3lgdPbeA9oOVNVCJerOMA5L3790AvHVw47ncNCkSvlDk0BK-R5L45zkJMhXVGr9yq6Eo8uEy8Wh-7oPYQoxhmJzd0HZF3tj8uZMekcYz4AdYon_O5UoWKuJevEJJMl9m7QOzibbWFs_XgfT7AE6PsqUeGQsa-zhh__sw8IoTv6oruB7x'
    },
    {
      name: 'Sarah Jenkins',
      role: 'Head of Experiences',
      bio: 'Has personally visited over 85 countries to vet our initial partner networks.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCHP0x_WIv11eHHiEYhnRGJgq_gOjn2xIS4sAPPwZADEgjN0onX1Mjdfpj4VYpg7r5mQGjYUJeGJB_eyA9k9kT3NRWGDNsDi3LkRMb7inORm0eaSEMlwPrS8BVq3ZdWAqW5OtvMj0ai-vyvaju0miICuaL6CnpkDQaT4CWpSnhcZLjouLNCpSXvQjn-FnUhFvUudRYb078J-1kfNmQgJgjtiZjH79q7GYWmwFTAz65oAtRBMP7bQsB7JYOulzcSOTUQqHVeBccin1Su'
    },
    {
      name: 'Marcus Thorne',
      role: 'Design Director',
      bio: 'Ensuring that every digital interaction with TravelMate is intuitive and inspiring.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA6C6Zd3Xm795lkmbX1Wi8qM-J9Bz_IUDAYqK-IqP-RkTdzjj4ZvQRyNNRZ_B1Q4tP0R20yIAk7c1LCfJAkkAdsr0YGKVLm7UQh4xeUIpWWF55kaLFFmbtcAplUxO7-IRzOzVl6v3oHJLVRlN__u002VIKkwpBibFjejLbboS8KYUMd6n2NbTY1S-Aq-qxeWZ_xgY4C9Un_6cJo-4KFVdy11W2VCBHpxBOrcjEc-LPLbBkjJGJ1Ykcc8pkpCmHIj2eI01gExo5qgirj'
    }
  ];

  return (
    <div className="bg-background text-on-surface overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative pt-24 pb-12 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto text-center">
        <div className="max-w-3xl mx-auto">
          <span className="inline-block px-4 py-1.5 mb-6 rounded-full bg-surface-container text-primary font-label-sm text-xs tracking-wider uppercase">
            About Our Journey
          </span>
          <h1 className="font-display-lg text-3xl md:text-5xl font-bold text-on-surface mb-6 tracking-tight leading-tight">
            Empowering travelers to create lasting memories.
          </h1>
          <p className="text-sm md:text-base text-on-surface-variant mb-12 leading-relaxed max-w-2xl mx-auto">
            We believe travel is more than just reaching a destination; it's about the stories you tell, the people you
            meet, and the experiences that change you forever.
          </p>
        </div>

        <div className="relative w-full aspect-video md:aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl mb-24">
          <div className="absolute inset-0 bg-gradient-to-t from-on-surface/40 to-transparent z-10"></div>
          <img
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCFFZeahR5FwmQKYnnrLi2_YRxIJJErUt6iWsV1Z-BHfdxtU70JzhjBAV7y15TpECUbeofTYMYNWOK_Q9pksM8xn_K1yshpLWh5fUpKo2nPaE9IZvs5TlSAp8JKg7yFlG2wEI78pQFVZszqWF9TTh_cBWsw8HVjvI7V8Z1oEwU5ESeAsTMJX0PCOuWttzMUUY8hQVwWfIcU5i6r3u5YGqzwn_2JcVDubKpCNNs5TJGXEG2s72mrRQfhUc7Ed3P4aJL7cumV1sF-saEL"
            alt="Mediterranean coastline at sunset"
          />
        </div>
      </section>

      {/* How TravelMate Works */}
      <section className="py-16 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto bg-surface-container-low rounded-[32px] mb-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-center">
          <div className="md:col-span-5 flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-on-surface mb-5">How TravelMate Works</h2>
            <p className="text-sm text-on-surface-variant mb-8 leading-relaxed">
              Our platform acts as a digital bridge, connecting passionate explorers with curated local experiences that
              aren't found in standard guidebooks. We handle the complexity of logistics so you can focus on the wonder of
              discovery.
            </p>
            <ul className="space-y-5">
              {[
                { title: 'Curated Networks', desc: 'Vetted partners ensuring safety and authenticity.' },
                { title: 'Smart Logistics', desc: 'Real-time scheduling and seamless documentation.' },
                { title: 'Local Experts', desc: '24/7 support from guides who know every destination personally.' }
              ].map((item) => (
                <li key={item.title} className="flex items-start gap-4">
                  <span
                    className="material-symbols-outlined text-secondary mt-0.5"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    check_circle
                  </span>
                  <div>
                    <h4 className="text-sm font-bold text-on-surface">{item.title}</h4>
                    <p className="text-xs text-on-surface-variant mt-0.5">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-7 grid grid-cols-2 gap-4">
            <div className="rounded-2xl overflow-hidden h-56 shadow-sm group">
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0tU99sFl5nYhndQOU9YpyzOPTRHw8uD1JcIadKaPc-LD-iCfb0ahNT0lEYMldYKCAhLAKj0iqmi61I2QV8WhUderQMEPWuQDGmT4EuzYAQPjEOF145UYctBzNjO41lFDO4njou4IAb0NqYW7zooqJX6Jl1i_NA_qX3bT5oED8n8WNi79grWgsoyMENmyr9THaEhFIeGxpCVXZ9pvyh9VXwV1KAqj0884Xf4FruN3CknVwYsuWIogOi85vEFgLb9gomo1w33MeXz1R"
                alt="Local artisan working"
              />
            </div>
            <div className="rounded-2xl overflow-hidden h-72 shadow-sm group -mt-8">
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCgWftUPBljBic1Wdp7vHruZJbBueUpOk10dFisoHD09TzUN_PyoFbMh5Vyvv2mPWScVqkhVlJ--YFwxdP_OnkUYJ7bpqy4DB6MhI9d6U_04AC_KQKPHcEXPC2h8ekFAHEvpdczKWOeQ2ZYUSRgkN9Bco1O55mMcLr3WR5Bdd0akGnzyLKzuv5NxQh8KWLHe-T5Aihq9tKWQuzG-EyT6RQVLfZV5MVdHC_TeYIMEvgT7uNP-jWajDNDyJU0Dv5_7Dq8lTQoUXT7Cyq0"
                alt="Vibrant local market"
              />
            </div>
            <div className="rounded-2xl overflow-hidden h-64 shadow-sm group">
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDzRG81RGA6Q5SM5wlt-eEaMWRSUi7Z1dEZ2Ngf-vKg4ZWIW2D4QvAgcMGLa4LHNJYnW3TUzLyRDrXbVcZqcmCE8lWxRYvcOxHnvHoT_BKPGrGa-2eXlGJq7O7-d-UaQrwpf-ICSF4gaqmW2vYIuKO1NaXFevd3i6pPpd2UsCBI3R6ae7gMkEzN6iPLR_phcUIGC4NamHsaKbCSF8rbPr_w8rnBRU2G0LnPbn0EuN2NDMFneANZGe2Z8ZD6_q9AH8XQP4qgCIk1JQVt"
                alt="Travelers at campfire"
              />
            </div>
            <div className="rounded-2xl overflow-hidden h-48 shadow-sm group -mt-10">
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAB7HknOV7epudp8xdQGYGefvTnzYYKhvtoF8ucfugQb4XUAg8RphGrNh4vW2rHZwRlwIjtm_r6T55Dl8Aw5FCCuJVzksgJmtiv5q1KEaF2UG62BpFLg9UujS5gi_YzkeL2MDyoCa2Eko-vuHCXhYROa3V4iaCRpcs5hz81tOvE5rIyjqVZSrRq2vz_X59PmOm86ZW6wB5OPCXkbUWofkfOT_XJ2bQzQzEazmrKPrBkHVZyvwQuvqItP5irM0ioORF2OKdnjmvg-cEa"
                alt="Travel itinerary on tablet"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why TravelMate */}
      <section className="py-16 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto text-center mb-24">
        <h2 className="text-2xl font-bold text-on-surface mb-12">Why TravelMate?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((val) => (
            <div key={val.title} className="p-8 rounded-2xl glass-effect border border-border-subtle flex flex-col items-center hover:shadow-md transition-all duration-300">
              <div className={`w-16 h-16 ${val.bgColor} rounded-full flex items-center justify-center mb-6`}>
                <span className={`material-symbols-outlined ${val.iconColor} text-4xl`}>{val.icon}</span>
              </div>
              <h3 className="text-lg font-bold text-on-surface mb-3">{val.title}</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">{val.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Statistics Banner */}
      <section className="py-24 bg-on-surface text-on-primary mb-24">
        <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-3 gap-gutter text-center">
          {stats.map((stat, idx) => (
            <div key={stat.label} className={`space-y-2 ${idx === 1 ? 'border-y md:border-y-0 md:border-x border-outline-variant/20 py-8 md:py-0' : ''}`}>
              <div className={`text-5xl font-bold ${stat.color} tracking-tight`}>{stat.value}</div>
              <div className="text-xs uppercase tracking-[0.2em] opacity-70 font-semibold">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto mb-24">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-xl">
            <h2 className="text-2xl font-bold text-on-surface mb-3">Meet the Visionaries</h2>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Our diverse team of world-travelers, data scientists, and storytellers is dedicated to redefining what it
              means to explore the world.
            </p>
          </div>
          <button className="flex items-center gap-2 text-sm font-semibold text-primary group">
            View Careers
            <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
          {team.map((member) => (
            <div key={member.name} className="group">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden mb-4 shadow-sm grayscale hover:grayscale-0 transition-all duration-500">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  src={member.image}
                  alt={member.name}
                />
              </div>
              <h4 className="text-sm font-bold text-on-surface">{member.name}</h4>
              <p className="text-primary text-xs font-semibold mb-1">{member.role}</p>
              <p className="text-xs text-on-surface-variant leading-relaxed">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="mb-24 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="relative rounded-[32px] bg-primary-container p-12 md:p-20 overflow-hidden flex flex-col items-center text-center">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-[120px] -mr-48 -mt-48"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary-container rounded-full blur-[120px] -ml-48 -mb-48"></div>
          </div>
          <h2 className="relative z-10 text-2xl md:text-4xl font-bold text-on-primary mb-8 max-w-2xl leading-tight">
            Ready to start your next adventure?
          </h2>
          <div className="relative z-10 flex flex-col sm:flex-row gap-4">
            <Link
              to="/packages"
              className="px-8 py-3.5 bg-on-primary text-primary text-sm font-bold rounded-full shadow-xl hover:scale-105 active:scale-95 transition-all"
            >
              Explore Packages
            </Link>
            <Link
              to="/register/traveler"
              className="px-8 py-3.5 bg-transparent border border-on-primary/30 text-on-primary text-sm font-bold rounded-full hover:bg-on-primary/10 transition-all"
            >
              Get Started Free
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
