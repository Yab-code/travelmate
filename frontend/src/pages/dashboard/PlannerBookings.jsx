import React, { useState } from 'react';

const PlannerBookings = () => {
  const [bookings, setBookings] = useState([
    {
      id: 'BK-5192',
      packageName: 'Historic Route: Lalibela & Gondar',
      travelerName: 'Alex Mercer',
      email: 'alex@travelmate.com',
      date: 'Oct 15, 2026',
      status: 'Pending',
      price: '$2,450',
    },
    {
      id: 'BK-1082',
      packageName: 'Danakil Expedition',
      travelerName: 'Elena Rodriguez',
      email: 'elena@gmail.com',
      date: 'Nov 02, 2026',
      status: 'Confirmed',
      price: '$1,890',
    },
  ]);

  const handleStatusChange = (id, newStatus) => {
    setBookings(
      bookings.map((booking) =>
        booking.id === id ? { ...booking, status: newStatus } : booking
      )
    );
  };

  return (
    <div className="max-w-container-max mx-auto space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-on-surface">Booking Reservations</h2>
        <p className="text-sm text-on-surface-variant mt-1">
          Review, approve, or decline booking reservations made by travelers for your packages.
        </p>
      </div>

      {/* Bookings table */}
      <div className="bg-white rounded-xl border border-border-subtle shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-gray border-b border-border-subtle text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                <th className="px-6 py-4">Package</th>
                <th className="px-6 py-4">Traveler</th>
                <th className="px-6 py-4">Departure Date</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle text-sm text-on-surface">
              {bookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-surface-container-low transition-colors group">
                  <td className="px-6 py-4">
                    <p className="font-semibold text-on-surface">{booking.packageName}</p>
                    <p className="text-xs text-on-surface-variant mt-0.5">ID: {booking.id}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-semibold text-on-surface">{booking.travelerName}</p>
                    <p className="text-xs text-on-surface-variant mt-0.5">{booking.email}</p>
                  </td>
                  <td className="px-6 py-4 font-medium text-xs text-on-surface-variant">{booking.date}</td>
                  <td className="px-6 py-4 font-bold text-primary">{booking.price}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                        booking.status === 'Confirmed'
                          ? 'bg-secondary-container text-on-secondary-container'
                          : booking.status === 'Declined'
                          ? 'bg-error-container text-on-error-container'
                          : 'bg-accent-yellow/10 text-accent-yellow border border-accent-yellow/20'
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {booking.status === 'Pending' ? (
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleStatusChange(booking.id, 'Confirmed')}
                          className="px-3 py-1.5 bg-secondary text-white rounded-lg text-xs font-semibold hover:brightness-110 active:scale-95 transition-all shadow-sm"
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => handleStatusChange(booking.id, 'Declined')}
                          className="px-3 py-1.5 border border-error text-error rounded-lg text-xs font-semibold hover:bg-error/5 transition-all"
                        >
                          Decline
                        </button>
                      </div>
                    ) : (
                      <span className="text-xs text-on-surface-variant font-medium">No actions</span>
                    )}
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

export default PlannerBookings;
