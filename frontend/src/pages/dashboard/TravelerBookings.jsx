import React from 'react';
import { useNavigate } from 'react-router-dom';

const TravelerBookings = () => {
  const navigate = useNavigate();

  const bookings = [
    {
      id: 'TM-9821',
      title: 'Historical Route: Lalibela',
      date: 'Oct 15, 2026',
      status: 'Confirmed',
      statusColor: 'bg-secondary-container text-on-secondary-container',
      price: '$2,450',
      duration: '10 Days',
      image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&q=80&w=200',
    },
    {
      id: 'TM-4412',
      title: 'Wildlife Safari: Omo Valley',
      date: 'Dec 05, 2026',
      status: 'In Progress',
      statusColor: 'bg-surface-container-highest text-on-primary-fixed-variant',
      price: '$3,200',
      duration: '12 Days',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=200',
    },
    {
      id: 'TM-1092',
      title: 'City Escape: Addis Ababa',
      date: 'Aug 20, 2026',
      status: 'Completed',
      statusColor: 'bg-surface-container text-on-surface-variant',
      price: '$600',
      duration: '3 Days',
      image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=200',
    },
  ];

  return (
    <div className="max-w-container-max mx-auto space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-on-surface">My Bookings</h2>
        <p className="text-sm text-on-surface-variant mt-1">
          Review, manage, and verify all your travel package bookings.
        </p>
      </div>

      {/* Bookings List */}
      <div className="bg-white rounded-xl border border-border-subtle shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-gray border-b border-border-subtle text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                <th className="px-6 py-4">Package</th>
                <th className="px-6 py-4">Booking ID</th>
                <th className="px-6 py-4">Departure Date</th>
                <th className="px-6 py-4">Duration</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle text-sm text-on-surface">
              {bookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-surface-container-low transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0">
                        <img className="w-full h-full object-cover" alt={booking.title} src={booking.image} />
                      </div>
                      <span className="font-semibold text-on-surface hover:text-primary transition-colors cursor-pointer" onClick={() => navigate(`/dashboard/bookings/${booking.id}`)}>
                        {booking.title}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-mono font-medium text-xs text-on-surface-variant">
                    {booking.id}
                  </td>
                  <td className="px-6 py-4 text-on-surface-variant font-medium">
                    {booking.date}
                  </td>
                  <td className="px-6 py-4 font-medium text-on-surface-variant">
                    {booking.duration}
                  </td>
                  <td className="px-6 py-4 font-bold text-primary">
                    {booking.price}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${booking.statusColor}`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => navigate(`/dashboard/bookings/${booking.id}`)}
                      className="px-4 py-2 border border-border-subtle rounded-lg text-xs font-semibold text-on-surface-variant hover:bg-surface-container-low hover:text-primary transition-all active:scale-95"
                    >
                      View Details
                    </button>
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

export default TravelerBookings;
