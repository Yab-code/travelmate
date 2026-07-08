import React, { useState, useEffect } from 'react';
import { userService } from '../../services/api';

const AdminUserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    try {
      const data = await userService.getAllUsers();
      setUsers(data.users || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (userId, newRoleId) => {
    try {
      await userService.updateUserRole(userId, newRoleId);
      alert('User role updated successfully!');
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update user role');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="max-w-container-max mx-auto space-y-8">
      {/* Page Header */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-on-surface">User Management</h2>
          <p className="text-sm text-on-surface-variant mt-1">
            Oversee system roles, permissions, and account statuses for all TravelMate users.
          </p>
        </div>
      </div>

      {error && <div className="p-4 bg-error-container text-on-error-container rounded-xl">{error}</div>}

      {/* User Data Table */}
      <div className="bg-white border border-border-subtle rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-gray border-b border-border-subtle text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                <th className="px-6 py-4">User Name</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Change Role</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle text-sm text-on-surface">
              {users.map((usr) => (
                <tr key={usr.id} className="hover:bg-surface-container-low/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-xs uppercase">
                        {usr.name.slice(0, 2)}
                      </div>
                      <div>
                        <div className="font-semibold text-on-surface">{usr.name}</div>
                        <div className="text-[10px] font-semibold text-on-surface-variant uppercase">
                          UID: {usr.id}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium text-on-surface-variant">{usr.email}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        usr.role?.name === 'SUPER_ADMIN'
                          ? 'bg-tertiary-container/20 text-tertiary'
                          : usr.role?.name === 'EVENT_PLANNER'
                          ? 'bg-secondary-container/30 text-secondary'
                          : 'bg-surface-variant text-primary'
                      }`}
                    >
                      {usr.role?.name.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="relative inline-block w-40">
                      <select
                        value={usr.roleId}
                        onChange={(e) => handleRoleChange(usr.id, Number(e.target.value))}
                        className="appearance-none w-full bg-surface-container-low border border-border-subtle rounded-lg py-1.5 pl-3 pr-8 text-xs font-semibold text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                      >
                        <option value={1}>Super Admin</option>
                        <option value={2}>Event Planner</option>
                        <option value={3}>Traveler</option>
                      </select>
                      <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-outline text-[16px]">
                        expand_more
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-secondary font-semibold text-xs">
                      <span className="w-2 h-2 rounded-full bg-secondary"></span> Active
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

export default AdminUserManagement;
