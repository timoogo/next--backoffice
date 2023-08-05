import { useState } from 'react';
import { PencilAltIcon, XCircleIcon } from '@heroicons/react/solid';
import DropdownMenu from '@/components/Dropdowns/DropdownMenu';
import Paginator from '@/components/Paginators/Paginator';
import Link from 'next/link';
import { log } from 'console';

export const getServerSideProps = async () => {
  const res = await fetch('http://localhost:3001/api/events');
  const events = await res.json();

  events.map((event: Event) => {
    console.log(event);
  });
  return {
    props: {
      events,
    },
  };
};

interface EventsPageProps {
  events: Event[];
}

interface Event {
  id: number;
  name: string;
  description: string;
  image: string;
  location: string;
  type: string;
  date: string;
  duration: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

const EventsPage = ({ events }: EventsPageProps) => {
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const currentEvents = events.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const totalPages = Math.ceil(events.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber < 1 || pageNumber > totalPages) {
      return;
    }
    setCurrentPage(pageNumber);
  };
  function handleDate(date: string) {
    // french date format : dd/mm/yyyy
    const day = date.slice(8, 10);
    const month = date.slice(5, 7);
    const year = date.slice(0, 4);
    return `${day}/${month}/${year}`;
  }

  function handleTime(time: number) {
    // Divise le temps en heures et minutes
    const hours = Math.floor(time / 60);
    const minutes = time % 60;

    // Formate les heures et les minutes avec un zéro devant si nécessaire
    const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;

    // Retourne le temps formaté
    return `${formattedHours}:${formattedMinutes}`;
  }

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };
  

  return (
    <>
       <div className="flex justify-end">
        <Link
          href="/events/post"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Créer un event
        </Link>
      </div>
    <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
      {/* link to create a event style button with next Link */}
     

      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr className="border-b border-gray-200 text-center">
            {events.length > 0 &&
              events[0] &&
              Object.keys(events[0]).map((key) => {
                if (key !== 'image') {
                  // Nous excluons le mot de passe pour des raisons de sécurité.
                  return (
                    <th
                      className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider align-middle"
                      key={key}
                    >
                      {key}
                    </th>
                  );
                }
                return null;
              })}
            <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider align-middle">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 border-t border-gray-100">
          {currentEvents.map((event) => (
            //      id	name	description	image	location	type	date	duration	status	createdAt	updatedAt
            <tr key={event.id} className="hover:bg-gray-100">
              <td className="px-6 py-4 text-center align-middle">{event.id}</td>
              <td className="px-6 py-4  text-center align-middle">
                {event.name}
              </td>
              <td className="px-6 py-4 text-center align-middle">
                {event.description}
              </td>
              <td className="px-6 py-4 text-center align-middle">
                {event.location}
              </td>
              <td className="px-6 py-4 text-center align-middle">
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold ${
                    event.type ? 'bg-green-200' : 'bg-red-200'
                  }`}
                >
                  {event.type ? 'offline' : 'online'}
                </span>
              </td>{' '}
              <td className="px-6 py-4 text-center align-middle">
                {handleDate(event.date)}
              </td>
              <td className="px-6 py-4 text-center align-middle">
                {handleTime(event.duration)}
              </td>
              <td className="px-6 py-4 text-center align-middle">
                {event.status}
              </td>
              <td className="px-6 py-4 text-center align-middle">
                {handleDate(event.createdAt)}
              </td>
              <td className="px-6 py-4 text-center align-middle">
                {handleDate(event.updatedAt)}
              </td>
              {/* Actions (Edit & Delete) */}
              <td className="px-6 py-4 align-middle text-center">
                <button className="text-indigo-600 hover:text-indigo-900">
                  <Link href={`/events/${event.id}`}>
                    <PencilAltIcon className="w-5 h-5" />
                  </Link>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-4">
        {events.length > itemsPerPage && (
          <Paginator
            currentPage={currentPage}
            totalPages={totalPages}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
            onItemsPerPageChange={handleItemsPerPageChange}
            items={events}
          />
        )}
      </div>
    </div>
    </>
  );
};

export default EventsPage;
