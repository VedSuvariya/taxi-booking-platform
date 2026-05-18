import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const ADMIN_EMAIL = process.env.ADMIN_EMAIL!;

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      tripType,
      pickupPlace,
      dropPlace,
      date,
      time,
      customerName,
      customerPhone,
    } = body;

    // Validation
    if (!customerName || !customerPhone) {
      return NextResponse.json(
        { error: 'customerName and customerPhone are required' },
        { status: 400 }
      );
    }

    if (!tripType || !pickupPlace || !dropPlace || !date || !time) {
      return NextResponse.json(
        { error: 'All trip details are required' },
        { status: 400 }
      );
    }

    // Save to database
    const newBooking = await prisma.booking.create({
      data: {
        tripType,
        pickupPlace,
        dropPlace,
        date,
        time,
        customerName,
        customerPhone,
        status: 'PENDING',
      },
    });

    // Send admin notification email
    await resend.emails.send({
      from: 'Taxi Booking <onboarding@resend.dev>',
      to: ADMIN_EMAIL,
      subject: `🚖 New Booking #${newBooking.id} — ${customerName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #f9f9f9; border-radius: 8px;">
          <h2 style="color: #1a1a1a; border-bottom: 2px solid #f59e0b; padding-bottom: 12px;">
            🚖 New Taxi Booking
          </h2>

          <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
            <tr style="background: #fff;">
              <td style="padding: 10px 14px; font-weight: bold; color: #555; width: 40%;">Booking ID</td>
              <td style="padding: 10px 14px; color: #1a1a1a;">#${newBooking.id}</td>
            </tr>
            <tr style="background: #f3f4f6;">
              <td style="padding: 10px 14px; font-weight: bold; color: #555;">Customer Name</td>
              <td style="padding: 10px 14px; color: #1a1a1a;">${customerName}</td>
            </tr>
            <tr style="background: #fff;">
              <td style="padding: 10px 14px; font-weight: bold; color: #555;">Phone Number</td>
              <td style="padding: 10px 14px; color: #1a1a1a;">${customerPhone}</td>
            </tr>
            <tr style="background: #f3f4f6;">
              <td style="padding: 10px 14px; font-weight: bold; color: #555;">Trip Type</td>
              <td style="padding: 10px 14px; color: #1a1a1a;">${tripType}</td>
            </tr>
            <tr style="background: #fff;">
              <td style="padding: 10px 14px; font-weight: bold; color: #555;">Pickup</td>
              <td style="padding: 10px 14px; color: #1a1a1a;">${pickupPlace}</td>
            </tr>
            <tr style="background: #f3f4f6;">
              <td style="padding: 10px 14px; font-weight: bold; color: #555;">Drop</td>
              <td style="padding: 10px 14px; color: #1a1a1a;">${dropPlace}</td>
            </tr>
            <tr style="background: #fff;">
              <td style="padding: 10px 14px; font-weight: bold; color: #555;">Date</td>
              <td style="padding: 10px 14px; color: #1a1a1a;">${date}</td>
            </tr>
            <tr style="background: #f3f4f6;">
              <td style="padding: 10px 14px; font-weight: bold; color: #555;">Time</td>
              <td style="padding: 10px 14px; color: #1a1a1a;">${time}</td>
            </tr>
            <tr style="background: #fff;">
              <td style="padding: 10px 14px; font-weight: bold; color: #555;">Status</td>
              <td style="padding: 10px 14px;">
                <span style="background: #fef3c7; color: #92400e; padding: 4px 10px; border-radius: 99px; font-size: 13px; font-weight: bold;">
                  PENDING
                </span>
              </td>
            </tr>
          </table>

          <p style="margin-top: 24px; color: #888; font-size: 12px; text-align: center;">
            This is an automated alert from your Taxi Booking system.
          </p>
        </div>
      `,
    });

    return NextResponse.json(
      { message: 'Booking confirmed', id: newBooking.id },
      { status: 201 }
    );

  } catch (error: any) {
    console.error('--- CRASH LOG ---');
    console.error('Message :', error.message);
    console.error('Code    :', error.code);
    console.error('Meta    :', error.meta);
    console.error('-----------------');

    return NextResponse.json(
      { error: 'Booking failed', detail: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const bookings = await prisma.booking.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(bookings, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to fetch bookings' },
      { status: 500 }
    );
  }
}