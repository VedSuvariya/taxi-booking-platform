import BookingForm from '@/components/BookingForm';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col" style={{ background: '#F5F0E6' }}>

      <header className="w-full px-6 py-4 flex items-center justify-between" style={{ background: '#fff', borderBottom: '1px solid #e0d8c8' }}>
        <img src="/logo.png" alt="SkyCru Cab Services" className="h-10 w-auto" />
        <a href="tel:9825841712" className="text-sm font-semibold px-4 py-2 rounded-xl" style={{ background: '#E8961E', color: '#fff' }}>
          9825841712
        </a>
      </header>

      <div className="relative w-full" style={{ height: '260px' }}>
        <img src="/hero.jpg" alt="SkyCru Cab" className="w-full h-full object-cover" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4" style={{ background: 'rgba(0,0,0,0.52)' }}>
          <h1 className="text-3xl font-extrabold text-white uppercase tracking-widest drop-shadow-lg">
            Welcome to
          </h1>
          <h2 className="text-4xl font-extrabold uppercase tracking-widest drop-shadow-lg" style={{ color: '#E8961E' }}>
            SkyCru Cabs
          </h2>
          <p className="text-white text-sm mt-2 font-medium tracking-wide">
            Safe · Reliable · Comfortable
          </p>
        </div>
      </div>

      <section className="flex flex-col items-center px-4 py-8">
        <h3 className="text-xl font-bold mb-6 uppercase tracking-wider" style={{ color: '#1B3A4B' }}>
          Book Your Taxi Now
        </h3>
        <div className="w-full max-w-md">
          <BookingForm />
        </div>
      </section>

      <footer className="w-full px-6 py-6 text-center mt-auto" style={{ borderTop: '1px solid #e0d8c8' }}>
        <p className="text-sm font-semibold mb-1" style={{ color: '#1B3A4B' }}>SkyCru Cab Services</p>
        <p className="text-xs mb-2" style={{ color: '#7a8a90' }}>
          Umeshbhai Khachar &nbsp;|&nbsp; Gautambhai Kalkan
        </p>
        <a href="tel:9825841712" className="text-sm font-bold" style={{ color: '#E8961E' }}>
          9825841712
        </a>
        <p className="text-xs mt-3" style={{ color: '#aaa' }}>
          2025 SkyCru Cab Services. All rights reserved.
        </p>
      </footer>

    </main>
  );
}