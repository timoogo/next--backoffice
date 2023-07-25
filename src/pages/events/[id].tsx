import { API_ROUTES } from '@/constants/api.routes.constants';
import { GetServerSideProps } from 'next';

interface Event {
  id: string;
  name: string;
  description: string;
  date: string;
  location: string;
}

interface EventPageProps {
  event: Event;
}

const EventPage: React.FC<EventPageProps> = ({ event }) => {
  return (
    <div>
      <h1>{event.name}</h1>
      <p>{event.description}</p>
      <p>Date: {event.date}</p>
      <p>Location: {event.location}</p>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const { id } = params!;
    const response = await fetch(`${API_ROUTES.EVENTS}/${id}`);
  
    if (!response.ok) {
      throw new Error('Failed to fetch event');
    }
  
    const event = await response.json();
  
    return {
      props: {
        event,
      },
    };
  };

export default EventPage;