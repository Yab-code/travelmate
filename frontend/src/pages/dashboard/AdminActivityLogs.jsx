import React from 'react';

const AdminActivityLogs = () => (
  <div className="max-w-container-max mx-auto space-y-8"><div><h2 className="text-3xl font-bold text-on-surface">Activity Logs</h2><p className="text-sm text-on-surface-variant mt-1">Audit records will appear here once activity logging is persisted in the database.</p></div><div className="bg-white rounded-xl border border-border-subtle p-12 text-center text-on-surface-variant">No activity log records found in the database.</div></div>
);

export default AdminActivityLogs;
