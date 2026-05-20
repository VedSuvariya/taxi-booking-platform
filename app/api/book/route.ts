import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const ADMIN_EMAIL = process.env.ADMIN_EMAIL!;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { tripType, carType, pickupPlace, dropPlace, date, time, customerName, customerPhone } = body;

    if (!customerName || !customerPhone) {
      return NextResponse.json({ error: 'Name and phone are required' }, { status: 400 });
    }
    if (!carType) {
      return NextResponse.json({ error: 'Please select a car type' }, { status: 400 });
    }

    const newBooking = await prisma.booking.create({
      data: { tripType, carType, pickupPlace, dropPlace, date, time, customerName, customerPhone, status: 'PENDING' },
    });

    await resend.emails.send({
      from: 'Taxi Booking <onboarding@resend.dev>',
      to: ADMIN_EMAIL,
      subject: `🚖 New Booking #${newBooking.id} — ${customerName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #f9f9f9; border-radius: 8px;">
          <h2 style="color: #1a1a1a; border-bottom: 2px solid #E8961E; padding-bottom: 12px;">🚖 New Booking — SkyCru Cabs</h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
            <tr style="background:#fff"><td style="padding:10px 14px;font-weight:bold;color:#555;width:40%">Booking ID</td><td style="padding:10px 14px">#${newBooking.id}</td></tr>
            <tr style="background:#f3f4f6"><td style="padding:10px 14px;font-weight:bold;color:#555">Customer</td><td style="padding:10px 14px">${customerName}</td></tr>
            <tr style="background:#fff"><td style="padding:10px 14px;font-weight:bold;color:#555">Phone</td><td style="padding:10px 14px">${customerPhone}</td></tr>
            <tr style="background:#f3f4f6"><td style="padding:10px 14px;font-weight:bold;color:#555">Car Type</td><td style="padding:10px 14px">${carType.replace('_', ' ')}</td></tr>
            <tr style="background:#fff"><td style="padding:10px 14px;font-weight:bold;color:#555">Trip Type</td><td style="padding:10px 14px">${tripType.replace('_', ' ')}</td></tr>
            <tr style="background:#f3f4f6"><td style="padding:10px 14px;font-weight:bold;color:#555">Pickup</td><td style="padding:10px 14px">${pickupPlace}</td></tr>
            <tr style="background:#fff"><td style="padding:10px 14px;font-weight:bold;color:#555">Drop</td><td style="padding:10px 14px">${dropPlace}</td></tr>
            <tr style="background:#f3f4f6"><td style="padding:10px 14px;font-weight:bold;color:#555">Date</td><td style="padding:10px 14px">${date}</td></tr>
            <tr style="background:#fff"><td style="padding:10px 14px;font-weight:bold;color:#555">Time</td><td style="padding:10px 14px">${time}</td></tr>
          </table>
        </div>
      `,
    });

    return NextResponse.json({ message: 'Booking confirmed', id: newBooking.id }, { status: 201 });

  } catch (error: any) {
    console.error('--- CRASH LOG ---', error.message);
    return NextResponse.json({ error: 'Booking failed', detail: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const bookings = await prisma.booking.findMany({ orderBy: { createdAt: 'desc' } });
    return NextResponse.json(bookings, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 });
  }
}