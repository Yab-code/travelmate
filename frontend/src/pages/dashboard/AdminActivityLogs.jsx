import React, { useState } from 'react';

const AdminActivityLogs = () => {
  const [activeTab, setActiveTab] = useState('system');
  const [searchQuery, setSearchQuery] = useState('');
  const [logs, setLogs] = useState({
    system: [
      {
        id: 1,
        time: '2026-07-08 14:22:10',
        user: 'Super Admin Sarah',
        initials: 'SA',
        type: 'Success',
        action: "Approved Company X 'Global Voyages'",
        ip: '192.168.1.45',
      },
      {
        id: 2,
        time: '2026-07-08 14:18:45',
        user: 'John Doe (Manager)',
        initials: 'JD',
        type: 'Update',
        action: "Updated Package Y 'Alpine Retreat'",
        ip: '114.122.34.12',
      },
      {
        id: 3,
        time: '2026-07-08 13:55:20',
        user: 'Mark Kaplan',
        initials: 'MK',
        type: 'Config',
        action: "Modified permission role: 'Vendor Primary'",
        ip: '45.23.1.201',
      },
      {
        id: 4,
        time: '2026-07-08 13:42:01',
        user: 'System Daemon',
        initials: 'SD',
        type: 'System',
        action: 'Database optimization task completed',
        ip: 'Localhost',
      },
      {
        id: 5,
        time: '2026-07-08 11:20:05',
        user: 'Super Admin Sarah',
        initials: 'SA',
        type: 'Success',
        action: 'System environment variables updated',
        ip: '192.168.1.45',
      }
    ],
    security: [
      {
        id: 1,
        time: '2026-07-08 14:05:02',
        user: 'System Service',
        initials: 'SYS',
        type: 'Security',
        action: 'Failed login attempt (3/3) - User: admin_test',
        ip: '203.0.113.88',
        isWarning: true,
      },
      {
        id: 2,
        time: '2026-07-08 11:30:15',
        user: 'System Firewall',
        initials: 'FW',
        type: 'Security',
        action: 'Blocked brute force attempt on /api/auth/login',
        ip: '185.220.101.5',
        isWarning: true,
      },
      {
        id: 3,
        time: '2026-07-08 09:15:42',
        user: 'User Auth Service',
        initials: 'AUTH',
        type: 'Security',
        action: 'Password reset requested - User: traveler_john',
        ip: '82.102.23.44',
        isWarning: false,
      }
    ],
    actions: [
      {
        id: 1,
        time: '2026-07-08 15:10:00',
        user: 'Planner Abebe',
        initials: 'PA',
        type: 'Action',
        action: "Created travel package: 'Historic Lalibela'",
        ip: '196.188.12.90',
      },
      {
        id: 2,
        time: '2026-07-08 12:45:18',
        user: 'Planner Tigist',
        initials: 'PT',
        type: 'Action',
        action: "Published event: 'Meskel Celebration'",
        ip: '196.188.45.112',
      },
      {
        id: 3,
        time: '2026-07-08 10:04:12',
        user: 'Planner Abebe',
        initials: 'PA',
        type: 'Action',
        action: "Updated package: 'Simien Mountains Expedition'",
        ip: '196.188.12.90',
      }
    ],
  });

  const [scheduleTime, setScheduleTime] = useState('Weekly on Monday');

  const getBadgeStyle = (type) => {
    switch (type) {
      case 'Success':
        return 'bg-secondary-container/30 text-secondary';
      case 'Update':
      case 'Config':
        return 'bg-surface-container text-primary';
      case 'Security':
        return 'bg-error-container text-on-error-container';
      default:
        return 'bg-surface-variant text-on-surface-variant';
    }
  };

  const handleDownload = (reportName) => {
    alert(`Downloading ${reportName}...`);
  };

  const handleSaveSchedule = () => {
    alert(`Automatic report scheduled: ${scheduleTime}`);
  };

  const handleRefresh = () => {
    alert('Logs refreshed successfully.');
  };

  const filteredLogs = logs[activeTab].filter(
    (log) =>
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.ip.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-container-max mx-auto space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-on-surface">Activity Logs &amp; Reports</h2>
          <p className="text-sm text-on-surface-variant mt-1">
            Monitor system operations, security events, and generate analytical summaries.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleRefresh}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-on-primary rounded-xl font-label-md text-sm font-semibold hover:bg-primary-container transition-all shadow-sm active:scale-95"
          >
            <span className="material-symbols-outlined text-[18px]">refresh</span>
            <span>Refresh Logs</span>
          </button>
        </div>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-12 gap-6">
        {/* Left Column: Activity Feed */}
        <section className="col-span-12 lg:col-span-8 space-y-6">
          {/* Tabs */}
          <div className="flex items-center border-b border-border-subtle">
            <button
              onClick={() => setActiveTab('system')}
              className={`px-6 py-3 font-label-md text-sm font-semibold transition-all border-b-2 ${
                activeTab === 'system'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-on-surface-variant hover:text-on-surface'
              }`}
            >
              System Logs
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`px-6 py-3 font-label-md text-sm font-semibold transition-all border-b-2 ${
                activeTab === 'security'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Security Events
            </button>
            <button
              onClick={() => setActiveTab('actions')}
              className={`px-6 py-3 font-label-md text-sm font-semibold transition-all border-b-2 ${
                activeTab === 'actions'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Internal Actions
            </button>
          </div>

          {/* Search bar inside logs area */}
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">
              search
            </span>
            <input
              type="text"
              placeholder="Search logs in this tab by action, user or IP..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-border-subtle rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>

          {/* Logs Feed Box */}
          <div className="bg-white rounded-xl border border-border-subtle shadow-sm overflow-hidden flex flex-col min-h-[500px]">
            {/* Feed Header */}
            <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-surface-gray text-on-surface-variant font-label-md text-xs uppercase tracking-wider border-b border-border-subtle font-semibold">
              <div className="col-span-3">Timestamp</div>
              <div className="col-span-3">User</div>
              <div className="col-span-4">Action</div>
              <div className="col-span-2 text-right">IP Address</div>
            </div>

            {/* Log Entries */}
            <div className="flex-grow divide-y divide-border-subtle">
              {filteredLogs.length > 0 ? (
                filteredLogs.map((log) => (
                  <div
                    key={log.id}
                    className={`grid grid-cols-12 gap-4 px-6 py-4 hover:bg-surface-gray/50 transition-colors items-center ${
                      log.isWarning ? 'bg-error-container/5 hover:bg-error-container/10' : ''
                    }`}
                  >
                    <div className="col-span-3 font-mono text-xs text-on-surface-variant">
                      {log.time}
                    </div>
                    <div className="col-span-3 flex items-center gap-2">
                      {log.initials && (
                        <div className="w-7 h-7 rounded-full bg-primary-container/20 text-primary font-bold text-[10px] flex items-center justify-center shrink-0 uppercase">
                          {log.initials}
                        </div>
                      )}
                      <span className="font-semibold text-xs text-on-surface truncate">
                        {log.user}
                      </span>
                    </div>
                    <div className="col-span-4 font-mono text-xs text-on-surface flex items-center gap-2 flex-wrap">
                      <span
                        className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${getBadgeStyle(
                          log.type
                        )}`}
                      >
                        {log.type}
                      </span>
                      <span className="truncate">{log.action}</span>
                    </div>
                    <div className="col-span-2 text-right font-mono text-xs text-on-surface-variant">
                      {log.ip}
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-on-surface-variant">
                  <span className="material-symbols-outlined text-4xl mb-2">find_in_page</span>
                  <p className="text-sm">No activity logs matching your query.</p>
                </div>
              )}
            </div>

            {/* Feed Footer */}
            <div className="px-6 py-4 bg-surface-gray border-t border-border-subtle flex justify-between items-center text-xs text-on-surface-variant font-semibold">
              <span>Showing {filteredLogs.length} of {logs[activeTab].length} events</span>
              <div className="flex gap-2">
                <button
                  className="p-1.5 border border-border-subtle rounded-lg bg-white hover:bg-surface-gray transition-colors disabled:opacity-50"
                  disabled
                >
                  <span className="material-symbols-outlined text-[16px] block">chevron_left</span>
                </button>
                <button className="p-1.5 border border-border-subtle rounded-lg bg-white hover:bg-surface-gray transition-colors">
                  <span className="material-symbols-outlined text-[16px] block">chevron_right</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Right Column: Reports & Stats */}
        <aside className="col-span-12 lg:col-span-4 space-y-6">
          {/* Reports Section */}
          <section className="bg-white rounded-xl border border-border-subtle shadow-sm p-6 space-y-5">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-xl font-bold">
                description
              </span>
              <h3 className="font-bold text-lg text-on-surface">Reports</h3>
            </div>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Generate and download comprehensive system data for external auditing.
            </p>

            <div className="space-y-3">
              <button
                onClick={() => handleDownload('Revenue Report (CSV)')}
                className="w-full flex items-center justify-between p-3.5 bg-surface-gray rounded-xl border border-border-subtle hover:border-primary hover:bg-white hover:shadow-sm transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded bg-secondary-container/20 flex items-center justify-center text-secondary">
                    <span className="material-symbols-outlined text-[20px]">table_view</span>
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-bold text-on-surface">Revenue Report</div>
                    <div className="text-[9px] text-on-surface-variant uppercase font-bold tracking-wider">
                      Format: CSV
                    </div>
                  </div>
                </div>
                <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary text-[18px]">
                  download
                </span>
              </button>

              <button
                onClick={() => handleDownload('User Activity Summary (PDF)')}
                className="w-full flex items-center justify-between p-3.5 bg-surface-gray rounded-xl border border-border-subtle hover:border-primary hover:bg-white hover:shadow-sm transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded bg-error-container/20 flex items-center justify-center text-error">
                    <span className="material-symbols-outlined text-[20px]">picture_as_pdf</span>
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-bold text-on-surface">User Activity Summary</div>
                    <div className="text-[9px] text-on-surface-variant uppercase font-bold tracking-wider">
                      Format: PDF
                    </div>
                  </div>
                </div>
                <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary text-[18px]">
                  download
                </span>
              </button>

              <button
                onClick={() => handleDownload('Security Audit Trail (JSON/CSV)')}
                className="w-full flex items-center justify-between p-3.5 bg-surface-gray rounded-xl border border-border-subtle hover:border-primary hover:bg-white hover:shadow-sm transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded bg-primary-container/10 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-[20px]">history</span>
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-bold text-on-surface">Security Audit Trail</div>
                    <div className="text-[9px] text-on-surface-variant uppercase font-bold tracking-wider">
                      Format: JSON/CSV
                    </div>
                  </div>
                </div>
                <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary text-[18px]">
                  download
                </span>
              </button>
            </div>

            <div className="pt-4 border-t border-border-subtle space-y-3">
              <label className="block text-xs font-semibold text-on-surface-variant">
                Schedule Automatic Report
              </label>
              <div className="flex items-center gap-2">
                <select
                  value={scheduleTime}
                  onChange={(e) => setScheduleTime(e.target.value)}
                  className="flex-grow h-10 px-3 bg-surface-gray border border-border-subtle rounded-xl text-xs font-semibold focus:ring-1 focus:ring-primary outline-none"
                >
                  <option>Weekly on Monday</option>
                  <option>Monthly on 1st</option>
                  <option>Daily at Midnight</option>
                </select>
                <button
                  onClick={handleSaveSchedule}
                  className="h-10 px-4 bg-primary-container text-on-primary-container hover:opacity-90 rounded-xl font-semibold text-xs transition-opacity"
                >
                  Save
                </button>
              </div>
            </div>
          </section>

          {/* Security Insights Card */}
          <section className="bg-inverse-surface text-white rounded-xl p-6 shadow-md relative overflow-hidden group">
            <div className="relative z-10 space-y-4">
              <h4 className="text-sm font-bold text-secondary-fixed tracking-wider uppercase">
                Security Overview
              </h4>
              <div className="flex items-end justify-between">
                <div>
                  <span className="text-3xl font-extrabold font-mono">99.8%</span>
                  <p className="text-[10px] text-white/70 mt-1 uppercase font-semibold tracking-wider">
                    Uptime &amp; Stability
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-red-400 text-lg font-bold font-mono">12</span>
                  <p className="text-[10px] text-white/70 mt-1 uppercase font-semibold tracking-wider">
                    Threats Blocked
                  </p>
                </div>
              </div>
              <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-secondary-fixed w-[92%]"></div>
              </div>
            </div>
            {/* Background design glow */}
            <div className="absolute -right-4 -bottom-4 w-28 h-28 bg-primary/20 blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
          </section>

          {/* Top Log Contributors */}
          <section className="bg-white rounded-xl border border-border-subtle p-6 space-y-4">
            <h4 className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">
              Top Log Contributors
            </h4>
            <ul className="divide-y divide-border-subtle">
              <li className="flex items-center justify-between py-2.5">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-primary-container/20 flex items-center justify-center text-primary font-bold text-xs">
                    SA
                  </div>
                  <span className="text-xs font-semibold text-on-surface">Super Admin Sarah</span>
                </div>
                <span className="font-mono text-[10px] bg-surface-gray px-2 py-0.5 rounded border border-border-subtle text-on-surface-variant">
                  1,240 pkts
                </span>
              </li>
              <li className="flex items-center justify-between py-2.5">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-secondary-container/20 flex items-center justify-center text-secondary font-bold text-xs">
                    MK
                  </div>
                  <span className="text-xs font-semibold text-on-surface">Mark Kaplan</span>
                </div>
                <span className="font-mono text-[10px] bg-surface-gray px-2 py-0.5 rounded border border-border-subtle text-on-surface-variant">
                  842 pkts
                </span>
              </li>
              <li className="flex items-center justify-between py-2.5">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-primary-container/20 flex items-center justify-center text-primary font-bold text-xs font-mono">
                    JD
                  </div>
                  <span className="text-xs font-semibold text-on-surface">John Doe</span>
                </div>
                <span className="font-mono text-[10px] bg-surface-gray px-2 py-0.5 rounded border border-border-subtle text-on-surface-variant">
                  312 pkts
                </span>
              </li>
            </ul>
          </section>
        </aside>
      </div>

      {/* Footer Meta Info */}
      <footer className="flex items-center justify-between pt-6 border-t border-border-subtle text-[11px] text-on-surface-variant font-semibold">
        <div className="flex items-center gap-6">
          <span>
            System Status: <span className="text-secondary font-bold">Operational</span>
          </span>
          <span>
            Version: <span className="font-mono">v4.8.2-stable</span>
          </span>
        </div>
        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-primary transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-primary transition-colors">
            Audit Guidelines
          </a>
        </div>
      </footer>
    </div>
  );
};

export default AdminActivityLogs;
