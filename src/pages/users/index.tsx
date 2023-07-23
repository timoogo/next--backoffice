import React, { Component, ReactNode, useState } from 'react';
import { useQuery } from 'react-query';
import { API_ROUTES } from '@/constants/api.routes.constants';
import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary';
import Paginator from '@/components/Paginators/Paginator';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { DotsCircleHorizontalIcon, PencilAltIcon, XCircleIcon } from '@heroicons/react/solid';
import DropdownMenu from '@/components/Dropdowns/DropdownMenu';



export const getStaticProps = async () => {
    const res = await fetch(API_ROUTES.USERS);
    const users = await res.json();
    console.log (users);

    return {
        props: {
            users
        }
    }; 
}

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  password: string;
  createdAt: string;
  isAdmin: boolean;
}

interface UsersPageProps {
  users: User[];
}



const UsersPage = ({ users }: UsersPageProps) => {
   // @ts-ignore
   const options: DropdownOption[] = [
    {
        text: 'Edit',
        // @ts-ignore
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
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(users.length / itemsPerPage);

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
  
  function handlePhoneDisplay(phoneNumber: string): string {
    const parsedPhoneNumber = parsePhoneNumberFromString(phoneNumber, 'FR');
    if (parsedPhoneNumber) {
      return parsedPhoneNumber.formatInternational();
    }
    return phoneNumber;
  } 

  function handleTimeStamps(timestamp: string): string {
    const date = new Date(timestamp);
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    });
  }

  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

 return (
  <>
   <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
          <table className="min-w-full divide-y divide-gray-200">
  <thead className="bg-gray-50">
    <tr className="border-b border-gray-200 text-center">
      {users.length > 0 && users[0] && Object.keys(users[0]).map((key) => {
        if (key !== 'password') { // Nous excluons le mot de passe pour des raisons de sécurité.
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
    {currentUsers.map((user) => (
      <tr key={user.id} className="hover:bg-gray-100">
        <td className="px-6 py-4 text-center align-middle">{user.id}</td>
        <td className="px-6 py-4  text-center align-middle">{user.name}</td>
        <td className="px-6 py-4 text-center align-middle">{user.email}</td>
        <td className="px-6 py-4 text-center align-middle">{handlePhoneDisplay(user.phone)}</td>
        <td className="px-6 py-4 text-center align-middle">{handleTimeStamps(user.createdAt)}</td>
        <td className="px-6 py-4 text-center align-middle">
          <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold ${user.isAdmin ? 'bg-green-200' : 'bg-red-200'}`}>
            {user.isAdmin ? 'Admin' : 'Not admin'}
          </span>
        </td>
        {/* Actions (Edit & Delete) */}
        <td className="px-6 py-4 align-middle text-center">
          <DropdownMenu options={options} />
        </td>
      </tr>
    ))}
  </tbody>
</table>
                <div className="flex justify-center mt-4">
                    {users.length > itemsPerPage && (
                        <Paginator
                            currentPage={currentPage}
                            totalPages={totalPages}
                            itemsPerPage={itemsPerPage}
                            onPageChange={handlePageChange}
                            onItemsPerPageChange={handleItemsPerPageChange}
                            items={users}
                        />
                    )}
                </div>
            </div>  

  </>
  );
}

export default UsersPage;
