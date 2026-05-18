'use client';

import React, { useState } from 'react';
import { Calendar, Clock, ArrowUpDown, Search, User, Phone, X, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

type TripType = 'Outstation' | 'Oneway' | 'Local' | 'Airport';

export default function BookingForm() {
  const router = useRouter();
  
  // Form Main State
  const [tripType, setTripType] = useState<TripType>('Oneway');
  const [pickupPlace, setPickupPlace] = useState('Rajkot, Gujarat');
  const [dropPlace, setDropPlace] = useState('');
  const [date, setDate] = useState('2026-05-17');
  const [time, setTime] = useState('11:58');

  // Modal & Contact States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Triggered when "Search Cab" is clicked
  const handleOpenContactModal = (e: React.FormEvent) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  // Final submit handler when customer enters contact info
  const handleFinalBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const bookingData = {
      tripType,
      pickupPlace,
      dropPlace,
      date,
      time,
      customerName,
      customerPhone,
    };

    try {
      const response = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        // Clear state and push them straight to confirmation page
        setIsModalOpen(false);
        router.push('/confirmation');
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Booking submission failed:', error);
      alert('Network error. Please check your connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const tripOptions: TripType[] = ['Outstation', 'Oneway', 'Local', 'Airport'];

  return (
    <div className="max-w-md mx-auto bg-white text-gray-800 rounded-[32px] p-6 shadow-2xl border border-gray-100 relative">
      <form onSubmit={handleOpenContactModal} className="space-y-5">
        
        {/* Trip Type Checkboxes */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-2">
          {tripOptions.map((option) => (
            <label key={option} className="flex items-center space-x-2 cursor-pointer font-semibold text-sm">
              <input
                type="checkbox"
                checked={tripType === option}
                onChange={() => setTripType(option)}
                className="w-4 h-4 rounded text-amber-500 border-gray-300 accent-amber-500"
              />
              <span>{option}</span>
            </label>
          ))}
        </div>

        {/* Pickup Input */}
        <div className="space-y-1">
          <label className="block text-sm font-bold text-gray-600 pl-1">Pickup</label>
          <div className="relative flex items-center">
            <span className="absolute left-4">📍</span>
            <input
              type="text"
              value={pickupPlace}
              onChange={(e) => setPickupPlace(e.target.value)}
              className="w-full pl-10 pr-12 py-4 bg-[#e8f0fe] rounded-xl border-none font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <button 
              type="button"
              className="absolute right-3 p-1.5 bg-white rounded-full border border-gray-200 text-amber-500 shadow-sm hover:bg-gray-50 transition"
              onClick={() => {
                const temp = pickupPlace;
                setPickupPlace(dropPlace);
                setDropPlace(temp);
              }}
            >
              <ArrowUpDown size={14} />
            </button>
          </div>
        </div>

        {/* Drop Input */}
        <div className="space-y-1">
          <label className="block text-sm font-bold text-gray-600 pl-1">Drop</label>
          <div className="relative flex items-center">
            <span className="absolute left-4">📍</span>
            <input
              type="text"
              value={dropPlace}
              onChange={(e) => setDropPlace(e.target.value)}
              placeholder="Enter the destination place"
              className="w-full pl-10 pr-4 py-4 bg-[#e8f0fe] rounded-xl border-none font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
        </div>

        {/* Date & Time Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="block text-sm font-bold text-gray-600 pl-1">When</label>
            <div className="relative flex items-center">
              <Calendar size={18} className="absolute left-4 text-blue-600" />
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full pl-11 pr-3 py-4 bg-[#e8f0fe] rounded-xl border-none font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-bold text-gray-600 pl-1">Time</label>
            <div className="relative flex items-center">
              <Clock size={18} className="absolute left-4 text-blue-600" />
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full pl-11 pr-3 py-4 bg-[#e8f0fe] rounded-xl border-none font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
          </div>
        </div>

        {/* Form Action Button */}
        <div className="pt-2 flex justify-center">
          <button
            type="submit"
            className="w-3/4 bg-[#1d52ca] hover:bg-blue-800 text-white font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 shadow-md transition transform active:scale-95 text-lg"
          >
            <span>Search Cab</span>
            <Search size={20} />
          </button>
        </div>
      </form>

      {/* CONTACT CAPTURE POPUP MODAL OVERLAY */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-all">
          <div className="bg-white w-full max-w-sm rounded-[28px] p-6 shadow-2xl relative space-y-5 border border-gray-100 animate-in fade-in zoom-in-95 duration-150">
            
            {/* Close Button */}
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition"
            >
              <X size={18} />
            </button>

            {/* Modal Heading */}
            <div className="text-center space-y-1">
              <h3 className="text-xl font-bold text-gray-950">Enter Contact Details</h3>
              <p className="text-xs text-gray-500 px-2">
                Provide your details so our admin can call you back with direct pricing options.
              </p>
            </div>

            <form onSubmit={handleFinalBooking} className="space-y-4">
              {/* Customer Name Field */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-gray-500 pl-1">Your Full Name</label>
                <div className="relative flex items-center">
                  <User size={16} className="absolute left-3.5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="e.g. Ved Madhusudan"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl border border-gray-200 text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              {/* Customer Phone Field */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-gray-500 pl-1">Mobile Phone Number</label>
                <div className="relative flex items-center">
                  <Phone size={16} className="absolute left-3.5 text-gray-400" />
                  <input
                    type="tel"
                    placeholder="Enter 10-digit mobile number"
                    pattern="[0-9]{10}"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl border border-gray-200 text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="w-1/3 border border-gray-200 text-gray-600 font-semibold py-3 px-4 rounded-xl text-sm hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-2/3 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-semibold py-3 px-4 rounded-xl text-sm flex items-center justify-center gap-2 shadow-md transition"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <span>Confirm Booking</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}