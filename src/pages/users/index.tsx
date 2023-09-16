import { useState } from "react";
import { PencilAltIcon, XCircleIcon } from "@heroicons/react/solid";
import Paginator from "@/components/Paginators/Paginator";
import DropdownMenu from "@/components/Dropdowns/DropdownMenu";
import { DropdownOption } from "@/types/Options";
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import router from "next/router";
import { User } from "../../../types";
import Link from "next/link";
import { FaPen } from "react-icons/fa";

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
  const renderTableHeaders = () => {
    const usersKeys = ['id', 'name', 'email', 'phone', 'isAdmin', /* add other fields */];
    return (
      <tr className="border-b border-gray-200 text-center">
        {usersKeys.map((key) => (
          <th
            className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider align-middle"
            key={key}
          >
            {key}
          </th>
        ))}
        <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider align-middle">
          Actions
        </th>
      </tr>
    );
  };
  
  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  // const options = (userId: number): DropdownOption[] => [
  //   // @ts-ignore
  //   {
  //     text: 'Modifier',
  //     Icon: PencilAltIcon,
  //     color: '#3490dc',
  //     action: () => handleEdit(userId),
  //   },
  //   {
  //     text: 'Supprimer',
  //     Icon: XCircleIcon,
  //     color: '#e3342f',
  //     action: () => handleDelete(userId),
  //   },
  // ];

  const handleEdit = (userId: number) => {
    router.push(`/users/edit/${userId}`); // Change the route accordingly
  };

  const handleDelete = async (userId: number) => {
    try {
      const response = await fetch(`http://localhost:3001/api/users/${userId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log(`User with ID ${userId} deleted successfully.`);
        setCurrentPage(1); // Reset to the first page after deletion
      } else {
        console.error(`Error deleting user with ID ${userId}.`);
      }
    } catch (error: any) {
      console.error(`Error deleting user with ID ${userId}: ${error.message}`);
    }
  };

  return (
    <div>
      <div className="flex justify-end">
      <Link
          href="/users/post"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Créer un tag
        </Link>
      </div>
      {currentUsers.length === 0 ? (
        <div className='flex justify-center mt-5'>
          <p className="text-gray-500 text-lg">No users found.</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              {renderTableHeaders()}
            </thead>
            <tbody className="divide-y divide-gray-100 border-t border-gray-100">
              {currentUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-100">
                  <td className="px-6 py-4 text-center align-middle">{user.id}</td>
                  <td className="px-6 py-4  text-center align-middle">{user.name}</td>
                  <td className="px-6 py-4 text-center align-middle">{user.email}</td>
                  <td className="px-6 py-4 text-center align-middle">{transformPhone(user.phone)}</td>
                  {/* Render other user data fields similarly */}
                  <td className="px-6 py-4 text-center align-middle">
                    <span>
                      {user.isAdmin ? (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Admin
                        </span>
                      ) : (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                          User
                        </span>
                      )}
                    </span>
                  </td>
                  <td className="px-6 py-4 align-middle text-center">
                  <button onClick={() => handleEdit(user.id)} className="mr-2">
        <PencilAltIcon className="h-5 w-5 text-blue-500 hover:text-blue-700" />
    </button>
    <button onClick={() => handleDelete(user.id)}>
        <XCircleIcon className="h-5 w-5 text-red-500 hover:text-red-700" />
    </button>

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-center mt-4">
            {currentUsers.length > itemsPerPage && (
              <Paginator
                currentPage={currentPage}
                totalPages={totalPages}
                itemsPerPage={itemsPerPage}
                onPageChange={handlePageChange}
                onItemsPerPageChange={handleItemsPerPageChange}
                items={currentUsers}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
  
  
};

export default UsersPage;

export const getServerSideProps = async () => {
  const res = await fetch("http://localhost:3001/api/users");
  const users = await res.json();

  return {
    props: {
      users,
    },
  };
};
