import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSendInstructions = (e) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setError('');

    // Simulate sending email reset code
    setTimeout(() => {
      setLoading(false);
      setStep(2);
    }, 1500);
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    if (!password || !confirmPassword) return;

    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    setError('');

    // Simulate password reset API call
    setTimeout(() => {
      setLoading(false);
      setStep(3);
    }, 1500);
  };

  return (
    <main className="flex min-h-[calc(100vh-5rem)] rounded-3xl overflow-hidden shadow-xl border border-border-subtle bg-white">
      {/* Left Side: Visual Experience */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-on-surface group">
        <div className="absolute inset-0 w-full h-full">
          <img
            className="w-full h-full object-cover transition-transform duration-500 scale-105 group-hover:scale-110"
            src="https://lh3.googleusercontent.com/aida/AP1WRLszbTpagR1swWPxxJKMONHPeE7MR_GampP7JHSv6d3ZJ-fKheKOKWoGSz3gc-KoxK4GwFX62ouOoNmIvoLBST2PnfZgaVavdWWEgAyRY9WvQhXfFOV0rmvLVOv7GbLW6qDPbb0v08JNEaGmx-3wH5zyBo-a1Cd50-9nKC-rN8Yy6p8P2i0L5nMgdB4pu5yRJL5_LXt8OW7v5W8VA2iRgpC6tcQ5_tt5AXWVhTmdtgAYenG_ziI391_ZlYxn"
            alt="Scenic view"
          />
          {/* Premium Gradient Overlay for Legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-on-surface/60 via-transparent to-on-surface/20"></div>
        </div>
        {/* Branding/Inspiration Overlay */}
        <div className="relative z-10 p-margin-desktop flex flex-col justify-between h-full w-full">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-white text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>explore</span>
            <span className="font-headline text-headline-md text-white font-bold tracking-tight">TravelMate</span>
          </div>
          <div className="max-w-md text-white">
            <h1 className="font-headline text-display-lg font-bold mb-4">Reconnect with the world.</h1>
            <p className="font-body text-body-lg text-white/80">
              Every destination is a story waiting to be written. Let's get you back on track to your next adventure.
            </p>
          </div>
          <div className="flex items-center gap-4 text-white/60 font-body text-body-sm">
            <span>© {new Date().getFullYear()} TravelMate</span>
            <span className="w-1 h-1 rounded-full bg-white/40"></span>
            <span>Premium Travel & Event Planning</span>
          </div>
        </div>
      </div>

      {/* Right Side: Interaction Flow */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-margin-mobile md:p-margin-desktop py-12 bg-surface-bright">
        <div className="w-full max-w-md">
          {error && (
            <div className="bg-error-container/30 border border-error/20 text-error px-4 py-3 rounded-xl text-body-sm mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-lg">error</span>
              <span>{error}</span>
            </div>
          )}

          {/* Step 1: Email Verification */}
          {step === 1 && (
            <div className="step-transition">
              <div className="mb-8">
                <h2 className="font-headline text-headline-lg text-on-surface mb-2 font-semibold">Forgot password?</h2>
                <p className="font-body text-body-md text-on-surface-variant">No worries, we'll send you reset instructions.</p>
              </div>
              <form className="space-y-6" onSubmit={handleSendInstructions}>
                <div>
                  <label className="block font-label-md text-on-surface mb-2" htmlFor="email">
                    Email Address
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline-variant">mail</span>
                    <input
                      className="w-full pl-10 pr-4 py-3 bg-white border border-border-subtle rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-body text-body-md placeholder:text-outline-variant outline-none"
                      id="email"
                      placeholder="Enter your email"
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={loading}
                    />
                  </div>
                </div>
                <button
                  className="w-full bg-primary hover:bg-on-primary-fixed-variant text-white font-label-md py-4 rounded-xl shadow-sm hover:shadow-md transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Sending...</span>
                    </>
                  ) : (
                    'Reset Password'
                  )}
                </button>
                <div className="text-center pt-2">
                  <Link
                    className="inline-flex items-center gap-2 font-label-md text-primary hover:text-on-primary-fixed-variant transition-colors"
                    to="/login"
                  >
                    <span className="material-symbols-outlined text-body-md">arrow_back</span>
                    Back to login
                  </Link>
                </div>
              </form>
            </div>
          )}

          {/* Step 2: New Password Entry */}
          {step === 2 && (
            <div className="step-transition">
              <div className="mb-8">
                <div className="w-14 h-14 bg-surface-container-high rounded-2xl flex items-center justify-center mb-6 text-primary">
                  <span className="material-symbols-outlined text-headline-lg">key</span>
                </div>
                <h2 className="font-headline text-headline-lg text-on-surface mb-2 font-semibold">Set new password</h2>
                <p className="font-body text-body-md text-on-surface-variant">
                  Your new password must be different from previously used passwords.
                </p>
              </div>
              <form className="space-y-6" onSubmit={handleResetPassword}>
                <div className="space-y-4">
                  <div>
                    <label className="block font-label-md text-on-surface mb-2" htmlFor="password">
                      Password
                    </label>
                    <input
                      className="w-full px-4 py-3 bg-white border border-border-subtle rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-body text-body-md outline-none"
                      id="password"
                      placeholder="••••••••"
                      required
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={loading}
                    />
                    <p className="mt-2 text-body-sm text-outline">Must be at least 8 characters.</p>
                  </div>
                  <div>
                    <label className="block font-label-md text-on-surface mb-2" htmlFor="confirm-password">
                      Confirm Password
                    </label>
                    <input
                      className="w-full px-4 py-3 bg-white border border-border-subtle rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-body text-body-md outline-none"
                      id="confirm-password"
                      placeholder="••••••••"
                      required
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      disabled={loading}
                    />
                  </div>
                </div>
                <button
                  className="w-full bg-primary hover:bg-on-primary-fixed-variant text-white font-label-md py-4 rounded-xl shadow-sm hover:shadow-md transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Saving...</span>
                    </>
                  ) : (
                    'Reset Password'
                  )}
                </button>
              </form>
            </div>
          )}

          {/* Step 3: Success Confirmation */}
          {step === 3 && (
            <div className="step-transition text-center">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-secondary-container rounded-full flex items-center justify-center text-on-secondary-container animate-bounce">
                  <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                    check_circle
                  </span>
                </div>
              </div>
              <h2 className="font-headline text-headline-lg text-on-surface mb-2 font-semibold">Password reset</h2>
              <p className="font-body text-body-md text-on-surface-variant mb-10 px-4">
                Your password has been successfully reset. Click below to log in magically.
              </p>
              <button
                className="w-full bg-primary hover:bg-on-primary-fixed-variant text-white font-label-md py-4 rounded-xl shadow-sm hover:shadow-md transition-all active:scale-[0.98]"
                onClick={() => navigate('/login')}
              >
                Continue to Login
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default ResetPassword;
