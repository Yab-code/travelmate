import React, { useEffect, useState } from 'react';
import { companyService } from '../../services/api';

const AdminCompanyApprovals = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCompany, setSelectedCompany] = useState(null);

  const fetchCompanies = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await companyService.getPendingCompanies();
      setCompanies((data.companies || []).map((company) => ({
        ...company,
        dateApplied: company.createdAt ? new Date(company.createdAt).toLocaleDateString() : 'Unknown',
        ownerName: company.owner?.name || 'Unknown owner',
      })));
    } catch (err) {
      console.error('Failed to load pending companies:', err);
      setError(err.response?.data?.message || 'Failed to load pending companies from the database.');
      setCompanies([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCompanies(); }, []);

  const handleStatus = async (id, name, status) => {
    if (!window.confirm(`Are you sure you want to ${status.toLowerCase()} "${name}"?`)) return;
    try {
      await companyService.approveCompany(id, status);
      setSelectedCompany(null);
      fetchCompanies();
    } catch (err) {
      alert(err.response?.data?.message || `Failed to ${status.toLowerCase()} company`);
    }
  };

  const getInitials = (name) => (name || 'CO').split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase();

  return (
    <div className="max-w-container-max mx-auto space-y-8 relative">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4"><div><h2 className="text-3xl font-bold text-on-surface">Pending Approvals</h2><p className="text-sm text-on-surface-variant mt-1">Review company registrations awaiting verification.</p></div></div>
      {error && <div className="p-4 bg-error-container/30 text-error rounded-xl">{error}</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6"><div className="bg-white p-6 rounded-xl border border-border-subtle shadow-sm flex items-center gap-4"><div className="p-3 bg-primary-container/10 rounded-lg text-primary shrink-0"><span className="material-symbols-outlined">pending_actions</span></div><div><p className="text-xs text-on-surface-variant font-semibold">Total Pending</p><h4 className="text-2xl font-bold font-mono">{companies.length}</h4></div></div></div>
      <div className="bg-white rounded-xl border border-border-subtle shadow-sm overflow-hidden">
        {loading ? <div className="flex items-center justify-center p-12"><div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div></div> : <div className="overflow-x-auto"><table className="w-full text-left border-collapse"><thead><tr className="bg-surface-gray border-b border-border-subtle text-xs font-bold text-on-surface-variant uppercase tracking-wider"><th className="px-6 py-4">Company Name</th><th className="px-6 py-4">Owner</th><th className="px-6 py-4">Date Applied</th><th className="px-6 py-4">Status</th><th className="px-6 py-4 text-right">Actions</th></tr></thead><tbody className="divide-y divide-border-subtle text-sm text-on-surface">{companies.length === 0 ? <tr><td colSpan="5" className="px-6 py-12 text-center text-on-surface-variant"><span className="material-symbols-outlined text-4xl mb-2">check_circle</span><p className="text-sm font-semibold">No pending company registrations at this time.</p></td></tr> : companies.map((company) => <tr key={company.id} className="hover:bg-surface-gray/50 transition-colors group"><td className="px-6 py-4"><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-lg bg-primary-container/10 flex items-center justify-center font-bold text-primary shrink-0">{getInitials(company.companyName)}</div><div><p className="font-semibold text-on-surface">{company.companyName}</p><p className="text-xs text-on-surface-variant font-semibold">{company.address}</p></div></div></td><td className="px-6 py-4"><p className="font-semibold text-on-surface">{company.ownerName}</p><p className="text-xs text-on-surface-variant font-semibold">{company.businessEmail}</p></td><td className="px-6 py-4 font-medium text-on-surface-variant">{company.dateApplied}</td><td className="px-6 py-4"><span className="inline-flex items-center px-3 py-1 rounded-full font-label-sm text-[11px] uppercase tracking-wide border bg-accent-yellow/10 text-accent-yellow border-accent-yellow/20"><span className="w-1.5 h-1.5 rounded-full bg-current mr-2"></span>{company.status}</span></td><td className="px-6 py-4 text-right"><div className="flex items-center justify-end gap-2"><button onClick={() => setSelectedCompany(company)} className="px-3.5 py-1.5 text-primary text-xs font-bold hover:bg-primary/5 rounded-lg transition-all">View Details</button><button onClick={() => handleStatus(company.id, company.companyName, 'APPROVED')} className="p-1.5 text-secondary hover:bg-secondary/10 rounded-lg transition-all" title="Approve"><span className="material-symbols-outlined text-[20px] block">check_circle</span></button><button onClick={() => handleStatus(company.id, company.companyName, 'REJECTED')} className="p-1.5 text-error hover:bg-error/10 rounded-lg transition-all" title="Reject"><span className="material-symbols-outlined text-[20px] block">cancel</span></button></div></td></tr>)}</tbody></table></div>}
      </div>
      {selectedCompany && <div className="fixed inset-0 bg-on-background/25 backdrop-blur-sm z-[60]" onClick={() => setSelectedCompany(null)}><div className="fixed top-0 right-0 h-full w-full max-w-[450px] bg-white shadow-2xl z-[70] flex flex-col" onClick={(e) => e.stopPropagation()}><div className="p-6 border-b border-border-subtle flex items-center justify-between"><h3 className="font-bold text-lg text-on-surface">{selectedCompany.companyName}</h3><button className="p-2 rounded-full hover:bg-surface-gray" onClick={() => setSelectedCompany(null)}><span className="material-symbols-outlined block text-[20px]">close</span></button></div><div className="flex-grow overflow-y-auto p-6 space-y-6"><section><h4 className="text-xs font-bold text-on-surface uppercase tracking-wider mb-2">Business Description</h4><p className="text-sm text-on-surface-variant leading-relaxed">{selectedCompany.description}</p></section><section><h4 className="text-xs font-bold text-on-surface uppercase tracking-wider mb-2">Owner Information</h4><div className="bg-surface-gray p-4 rounded-xl space-y-3 text-xs font-semibold"><p>{selectedCompany.ownerName}</p><p>{selectedCompany.businessEmail}</p><p>{selectedCompany.phone}</p><p>{selectedCompany.address}</p></div></section></div><div className="p-6 border-t border-border-subtle bg-surface-gray flex gap-3"><button onClick={() => handleStatus(selectedCompany.id, selectedCompany.companyName, 'APPROVED')} className="flex-grow py-3 px-4 rounded-xl bg-secondary text-on-secondary font-semibold text-xs">Approve Company</button><button onClick={() => handleStatus(selectedCompany.id, selectedCompany.companyName, 'REJECTED')} className="flex-grow py-3 px-4 rounded-xl border border-error text-error font-semibold text-xs">Reject Application</button></div></div></div>}
    </div>
  );
};

export default AdminCompanyApprovals;
