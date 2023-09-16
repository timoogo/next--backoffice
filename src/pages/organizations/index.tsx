import React, { useState } from 'react';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import Link from 'next/link';

import { Organization } from '../../../types';
import { PencilAltIcon } from '@heroicons/react/solid';
import Paginator from '@/components/Paginators/Paginator';

export const getServerSideProps = async () => {
  const res = await fetch('http://localhost:3001/api/organizations');
  const organizations = await res.json();
  return {
    props: {
      organizations,
    },
  };
};

interface OrganizationsPageProps {
  organizations: Organization[];
}

const OrganizationsPage = ({ organizations }: OrganizationsPageProps) => {

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
  const indexOfLastOrganization = currentPage * itemsPerPage;
  const indexOfFirstOrganization = indexOfLastOrganization - itemsPerPage;
  const currentOrganizations = organizations.slice(
    indexOfFirstOrganization,
    indexOfLastOrganization,
  );
  const transformPhone = (phone: string) => {
    // +33 6 12 34 56 78
    const phoneNumber = parsePhoneNumberFromString(phone, 'FR');
    if (phoneNumber) {
      return phoneNumber.formatInternational();
    }
    return phone;

  }

  function handleDate(date: string) {
    // french date format : dd/mm/yyyy
    const day = date.slice(8, 10);
    const month = date.slice(5, 7);
    const year = date.slice(0, 4);
    return `${day}/${month}/${year}`;
  }


  return (
    <>
    <div className="flex justify-end">
      <Link
        href="/organizations/post"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Créer un organization
      </Link>
    </div>
    {organizations.length === 0 ? (
      <div className="flex justify-center mt-5">
        <p className="text-gray-500 text-lg">No organizations found.</p>
      </div>
    ) : (
      <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr className="border-b border-gray-200 text-center">
              {organizations.length > 0 &&
                organizations[0] &&
                Object.keys(organizations[0]).map((key) => {
                  // Hide the "image" field from the table headers
                  if (key === 'image') return null;
                  return (
                    <th
                      className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider align-middle"
                      key={key}
                    >
                      {key}
                    </th>
                  );
                })}
              <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider align-middle">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
            {currentOrganizations.map((organization) => (
              <tr key={organization.id} className="hover:bg-gray-100">
                {/* id	name	email	phone	description	createdAt	updatedAT */}
                <td className="px-6 py-4 align-middle text-center">
                  {organization.id}
                </td>
                <td className="px-6 py-4 align-middle text-center">
                  {organization.name}
                </td>
                <td className="px-6 py-4 align-middle text-center">
                  {organization.email}
                </td>

                <td className="px-6 py-4 align-middle text-center">
                  {transformPhone(organization.phone)}
                </td>
                <td className="px-6 py-4 align-middle text-center">
                  {organization.description}
                </td>
                <td className="px-6 py-4 align-middle text-center">
                  {handleDate(organization.createdAt)}
                </td>
                <td className="px-6 py-4 align-middle text-center">
                  {handleDate(organization.updatedAt)}
                </td>
                {/* Actions (Edit & Delete) */}
                <td className="px-6 py-4 align-middle text-center">
                {/* buttons delete and see */}
                <Link href={`/organizations/${organization.id}`}>
                  <PencilAltIcon className="h-5 w-5 text-blue-500 hover:text-blue-700 cursor-pointer" />

                  </Link>
               
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
    )}
  </>
  );
};

export default OrganizationsPage;