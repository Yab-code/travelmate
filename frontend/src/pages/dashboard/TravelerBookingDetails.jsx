import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const TravelerBookingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="max-w-container-max mx-auto space-y-8">
      {/* Back button */}
      <button
        onClick={() => navigate('/dashboard/my-bookings')}
        className="flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
      >
        <span className="material-symbols-outlined text-[18px]">arrow_back</span>
        <span>Back to Bookings</span>
      </button>

      {/* Booking Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border-subtle pb-6">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-3xl font-bold text-on-surface">Booking Details</h2>
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-secondary-container text-on-secondary-container">
              Confirmed
            </span>
          </div>
          <p className="text-sm text-on-surface-variant mt-1.5 font-medium">
            Booking ID: <span className="font-mono font-bold text-on-surface">{id || 'TM-9821'}</span> • Booked on Aug 12, 2026
          </p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 border border-border-subtle rounded-xl text-xs font-semibold text-on-surface-variant hover:bg-surface-container-low transition-all">
            Print Receipt
          </button>
          <button className="px-4 py-2 bg-primary text-white rounded-xl text-xs font-semibold hover:brightness-110 active:scale-95 transition-all">
            Download Ticket
          </button>
        </div>
      </div>

      {/* Detailed Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Itinerary and Package Details */}
        <div className="lg:col-span-2 space-y-8">
          {/* Package Overview */}
          <div className="bg-white p-6 rounded-xl border border-border-subtle shadow-sm flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-48 h-32 rounded-lg overflow-hidden shrink-0">
              <img
                className="w-full h-full object-cover"
                alt="Lalibela"
                src="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&q=80&w=600"
              />
            </div>
            <div className="flex-1 space-y-2">
              <h3 className="text-xl font-bold text-on-surface">The Historic Route: Lalibela & Gondar</h3>
              <p className="text-sm text-on-surface-variant">
                Curated by <span className="font-bold text-primary">EthioTravel Tours</span>
              </p>
              <div className="flex flex-wrap gap-4 text-xs font-medium text-on-surface-variant pt-2">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">calendar_today</span>
                  <span>Departure: Oct 15, 2026</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">schedule</span>
                  <span>Duration: 10 Days</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">location_on</span>
                  <span>Gondar, Lalibela</span>
                </span>
              </div>
            </div>
          </div>

          {/* Simple Itinerary Days */}
          <div className="bg-white p-6 rounded-xl border border-border-subtle shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-on-surface border-b border-border-subtle pb-3">Trip Itinerary</h3>
            <div className="relative border-l-2 border-border-subtle ml-3 space-y-8">
              <div className="relative pl-6">
                <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-primary border-4 border-white"></div>
                <h4 className="font-bold text-sm text-on-surface">Day 1: Welcome to Addis Ababa</h4>
                <p className="text-xs text-on-surface-variant mt-1">
                  Airport reception, transfer to Hilton Hotel, and evening welcome dinner at Yod Abyssinia.
                </p>
              </div>
              <div className="relative pl-6">
                <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-primary border-4 border-white"></div>
                <h4 className="font-bold text-sm text-on-surface">Day 2: Flight to Gondar</h4>
                <p className="text-xs text-on-surface-variant mt-1">
                  Morning flight to Gondar. Tour the Royal Enclosure (Fasil Ghebbi) and Debre Birhan Selassie Church.
                </p>
              </div>
              <div className="relative pl-6">
                <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-primary border-4 border-white"></div>
                <h4 className="font-bold text-sm text-on-surface">Day 3-5: Journey to Lalibela</h4>
                <p className="text-xs text-on-surface-variant mt-1">
                  Drive to Lalibela. Explore the northern and southern groups of rock-hewn churches with our expert guides.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Pricing & Tickets info */}
        <div className="space-y-8">
          {/* Price Breakdown */}
          <div className="bg-white p-6 rounded-xl border border-border-subtle shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-on-surface border-b border-border-subtle pb-3">Price Summary</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-on-surface-variant">
                <span>Historic Route Tour (x1 Traveler)</span>
                <span>$2,200.00</span>
              </div>
              <div className="flex justify-between text-on-surface-variant">
                <span>Addis-Gondar Domestic Flight</span>
                <span>$180.00</span>
              </div>
              <div className="flex justify-between text-on-surface-variant">
                <span>Taxes & Service Fees</span>
                <span>$70.00</span>
              </div>
              <div className="border-t border-border-subtle pt-3 flex justify-between font-bold text-on-surface text-base">
                <span>Total Amount Paid</span>
                <span className="text-primary">$2,450.00</span>
              </div>
            </div>
          </div>

          {/* Helper Card */}
          <div className="bg-primary/5 p-6 rounded-xl border border-primary/20 space-y-4">
            <h4 className="font-bold text-sm text-primary flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[20px]">info</span>
              <span>Need Assistance?</span>
            </h4>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              If you need to change dates, update traveler info, or cancel this booking, please contact our support desk or your dedicated agent.
            </p>
            <button className="w-full py-2 bg-primary text-white rounded-lg text-xs font-semibold hover:brightness-110 active:scale-95 transition-all">
              Contact Agency
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelerBookingDetails;
