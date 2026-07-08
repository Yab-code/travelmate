import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  const isEthiopia = location.pathname.startsWith('/et');

  const getLinkPath = (path) => {
    return isEthiopia ? `/et${path}` : path;
  };

  return (
    <>
      <footer className="w-full px-margin-mobile md:px-margin-desktop py-20 max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-4 gap-gutter bg-on-surface text-white rounded-t-3xl mt-12">
        <div className="md:col-span-1">
          <h2 className="font-headline-md text-headline-md font-bold text-primary-fixed mb-6">TravelMate</h2>
          <p className="font-body-sm text-outline-variant mb-8">
            Premium travel and event planning for those who seek the extraordinary. Explore more, stress less.
          </p>
          <div className="flex gap-4">
            <a className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-all" href="#">
              <span className="material-symbols-outlined text-sm">share</span>
            </a>
            <a className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-all" href="#">
              <span className="material-symbols-outlined text-sm">public</span>
            </a>
            <a className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-all" href="#">
              <span className="material-symbols-outlined text-sm">mail</span>
            </a>
          </div>
        </div>
        <div>
          <h4 className="font-label-md text-white mb-6 uppercase tracking-widest text-[12px]">Navigation</h4>
          <ul className="flex flex-col gap-4">
            <li><Link className="font-body-sm text-outline-variant hover:text-white transition-colors" to={getLinkPath('/')}>Home</Link></li>
            <li><Link className="font-body-sm text-outline-variant hover:text-white transition-colors" to={getLinkPath('/packages')}>Packages</Link></li>
            <li><Link className="font-body-sm text-outline-variant hover:text-white transition-colors" to={getLinkPath('/events')}>Events</Link></li>
            <li><Link className="font-body-sm text-outline-variant hover:text-white transition-colors" to={getLinkPath('/about')}>About Us</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-label-md text-white mb-6 uppercase tracking-widest text-[12px]">Legal</h4>
          <ul className="flex flex-col gap-4">
            <li><a className="font-body-sm text-outline-variant hover:text-white transition-colors" href="#">Privacy Policy</a></li>
            <li><a className="font-body-sm text-outline-variant hover:text-white transition-colors" href="#">Terms of Service</a></li>
            <li><a className="font-body-sm text-outline-variant hover:text-white transition-colors" href="#">Cookies Policy</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-label-md text-white mb-6 uppercase tracking-widest text-[12px]">Newsletter</h4>
          <p className="font-body-sm text-outline-variant mb-4">Get curated travel guides and exclusive deals.</p>
          <form className="flex flex-col gap-2" onSubmit={(e) => e.preventDefault()}>
            <input
              className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:ring-primary focus:border-primary placeholder:text-white/40 text-body-sm outline-none"
              placeholder="Your email address"
              type="email"
            />
            <button className="bg-primary text-on-primary px-4 py-2.5 rounded-lg font-label-md hover:bg-primary-container transition-all text-body-sm">
              Subscribe
            </button>
          </form>
        </div>
        <div className="md:col-span-4 border-t border-white/10 pt-10 mt-10">
          <p className="font-body-sm text-outline-variant text-center text-xs">
            © {new Date().getFullYear()} TravelMate. Premium Travel & Event Planning. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Mobile Navigation (Bottom Bar) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-border-subtle flex items-center justify-around z-55">
        <Link
          to={getLinkPath('/')}
          className={`flex flex-col items-center ${location.pathname === '/' || location.pathname === '/et' ? 'text-primary' : 'text-on-surface-variant'}`}
        >
          <span className="material-symbols-outlined" style={{ fontVariationSettings: location.pathname === '/' || location.pathname === '/et' ? "'FILL' 1" : "'FILL' 0" }}>home</span>
          <span className="text-[10px] font-medium">Home</span>
        </Link>
        <Link
          to={getLinkPath('/packages')}
          className={`flex flex-col items-center ${location.pathname.includes('/packages') ? 'text-primary' : 'text-on-surface-variant'}`}
        >
          <span className="material-symbols-outlined" style={{ fontVariationSettings: location.pathname.includes('/packages') ? "'FILL' 1" : "'FILL' 0" }}>explore</span>
          <span className="text-[10px] font-medium">Packages</span>
        </Link>
        <Link
          to={getLinkPath('/events')}
          className={`flex flex-col items-center ${location.pathname.includes('/events') ? 'text-primary' : 'text-on-surface-variant'}`}
        >
          <span className="material-symbols-outlined" style={{ fontVariationSettings: location.pathname.includes('/events') ? "'FILL' 1" : "'FILL' 0" }}>event</span>
          <span className="text-[10px] font-medium">Events</span>
        </Link>
        <Link
          to={getLinkPath('/about')}
          className={`flex flex-col items-center ${location.pathname.includes('/about') ? 'text-primary' : 'text-on-surface-variant'}`}
        >
          <span className="material-symbols-outlined" style={{ fontVariationSettings: location.pathname.includes('/about') ? "'FILL' 1" : "'FILL' 0" }}>info</span>
          <span className="text-[10px] font-medium">About</span>
        </Link>
      </div>
    </>
  );
};

export default Footer;
