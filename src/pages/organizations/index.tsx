import Paginator from '@/components/Paginator';
import React, { useState } from 'react';

interface Organizations {
    id: number;
    name: string;
    description: string;
    numberOfMembers: number;
    email: string;
    isActive: boolean;
}
interface OrganizationsPageProps {
    organizations: Organizations[];
  }
  
const OrganizationsPage = () => {
    const organizations = [
        {
            id: 1,
            name: 'Hope for All',
            description: 'Providing shelter and support to homeless individuals.',
            numberOfMembers: 75,
            email: 'info@hopeforall.org',
            isActive: true
        },
        {
            id: 2,
            name: 'Healthcare Initiatives',
            description: 'Improving access to healthcare in underserved communities.',
            numberOfMembers: 120,
            email: 'contact@healthcareinitiatives.org',
            isActive: true
        },
        {
            id: 3,
            name: 'Environmental Conservation Society',
            description: 'Protecting and preserving the environment through conservation efforts.',
            numberOfMembers: 90,
            email: 'info@environmentalsociety.org',
            isActive: true
        },
        {
            id: 4,
            name: 'Children\'s Rights Advocacy',
            description: 'Fighting for the rights and well-being of children worldwide.',
            numberOfMembers: 60,
            email: 'contact@childrensrights.org',
            isActive: true
        },
        {
            id: 5,
            name: 'Animal Rescue Foundation',
            description: 'Rescuing and rehabilitating abandoned and abused animals.',
            numberOfMembers: 40,
            email: 'info@animalrescuefoundation.org',
            isActive: true
        },
        {
            id: 6,
            name: 'Disaster Relief Fund',
            description: 'Providing immediate assistance and relief during natural disasters.',
            numberOfMembers: 150,
            email: 'contact@disasterrelief.org',
            isActive: true
        },
        {
            id: 7,
            name: 'Women Empowerment Network',
            description: 'Empowering women and promoting gender equality.',
            numberOfMembers: 80,
            email: 'info@womenempowerment.org',
            isActive: true
        },
        {
            id: 8,
            name: 'Senior Citizens Support',
            description: 'Offering assistance and companionship to elderly individuals.',
            numberOfMembers: 30,
            email: 'contact@seniorcitizenssupport.org',
            isActive: true
        },
        {
            id: 9,
            name: 'Youth Education Initiative',
            description: 'Providing educational resources and opportunities to young people.',
            numberOfMembers: 110,
            email: 'info@youtheducation.org',
            isActive: true
        },
        {
            id: 10,
            name: 'Refugee Aid Organization',
            description: 'Supporting refugees in their integration and resettlement process.',
            numberOfMembers: 95,
            email: 'contact@refugeeaid.org',
            isActive: true
        }
    ];

    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
  
    const totalPages = Math.ceil(organizations.length / itemsPerPage);

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

    const indexOfLastOrg = currentPage * itemsPerPage;
    const indexOfFirstOrg = indexOfLastOrg - itemsPerPage;
    const currentOrganizations = organizations.slice(indexOfFirstOrg, indexOfLastOrg);
  
    return (
        <>
            <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
                <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
                    <thead className="bg-gray-50">
                        <tr className="border-b border-gray-200 text-center">
                            {Object.keys(organizations[0]).map((key) => {
                                if (key !== 'email') {
                                    return (
                                        <th
                                            className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            key={key}
                                        >
                                            {key}
                                        </th>
                                    );
                                }
                                return null; // Skip rendering the th element for the 'email' field
                            })}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                        {currentOrganizations.map((org) => (
                            
                            <tr key={org.id} className="hover:bg-gray-1 00">
                                    <td className="px-6 py-4 text-center">{org.id}</td>
                                <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                                    <div className="relative h-10 w-10">
                                        <img
                                            className="h-full w-full rounded-full object-cover object-center"
                                            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                            alt=""
                                        />
                                        <span className={`absolute right-0 bottom-0 h-2 w-2 rounded-full ${org.isActive ? 'bg-green-400' : 'bg-red-400'} ring ring-white`} />
                                    </div>
                                    <div className="text-sm">
                                        <div className="font-medium text-gray-700">{org.name}</div>
                                        <div className="text-gray-400">{org.email}</div>
                                    </div>
                                </th>
                                <td className="px-6 py-4 text-center">{org.description}</td>
                                <td className="px-6 py-4 text-center">{org.numberOfMembers}</td>
                                <td className="px-6 py-4 text-center">
                                    <span className={`inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold ${org.isActive ? 'bg-green-200' : 'bg-red-200'}`}>
                                        <span className={`h-1.5 w-1.5 rounded-full ${org.isActive ? 'bg-green-600' : 'bg-red-600'}`} />
                                        {org.isActive ? 'Active' : 'Inactive'}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex justify-end gap-4">
                                        <a x-data="{ tooltip: 'Delete' }" href="#">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.5"
                                                stroke="currentColor"
                                                className="h-6 w-6"
                                                x-tooltip="tooltip"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                                />
                                            </svg>
                                        </a>
                                        <a x-data="{ tooltip: 'Edit' }" href="#">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.5"
                                                stroke="currentColor"
                                                className="h-6 w-6"
                                                x-tooltip="tooltip"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                                                />
                                            </svg>
                                        </a>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
                <div className="flex justify-center mt-4">
     {/* Conditionally render the paginator component */}
     {organizations.length > itemsPerPage && (
        <Paginator
          currentPage={currentPage}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
          onItemsPerPageChange={handleItemsPerPageChange}
          items={organizations} // Pass the organizations array as the items prop
        />
      )}
                   </div>
            </div>
        </>
    );
};

export default OrganizationsPage;
