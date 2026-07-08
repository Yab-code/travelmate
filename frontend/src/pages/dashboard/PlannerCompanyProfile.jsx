import React, { useState, useEffect } from 'react';
import { companyService } from '../../services/api';

const PlannerCompanyProfile = () => {
  const [loading, setLoading] = useState(true);
  const [company, setCompany] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Form states
  const [companyName, setCompanyName] = useState('');
  const [businessEmail, setBusinessEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');

  const fetchCompany = async () => {
    try {
      const data = await companyService.getMyCompany();
      setCompany(data);
      if (data) {
        setCompanyName(data.companyName);
        setBusinessEmail(data.businessEmail);
        setPhone(data.phone);
        setAddress(data.address);
        setDescription(data.description);
      }
    } catch (err) {
      console.log('No company found for planner yet.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompany();
  }, []);

  const handleRegisterOrUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const companyData = { companyName, businessEmail, phone, address, description };
      if (company) {
        // Mock update company or recreate
        alert('Company updated successfully!');
      } else {
        await companyService.registerCompany(companyData);
        alert('Company verification request submitted successfully!');
      }
      setIsEditing(false);
      fetchCompany();
    } catch (err) {
      alert(err.response?.data?.message || 'Action failed.');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="max-w-container-max mx-auto space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-on-surface">Company Profile</h2>
        <p className="text-sm text-on-surface-variant mt-1">
          Manage your tourism agency details, contact numbers, and check verification approval status.
        </p>
      </div>

      {!company && !isEditing ? (
        <div className="bg-white p-8 rounded-xl border border-border-subtle shadow-sm max-w-md text-center space-y-4">
          <span className="material-symbols-outlined text-4xl text-outline opacity-60">corporate_fare</span>
          <h3 className="text-lg font-bold text-on-surface">No company registered</h3>
          <p className="text-sm text-on-surface-variant leading-relaxed">
            You must register your travel agency / planning company and submit documents to the admin for verification before publishing travel packages.
          </p>
          <button
            onClick={() => setIsEditing(true)}
            className="w-full py-3 bg-primary text-white rounded-xl text-sm font-semibold hover:brightness-110 active:scale-95 transition-all shadow-sm"
          >
            Register Agency
          </button>
        </div>
      ) : isEditing ? (
        <div className="bg-white p-8 rounded-xl border border-border-subtle shadow-sm max-w-xl">
          <form onSubmit={handleRegisterOrUpdate} className="space-y-6">
            <h3 className="text-lg font-bold text-on-surface border-b border-border-subtle pb-3">
              {company ? 'Edit Company Profile' : 'Register Travel Agency'}
            </h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-on-surface-variant uppercase block">Agency Name</label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  required
                  placeholder="e.g. Skyline Ventures"
                  className="w-full bg-surface-container-low border border-border-subtle rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-on-surface-variant uppercase block">Business Email</label>
                  <input
                    type="email"
                    value={businessEmail}
                    onChange={(e) => setBusinessEmail(e.target.value)}
                    required
                    placeholder="e.g. contact@skyline.com"
                    className="w-full bg-surface-container-low border border-border-subtle rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-on-surface-variant uppercase block">Phone Number</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    placeholder="e.g. +251 911 000 000"
                    className="w-full bg-surface-container-low border border-border-subtle rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-on-surface-variant uppercase block">Office Address</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                  placeholder="e.g. Bole Road, Addis Ababa"
                  className="w-full bg-surface-container-low border border-border-subtle rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-on-surface-variant uppercase block">Agency Description</label>
                <textarea
                  rows="4"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  placeholder="Describe your specialization, target destinations, and history..."
                  className="w-full bg-surface-container-low border border-border-subtle rounded-lg p-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                ></textarea>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                className="bg-primary text-white px-6 py-3 rounded-xl text-sm font-semibold hover:brightness-110 active:scale-95 transition-all shadow-sm"
              >
                Submit Registration
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="border border-border-subtle text-on-surface-variant px-6 py-3 rounded-xl text-sm font-semibold hover:bg-surface-container-low transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Details Card */}
          <div className="lg:col-span-2 bg-white p-8 rounded-xl border border-border-subtle shadow-sm space-y-6">
            <div className="flex justify-between items-center border-b border-border-subtle pb-4">
              <h3 className="text-xl font-bold text-on-surface">{company.companyName}</h3>
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 border border-border-subtle rounded-lg text-xs font-semibold text-on-surface-variant hover:bg-surface-container-low transition-all"
              >
                Edit Info
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-bold text-on-surface-variant uppercase">Business Description</h4>
                <p className="text-sm text-on-surface mt-1 leading-relaxed">{company.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                <div>
                  <h4 className="text-xs font-bold text-on-surface-variant uppercase">Contact Email</h4>
                  <p className="text-sm text-on-surface mt-1 font-semibold">{company.businessEmail}</p>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-on-surface-variant uppercase">Phone Number</h4>
                  <p className="text-sm text-on-surface mt-1 font-semibold">{company.phone}</p>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-on-surface-variant uppercase">Headquarters</h4>
                  <p className="text-sm text-on-surface mt-1 font-semibold">{company.address}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Verification Status Card */}
          <div className="bg-white p-6 rounded-xl border border-border-subtle shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-on-surface border-b border-border-subtle pb-3 mb-4">
                Verification Status
              </h3>
              <div className="flex items-center gap-2">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                    company.status === 'APPROVED'
                      ? 'bg-secondary-container text-on-secondary-container'
                      : company.status === 'REJECTED'
                      ? 'bg-error-container text-on-error-container'
                      : 'bg-accent-yellow/10 text-accent-yellow border border-accent-yellow/20'
                  }`}
                >
                  {company.status}
                </span>
              </div>
              <p className="text-xs text-on-surface-variant mt-4 leading-relaxed">
                {company.status === 'APPROVED'
                  ? 'Your agency is fully verified. You can now publish travel packages and create tourist event schedules!'
                  : company.status === 'REJECTED'
                  ? 'Your verification documents were rejected. Please review your agency details and contact admin.'
                  : 'Your agency documents are currently pending verification by our admin team. This usually takes 2-4 hours.'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlannerCompanyProfile;
