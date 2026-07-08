import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PlannerRegister = () => {
  const { registerPlanner } = useAuth();
  const navigate = useNavigate();

  // User details state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Company details state
  const [companyName, setCompanyName] = useState('');
  const [businessEmail, setBusinessEmail] = useState('');
  const [companyPhone, setCompanyPhone] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [description, setDescription] = useState('');
  const [logo, setLogo] = useState('');
  const [licenseDocument, setLicenseDocument] = useState('');
  const [fileName, setFileName] = useState('');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      // Simulate file upload by setting a mock path/url
      setLicenseDocument(`documents/${file.name}`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword || !companyName || !businessEmail || !description) {
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
      setError('You must agree to the Terms and Conditions.');
      return;
    }

    setLoading(true);
    setError('');

    const companyData = {
      companyName,
      businessEmail,
      phone: companyPhone || phone,
      address: companyAddress || 'Online',
      description,
      logo: logo || 'default-logo.png',
      licenseDocument: licenseDocument || 'default-license.pdf'
    };

    try {
      await registerPlanner(name, email, password, companyData);
      // Redirect to login or home. Since company is registered, it might start as PENDING status
      navigate('/dashboard', { replace: true, state: { partnerPending: true } });
    } catch (err) {
      setError(err.message || 'Planner registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex-grow w-full max-w-container-max mx-auto flex flex-col md:flex-row overflow-hidden md:min-h-[calc(100vh-5rem)] rounded-3xl shadow-xl border border-border-subtle bg-white mt-4">
      {/* Left Side: Visual/Contextual Anchor */}
      <section className="w-full md:w-1/2 relative min-h-[400px] md:min-h-0 group">
        <div className="absolute inset-0 overflow-hidden">
          <img
            alt="Authentic coffee ceremony setup"
            className="w-full h-full object-cover transition-transform duration-500 scale-105 group-hover:scale-110"
            src="https://lh3.googleusercontent.com/aida/AP1WRLv9Ho1NS1kXo0B-TaMDnF-SE7vgb5Q3ln_aO9FuHPoCh_rGWMo3eFBkJsZFD4jyDInD8nusZsezENNqAmPIkyZn3-Hu6BCIXBlhDJDeAmva3PCIWq4tGx9dimFxkwqxSA6V6x_t3dAs829IV5oomYmQrERE3bjDaNrRUE_kbK--uWkvIZ5bxRTPk2yt33n9W55nvGOv_hZsxRyjplwjitYUIyxZP_42rQEYe_beZ81bfx9tGPhIumpAcwye"
          />
        </div>
        {/* Overlay Content */}
        <div className="absolute inset-0 bg-gradient-to-t from-on-surface/60 via-transparent to-transparent flex flex-col justify-end p-margin-desktop text-white">
          <div className="max-w-md animate-fade-in">
            <h2 className="font-display-lg text-display-lg font-bold mb-4">Craft Unforgettable Experiences</h2>
            <p className="font-body-lg text-body-lg opacity-90">
              Join our network of premium event planners and travel experts. Bring local heritage and modern excellence to a global audience.
            </p>
          </div>
        </div>
      </section>

      {/* Right Side: Registration Form */}
      <section className="w-full md:w-1/2 bg-surface-container-lowest p-6 md:p-12 flex flex-col justify-center overflow-y-auto">
        <div className="max-w-xl mx-auto w-full py-4">
          <div className="mb-10">
            <h1 className="font-headline-lg text-headline-lg font-semibold text-on-surface mb-2">Partner with TravelMate</h1>
            <p className="font-body-md text-body-md text-on-surface-variant">Fill out the details below to begin your journey as a certified partner.</p>
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
                  className="flex-1 py-2 px-4 rounded-lg text-on-surface-variant font-label-md text-label-md hover:text-on-surface transition-colors focus:outline-none"
                  type="button"
                  onClick={() => navigate('/register/traveler')}
                >
                  Traveler
                </button>
                <button
                  className="flex-1 py-2 px-4 rounded-lg bg-surface-container-lowest text-primary shadow-sm font-label-md text-label-md transition-all focus:outline-none"
                  type="button"
                >
                  Event Planner
                </button>
              </div>
            </div>

            {/* SECTION 1: Personal Account Info */}
            <div className="border-b border-border-subtle pb-6 space-y-4">
              <h3 className="text-body-lg font-bold text-primary">1. Personal Account Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-label-md text-body-sm text-on-surface" htmlFor="owner-name">Full Name</label>
                  <input
                    className="w-full bg-white border border-outline-variant rounded-lg px-4 py-2.5 font-body-md text-body-md transition-all focus:border-primary outline-none"
                    id="owner-name"
                    placeholder="Jane Cooper"
                    required
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={loading}
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-label-md text-body-sm text-on-surface" htmlFor="personal-phone">Phone Number</label>
                  <input
                    className="w-full bg-white border border-outline-variant rounded-lg px-4 py-2.5 font-body-md text-body-md transition-all focus:border-primary outline-none"
                    id="personal-phone"
                    placeholder="+1 (555) 000-0000"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    disabled={loading}
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="font-label-md text-body-sm text-on-surface" htmlFor="email">Email Address</label>
                <input
                  className="w-full bg-white border border-outline-variant rounded-lg px-4 py-2.5 font-body-md text-body-md transition-all focus:border-primary outline-none"
                  id="email"
                  placeholder="jane@example.com"
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-label-md text-body-sm text-on-surface" htmlFor="password">Password</label>
                  <input
                    className="w-full bg-white border border-outline-variant rounded-lg px-4 py-2.5 font-body-md text-body-md transition-all focus:border-primary outline-none"
                    id="password"
                    placeholder="••••••••"
                    required
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-label-md text-body-sm text-on-surface" htmlFor="confirm-password">Confirm Password</label>
                  <input
                    className="w-full bg-white border border-outline-variant rounded-lg px-4 py-2.5 font-body-md text-body-md transition-all focus:border-primary outline-none"
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
            </div>

            {/* SECTION 2: Company/Business Details */}
            <div className="space-y-4 pt-2">
              <h3 className="text-body-lg font-bold text-primary">2. Company Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-label-md text-body-sm text-on-surface" htmlFor="company-name">Company Name</label>
                  <input
                    className="w-full bg-white border border-outline-variant rounded-lg px-4 py-2.5 font-body-md text-body-md transition-all focus:border-primary outline-none"
                    id="company-name"
                    placeholder="Elite Travels Ltd."
                    required
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    disabled={loading}
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-label-md text-body-sm text-on-surface" htmlFor="business-email">Business Email</label>
                  <input
                    className="w-full bg-white border border-outline-variant rounded-lg px-4 py-2.5 font-body-md text-body-md transition-all focus:border-primary outline-none"
                    id="business-email"
                    placeholder="partner@elitetravels.com"
                    required
                    type="email"
                    value={businessEmail}
                    onChange={(e) => setBusinessEmail(e.target.value)}
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-label-md text-body-sm text-on-surface" htmlFor="company-phone">Company Phone</label>
                  <input
                    className="w-full bg-white border border-outline-variant rounded-lg px-4 py-2.5 font-body-md text-body-md transition-all focus:border-primary outline-none"
                    id="company-phone"
                    placeholder="+1 (555) 123-4567"
                    type="tel"
                    value={companyPhone}
                    onChange={(e) => setCompanyPhone(e.target.value)}
                    disabled={loading}
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-label-md text-body-sm text-on-surface" htmlFor="company-address">Company Address</label>
                  <input
                    className="w-full bg-white border border-outline-variant rounded-lg px-4 py-2.5 font-body-md text-body-md transition-all focus:border-primary outline-none"
                    id="company-address"
                    placeholder="Bole, Addis Ababa"
                    type="text"
                    value={companyAddress}
                    onChange={(e) => setCompanyAddress(e.target.value)}
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-label-md text-body-sm text-on-surface" htmlFor="description">Business Description</label>
                <textarea
                  className="w-full bg-white border border-outline-variant rounded-xl px-4 py-3 font-body-md text-body-md transition-all focus:border-primary outline-none"
                  id="description"
                  placeholder="Briefly describe your services, specialties, and experience in event planning..."
                  required
                  rows="3"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  disabled={loading}
                ></textarea>
              </div>

              {/* File Upload Area */}
              <div className="space-y-2">
                <label className="font-label-md text-body-sm text-on-surface">Business License Upload</label>
                <div
                  className="border-2 border-dashed border-outline-variant rounded-xl p-6 flex flex-col items-center justify-center bg-surface-container-low hover:bg-surface-container hover:border-primary transition-all cursor-pointer group"
                  onClick={() => document.getElementById('file-input').click()}
                >
                  <span className="material-symbols-outlined text-4xl text-outline mb-2 group-hover:text-primary transition-colors">
                    {fileName ? 'check_circle' : 'upload_file'}
                  </span>
                  <p className="font-body-md text-body-sm text-on-surface-variant text-center">
                    {fileName ? (
                      <span className="text-secondary font-bold">{fileName} (Uploaded)</span>
                    ) : (
                      <>
                        <span className="text-primary font-bold">Click to upload</span> or drag and drop your Business License (PDF, JPG)
                      </>
                    )}
                  </p>
                  <p className="font-label-sm text-[10px] text-outline mt-0.5">Maximum file size 10MB</p>
                  <input
                    className="hidden"
                    id="file-input"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileUpload}
                    disabled={loading}
                  />
                </div>
              </div>
            </div>

            {/* Informational Note */}
            <div className="flex gap-3 p-4 bg-surface-container-high rounded-lg items-start border border-primary/10">
              <span className="material-symbols-outlined text-primary text-xl mt-0.5">info</span>
              <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                <strong>Review Process:</strong> Your application will be reviewed by our partnership team. Expect a response via email within 3-5 business days. We prioritize planners with a track record of cultural excellence.
              </p>
            </div>

            {/* Terms Checkbox */}
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
              <label className="font-body-sm text-xs text-on-surface-variant cursor-pointer" htmlFor="terms">
                I agree to the Terms of Service and Privacy Policy as a TravelMate Business Partner.
              </label>
            </div>

            {/* Submit Button */}
            <button
              className="w-full bg-primary text-on-primary font-label-md text-label-md py-4 rounded-xl shadow-lg hover:shadow-primary/20 hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Submitting request...</span>
                </>
              ) : (
                <>
                  <span>Submit Approval Request</span>
                  <span className="material-symbols-outlined">send</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="font-body-md text-body-sm text-on-surface-variant">
              Already have a partner account?{' '}
              <Link className="text-primary font-bold hover:underline" to="/login">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default PlannerRegister;



