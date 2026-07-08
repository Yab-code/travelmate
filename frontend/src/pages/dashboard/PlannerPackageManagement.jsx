import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PlannerPackageManagement = () => {
  const navigate = useNavigate();
  const [packages, setPackages] = useState([
    {
      id: 1,
      title: 'The Historic Route: Lalibela & Gondar',
      price: '$2,450',
      duration: '10 Days',
      status: 'Active',
      bookings: 142,
      image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&q=80&w=200',
    },
    {
      id: 2,
      title: 'Danakil Expedition: The Alien World',
      price: '$1,890',
      duration: '6 Days',
      status: 'Active',
      bookings: 84,
      image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=200',
    },
    {
      id: 3,
      title: 'Simien Highlands & Wildlife Trek',
      price: '$2,100',
      duration: '8 Days',
      status: 'Draft',
      bookings: 0,
      image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=200',
    },
  ]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this package?')) {
      setPackages(packages.filter((pkg) => pkg.id !== id));
    }
  };

  return (
    <div className="max-w-container-max mx-auto space-y-8">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-on-surface">Package Management</h2>
          <p className="text-sm text-on-surface-variant mt-1">
            Create, edit, publish, and track traveler engagement for your travel packages.
          </p>
        </div>
        <button
          onClick={() => navigate('/dashboard/package-new')}
          className="bg-primary text-on-primary px-5 py-3 rounded-xl font-label-md text-sm font-semibold hover:bg-primary-container transition-all shadow-sm flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-[20px]">add</span>
          <span>Create Travel Package</span>
        </button>
      </div>

      {/* Packages list */}
      <div className="bg-white rounded-xl border border-border-subtle shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-gray border-b border-border-subtle text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                <th className="px-6 py-4">Package</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Duration</th>
                <th className="px-6 py-4">Bookings</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle text-sm text-on-surface">
              {packages.map((pkg) => (
                <tr key={pkg.id} className="hover:bg-surface-container-low transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0">
                        <img className="w-full h-full object-cover" alt={pkg.title} src={pkg.image} />
                      </div>
                      <span className="font-semibold text-on-surface hover:text-primary transition-colors cursor-pointer" onClick={() => navigate(`/dashboard/package-edit/${pkg.id}`)}>
                        {pkg.title}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-bold text-primary">{pkg.price}</td>
                  <td className="px-6 py-4 font-medium text-on-surface-variant">{pkg.duration}</td>
                  <td className="px-6 py-4 font-bold">{pkg.bookings}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                        pkg.status === 'Active'
                          ? 'bg-secondary-container text-on-secondary-container'
                          : 'bg-surface-container-highest text-on-surface-variant'
                      }`}
                    >
                      {pkg.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => navigate(`/dashboard/package-edit/${pkg.id}`)}
                        className="px-3 py-1.5 border border-border-subtle rounded-lg text-xs font-semibold hover:bg-surface-container-low transition-all"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(pkg.id)}
                        className="p-1.5 text-error hover:bg-error/5 rounded-lg transition-all"
                        title="Delete"
                      >
                        <span className="material-symbols-outlined text-[20px]">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PlannerPackageManagement;
