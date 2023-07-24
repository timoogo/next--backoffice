import { useState } from "react";
import { PencilAltIcon, XCircleIcon } from "@heroicons/react/solid";
import DropdownMenu from "@/components/Dropdowns/DropdownMenu";
import Paginator from "@/components/Paginators/Paginator";

export const getServerSideProps = async () => {
  const res = await fetch("http://localhost:3001/api/events");
  const events = await res.json();
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
    currentPage * itemsPerPage
  );

  // @ts-ignore
  const options: DropdownOption[] = [
    {
      text: "Edit",
      // @ts-ignore
      Icon: PencilAltIcon,
      color: "#3B82F6",
      action: () => console.log("Edit"),
    },
    {
      text: "Delete",
      Icon: XCircleIcon,
      color: "#10B981",
      action: () => console.log("Delete"),
    },
  ];

  const totalPages = Math.ceil(events.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber < 1 || pageNumber > totalPages) {
      return;
    }
    setCurrentPage(pageNumber);
  };

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
      {events.length === 0 ? (
        <div className="flex justify-center mt-5">
          <p className="text-gray-500 text-lg">No events found.</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr className="border-b border-gray-200 text-center">
                <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider align-middle">
                  Name
                </th>
                <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider align-middle">
                  Description
                </th>
                <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider align-middle">
                  Location
                </th>
                <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider align-middle">
                  Type
                </th>
                <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider align-middle">
                  Date
                </th>
                <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider align-middle">
                  Duration
                </th>
                <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider align-middle">
                  Status
                </th>
                <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider align-middle">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 border-t border-gray-100">
              {currentEvents.map((event) => (
                <tr key={event.id} className="hover:bg-gray-100">
                  <td className="px-6 py-4 text-center align-middle">
                    {event.name}
                  </td>
                  <td className="px-6 py-4 text-center align-middle">
                    {event.description}
                  </td>
                  <td className="px-6 py-4 text-center align-middle">
                    {event.location}
                  </td>
                  <td className="px-6 py-4 text-center align-middle">
                    {event.type}
                  </td>
                  <td className="px-6 py-4 text-center align-middle">
                    {event.date}
                  </td>
                  <td className="px-6 py-4 text-center align-middle">
                    {handleTime(event.duration)}
                  </td>
                  <td className="px-6 py-4 text-center align-middle">
                    {event.status}
                  </td>
                  <td className="px-6 py-4 align-middle text-center">
                    <DropdownMenu options={options} action={null} />
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
      )}
    </>
  );
};

export default EventsPage;