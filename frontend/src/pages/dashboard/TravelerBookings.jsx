import React, { useEffect, useState } from 'react';
import { bookingService } from '../../services/api';

const statusClasses = {
  PENDING: 'bg-accent-yellow/10 text-accent-yellow border-accent-yellow/20',
  APPROVED: 'bg-secondary/10 text-secondary border-secondary/20',
  REJECTED: 'bg-error/10 text-error border-error/20',
};

const TravelerBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadBookings = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await bookingService.getMyBookings();
        setBookings(data || []);
      } catch (err) {
        console.error('Failed to load bookings:', err);
        setError(err.response?.data?.message || 'Unable to load your bookings.');
      } finally {
        setLoading(false);
      }
    };

    loadBookings();
  }, []);

  return (
    <div className="max-w-container-max mx-auto space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-on-surface">My Bookings</h2>
        <p className="text-sm text-on-surface-variant mt-1">Your confirmed, pending, and rejected trip requests from the database.</p>
      </div>
      {error && <div className="p-4 bg-error-container/30 text-error rounded-xl">{error}</div>}
      {loading ? (
        <div className="bg-white rounded-xl border border-border-subtle p-12 text-center text-on-surface-variant">Loading your bookings…</div>
      ) : bookings.length === 0 ? (
        <div className="bg-white rounded-xl border border-border-subtle p-12 text-center text-on-surface-variant">No booking records found in the database.</div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div key={booking.id} className="bg-white rounded-xl border border-border-subtle shadow-sm p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-on-surface">{booking.itemName}</h3>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full font-label-sm text-[11px] uppercase tracking-wide border ${statusClasses[booking.status] || statusClasses.PENDING}`}>
                    {booking.status}
                  </span>
                </div>
                <p className="text-sm text-on-surface-variant mt-1">{booking.companyName || 'TravelMate'}</p>
                <p className="text-xs text-on-surface-variant mt-2">Booked {booking.createdAt ? new Date(booking.createdAt).toLocaleDateString() : 'recently'}</p>
              </div>
              <div className="text-sm text-on-surface-variant">
                <p>Travelers: {booking.quantity}</p>
                {booking.travelDate && <p>Travel date: {new Date(booking.travelDate).toLocaleDateString()}</p>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TravelerBookings;
