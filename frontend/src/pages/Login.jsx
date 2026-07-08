import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Get the redirect path after successful login
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await login(email, password);
      if (rememberMe) {
        localStorage.setItem('rememberedEmail', email);
      } else {
        localStorage.removeItem('rememberedEmail');
      }
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-[calc(100vh-5rem)] rounded-3xl overflow-hidden shadow-xl border border-border-subtle bg-white">
      {/* Left Section: High-quality travel photo (Simien Mountains) */}
      <section className="hidden lg:flex lg:w-1/2 relative overflow-hidden group">
        <img
          alt="Majestic Simien Mountains at sunset"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 scale-105 group-hover:scale-110"
          src="https://lh3.googleusercontent.com/aida/AP1WRLs1QQ6wYsCzbpzo_NUy8wIzcWA6Zx29MO_IZpy8iJNfx5G82YOsN71z1a4j4KUWj7J3SGbUMuitbzb-RTf410xRFkKDtyBhaivapROwJlgiBGJzmaOI7hEXG2xqro4PD-PyackY3Pkn6G3aJvrPqkUy8j9UUV7giLc8-dCS1qUYRNKhaztoARqWFXJLJcjboe68OGJo9X8uccQnWZH2s3xC9Xxk1SM-_u0f3X6Q6rpGNfScF1PZEqw3w1Da"
        />
        {/* Branding Overlay for Desktop */}
        <div className="absolute inset-0 glass-overlay flex flex-col justify-end p-margin-desktop">
          <div className="max-w-md text-white space-y-4">
            <h2 className="font-display-lg text-display-lg font-bold">The world is waiting for you.</h2>
            <p className="font-body-lg text-body-lg opacity-90">
              Plan your next adventure with TravelMate’s premium planning tools and exclusive destination guides.
            </p>
          </div>
        </div>
        {/* Absolute positioned logo for desktop top-left */}
        <div className="absolute top-10 left-10">
          <span className="font-headline-lg text-headline-lg font-bold text-white tracking-tight">TravelMate</span>
        </div>
      </section>

      {/* Right Section: Sign In Form */}
      <section className="w-full lg:w-1/2 flex flex-col justify-center items-center px-margin-mobile md:px-margin-desktop py-12 bg-surface-container-lowest">
        <div className="w-full max-w-md space-y-8">
          {/* Header & Mobile Logo */}
          <div className="text-center lg:text-left">
            <div className="lg:hidden mb-6">
              <span className="font-headline-lg text-headline-lg font-bold text-primary tracking-tight">TravelMate</span>
            </div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface mb-2 font-semibold">Welcome Back</h1>
            <p className="font-body-md text-body-md text-on-surface-variant">Please enter your details to access your account.</p>
          </div>

          {error && (
            <div className="bg-error-container/30 border border-error/20 text-error px-4 py-3 rounded-xl text-body-sm flex items-center gap-2 animate-in fade-in duration-200">
              <span className="material-symbols-outlined text-lg">error</span>
              <span>{error}</span>
            </div>
          )}

          {/* Form Section */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              {/* Email Input */}
              <div className="space-y-2">
                <label className="block font-label-md text-label-md text-on-surface-variant" htmlFor="email">
                  Email Address
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">mail</span>
                  <input
                    className="w-full pl-12 pr-4 py-3 bg-surface-bright border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-body-md"
                    id="email"
                    placeholder="name@example.com"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                    required
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <label className="block font-label-md text-label-md text-on-surface-variant" htmlFor="password">
                  Password
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">lock</span>
                  <input
                    className="w-full pl-12 pr-12 py-3 bg-surface-bright border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-body-md"
                    id="password"
                    placeholder="••••••••"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                    required
                  />
                  <button
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface transition-colors focus:outline-none"
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={loading}
                  >
                    <span className="material-symbols-outlined">{showPassword ? 'visibility_off' : 'visibility'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center cursor-pointer group">
                <input
                  className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary focus:ring-offset-0 transition-all cursor-pointer"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  disabled={loading}
                />
                <span className="ml-2 font-body-sm text-body-sm text-on-surface-variant group-hover:text-on-surface transition-colors">
                  Remember me
                </span>
              </label>
              <Link
                className="font-label-md text-label-md text-primary hover:text-primary-container transition-colors"
                to="/reset-password"
              >
                Forgot password?
              </Link>
            </div>

            {/* Sign In Button */}
            <button
              className="w-full py-4 bg-primary text-on-primary font-label-md text-label-md rounded-xl hover:bg-primary-container active:scale-[0.98] transition-all shadow-md flex items-center justify-center gap-2"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Authenticating...</span>
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative flex items-center py-2">
            <div className="flex-grow border-t border-outline-variant/30"></div>
            <span className="flex-shrink mx-4 font-label-sm text-label-sm text-outline uppercase tracking-wider">
              Or continue with
            </span>
            <div className="flex-grow border-t border-outline-variant/30"></div>
          </div>

          {/* Social Logins */}
          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center py-3 border border-outline-variant rounded-xl social-btn-shadow hover:bg-surface-container-low transition-all bg-surface-container-lowest">
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                <path
                  d="M12 5.04c1.64 0 3.12.56 4.28 1.67l3.21-3.21C17.54 1.76 14.98 1 12 1 7.37 1 3.42 3.66 1.48 7.57l3.78 2.93C6.18 7.4 8.87 5.04 12 5.04z"
                  fill="#EA4335"
                ></path>
                <path
                  d="M23.49 12.27c0-.8-.07-1.56-.21-2.3H12v4.35h6.44c-.28 1.48-1.12 2.73-2.38 3.58l3.7 2.87c2.16-1.99 3.43-4.91 3.43-8.5z"
                  fill="#4285F4"
                ></path>
                <path
                  d="M5.26 14.49c-.24-.71-.38-1.47-.38-2.27s.14-1.56.38-2.27L1.48 7.07C.54 8.94 0 11.01 0 13s.54 4.06 1.48 5.93l3.78-2.44z"
                  fill="#FBBC05"
                ></path>
                <path
                  d="M12 23c3.16 0 5.81-1.05 7.75-2.84l-3.7-2.87c-1.07.72-2.44 1.15-4.05 1.15-3.13 0-5.82-2.36-6.74-5.46l-3.78 2.93C3.42 20.34 7.37 23 12 23z"
                  fill="#34A853"
                ></path>
              </svg>
              <span className="font-label-md text-label-md text-on-surface">Google</span>
            </button>
            <button className="flex items-center justify-center py-3 border border-outline-variant rounded-xl social-btn-shadow hover:bg-surface-container-low transition-all bg-surface-container-lowest">
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                <path
                  d="M17.05 20.28c-.98.95-2.05 1.72-3.1 1.72-1.05 0-1.4-.64-2.65-.64s-1.65.64-2.65.64c-1.05 0-2.12-.77-3.1-1.72-2.18-2.13-2.18-5.59 0-7.72.98-.95 2.05-1.72 3.1-1.72 1.05 0 1.4.64 2.65.64s1.65-.64 2.65-.64c1.05 0 2.12.77 3.1 1.72 2.18 2.13 2.18 5.59 0 7.72zM12 9.04c1.28 0 2.33-1.05 2.33-2.33S13.28 4.38 12 4.38s-2.33 1.05-2.33 2.33S10.72 9.04 12 9.04z"
                  fill="currentColor"
                ></path>
              </svg>
              <span className="font-label-md text-label-md text-on-surface">Apple</span>
            </button>
          </div>

          {/* Footer Text */}
          <div className="text-center">
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Don't have an account?
              <Link
                className="font-label-md text-label-md text-primary hover:text-primary-container transition-colors ml-1 font-semibold"
                to="/register/traveler"
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Login;
