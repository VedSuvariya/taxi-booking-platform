import BookingForm from '../components/BookingForm';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a369d] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <h1 className="text-white text-2xl font-bold text-center mb-6 tracking-wide drop-shadow-md">
          Book Your Reliable Ride
        </h1>
        <BookingForm />
      </div>
    </main>
  );
}