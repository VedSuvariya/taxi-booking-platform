'use client';

import Link from 'next/link';
import { CheckCircle, PhoneCall } from 'lucide-react';

export default function ConfirmationPage() {
  return (
    <main className="min-h-screen bg-[#0a369d] flex flex-col items-center justify-center p-4 text-white">
      <div className="max-w-md w-full bg-white text-gray-800 rounded-[32px] p-8 text-center shadow-2xl space-y-6">
        
        <div className="flex justify-center">
          <CheckCircle className="text-green-500 w-16 h-16 animate-bounce" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-gray-900">Booking Request Received!</h1>
          <p className="text-sm text-gray-500 font-medium px-2">
            Your ride itinerary details have been successfully transmitted directly to our admin team.
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 flex items-center gap-4 text-left">
          <div className="bg-blue-500 text-white p-2.5 rounded-xl shrink-0">
            <PhoneCall size={20} />
          </div>
          <div>
            <h4 className="font-bold text-blue-900 text-sm">What happens next?</h4>
            <p className="text-xs text-blue-700 mt-0.5 leading-relaxed">
              Our manual operations desk will review the route details and call your mobile number directly within 5 minutes to issue a quote and finalize the booking.
            </p>
          </div>
        </div>

        <div className="pt-2">
          <Link 
            href="/"
            className="block w-full bg-[#1d52ca] hover:bg-blue-800 text-white font-bold py-3.5 px-4 rounded-xl transition text-center shadow-md shadow-blue-100"
          >
            Book Another Ride
          </Link>
        </div>

      </div>
    </main>
  );
}