'use client';

import Link from 'next/link';
import { CheckCircle, PhoneCall } from 'lucide-react';

export default function ConfirmationPage() {
  return (
    <main className="min-h-screen flex flex-col" style={{ background: '#F5F0E6' }}>

      <header className="w-full px-6 py-4 flex items-center justify-between" style={{ borderBottom: '1px solid #e0d8c8' }}>
        <img src="/logo.png" alt="SkyCru Cab Services" className="h-10 w-auto" />
        <a href="tel:9825841712" className="flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-xl" style={{ background: '#E8961E', color: '#fff' }}>
          📞 9825841712
        </a>
      </header>

      <section className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-md w-full rounded-3xl p-8 text-center space-y-6" style={{ background: '#fff', border: '1px solid #e0d8c8' }}>

          <div className="flex justify-center">
            <CheckCircle className="w-16 h-16 animate-bounce" style={{ color: '#2D9E75' }} />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-bold" style={{ color: '#1B3A4B' }}>
              Booking Request Received!
            </h1>
            <p className="text-sm px-2" style={{ color: '#7a8a90' }}>
              Your ride details have been sent to our team at SkyCru Cab Services.
            </p>
          </div>

          <div className="rounded-2xl p-4 flex items-center gap-4 text-left" style={{ background: '#FFF8ED', border: '1px solid #f5d9a0' }}>
            <div className="p-2.5 rounded-xl shrink-0" style={{ background: '#E8961E' }}>
              <PhoneCall size={20} color="#fff" />
            </div>
            <div>
              <h4 className="font-bold text-sm" style={{ color: '#7a4a00' }}>What happens next?</h4>
              <p className="text-xs mt-0.5 leading-relaxed" style={{ color: '#a06010' }}>
                Our team will review your route and call you within 5 minutes to confirm the booking and provide a quote.
              </p>
            </div>
          </div>

          <div className="rounded-2xl p-4 text-sm space-y-1" style={{ background: '#F0EAD8', border: '1px solid #e0d8c8' }}>
            <p className="font-semibold" style={{ color: '#1B3A4B' }}>SkyCru Cab Services</p>
            <p style={{ color: '#5a7a8a' }}>Umeshbhai Khachar &nbsp;|&nbsp; Gautambhai Kalkan</p>
            <a href="tel:9825841712" className="font-bold block" style={{ color: '#E8961E' }}>
              📞 9825841712
            </a>
          </div>

          <Link
            href="/"
            className="block w-full font-bold py-3.5 px-4 rounded-xl text-center text-white transition"
            style={{ background: '#1B3A4B' }}
          >
            Book Another Ride
          </Link>

        </div>
      </section>

      <footer className="w-full px-6 py-5 text-center" style={{ borderTop: '1px solid #e0d8c8' }}>
        <p className="text-xs" style={{ color: '#aaa' }}>© 2025 SkyCru Cab Services. All rights reserved.</p>
      </footer>

    </main>
  );
}