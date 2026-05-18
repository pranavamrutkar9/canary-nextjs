import { notFound } from "next/navigation";
import Image from "next/image";
import BookEvent from './../../../components/BookEvent';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

interface PageProps {
    params: Promise<{ slug: string }>;
}

const EventPage = async ({ params }: PageProps) => {
    const { slug } = await params;
    const request = await fetch(`${BASE_URL}/api/events/${slug}`);

    if (!request.ok) {
        notFound();
    }

    const data = await request.json();
    const event = data?.event;

    if (!event) {
        notFound();
    }

    const {
        title,
        description,
        image,
        overview,
        date,
        time,
        venue,
        location,
        mode,
        audience,
        agenda,
        organizer,
        tags,
    } = event;

    const formattedDate = date && !isNaN(Date.parse(date))
        ? new Date(date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
        : date;

    return (
        <section className="p-10 max-w-7xl mx-auto">
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-4">{title}</h1>
                <p className="text-xl text-gray-400">{description}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 w-full">
                <div className="lg:col-span-7 space-y-6">
                    <div className="relative w-full aspect-video overflow-hidden rounded-xl border border-white/10 mb-6">
                        <Image
                            src={image}
                            alt={title}
                            fill
                            priority
                            style={{ objectFit: "cover" }}
                            sizes="(max-width: 1024px) 100vw, 60vw"
                        />
                    </div>
                    <div className="">
                        <h3 className="text-2xl font-semibold mb-3">Overview</h3>
                        <p className="text-gray-300 leading-relaxed mb-6">{overview}</p>
                    </div>

                    <div className="space-y-4">
                        <h3 className="">Event Details</h3>

                        <div className="space-y-3 text-sm">
                            <div className="flex items-center py-2 gap-2">
                                <Image src="/icons/calendar.svg" alt="calendar" width={20} height={20} style={{ width: 'auto', height: 'auto' }} />
                                <span className="font-medium text-white">{formattedDate}</span>
                            </div>
                            <div className="flex items-center py-2 gap-2">
                                <Image src="/icons/clock.svg" alt="clock" width={20} height={20} style={{ width: 'auto', height: 'auto' }} />
                                <span className="font-medium text-white">{time}</span>
                            </div>
                            <div className="flex items-center py-2 gap-2">
                                <Image src="/icons/pin.svg" alt="pin" width={20} height={20} style={{ width: 'auto', height: 'auto' }} />
                                <p className="font-medium text-white">{venue}, {location}</p>
                            </div>
                            <div className="flex py-2 gap-2">
                                <span className="text-gray-400">Mode:</span>
                                <span className="font-medium capitalize text-emerald-400">{mode}</span>
                            </div>
                            <div className="flex py-2 gap-2">
                                <span className="text-gray-400">Target Audience:</span>
                                <span className="font-medium text-white">{audience}</span>
                            </div>
                            <div className="flex py-2 gap-2">
                                <span className="text-gray-400">Organizer:</span>
                                <span className="font-medium text-white">{organizer}</span>
                            </div>
                        </div>

                        <div className="pt-4">
                            <h4 className="text-xs font-semibold uppercase text-gray-400 mb-3">Tags</h4>
                            <div className="flex flex-wrap gap-2">
                                {tags?.map((tag: string, index: number) => (
                                    <span key={index} className="px-3 py-1 bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 rounded-full text-xs font-medium">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="">
                        <h3 className="text-2xl font-semibold mb-3 mt-6">Agenda</h3>
                        <ul className="space-y-3">
                            {agenda?.map((item: string, index: number) => (
                                <li key={index} className="flex items-center gap-3 p-2 rounded-lg">
                                    <span className="text-emerald-400 font-medium">●</span>
                                    <span className="text-gray-200">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>

                <div className="lg:col-span-5 space-y-6 w-[40%]">
                    <BookEvent eventId={event._id} slug={slug} />
                </div>
            </div>
        </section>
    );
};

export default EventPage;