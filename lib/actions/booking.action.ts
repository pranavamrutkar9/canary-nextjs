'use server';

import { Booking } from "@/database";
import { connectToDatabase } from "../mongodb";

export const createBooking = async ({ eventId, email }: { eventId: string, email: string }) => {
    try {
        await connectToDatabase();
        const newBooking = await Booking.create({
            eventId, email
        });
        const booking = JSON.parse(JSON.stringify(newBooking));
        return { success: true, booking };
    } catch (e) {
        console.error("Booking failed", e);
        return { success: false, error: e instanceof Error ? e.message : String(e) };
    }
}