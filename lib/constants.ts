export interface EventItem {
  title: string;
  image: string;
  slug: string;
  location: string;
  date: string;
  time: string;
}

export const events: EventItem[] = [
  {
    title: "Next.js Conf 2026",
    slug: "nextjs-conf-2026",
    image: "/images/event1.png",
    location: "San Francisco, CA & Online",
    date: "Oct 24, 2026",
    time: "09:00 AM PST",
  },
  {
    title: "GitHub Universe 2026",
    slug: "github-universe-2026",
    image: "/images/event2.png",
    location: "Fort Mason, San Francisco",
    date: "Nov 10-12, 2026",
    time: "10:00 AM PST",
  },
  {
    title: "Google I/O Connect",
    slug: "google-io-connect-2026",
    image: "/images/event3.png",
    location: "Berlin, Germany",
    date: "Jun 25, 2026",
    time: "08:30 AM CET",
  },
  {
    title: "AWS re:Invent 2026",
    slug: "aws-reinvent-2026",
    image: "/images/event4.png",
    location: "Las Vegas, NV",
    date: "Dec 1-5, 2026",
    time: "08:00 AM PST",
  },
  {
    title: "ETHGlobal Hackathon",
    slug: "ethglobal-hackathon-2026",
    image: "/images/event5.png",
    location: "London, UK",
    date: "Mar 13-15, 2026",
    time: "05:00 PM GMT",
  },
  {
    title: "React Advanced London",
    slug: "react-advanced-london-2026",
    image: "/images/event6.png",
    location: "London & Hybrid",
    date: "Oct 30, 2026",
    time: "09:00 AM GMT",
  },
];
