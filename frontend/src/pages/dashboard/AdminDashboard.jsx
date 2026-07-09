import React, { useEffect, useState } from 'react';
import { companyService, eventService, packageService, userService } from '../../services/api';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ users: 0, companies: 0, packages: 0, events: 0 });
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadStats = async () => {
      setLoading(true);
      setError('');
      try {
        const [usersData, companiesData, packagesData, eventsData] = await Promise.all([
          userService.getAllUsers(),
          companyService.getAllCompanies(),
          packageService.getPackages({ country: 'Ethiopia' }),
          eventService.getEvents({ country: 'Ethiopia' }),
        ]);
        const companyRows = companiesData.companies || [];
        setCompanies(companyRows.slice(0, 5));
        setStats({ users: usersData.users?.length || 0, companies: companyRows.length, packages: packagesData.length || 0, events: eventsData.length || 0 });
      } catch (err) {
        console.error('Failed to load admin dashboard:', err);
        setError(err.response?.data?.message || 'Failed to load admin dashboard data.');
      } finally {
        setLoading(false);
      }
    };
    loadStats();
  }, []);

  return (
    <div className="max-w-container-max mx-auto space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4"><div><h2 className="font-headline-lg text-3xl font-semibold text-on-surface">System Overview</h2><p className="text-on-surface-variant text-sm mt-1">Live metrics from the TravelMate database.</p></div></div>
      {error && <div className="p-4 bg-error-container/30 text-error rounded-xl">{error}</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">{[['group', 'Total Users', stats.users], ['corporate_fare', 'Companies', stats.companies], ['travel_explore', 'Packages', stats.packages], ['event', 'Events', stats.events]].map(([icon, label, value]) => <div key={label} className="bg-white p-6 rounded-xl border border-border-subtle shadow-sm"><div className="p-3 bg-primary-container/20 rounded-lg text-primary inline-flex mb-4"><span className="material-symbols-outlined">{icon}</span></div><p className="text-on-surface-variant font-semibold text-xs mb-1">{label}</p><h3 className="text-2xl font-bold">{loading ? '...' : value}</h3></div>)}</div>
      <section className="bg-white rounded-xl border border-border-subtle shadow-sm overflow-hidden"><div className="p-6 border-b border-border-subtle bg-surface-gray"><h3 className="text-lg font-bold">Recent Companies</h3></div><div className="divide-y divide-border-subtle">{companies.length === 0 ? <p className="p-6 text-sm text-on-surface-variant">No company records found.</p> : companies.map((company) => <div key={company.id} className="p-6 flex justify-between gap-4"><div><p className="font-bold text-sm text-on-surface">{company.companyName}</p><p className="text-xs text-on-surface-variant">{company.businessEmail}</p></div><span className="text-xs font-bold text-primary">{company.status}</span></div>)}</div></section>
    </div>
  );
};

export default AdminDashboard;
