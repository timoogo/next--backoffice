import DropdownMenu from "@/components/Dropdowns/DropdownMenu";
import Paginator from "@/components/Paginators/Paginator";
import { DropdownOption } from "@/types/Options";
import { PencilAltIcon, XCircleIcon } from "@heroicons/react/solid";
import { useState } from "react";



export const getServerSideProps = async () => {
  const res = await fetch('http://localhost:3001/api/organizations');
  const organizations = await res.json();


  console.log(organizations);
  return {
    props: {
      organizations
    }
  };
}



interface OrganizationsPageProps {
  organizations: Organization[];
}

interface Organization {
  id: number;
  name: string;
  email: string;
  phone: string;
  description: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

const OrganizationsPage = ({ organizations }: OrganizationsPageProps) => {
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  // Check if organizations is an array and not empty before calling slice
  const currentOrganizations = Array.isArray(organizations) && organizations.length > 0
    ? organizations.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    : [];
  
  const options: DropdownOption[] = [
    // @ts-ignore
    {
      text: 'Edit',
      Icon: PencilAltIcon,
      color: "#3B82F6",
      action: () => console.log('Edit'),
    },
    {
      text: 'Delete',
      Icon: XCircleIcon,
      color: "#10B981",
      action: () => console.log('Delete'),
    }
  ];

  const totalPages = Array.isArray(organizations) ? Math.ceil(organizations.length / itemsPerPage) : 0;

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber < 1 || pageNumber > totalPages) {
      return;
    }
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };



  const handleTimeStamps = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  return (
    <>
      <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
        {organizations.length > 0 ? (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr className="border-b border-gray-200 text-center">
                {organizations[0] && Object.keys(organizations[0]).map((key) => {
                  if (key !== 'password') { // Exclude password for security reasons
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
              {currentOrganizations.map((organization) => (
                <tr key={organization.id} className="hover:bg-gray-100">
                  <td className="px-6 py-4 text-center align-middle">{organization.id}</td>
                  <td className="px-6 py-4 text-center align-middle">{organization.name}</td>
                  <td className="px-6 py-4 text-center align-middle">{organization.email}</td>
                  <td className="px-6 py-4 text-center align-middle">{organization.description}</td>
                  <td className="px-6 py-4 text-center align-middle">{handleTimeStamps(organization.createdAt)}</td>

                  {/* Actions (Edit & Delete) */}
                  <td className="px-6 py-4 align-middle text-center">
                    <DropdownMenu options={options}  />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="flex justify-center mt-5">
            <p className="text-gray-500 text-lg">No organizations found.</p>
          </div>
        )}
        <div className="flex justify-center mt-4">
          {organizations.length > itemsPerPage && (
            <Paginator
              currentPage={currentPage}
              totalPages={totalPages}
              itemsPerPage={itemsPerPage}
              onPageChange={handlePageChange}
              onItemsPerPageChange={handleItemsPerPageChange}
              items={organizations}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default OrganizationsPage;