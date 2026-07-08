import React from 'react';
import { useNavigate } from 'react-router-dom';

const PlannerDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-container-max mx-auto space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="font-headline-lg text-3xl font-semibold text-on-surface">Performance Overview</h2>
          <p className="text-on-surface-variant text-sm mt-1">Real-time business insights for TravelMate Ethiopia.</p>
        </div>
        <div className="flex gap-3">
          <select className="bg-white border border-border-subtle rounded-lg px-4 py-2 text-xs font-semibold text-on-surface-variant focus:ring-2 focus:ring-primary/20 outline-none">
            <option>Last 30 Days</option>
            <option>Last 6 Months</option>
            <option>Year to Date</option>
          </select>
          <button className="flex items-center gap-2 border border-border-subtle bg-white px-4 py-2 rounded-lg text-on-surface-variant text-xs font-semibold hover:bg-surface-container-low transition-colors">
            <span className="material-symbols-outlined text-[18px]">download</span>
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Analytics Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Revenue */}
        <div className="bg-white p-6 rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.05)] border border-border-subtle hover:shadow-[0px_8px_30px_rgba(0,0,0,0.08)] transition-all">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-primary-container/10 rounded-lg text-primary">
              <span className="material-symbols-outlined">payments</span>
            </div>
            <span className="text-secondary text-xs font-bold flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">trending_up</span>
              +12.5%
            </span>
          </div>
          <p className="text-on-surface-variant font-medium text-xs">Total Revenue</p>
          <h3 className="text-3xl font-bold text-on-surface mt-1">$425,000</h3>
        </div>

        {/* Bookings */}
        <div className="bg-white p-6 rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.05)] border border-border-subtle hover:shadow-[0px_8px_30px_rgba(0,0,0,0.08)] transition-all">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-secondary-container/10 rounded-lg text-secondary">
              <span className="material-symbols-outlined">confirmation_number</span>
            </div>
            <span className="text-secondary text-xs font-bold flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">trending_up</span>
              +8.2%
            </span>
          </div>
          <p className="text-on-surface-variant font-medium text-xs">Total Bookings</p>
          <h3 className="text-3xl font-bold text-on-surface mt-1">1,240</h3>
        </div>

        {/* Active Packages */}
        <div className="bg-white p-6 rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.05)] border border-border-subtle hover:shadow-[0px_8px_30px_rgba(0,0,0,0.08)] transition-all">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-tertiary-container/10 rounded-lg text-tertiary">
              <span className="material-symbols-outlined">inventory_2</span>
            </div>
            <span className="text-on-surface-variant text-xs font-medium">Stable</span>
          </div>
          <p className="text-on-surface-variant font-medium text-xs">Active Packages</p>
          <h3 className="text-3xl font-bold text-on-surface mt-1">24</h3>
        </div>

        {/* Rating */}
        <div className="bg-white p-6 rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.05)] border border-border-subtle hover:shadow-[0px_8px_30px_rgba(0,0,0,0.08)] transition-all">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-accent-yellow/10 rounded-lg text-accent-yellow">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                star
              </span>
            </div>
            <div className="flex text-accent-yellow">
              {[1, 2, 3, 4].map((i) => (
                <span key={i} className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  star
                </span>
              ))}
              <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 0.5" }}>
                star_half
              </span>
            </div>
          </div>
          <p className="text-on-surface-variant font-medium text-xs">Customer Rating</p>
          <h3 className="text-3xl font-bold text-on-surface mt-1">
            4.8<span className="text-xs font-normal text-outline">/5</span>
          </h3>
        </div>
      </div>

      {/* Charts Section (Bento Style) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Large Chart: Revenue Trends */}
        <div className="lg:col-span-2 bg-white p-8 rounded-xl border border-border-subtle shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h4 className="text-lg font-bold text-on-surface">Revenue Trends</h4>
              <p className="text-xs text-on-surface-variant mt-0.5">Monthly revenue generated compared with last year.</p>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-primary/30"></span>
                <span className="text-xs font-semibold text-on-surface-variant">Last Year</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-secondary"></span>
                <span className="text-xs font-semibold text-on-surface-variant">Current Year</span>
              </div>
            </div>
          </div>

          <div className="h-60 flex items-end justify-between gap-3 border-b border-l border-border-subtle pb-2 pl-2 mt-4">
            {/* Visual Chart Bars */}
            <div className="flex-1 bg-primary/20 h-[40%] rounded-t-sm relative group hover:bg-primary/40 transition-all cursor-pointer">
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-on-surface text-white text-[10px] px-2 py-1 rounded hidden group-hover:block">
                $12k
              </div>
            </div>
            <div className="flex-1 bg-primary/20 h-[55%] rounded-t-sm"></div>
            <div className="flex-1 bg-primary/20 h-[45%] rounded-t-sm"></div>
            <div className="flex-1 bg-primary/20 h-[70%] rounded-t-sm"></div>
            <div className="flex-1 bg-primary/20 h-[65%] rounded-t-sm"></div>
            <div className="flex-1 bg-primary/20 h-[85%] rounded-t-sm"></div>
            <div className="flex-1 bg-secondary/80 h-[45%] rounded-t-sm"></div>
            <div className="flex-1 bg-secondary/80 h-[60%] rounded-t-sm"></div>
            <div className="flex-1 bg-secondary/80 h-[50%] rounded-t-sm"></div>
            <div className="flex-1 bg-secondary/80 h-[75%] rounded-t-sm"></div>
            <div className="flex-1 bg-secondary/80 h-[95%] rounded-t-sm relative group">
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-on-surface text-white text-[10px] px-2 py-1 rounded hidden group-hover:block">
                $45k
              </div>
            </div>
            <div className="flex-1 bg-secondary/80 h-[80%] rounded-t-sm"></div>
          </div>
          <div className="flex justify-between mt-4 px-2 text-[10px] font-bold text-outline uppercase tracking-wider">
            <span>Jan</span>
            <span>Feb</span>
            <span>Mar</span>
            <span>Apr</span>
            <span>May</span>
            <span>Jun</span>
            <span>Jul</span>
            <span>Aug</span>
            <span>Sep</span>
            <span>Oct</span>
            <span>Nov</span>
            <span>Dec</span>
          </div>
        </div>

        {/* Small Chart: Booking Distribution */}
        <div className="bg-white p-8 rounded-xl border border-border-subtle shadow-sm flex flex-col justify-between">
          <div>
            <h4 className="text-lg font-bold text-on-surface mb-6">Booking Distribution</h4>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-xs font-bold mb-2 text-on-surface-variant">
                  <span>Group Tours</span>
                  <span>45%</span>
                </div>
                <div className="h-3 w-full bg-surface-container rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs font-bold mb-2 text-on-surface-variant">
                  <span>Private Events</span>
                  <span>30%</span>
                </div>
                <div className="h-3 w-full bg-surface-container rounded-full overflow-hidden">
                  <div className="h-full bg-secondary rounded-full" style={{ width: '30%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs font-bold mb-2 text-on-surface-variant">
                  <span>Corporate Retreats</span>
                  <span>25%</span>
                </div>
                <div className="h-3 w-full bg-surface-container rounded-full overflow-hidden">
                  <div className="h-full bg-tertiary rounded-full" style={{ width: '25%' }}></div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 p-4 rounded-lg bg-surface-container-low flex items-start gap-3">
            <span className="material-symbols-outlined text-primary text-[24px]">info</span>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Group tours saw a 15% surge this month due to Meskel Festival preparations.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Section: Upcoming Events & Details */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Upcoming Events Table */}
        <div className="lg:col-span-3 bg-white rounded-xl border border-border-subtle shadow-sm overflow-hidden flex flex-col justify-between">
          <div>
            <div className="p-6 border-b border-border-subtle flex justify-between items-center bg-surface-gray">
              <h4 className="text-lg font-bold text-on-surface">Upcoming Scheduled Events</h4>
              <button onClick={() => navigate('/dashboard/event-management')} className="text-primary text-xs font-bold hover:underline">
                View All Schedule
              </button>
            </div>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-low border-b border-border-subtle text-[10px] font-bold text-outline uppercase tracking-wider">
                  <th className="px-6 py-4">Event Name</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Attendees</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle text-sm text-on-surface font-medium">
                <tr className="hover:bg-surface-container-low transition-colors">
                  <td className="px-6 py-4 font-bold">Meskel Festival</td>
                  <td className="px-6 py-4 text-on-surface-variant font-medium text-xs">Sep 27, 2026</td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded-full bg-secondary-container text-on-secondary-container text-xs font-semibold">
                      Confirmed
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right font-bold text-on-surface">5,200</td>
                </tr>
                <tr className="hover:bg-surface-container-low transition-colors">
                  <td className="px-6 py-4 font-bold">Great Ethiopian Run</td>
                  <td className="px-6 py-4 text-on-surface-variant font-medium text-xs">Nov 19, 2026</td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded-full bg-surface-container-highest text-on-primary-fixed-variant text-xs font-semibold animate-pulse">
                      In Progress
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right font-bold text-on-surface">45,000</td>
                </tr>
                <tr className="hover:bg-surface-container-low transition-colors">
                  <td className="px-6 py-4 font-bold">Lalibela Heritage Tour</td>
                  <td className="px-6 py-4 text-on-surface-variant font-medium text-xs">Dec 05, 2026</td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded-full bg-tertiary-container/10 text-tertiary text-xs font-semibold">
                      Pending
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right font-bold text-on-surface">150</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Activity Feed */}
        <div className="bg-white p-6 rounded-xl border border-border-subtle shadow-sm flex flex-col justify-between">
          <h4 className="text-lg font-bold text-on-surface border-b border-border-subtle pb-3 mb-4">
            Recent System Activity
          </h4>
          <div className="space-y-6">
            <div className="flex gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-primary mt-1.5 shrink-0"></div>
              <div>
                <p className="text-xs font-bold text-on-surface">New Booking Confirmed</p>
                <p className="text-xs text-on-surface-variant mt-0.5">Meskel Group Package for 12 pax.</p>
                <span className="text-[10px] text-outline uppercase font-bold mt-1 block">2 mins ago</span>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-secondary mt-1.5 shrink-0"></div>
              <div>
                <p className="text-xs font-bold text-on-surface">Payment Received</p>
                <p className="text-xs text-on-surface-variant mt-0.5">Invoice #45218 ($12,400.00)</p>
                <span className="text-[10px] text-outline uppercase font-bold mt-1 block">1 hour ago</span>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-tertiary mt-1.5 shrink-0"></div>
              <div>
                <p className="text-xs font-bold text-on-surface">New Package Listed</p>
                <p className="text-xs text-on-surface-variant mt-0.5">"Danakil Depression Expedition"</p>
                <span className="text-[10px] text-outline uppercase font-bold mt-1 block">4 hours ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlannerDashboard;
