'use client'
import { createBooking } from '@/lib/actions/booking.action';
import React, { useState } from 'react';

const BookEvent = ({ eventId, slug }: { eventId: string, slug: string }) => {
    const [email, setEmail] = useState("")
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const { success, error } = await createBooking({ eventId, email });
        if (!success) console.error(error);
        else setSubmitted(true);
    }
    return (
        <div>
            {submitted ? <p className='text-2xl font-bold text-center text-white' >We&apos;ll Notify You Once We Go Live!</p> : (

                <div className='flex flex-col gap-4'>
                    <div className='flex flex-col gap-2'>
                        <h2 className='text-2xl font-semibold text-white'>Book Your Spot</h2>
                        <p className='text-gray-400'>Get notified when tickets go live.</p>
                    </div>
                    <form onSubmit={handleSubmit} className='grid grid-cols-1 gap-4'>
                        <input
                            type='email'
                            placeholder='Your Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className='w-full p-3 rounded-lg border border-white/10 bg-white/5 text-white placeholder-white/20 focus:outline-none focus:border-emerald-500'
                        />
                        <button
                            type='submit'
                            className='w-full p-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 transition duration-200 cursor-pointer'
                        >
                            Notify me
                        </button>
                    </form>
                </div>
            )}
        </div>
    )
}

export default BookEvent