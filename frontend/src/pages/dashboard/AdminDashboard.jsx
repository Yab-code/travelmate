import React from 'react';

const AdminDashboard = () => {
  return (
    <div className="max-w-container-max mx-auto space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="font-headline-lg text-3xl font-semibold text-on-surface">Global System Overview</h2>
          <p className="text-on-surface-variant text-sm mt-1">Real-time health and performance metrics for the TravelMate ecosystem.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 border border-border-subtle bg-white px-4 py-2 rounded-lg text-on-surface-variant text-xs font-semibold hover:bg-surface-container-low transition-colors">
            <span className="material-symbols-outlined text-[18px]">download</span>
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border border-border-subtle shadow-sm hover:shadow-md transition-all group">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-primary-container/20 rounded-lg text-primary">
              <span className="material-symbols-outlined">group</span>
            </div>
            <span className="text-secondary text-xs font-semibold flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">trending_up</span>
              +12.5%
            </span>
          </div>
          <p className="text-on-surface-variant font-semibold text-xs mb-1">Total Users</p>
          <h3 className="text-2xl font-bold">1,284,502</h3>
          <div className="mt-4 h-1 w-full bg-surface-container-low rounded-full overflow-hidden">
            <div className="h-full bg-primary w-3/4"></div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-border-subtle shadow-sm hover:shadow-md transition-all group">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-secondary-container/20 rounded-lg text-secondary">
              <span className="material-symbols-outlined">corporate_fare</span>
            </div>
            <span className="text-secondary text-xs font-semibold flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">trending_up</span>
              +4.2%
            </span>
          </div>
          <p className="text-on-surface-variant font-semibold text-xs mb-1">Active Companies</p>
          <h3 className="text-2xl font-bold">4,192</h3>
          <div className="mt-4 h-1 w-full bg-surface-container-low rounded-full overflow-hidden">
            <div className="h-full bg-secondary w-1/2"></div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-border-subtle shadow-sm hover:shadow-md transition-all group">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-tertiary-container/10 rounded-lg text-tertiary">
              <span className="material-symbols-outlined">confirmation_number</span>
            </div>
            <span className="text-error text-xs font-semibold flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">trending_down</span>
              -2.1%
            </span>
          </div>
          <p className="text-on-surface-variant font-semibold text-xs mb-1">Monthly Bookings</p>
          <h3 className="text-2xl font-bold">84,921</h3>
          <div className="mt-4 h-1 w-full bg-surface-container-low rounded-full overflow-hidden">
            <div className="h-full bg-tertiary w-2/3"></div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-border-subtle shadow-sm hover:shadow-md transition-all group">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-accent-yellow/10 rounded-lg text-accent-yellow">
              <span className="material-symbols-outlined">payments</span>
            </div>
            <span className="text-secondary text-xs font-semibold flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">trending_up</span>
              +18.7%
            </span>
          </div>
          <p className="text-on-surface-variant font-semibold text-xs mb-1">Total Revenue</p>
          <h3 className="text-2xl font-bold">$12.4M</h3>
          <div className="mt-4 h-1 w-full bg-surface-container-low rounded-full overflow-hidden">
            <div className="h-full bg-accent-yellow w-4/5"></div>
          </div>
        </div>
      </div>

      {/* Charts & Alerts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* System Growth */}
          <div className="bg-white p-8 rounded-xl border border-border-subtle shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-lg font-bold">System Growth</h3>
                <p className="text-xs text-on-surface-variant">User and company acquisition trends over the last 12 months.</p>
              </div>
              <select className="bg-surface-container-low border-none rounded-lg text-xs py-2 px-4 focus:ring-primary">
                <option>Yearly</option>
                <option>Monthly</option>
                <option>Weekly</option>
              </select>
            </div>
            <div className="h-60 flex items-end justify-between gap-3 px-4 mt-6">
              <div className="flex-1 bg-primary/10 rounded-t-lg relative" style={{ height: '40%' }}>
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 text-[10px] text-primary font-bold mb-1">
                  Jan
                </div>
              </div>
              <div className="flex-grow bg-primary/15 rounded-t-lg" style={{ height: '55%' }}></div>
              <div className="flex-grow bg-primary/20 rounded-t-lg" style={{ height: '45%' }}></div>
              <div className="flex-grow bg-primary/25 rounded-t-lg" style={{ height: '60%' }}></div>
              <div className="flex-grow bg-primary/30 rounded-t-lg" style={{ height: '75%' }}></div>
              <div className="flex-grow bg-primary/40 rounded-t-lg" style={{ height: '70%' }}></div>
              <div className="flex-grow bg-primary/50 rounded-t-lg" style={{ height: '85%' }}></div>
              <div className="flex-grow bg-primary/60 rounded-t-lg" style={{ height: '80%' }}></div>
              <div className="flex-grow bg-primary/70 rounded-t-lg" style={{ height: '95%' }}></div>
              <div className="flex-grow bg-primary/80 rounded-t-lg" style={{ height: '90%' }}></div>
              <div className="flex-grow bg-primary/90 rounded-t-lg" style={{ height: '100%' }}></div>
              <div className="flex-grow bg-primary rounded-t-lg" style={{ height: '95%' }}></div>
            </div>
          </div>
        </div>

        {/* System Alerts */}
        <div className="lg:col-span-1 bg-white rounded-xl border border-border-subtle shadow-sm overflow-hidden flex flex-col justify-between">
          <div>
            <div className="p-6 border-b border-border-subtle bg-surface-gray">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold">System Alerts</h3>
                <span className="px-2 py-1 bg-error-container text-on-error-container text-[10px] font-bold rounded-full uppercase tracking-wider">
                  Live
                </span>
              </div>
            </div>
            <div className="p-6 space-y-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-secondary/10 text-secondary flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[20px]">domain_add</span>
                </div>
                <div>
                  <p className="text-xs font-bold text-on-surface">New Company Registered</p>
                  <p className="text-xs text-on-surface-variant mt-0.5">Global Logistics Inc. has joined TravelMate.</p>
                  <p className="text-[10px] text-outline mt-1 uppercase font-bold">2 minutes ago</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[20px]">cloud_done</span>
                </div>
                <div>
                  <p className="text-xs font-bold text-on-surface">System Backup Complete</p>
                  <p className="text-xs text-on-surface-variant mt-0.5">Regional DB-East instance backup verified.</p>
                  <p className="text-[10px] text-outline mt-1 uppercase font-bold">45 minutes ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
