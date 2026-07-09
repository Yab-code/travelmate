import React, { useEffect, useState } from 'react';
import { bookingService, interestService } from '../../services/api';

const typeLabels = {
  TRAVEL_PACKAGE: 'Travel Package',
  EVENT: 'Event',
};

const statusClasses = {
  PENDING: 'bg-accent-yellow/10 text-accent-yellow border-accent-yellow/20',
  APPROVED: 'bg-secondary/10 text-secondary border-secondary/20',
  REJECTED: 'bg-error/10 text-error border-error/20',
};

const PlannerBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [interests, setInterests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchBookings = async () => {
    setLoading(true);
    setError('');
    try {
      const [bookingData, interestData] = await Promise.all([
        bookingService.getBookings(),
        interestService.getPlannerInterests(),
      ]);
      setBookings(bookingData || []);
      setInterests(interestData || []);
    } catch (err) {
      console.error('Failed to load bookings:', err);
      setError(err.response?.data?.message || 'Failed to load bookings from the database.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBookings(); }, []);

  const updateStatus = async (id, status) => {
    try {
      await bookingService.updateBookingStatus(id, status);
      fetchBookings();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update booking status');
    }
  };

  return (
    <div className="max-w-container-max mx-auto space-y-8">
      <div><h2 className="text-3xl font-bold text-on-surface">Booking Management</h2><p className="text-sm text-on-surface-variant mt-1">Review package and event bookings, then accept or reject each request.</p></div>
      {error && <div className="p-4 bg-error-container/30 text-error rounded-xl">{error}</div>}
      <div className="bg-white rounded-xl border border-border-subtle shadow-sm overflow-hidden">
        {loading ? <div className="flex items-center justify-center p-12"><div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div></div> : <div className="space-y-6 p-6"><div className="overflow-x-auto"><table className="w-full text-left border-collapse"><thead><tr className="bg-surface-gray border-b border-border-subtle text-xs font-bold text-on-surface-variant uppercase tracking-wider"><th className="px-6 py-4">Booking Type</th><th className="px-6 py-4">Package / Event</th><th className="px-6 py-4">Traveler</th><th className="px-6 py-4">Travelers / Tickets</th><th className="px-6 py-4">Status</th><th className="px-6 py-4 text-right">Action</th></tr></thead><tbody className="divide-y divide-border-subtle text-sm text-on-surface">{bookings.length === 0 ? <tr><td colSpan="6" className="px-6 py-12 text-center text-on-surface-variant">No booking records found in the database.</td></tr> : bookings.map((booking) => <tr key={booking.id} className="hover:bg-surface-container-low transition-colors"><td className="px-6 py-4 font-semibold">{typeLabels[booking.type] || booking.type}</td><td className="px-6 py-4"><p className="font-bold text-on-surface">{booking.itemName}</p>{booking.travelDate && <p className="text-xs text-on-surface-variant">{new Date(booking.travelDate).toLocaleDateString()}</p>}</td><td className="px-6 py-4"><p className="font-semibold text-on-surface">{booking.traveler?.name || 'Guest'}</p><p className="text-xs text-on-surface-variant">{booking.traveler?.email || 'No email'}</p></td><td className="px-6 py-4 font-mono font-bold">{booking.quantity}</td><td className="px-6 py-4"><span className={`inline-flex items-center px-3 py-1 rounded-full font-label-sm text-[11px] uppercase tracking-wide border ${statusClasses[booking.status] || statusClasses.PENDING}`}>{booking.status}</span></td><td className="px-6 py-4 text-right"><div className="flex items-center justify-end gap-2">{booking.status !== 'APPROVED' && <button onClick={() => updateStatus(booking.id, 'APPROVED')} className="px-3 py-1.5 rounded-lg bg-secondary text-on-secondary text-xs font-semibold">Accept</button>}{booking.status !== 'REJECTED' && <button onClick={() => updateStatus(booking.id, 'REJECTED')} className="px-3 py-1.5 rounded-lg border border-error text-error text-xs font-semibold">Reject</button>}</div></td></tr>)}</tbody></table></div><div className="border-t border-border-subtle pt-6"><h3 className="text-lg font-bold text-on-surface">Visitor Interest</h3><p className="text-sm text-on-surface-variant mt-1">Travelers who saved your packages or events.</p><div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">{interests.length === 0 ? <div className="md:col-span-2 rounded-xl border border-dashed border-border-subtle p-6 text-center text-sm text-on-surface-variant">No traveler interest records yet.</div> : interests.map((interest) => <div key={interest.id} className="rounded-xl border border-border-subtle p-4"><p className="font-semibold text-on-surface">{interest.itemName}</p><p className="text-sm text-on-surface-variant">{interest.traveler?.name || 'Traveler'}</p><p className="text-xs text-on-surface-variant mt-2">{interest.traveler?.email || ''}</p></div>)}</div></div></div>}
      </div>
    </div>
  );
};

export default PlannerBookings;
