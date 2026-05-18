import BookingForm from '@/components/BookingForm';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col" style={{ background: '#F5F0E6' }}>

      <header className="w-full px-6 py-4 flex items-center justify-between" style={{ borderBottom: '1px solid #e0d8c8' }}>
        <img src="/logo.png" alt="SkyCru Cab Services" className="h-10 w-auto" />
        <a href="tel:9825841712" className="flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-xl" style={{ background: '#E8961E', color: '#fff' }}>
          📞 9825841712
        </a>
      </header>

      <section className="flex-1 flex flex-col items-center justify-center px-4 py-10">
        <h1 className="text-3xl font-bold text-center mb-1" style={{ color: '#1B3A4B' }}>
          Book Your Reliable Ride
        </h1>
        <p className="text-sm text-center mb-8" style={{ color: '#5a7a8a' }}>
          Safe, comfortable cab services across Gujarat
        </p>
        <div className="w-full max-w-md">
          <BookingForm />
        </div>
      </section>

      <footer className="w-full px-6 py-6 text-center" style={{ borderTop: '1px solid #e0d8c8' }}>
        <p className="text-sm font-semibold mb-1" style={{ color: '#1B3A4B' }}>SkyCru Cab Services</p>
        <p className="text-xs mb-2" style={{ color: '#7a8a90' }}>
          Umeshbhai Khachar &nbsp;|&nbsp; Gautambhai Kalkan
        </p>
        <a href="tel:9825841712" className="text-sm font-bold" style={{ color: '#E8961E' }}>
          📞 9825841712
        </a>
        <p className="text-xs mt-3" style={{ color: '#aaa' }}>© 2025 SkyCru Cab Services. All rights reserved.</p>
      </footer>

    </main>
  );
}