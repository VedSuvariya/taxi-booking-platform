'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface BookingData {
  tripType: string;
  pickupPlace: string;
  dropPlace: string;
  date: string;
  time: string;
  customerName: string;
  customerPhone: string;
}

const initialState: BookingData = {
  tripType: 'ONE_WAY',
  pickupPlace: '',
  dropPlace: '',
  date: '',
  time: '',
  customerName: '',
  customerPhone: '',
};

export default function BookingForm() {
  const [formData, setFormData] = useState<BookingData>(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.detail || data.error || 'Something went wrong');

      router.push('/confirmation');

    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: '100%',
    border: '1px solid #d0c8b8',
    borderRadius: '12px',
    padding: '10px 14px',
    background: '#fff',
    color: '#1B3A4B',
    fontSize: '14px',
    outline: 'none',
  };

  const labelStyle = {
    display: 'block',
    fontSize: '13px',
    fontWeight: '600' as const,
    marginBottom: '6px',
    color: '#1B3A4B',
  };

  return (
    <div className="rounded-3xl p-6 space-y-4" style={{ background: '#fff', border: '1px solid #e0d8c8' }}>

      {error && (
        <div className="p-3 rounded-xl text-sm" style={{ background: '#FFF0F0', color: '#c0392b', border: '1px solid #f5c0c0' }}>
          ❌ {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label style={labelStyle}>Trip Type</label>
          <select name="tripType" value={formData.tripType} onChange={handleChange} style={inputStyle}>
            <option value="ONE_WAY">One Way</option>
            <option value="ROUND_TRIP">Round Trip</option>
            <option value="LOCAL">Local</option>
          </select>
        </div>

        <div>
          <label style={labelStyle}>Pickup Location</label>
          <input type="text" name="pickupPlace" placeholder="Enter pickup city or address" value={formData.pickupPlace} onChange={handleChange} required style={inputStyle} />
        </div>

        <div>
          <label style={labelStyle}>Drop Location</label>
          <input type="text" name="dropPlace" placeholder="Enter drop city or address" value={formData.dropPlace} onChange={handleChange} required style={inputStyle} />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label style={labelStyle}>Date</label>
            <input type="date" name="date" value={formData.date} onChange={handleChange} required style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Time</label>
            <input type="time" name="time" value={formData.time} onChange={handleChange} required style={inputStyle} />
          </div>
        </div>

        <div>
          <label style={labelStyle}>Your Name</label>
          <input type="text" name="customerName" placeholder="Full name" value={formData.customerName} onChange={handleChange} required style={inputStyle} />
        </div>

        <div>
          <label style={labelStyle}>Phone Number</label>
          <input type="tel" name="customerPhone" placeholder="+91 98765 43210" value={formData.customerPhone} onChange={handleChange} required style={inputStyle} />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full font-bold py-3.5 rounded-xl text-white transition"
          style={{ background: loading ? '#a0b0c0' : '#1B3A4B' }}
        >
          {loading ? 'Confirming...' : '🚖 Confirm Booking'}
        </button>

      </form>
    </div>
  );
}