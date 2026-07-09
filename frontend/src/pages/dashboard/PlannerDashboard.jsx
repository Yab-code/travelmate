import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { eventService, packageService } from '../../services/api';

const PlannerDashboard = () => {
  const navigate = useNavigate();
  const [packages, setPackages] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [packageData, eventData] = await Promise.all([packageService.getPackages({ country: 'Ethiopia' }), eventService.getEvents({ country: 'Ethiopia' })]);
        setPackages(packageData || []);
        setEvents(eventData || []);
      } catch (err) {
        console.error('Failed to load planner dashboard:', err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const totalPackageValue = packages.reduce((sum, pkg) => sum + Number(pkg.price || 0), 0);
  const averageRating = packages.length ? (packages.reduce((sum, pkg) => sum + Number(pkg.rating || 0), 0) / packages.length).toFixed(1) : '0.0';

  return (
    <div className="max-w-container-max mx-auto space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4"><div><h2 className="font-headline-lg text-3xl font-semibold text-on-surface">Performance Overview</h2><p className="text-on-surface-variant text-sm mt-1">Live business data for TravelMate Ethiopia.</p></div></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">{[['payments', 'Listed Package Value', `$${totalPackageValue.toLocaleString()}`], ['inventory_2', 'Active Packages', packages.length], ['event', 'Scheduled Events', events.length], ['star', 'Average Rating', `${averageRating}/5`]].map(([icon, label, value]) => <div key={label} className="bg-white p-6 rounded-xl shadow-sm border border-border-subtle"><div className="p-2 bg-primary-container/10 rounded-lg text-primary inline-flex mb-4"><span className="material-symbols-outlined">{icon}</span></div><p className="text-on-surface-variant font-medium text-xs">{label}</p><h3 className="text-3xl font-bold text-on-surface mt-1">{loading ? '...' : value}</h3></div>)}</div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8"><section className="bg-white rounded-xl border border-border-subtle shadow-sm overflow-hidden"><div className="p-6 border-b border-border-subtle flex justify-between items-center bg-surface-gray"><h4 className="text-lg font-bold text-on-surface">Recent Packages</h4><button onClick={() => navigate('/dashboard/package-management')} className="text-primary text-xs font-bold hover:underline">Manage Packages</button></div><div className="divide-y divide-border-subtle">{packages.length === 0 ? <p className="p-6 text-sm text-on-surface-variant">No package records found.</p> : packages.slice(0, 5).map((pkg) => <div key={pkg.id} className="p-6 flex justify-between gap-4"><div><p className="font-bold text-sm text-on-surface">{pkg.title}</p><p className="text-xs text-on-surface-variant">{pkg.location}</p></div><span className="font-bold text-primary">${pkg.price}</span></div>)}</div></section><section className="bg-white rounded-xl border border-border-subtle shadow-sm overflow-hidden"><div className="p-6 border-b border-border-subtle flex justify-between items-center bg-surface-gray"><h4 className="text-lg font-bold text-on-surface">Upcoming Events</h4><button onClick={() => navigate('/dashboard/event-management')} className="text-primary text-xs font-bold hover:underline">Manage Events</button></div><div className="divide-y divide-border-subtle">{events.length === 0 ? <p className="p-6 text-sm text-on-surface-variant">No event records found.</p> : events.slice(0, 5).map((event) => <div key={event.id} className="p-6 flex justify-between gap-4"><div><p className="font-bold text-sm text-on-surface">{event.title}</p><p className="text-xs text-on-surface-variant">{event.location}</p></div><span className="text-xs font-semibold text-primary">{new Date(event.date).toLocaleDateString()}</span></div>)}</div></section></div>
    </div>
  );
};

export default PlannerDashboard;
