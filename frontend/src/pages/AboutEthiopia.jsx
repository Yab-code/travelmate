import React from 'react';
import { Link } from 'react-router-dom';

const AboutEthiopia = () => {
  const stats = [
    { value: '3,000+', label: 'Years of History', color: 'text-primary-fixed' },
    { value: '80+', label: 'Ethnic Groups', color: 'text-secondary-fixed-dim' },
    { value: '9', label: 'UNESCO Sites', color: 'text-tertiary-fixed-dim' }
  ];

  const destinations = [
    {
      name: 'Lalibela',
      desc: 'The "Jerusalem of Africa" — 11 monolithic rock-hewn churches built in the 12th century.',
      icon: 'church',
      category: 'Heritage'
    },
    {
      name: 'Simien Mountains',
      desc: 'A UNESCO World Heritage site home to the endangered Gelada baboon and Ethiopian wolf.',
      icon: 'landscape',
      category: 'Nature'
    },
    {
      name: 'Danakil Depression',
      desc: "The world's hottest inhabited place — Dallol's alien sulphur springs and lava lakes.",
      icon: 'volcano',
      category: 'Adventure'
    },
    {
      name: 'Axum (Aksum)',
      desc: 'Ancient obelisks and the legendary Ark of the Covenant resting place of the Tigray highlands.',
      icon: 'account_balance',
      category: 'History'
    },
    {
      name: 'Omo Valley',
      desc: 'Living museum of tribal cultures — Mursi, Hamar, Karo — each with unique body art traditions.',
      icon: 'groups',
      category: 'Culture'
    },
    {
      name: 'Blue Nile Falls',
      desc: 'The "Smoke of Fire" — a thundering cascade near Lake Tana, source of the Blue Nile.',
      icon: 'water',
      category: 'Nature'
    }
  ];

  const values = [
    {
      icon: 'eco',
      iconColor: 'text-secondary',
      bgColor: 'bg-secondary/10',
      title: 'Sustainable Tourism',
      description: 'We partner only with community-owned lodges and certified eco-guides to protect Ethiopia\'s natural heritage.'
    },
    {
      icon: 'diversity_3',
      iconColor: 'text-primary',
      bgColor: 'bg-primary/10',
      title: 'Cultural Respect',
      description: 'Our local team ensures every tour operates with full community consent and benefits local economies directly.'
    },
    {
      icon: 'support_agent',
      iconColor: 'text-accent-yellow',
      bgColor: 'bg-accent-yellow/10',
      title: '24/7 Local Support',
      description: 'Our Addis Ababa operations centre provides round-the-clock assistance in English, Amharic and Oromo.'
    }
  ];

  return (
    <div className="bg-background text-on-surface overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative pt-24 pb-12 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto text-center">
        <div className="max-w-3xl mx-auto">
          <span className="inline-block px-4 py-1.5 mb-6 rounded-full bg-surface-container text-primary font-label-sm text-xs tracking-wider uppercase">
            About TravelMate Ethiopia
          </span>
          <h1 className="font-display-lg text-3xl md:text-5xl font-bold text-on-surface mb-6 tracking-tight leading-tight">
            The Land of Origins, Told Through Your Eyes.
          </h1>
          <p className="text-sm md:text-base text-on-surface-variant mb-12 leading-relaxed max-w-2xl mx-auto">
            Ethiopia is not a destination — it is an experience. The cradle of humanity, the birthplace of coffee, the
            origin of the Nile. We are your expert guides into one of the world's most extraordinary cultures.
          </p>
        </div>

        <div className="relative w-full aspect-video md:aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl mb-24">
          <div className="absolute inset-0 bg-gradient-to-t from-on-surface/50 to-transparent z-10"></div>
          <img
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA7vIJEqWIdD-grjQX1Gm6iYFU_v-aSEVNT_m3SkDFdTXE7WsAD_lj4B68U3SuvzK42QwUAl2jSCZqJNOzX8tvZhTOiEma2N6L4CiU66i88R8fRYZedpUy5VBOTLz-nNQnBZLP9ygifKuHRDlOahGvvxGAlqJBNgv1xXHzniRSbKQmQ6Eg8HE6zROyHiL1CgGl1hHZPcVr_TiBBPRaoKWjW1XwGTWyv-CcQAULr65Bbg355ywNRR03qwt5la4xiDNGlJUkdFB45qkmP"
            alt="Lalibela rock-hewn churches"
          />
          <div className="absolute bottom-8 left-8 z-20 text-white text-left">
            <p className="text-xs text-white/70 mb-1">UNESCO World Heritage Site</p>
            <h2 className="text-xl font-bold">Rock-Hewn Churches of Lalibela</h2>
          </div>
        </div>
      </section>

      {/* Key Destinations Bento Grid */}
      <section className="py-16 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto bg-surface-container-low rounded-[32px] mb-24">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-on-surface mb-3">Iconic Ethiopian Destinations</h2>
          <p className="text-sm text-on-surface-variant max-w-xl mx-auto leading-relaxed">
            From UNESCO-listed highlands to geothermal wonders — every corner of Ethiopia holds a discovery that will
            redefine how you see the world.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {destinations.map((dest) => (
            <div
              key={dest.name}
              className="bg-white p-6 rounded-2xl border border-border-subtle hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col gap-4"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-primary text-2xl">{dest.icon}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-outline bg-surface-container px-2 py-0.5 rounded-full">
                    {dest.category}
                  </span>
                  <h3 className="text-sm font-bold text-on-surface mt-1">{dest.name}</h3>
                </div>
              </div>
              <p className="text-xs text-on-surface-variant leading-relaxed">{dest.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto text-center mb-24">
        <h2 className="text-2xl font-bold text-on-surface mb-4">Our Ethiopia Promise</h2>
        <p className="text-sm text-on-surface-variant max-w-lg mx-auto mb-12 leading-relaxed">
          Ethical, community-driven travel that gives back to the incredible people who make Ethiopia so special.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((val) => (
            <div
              key={val.title}
              className="p-8 rounded-2xl glass-effect border border-border-subtle flex flex-col items-center hover:shadow-md transition-all duration-300"
            >
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
            <div
              key={stat.label}
              className={`space-y-2 ${idx === 1 ? 'border-y md:border-y-0 md:border-x border-outline-variant/20 py-8 md:py-0' : ''}`}
            >
              <div className={`text-5xl font-bold ${stat.color} tracking-tight`}>{stat.value}</div>
              <div className="text-xs uppercase tracking-[0.2em] opacity-70 font-semibold">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Our Local Team */}
      <section className="py-16 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto mb-24">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-xl">
            <h2 className="text-2xl font-bold text-on-surface mb-3">Your Local Ethiopia Team</h2>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Born and raised in Ethiopia, our team of licensed guides, cultural historians, and adventure specialists
              bring authentic insider knowledge to every journey.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-gutter">
          {[
            { name: 'Biruk Alemu', role: 'Head of Heritage Tours', bio: 'Archaeology graduate, specialises in Axumite and Lalibela civilisations.', initials: 'BA' },
            { name: 'Hiwot Tadesse', role: 'Adventure & Trekking Lead', bio: 'Certified mountain guide with 12+ Simien summits and Danakil expeditions.', initials: 'HT' },
            { name: 'Dawit Kebede', role: 'Cultural Experiences Curator', bio: 'Ethnographer and coffee ceremony expert connecting travellers with Omo Valley tribes.', initials: 'DK' }
          ].map((member) => (
            <div key={member.name} className="group text-center p-6 bg-white rounded-2xl border border-border-subtle hover:shadow-md transition-all">
              <div className="w-24 h-24 rounded-full bg-primary-fixed-dim flex items-center justify-center font-bold text-primary text-2xl mx-auto mb-4 group-hover:bg-primary group-hover:text-on-primary transition-all duration-300">
                {member.initials}
              </div>
              <h4 className="text-sm font-bold text-on-surface">{member.name}</h4>
              <p className="text-primary text-xs font-semibold mb-2">{member.role}</p>
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
            Ready to discover the land of origins?
          </h2>
          <div className="relative z-10 flex flex-col sm:flex-row gap-4">
            <Link
              to="/et/packages"
              className="px-8 py-3.5 bg-on-primary text-primary text-sm font-bold rounded-full shadow-xl hover:scale-105 active:scale-95 transition-all"
            >
              Explore Ethiopia Packages
            </Link>
            <Link
              to="/et/events"
              className="px-8 py-3.5 bg-transparent border border-on-primary/30 text-on-primary text-sm font-bold rounded-full hover:bg-on-primary/10 transition-all"
            >
              View Ethiopian Festivals
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutEthiopia;
