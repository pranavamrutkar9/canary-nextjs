import EventCard from '@/components/EventCard';
import { IEvent } from '@/database';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "";

const page = async () => {
    let events: IEvent[] = [];

    try {
        const response = await fetch(`${BASE_URL}/api/events`, { cache: 'no-store' });
        if (response.ok) {
            const data = await response.json();
            events = Array.isArray(data?.events) ? data.events : [];
        } else {
            console.error("Failed to fetch events, API status:", response.status);
        }
    } catch (error) {
        console.error("Error fetching events:", error);
    }

    return (
        <section>
            <div className='mt-10 space-y-7'>
                <h3 className='text-center'>Featured Events</h3>

                {events.length > 0 ? (
                    <ul className='events list-none'>
                        {events.map((event: IEvent) => (
                            <li key={event.title}>
                                <EventCard {...event} />
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-400 text-center py-10">No events found or unable to connect to database.</p>
                )}
            </div>
        </section>

    )
}

export default page