import ExploreBtn from './../components/ExploreBtn';
import EventCard from './../components/EventCard';

import { events } from '../lib/constants';

const page = () => {
  return (
    <section className='p-10'>
      <h1 className='text-center'>Discover events that matter.<br />Simplified</h1>
      <p className='text-center mt-5'>Hackathons, Events, Meetups & More</p>

      <ExploreBtn />

      <div className='mt-10 space-y-7'>
        <h3>Featured Events</h3>

        <ul className='events list-none'>
          {events.map((event) => (
            <li key={event.title}>
              <EventCard {...event} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default page