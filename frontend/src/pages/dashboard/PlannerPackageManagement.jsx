import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { packageService } from '../../services/api';

const PlannerPackageManagement = () => {
  const navigate = useNavigate();
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchPackages = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await packageService.getPackages({ country: 'Ethiopia' });
      setPackages(data || []);
    } catch (err) {
      console.error('Failed to load packages:', err);
      setError(err.response?.data?.message || 'Failed to load packages from the database.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPackages(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this package?')) return;
    try {
      await packageService.deletePackage(id);
      fetchPackages();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete package');
    }
  };

  return (
    <div className="max-w-container-max mx-auto space-y-8">
      <div className="flex justify-between items-end"><div><h2 className="text-3xl font-bold text-on-surface">Package Management</h2><p className="text-sm text-on-surface-variant mt-1">Create, edit, publish, and track database travel packages.</p></div><button onClick={() => navigate('/dashboard/package-new')} className="bg-primary text-on-primary px-5 py-3 rounded-xl font-label-md text-sm font-semibold hover:bg-primary-container transition-all shadow-sm flex items-center gap-2"><span className="material-symbols-outlined text-[20px]">add</span><span>Create Travel Package</span></button></div>
      {error && <div className="p-4 bg-error-container/30 text-error rounded-xl">{error}</div>}
      <div className="bg-white rounded-xl border border-border-subtle shadow-sm overflow-hidden">
        {loading ? <div className="flex items-center justify-center p-12"><div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div></div> : <div className="overflow-x-auto"><table className="w-full text-left border-collapse"><thead><tr className="bg-surface-gray border-b border-border-subtle text-xs font-bold text-on-surface-variant uppercase tracking-wider"><th className="px-6 py-4">Package</th><th className="px-6 py-4">Price</th><th className="px-6 py-4">Duration</th><th className="px-6 py-4">Rating</th><th className="px-6 py-4">Type</th><th className="px-6 py-4 text-right">Actions</th></tr></thead><tbody className="divide-y divide-border-subtle text-sm text-on-surface">{packages.length === 0 ? <tr><td colSpan="6" className="px-6 py-12 text-center text-on-surface-variant">No packages found in the database.</td></tr> : packages.map((pkg) => <tr key={pkg.id} className="hover:bg-surface-container-low transition-colors group"><td className="px-6 py-4"><div className="flex items-center gap-3"><div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-surface-container">{pkg.image ? <img className="w-full h-full object-cover" alt={pkg.title} src={pkg.image} /> : null}</div><span className="font-semibold text-on-surface hover:text-primary transition-colors cursor-pointer" onClick={() => navigate(`/dashboard/package-edit/${pkg.id}`)}>{pkg.title}</span></div></td><td className="px-6 py-4 font-bold text-primary">${pkg.price}</td><td className="px-6 py-4 font-medium text-on-surface-variant">{pkg.duration} Days</td><td className="px-6 py-4 font-bold">{pkg.rating}</td><td className="px-6 py-4"><span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-secondary-container text-on-secondary-container">{pkg.type}</span></td><td className="px-6 py-4 text-right"><div className="flex items-center justify-end gap-2"><button onClick={() => navigate(`/dashboard/package-edit/${pkg.id}`)} className="px-3 py-1.5 border border-border-subtle rounded-lg text-xs font-semibold hover:bg-surface-container-low transition-all">Edit</button><button onClick={() => handleDelete(pkg.id)} className="p-1.5 text-error hover:bg-error/5 rounded-lg transition-all" title="Delete"><span className="material-symbols-outlined text-[20px]">delete</span></button></div></td></tr>)}</tbody></table></div>}
      </div>
    </div>
  );
};

export default PlannerPackageManagement;
