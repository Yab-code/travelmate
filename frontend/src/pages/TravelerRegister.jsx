import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const TravelerRegister = () => {
  const { registerTraveler } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all required fields.');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (!termsAccepted) {
      setError('You must agree to the Terms of Service and Privacy Policy.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await registerTraveler(name, email, password);
      // If registration automatically logs in, AuthContext state changes, redirect
      // Otherwise, redirect to login page with success state
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-[calc(100vh-5rem)] rounded-3xl overflow-hidden shadow-xl border border-border-subtle bg-white">
      {/* Left Side: Visual Anchor */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-on-surface group">
        <img
          alt="The rock-hewn Church of St. George in Lalibela, Ethiopia"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 scale-105 group-hover:scale-110"
          src="https://lh3.googleusercontent.com/aida/AP1WRLvV8eRhIrEVe1qRVBri6qozKn5D3qGiBr3TvdfQdiv11O3wPlp2Zwc1XhQTTXcfr_FWPliAyHeW0zu76pkeeIGihENAgj3nrqyLAcAwGRFxKALh58YBSnMAvtDqBzmnVHJVJmI4_kl2lWyfRCqAijpnaIaT03zjiGiOdETvgMCyMsYS2VqY2u33Jh7Pa98SyJT1yhE9swJwOwDCKoms90_aDXhd2Jl-M7_HGj59x4Was292jjvNlCNmcKvr"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-on-surface/60 via-transparent to-transparent"></div>
        {/* Branding Overlay */}
        <div className="absolute top-10 left-10">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-white text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              travel_explore
            </span>
            <span className="text-white font-headline-md text-headline-md font-bold tracking-tight">TravelMate</span>
          </div>
        </div>
        <div className="absolute bottom-20 left-10 right-20 text-white">
          <h2 className="font-display-lg text-display-lg font-bold mb-4">Discover the world's best kept secrets.</h2>
          <p className="font-body-lg text-body-lg opacity-90 max-w-lg">
            From the ancient monoliths of Lalibela to modern urban escapes, we curate experiences that linger in the soul.
          </p>
        </div>
      </div>

      {/* Right Side: Registration Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 lg:p-20 bg-surface-bright">
        <div className="w-full max-w-md">
          {/* Mobile Branding */}
          <div className="lg:hidden flex items-center gap-2 mb-10">
            <span className="material-symbols-outlined text-primary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              travel_explore
            </span>
            <span className="text-primary font-headline-md text-headline-md font-bold tracking-tight">TravelMate</span>
          </div>
          <div className="mb-10">
            <h1 className="font-headline-lg text-headline-lg font-semibold mb-2">Start Your Journey</h1>
            <p className="font-body-md text-body-md text-on-surface-variant">Join our global community of premium travelers.</p>
          </div>

          {error && (
            <div className="bg-error-container/30 border border-error/20 text-error px-4 py-3 rounded-xl text-body-sm mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-lg">error</span>
              <span>{error}</span>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Account Type Toggle */}
            <div className="space-y-3">
              <label className="font-label-md text-label-md text-on-surface-variant">Account Type</label>
              <div className="flex p-1 bg-surface-container rounded-xl">
                <button
                  className="flex-1 py-2 px-4 rounded-lg bg-surface-container-lowest text-primary shadow-sm font-label-md text-label-md transition-all focus:outline-none"
                  type="button"
                >
                  Traveler
                </button>
                <button
                  className="flex-1 py-2 px-4 rounded-lg text-on-surface-variant font-label-md text-label-md hover:text-on-surface transition-colors focus:outline-none"
                  type="button"
                  onClick={() => navigate('/register/planner')}
                >
                  Event Planner
                </button>
              </div>
            </div>

            {/* Input Fields */}
            <div className="space-y-4">
              <div>
                <label className="block font-label-md text-label-md text-on-surface-variant mb-1.5" htmlFor="full-name">
                  Full Name
                </label>
                <input
                  className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-xl font-body-md text-body-md placeholder:text-outline focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                  id="full-name"
                  placeholder="Enter your full name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={loading}
                  required
                />
              </div>
              <div>
                <label className="block font-label-md text-label-md text-on-surface-variant mb-1.5" htmlFor="email">
                  Email Address
                </label>
                <input
                  className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-xl font-body-md text-body-md placeholder:text-outline focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                  id="email"
                  placeholder="name@example.com"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  required
                />
              </div>
              <div>
                <label className="block font-label-md text-label-md text-on-surface-variant mb-1.5" htmlFor="phone">
                  Phone Number
                </label>
                <input
                  className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-xl font-body-md text-body-md placeholder:text-outline focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                  id="phone"
                  placeholder="+1 (555) 000-0000"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  disabled={loading}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-label-md text-label-md text-on-surface-variant mb-1.5" htmlFor="password">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-xl font-body-md text-body-md placeholder:text-outline focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                      id="password"
                      placeholder="••••••••"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={loading}
                      required
                    />
                    <button
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-outline-variant hover:text-on-surface-variant focus:outline-none"
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        {showPassword ? 'visibility_off' : 'visibility'}
                      </span>
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block font-label-md text-label-md text-on-surface-variant mb-1.5" htmlFor="confirm-password">
                    Confirm Password
                  </label>
                  <input
                    className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-xl font-body-md text-body-md placeholder:text-outline focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                    id="confirm-password"
                    placeholder="••••••••"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={loading}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Terms & Conditions */}
            <div className="flex items-start gap-3">
              <div className="flex items-center h-5">
                <input
                  className="w-4 h-4 text-primary border-outline-variant rounded focus:ring-primary cursor-pointer"
                  id="terms"
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  disabled={loading}
                  required
                />
              </div>
              <label className="font-body-sm text-body-sm text-on-surface-variant" htmlFor="terms">
                I agree to the <a className="text-primary hover:underline" href="#">Terms of Service</a> and{' '}
                <a className="text-primary hover:underline" href="#">Privacy Policy</a>.
              </label>
            </div>

            {/* Primary Action */}
            <button
              className="w-full py-4 bg-primary text-on-primary font-label-md text-label-md rounded-xl hover:bg-primary-container active:scale-[0.98] transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Registering...</span>
                </>
              ) : (
                <>
                  <span>Create Traveler Account</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </>
              )}
            </button>
          </form>

          {/* Secondary Actions */}
          <div className="mt-8 pt-8 border-t border-outline-variant/30 flex flex-col items-center gap-6">
            <p className="font-body-md text-body-md text-on-surface-variant">
              Already have an account?{' '}
              <Link className="text-primary font-bold hover:underline" to="/login">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default TravelerRegister;




