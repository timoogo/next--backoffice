import { API_ROUTES } from '@/constants/api.routes.constants';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import { Event, EventPageProps } from '@/interfaces/events/Id.interface';

const EventPage: React.FC<EventPageProps> = ({ event }) => {


  const handleDate = (date: string, isFull: boolean = false) => {
    // if isFull return dd//mm/yyyy hh:mm
    if (isFull) {
      const day = date.slice(8, 10);
      const month = date.slice(5, 7);
      const year = date.slice(0, 4);
      const hour = date.slice(11, 13);
      const minutes = date.slice(14, 16);
      return `${day}/${month}/${year} - ${hour}:${minutes}`;
    }
    // if not return dd/mm/yyyy
    const day = date.slice(8, 10);
    const month = date.slice(5, 7);
    const year = date.slice(0, 4);
    return `${day}/${month}/${year}`;
  };


  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
    <div className="mb-4">
      <h2 className="text-xl font-semibold mb-2">{event.name}</h2>
      <p className="text-gray-600">{event.description}</p>
    </div>
    <div className="mb-4">
      <Image src={event.image} alt={event.name} className="w-full rounded-lg" />
    </div>
    <div className="grid grid-cols-2 gap-4 mb-4">
      <div>
        <p>
          <strong>Location:</strong> {event.location}
        </p>
        <p>
          <strong>Type:</strong> {event.type}
        </p>
        <p>
          <strong>Date:</strong> {handleDate(event.date)}
        </p>
        <p>
          <strong>Duration:</strong> {event.duration} hours
        </p>
      </div>
      <div>
        <p>
          <strong>Status:</strong> {event.status}
        </p>
        <p>
          <strong>Created At:</strong> { handleDate(event.createdAt, true) }
        </p>
        <p>
          <strong>Updated At:</strong> { handleDate(event.updatedAt, true) }
        </p>
      </div>
    </div>
    {/* Add any other event details you want to display here */}
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