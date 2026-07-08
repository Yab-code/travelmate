import React, { useState, useEffect } from 'react';
import { companyService } from '../../services/api';

const AdminCompanyApprovals = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Side Panel state
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);

  // Mock data as fallback
  const mockCompanies = [
    {
      id: 'mock-1',
      companyName: 'Skyline Ventures',
      businessEmail: 'sarah.j@skyline.com',
      phone: '+1 (555) 902-1244',
      address: '123 Alpine Ridge, Switzerland',
      description: 'A leading adventure travel agency specializing in high-altitude trekking and sustainable mountain tourism in the Alps and Himalayas.',
      status: 'PENDING',
      verificationStatusText: 'Docs Pending',
      dateApplied: 'Oct 24, 2023',
      ownerName: 'Sarah Jenkins'
    },
    {
      id: 'mock-2',
      companyName: 'Oceanic Escapes',
      businessEmail: 'm.thorne@oceanic.io',
      phone: '+1 (555) 304-8981',
      address: '747 Port Marina, Miami, FL',
      description: 'Curating bespoke maritime experiences for elite travelers. Our fleet focuses on low-impact, ultra-luxury exploration across the Mediterranean and Caribbean.',
      status: 'PENDING',
      verificationStatusText: 'Under Review',
      dateApplied: 'Oct 23, 2023',
      ownerName: 'Marcus Thorne'
    },
    {
      id: 'mock-3',
      companyName: 'Nomad Boutique',
      businessEmail: 'elena@nomadstays.com',
      phone: '+1 (555) 776-0294',
      address: 'Calle de la Luna 8, Cusco, Peru',
      description: 'A collection of boutique hotels across South America focusing on authentic local heritage and modern digital nomad infrastructure.',
      status: 'PENDING',
      verificationStatusText: 'Identity Issue',
      dateApplied: 'Oct 22, 2023',
      ownerName: 'Elena Rodriguez'
    }
  ];

  const fetchCompanies = async () => {
    try {
      setLoading(true);
      const data = await companyService.getPendingCompanies();
      
      // If backend returns stubs/empty list, fallback to mocks
      if (data && data.companies && data.companies.length > 0) {
        // Map backend keys to matching keys
        const mapped = data.companies.map(c => ({
          ...c,
          dateApplied: new Date(c.createdAt).toLocaleDateString(undefined, {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          }),
          ownerName: c.owner?.name || 'Pending Details'
        }));
        setCompanies(mapped);
      } else {
        setCompanies(mockCompanies);
      }
    } catch (err) {
      console.warn('Error fetching pending companies, falling back to mocks:', err);
      setCompanies(mockCompanies);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const handleApprove = async (id, name) => {
    const confirmApprove = window.confirm(`Are you sure you want to approve "${name}"?`);
    if (!confirmApprove) return;

    try {
      if (id.startsWith('mock-')) {
        // Mock implementation
        setCompanies(companies.filter(c => c.id !== id));
        alert(`"${name}" approved successfully!`);
      } else {
        // API call
        await companyService.approveCompany(id, 'APPROVED');
        alert(`"${name}" approved successfully!`);
        fetchCompanies();
      }
      setIsPanelOpen(false);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to approve company');
    }
  };

  const handleReject = async (id, name) => {
    const reason = window.prompt(`Please enter the rejection reason for "${name}":`);
    if (reason === null) return; // cancelled

    try {
      if (id.startsWith('mock-')) {
        // Mock implementation
        setCompanies(companies.filter(c => c.id !== id));
        alert(`"${name}" rejected. Reason: ${reason || 'None specified'}`);
      } else {
        // API call
        await companyService.approveCompany(id, 'REJECTED');
        alert(`"${name}" rejected. Reason: ${reason || 'None specified'}`);
        fetchCompanies();
      }
      setIsPanelOpen(false);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to reject company');
    }
  };

  const openPanel = (company) => {
    setSelectedCompany(company);
    setIsPanelOpen(true);
  };

  const closePanel = () => {
    setIsPanelOpen(false);
  };

  const getStatusBadge = (statusText) => {
    switch (statusText) {
      case 'Under Review':
        return 'bg-primary-container/10 text-primary border-primary-container/20';
      case 'Identity Issue':
        return 'bg-error-container/10 text-error border-error-container/20';
      case 'Docs Pending':
      default:
        return 'bg-accent-yellow/10 text-accent-yellow border-accent-yellow/20';
    }
  };

  const getInitials = (name) => {
    if (!name) return 'CO';
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
  };

  return (
    <div className="max-w-container-max mx-auto space-y-8 relative">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="text-3xl font-bold text-on-surface">Pending Approvals</h2>
          <p className="text-sm text-on-surface-variant mt-1">
            Review and manage new company registrations awaiting verification.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => alert('Filtering approvals...')}
            className="flex items-center gap-2 border border-border-subtle bg-white px-4 py-2 rounded-xl text-on-surface-variant text-xs font-semibold hover:bg-surface-gray transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">filter_list</span>
            <span>Filter</span>
          </button>
          <button
            onClick={() => alert('Exporting company approval database to CSV...')}
            className="flex items-center gap-2 border border-border-subtle bg-white px-4 py-2 rounded-xl text-on-surface-variant text-xs font-semibold hover:bg-surface-gray transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">download</span>
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border border-border-subtle shadow-sm flex items-center gap-4">
          <div className="p-3 bg-primary-container/10 rounded-lg text-primary shrink-0">
            <span className="material-symbols-outlined">pending_actions</span>
          </div>
          <div>
            <p className="text-xs text-on-surface-variant font-semibold">Total Pending</p>
            <h4 className="text-2xl font-bold font-mono">24</h4>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-border-subtle shadow-sm flex items-center gap-4">
          <div className="p-3 bg-secondary-container/20 rounded-lg text-secondary shrink-0">
            <span className="material-symbols-outlined">check_circle</span>
          </div>
          <div>
            <p className="text-xs text-on-surface-variant font-semibold">Approved Today</p>
            <h4 className="text-2xl font-bold font-mono">12</h4>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-border-subtle shadow-sm flex items-center gap-4">
          <div className="p-3 bg-error-container/20 rounded-lg text-error shrink-0">
            <span className="material-symbols-outlined">cancel</span>
          </div>
          <div>
            <p className="text-xs text-on-surface-variant font-semibold">Rejected Today</p>
            <h4 className="text-2xl font-bold font-mono">3</h4>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-border-subtle shadow-sm flex items-center gap-4">
          <div className="p-3 bg-accent-yellow/10 rounded-lg text-accent-yellow shrink-0">
            <span className="material-symbols-outlined">speed</span>
          </div>
          <div>
            <p className="text-xs text-on-surface-variant font-semibold">Avg. Processing</p>
            <h4 className="text-2xl font-bold font-mono">2.4h</h4>
          </div>
        </div>
      </div>

      {/* Approvals Table Container */}
      <div className="bg-white rounded-xl border border-border-subtle shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center p-12">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-gray border-b border-border-subtle text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                  <th className="px-6 py-4">Company Name</th>
                  <th className="px-6 py-4">Owner</th>
                  <th className="px-6 py-4">Date Applied</th>
                  <th className="px-6 py-4">Verification Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle text-sm text-on-surface">
                {companies.length > 0 ? (
                  companies.map((company) => (
                    <tr key={company.id} className="hover:bg-surface-gray/50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-primary-container/10 flex items-center justify-center font-bold text-primary shrink-0">
                            {getInitials(company.companyName)}
                          </div>
                          <div>
                            <p className="font-semibold text-on-surface">{company.companyName}</p>
                            <p className="text-xs text-on-surface-variant font-semibold">
                              {company.address.split(',')[1]?.trim() || 'Travel Agency'}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-semibold text-on-surface">{company.ownerName}</p>
                        <p className="text-xs text-on-surface-variant font-semibold">{company.businessEmail}</p>
                      </td>
                      <td className="px-6 py-4 font-medium text-on-surface-variant">{company.dateApplied}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full font-label-sm text-[11px] uppercase tracking-wide border ${getStatusBadge(
                            company.verificationStatusText || 'Docs Pending'
                          )}`}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-current mr-2"></span>
                          {company.verificationStatusText || 'Docs Pending'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openPanel(company)}
                            className="px-3.5 py-1.5 text-primary text-xs font-bold hover:bg-primary/5 rounded-lg transition-all"
                          >
                            View Details
                          </button>
                          <button
                            onClick={() => handleApprove(company.id, company.companyName)}
                            className="p-1.5 text-secondary hover:bg-secondary/10 rounded-lg transition-all"
                            title="Approve"
                          >
                            <span className="material-symbols-outlined text-[20px] block">check_circle</span>
                          </button>
                          <button
                            onClick={() => handleReject(company.id, company.companyName)}
                            className="p-1.5 text-error hover:bg-error/10 rounded-lg transition-all"
                            title="Reject"
                          >
                            <span className="material-symbols-outlined text-[20px] block">cancel</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center text-on-surface-variant">
                      <span className="material-symbols-outlined text-4xl mb-2">check_circle</span>
                      <p className="text-sm font-semibold">No pending company registrations at this time.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Table Footer */}
        <div className="px-6 py-4 flex justify-between items-center bg-white border-t border-border-subtle text-xs text-on-surface-variant font-semibold">
          <p>Showing {companies.length} applications</p>
          <div className="flex gap-2">
            <button className="p-1.5 rounded-lg border border-border-subtle hover:bg-surface-gray transition-all disabled:opacity-50" disabled>
              <span className="material-symbols-outlined text-[16px] block">chevron_left</span>
            </button>
            <button className="p-1.5 px-3 rounded-lg border border-border-subtle bg-primary text-on-primary font-semibold">1</button>
            <button className="p-1.5 rounded-lg border border-border-subtle hover:bg-surface-gray transition-all">
              <span className="material-symbols-outlined text-[16px] block">chevron_right</span>
            </button>
          </div>
        </div>
      </div>

      {/* Side Details Drawer overlay */}
      {isPanelOpen && selectedCompany && (
        <>
          <div
            className="fixed inset-0 bg-on-background/25 backdrop-blur-sm z-[60] transition-opacity duration-300"
            onClick={closePanel}
          ></div>
          <div className="fixed top-0 right-0 h-full w-[450px] bg-white shadow-2xl z-[70] flex flex-col animate-in slide-in-from-right duration-300">
            {/* Drawer Header */}
            <div className="p-6 border-b border-border-subtle flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary-container/10 text-primary flex items-center justify-center font-bold text-xl shrink-0">
                  {getInitials(selectedCompany.companyName)}
                </div>
                <div>
                  <h5 className="font-bold text-lg text-on-surface">{selectedCompany.companyName}</h5>
                  <p className="text-xs text-on-surface-variant font-semibold">
                    {selectedCompany.address.split(',')[1]?.trim() || 'Travel Agency'}
                  </p>
                </div>
              </div>
              <button className="p-2 rounded-full hover:bg-surface-gray transition-all" onClick={closePanel}>
                <span className="material-symbols-outlined block text-[20px]">close</span>
              </button>
            </div>

            {/* Drawer Content */}
            <div className="flex-grow overflow-y-auto p-6 space-y-6">
              {/* Details Section */}
              <section className="space-y-2">
                <h6 className="text-xs font-bold text-on-surface uppercase tracking-wider">Business Description</h6>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  {selectedCompany.description}
                </p>
              </section>

              {/* Verification Documents */}
              <section className="space-y-3">
                <h6 className="text-xs font-bold text-on-surface uppercase tracking-wider">Verification Documents</h6>
                <div className="space-y-2">
                  <div
                    onClick={() => alert('Opening Business License PDF...')}
                    className="flex items-center justify-between p-3.5 bg-surface-gray rounded-xl border border-border-subtle hover:border-primary transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform">
                        description
                      </span>
                      <div>
                        <p className="text-xs font-bold text-on-surface">Business License</p>
                        <p className="text-[10px] text-on-surface-variant font-semibold">PDF • 2.4 MB • Uploaded 2 days ago</p>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-on-surface-variant text-[18px]">open_in_new</span>
                  </div>

                  <div
                    onClick={() => alert('Opening Tax ID Certificate...')}
                    className="flex items-center justify-between p-3.5 bg-surface-gray rounded-xl border border-border-subtle hover:border-primary transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform">
                        receipt_long
                      </span>
                      <div>
                        <p className="text-xs font-bold text-on-surface">Tax ID Certificate</p>
                        <p className="text-[10px] text-on-surface-variant font-semibold">PNG • 1.1 MB • Uploaded 2 days ago</p>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-on-surface-variant text-[18px]">open_in_new</span>
                  </div>
                </div>
              </section>

              {/* Owner Information */}
              <section className="space-y-3">
                <h6 className="text-xs font-bold text-on-surface uppercase tracking-wider">Owner Information</h6>
                <div className="bg-surface-gray p-4 rounded-xl space-y-3">
                  <div className="flex items-center gap-3 text-xs text-on-surface font-semibold">
                    <span className="material-symbols-outlined text-on-surface-variant text-[18px]">person</span>
                    <p>{selectedCompany.ownerName}</p>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-on-surface font-semibold">
                    <span className="material-symbols-outlined text-on-surface-variant text-[18px]">alternate_email</span>
                    <p>{selectedCompany.businessEmail}</p>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-on-surface font-semibold">
                    <span className="material-symbols-outlined text-on-surface-variant text-[18px]">call</span>
                    <p>{selectedCompany.phone}</p>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-on-surface font-semibold">
                    <span className="material-symbols-outlined text-on-surface-variant text-[18px]">location_on</span>
                    <p>{selectedCompany.address}</p>
                  </div>
                </div>
              </section>
            </div>

            {/* Drawer Action Footer */}
            <div className="p-6 border-t border-border-subtle bg-surface-gray flex gap-3">
              <button
                onClick={() => handleApprove(selectedCompany.id, selectedCompany.companyName)}
                className="flex-grow py-3 px-4 rounded-xl bg-secondary text-on-secondary font-semibold text-xs flex items-center justify-center gap-2 hover:opacity-95 transition-opacity shadow-sm"
              >
                <span className="material-symbols-outlined text-[18px]">check</span>
                <span>Approve Company</span>
              </button>
              <button
                onClick={() => handleReject(selectedCompany.id, selectedCompany.companyName)}
                className="flex-grow py-3 px-4 rounded-xl border border-error text-error font-semibold text-xs flex items-center justify-center gap-2 hover:bg-error/5 transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">block</span>
                <span>Reject Application</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminCompanyApprovals;
