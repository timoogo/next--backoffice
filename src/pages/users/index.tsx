import { useState } from "react";
import { PencilAltIcon, XCircleIcon } from "@heroicons/react/solid";
import Paginator from "@/components/Paginators/Paginator";
import Link from "next/link";
import { User } from "../../../types";
// libphonenumber-js for phone number validation
import { parsePhoneNumberFromString, AsYouType    } from 'libphonenumber-js'


export const getServerSideProps = async () => {
  const res = await fetch("http://localhost:3001/api/users");
  const users = await res.json();


  users.map((event: User) => {  });
  return {
    props: {
      users,
    },
  };
};

interface UsersPageProps {
  users: User[];
}



const UsersPage = ({ users }: UsersPageProps) => {
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const currentUsers = users.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const transformPhone = (phone: string) => {
    // +33 6 12 34 56 78
    const phoneNumber = parsePhoneNumberFromString(phone, 'FR');
    if (phoneNumber) {
      return phoneNumber.formatInternational();
    }
    return phone;

  }
 

  const totalPages = Math.ceil(users.length / itemsPerPage);

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

  function handleDate(date: string, isFull: boolean = false) {
    if (isFull) {
      // french date format : dd/mm/yyyy
      const minutes = date.slice(14, 16);
      const hours = date.slice(11, 16);
      const day = date.slice(8, 10);
      const month = date.slice(5, 7);
      const year = date.slice(0, 4);
      return `${day}/${month}/${year} à ${hours}:${minutes}`;
    }
    else {
      // french date format : dd/mm/yyyy
      const day = date.slice(8, 10);
      const month = date.slice(5, 7);
      const year = date.slice(0, 4);
      return `${day}/${month}/${year}`;
    }
  }

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
          <table className="min-w-full divide-y divide-gray-200">
  <thead className="bg-gray-50">
    <tr className="border-b border-gray-200 text-center">
      {users.length > 0 && users[0] && Object.keys(users[0]).map((key) => {
        if (key !== 'password' ) { // Nous excluons le mot de passe pour des raisons de sécurité.
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
//      id	name	description	image	location	type	date	duration	status	createdAt	updatedAt
      <tr key={user.id} className="hover:bg-gray-100">
        <td className="px-6 py-4 text-center align-middle">{user.id}</td>
        <td className="px-6 py-4  text-center align-middle">{user.name}</td>  
        <td className="px-6 py-4 text-center align-middle">{user.email}</td>
        <td className="px-6 py-4 text-center align-middle">{transformPhone(user.phone)}</td>
        <td className="px-6 py-4 text-center align-middle">{handleDate(user.createdAt, true)}</td>
        <td className="px-6 py-4 text-center align-middle">
          <span>{
            user.isAdmin ? (
              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                Admin
              </span>
            ) : (
              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                User
              </span>
            )
            }</span>
        </td>

 
        {/* Actions (Edit & Delete) */}
        <td className="px-6 py-4 align-middle text-center">
          <button className="text-indigo-600 hover:text-indigo-900">
            <Link href={`/users/${user.id}`}>
                <PencilAltIcon className="w-5 h-5" />
            </Link>
          </button>
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


  );
};

export default UsersPage;