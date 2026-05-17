import Image from "next/image";
import Link from "next/link";
import { EventItem } from "../lib/constants";

const EventCard = ({ title, image, slug, location, date, time }: EventItem) => {
    return (
        <Link href={`/events/${slug}`} id="event-card" className="event-card">
            <Image src={image} alt={title} width={410} height={300} priority className="poster" style={{ width: '100%', height: 'auto', aspectRatio: '41 / 30' }} />
            <div className="location flex items-center gap-2">
                <Image src="/icons/pin.svg" alt="pin" width={20} height={20} style={{ width: 'auto', height: 'auto' }} />
                <p>{location}</p>
            </div>
            <p className="title">{title}</p>
            <div className="datetime">
                <div>
                    <Image src="/icons/calendar.svg" alt="calendar" width={20} height={20} style={{ width: 'auto', height: 'auto' }} />
                    <p>{date}</p>
                </div>
                <div>
                    <Image src="/icons/clock.svg" alt="clock" width={20} height={20} style={{ width: 'auto', height: 'auto' }} />
                    <p>{time}</p>
                </div>
            </div>
        </Link>
    )
}

export default EventCard