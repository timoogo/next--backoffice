import React, { Component, ReactNode, useState } from 'react';
import { useQuery } from 'react-query';
import { API_ROUTES } from '@/constants/api.routes.constants';
import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary';
import Paginator from '@/components/Paginators/Paginator';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { DotsCircleHorizontalIcon, PencilAltIcon, XCircleIcon } from '@heroicons/react/solid';
import DropdownMenu from '@/components/Dropdowns/DropdownMenu';

export const getServerSideProps = async () => {
  const res = await fetch('http://localhost:3001/api/tags');
  const tags = await res.json();
  return {
    props: {
      tags
    }
  };
}

interface Tag {
  id: number;
  name: string;
  tagCategory: string;
  tagType: string;
}

interface TagsPageProps {
  tags: Tag[];
}

const TagsPage = ({ tags }: TagsPageProps) => {
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

  const totalPages = Math.ceil(tags.length / itemsPerPage);

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

  const indexOfLasttag = currentPage * itemsPerPage;
  const indexOfFirsttag = indexOfLasttag - itemsPerPage;
  const currenttags = tags.slice(indexOfFirsttag, indexOfLasttag);

  return (
    <>
      {tags.length === 0 ? (
        <div className='flex justify-center mt-5'>
          <p className="text-gray-500 text-lg" >No tags found.</p>
           </div>
      ) : (
        <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr className="border-b border-gray-200 text-center">
                {tags.length > 0 && tags[0] && Object.keys(tags[0]).map((key) => {
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
              {currenttags.map((tag) => (
                <tr key={tag.id} className="hover:bg-gray-100">
                  <td className="px-6 py-4 text-center align-middle">{tag.id}</td>
                  <td className="px-6 py-4  text-center align-middle">{tag.name}</td>
                  <td className="px-6 py-4 text-center align-middle"> {tag.tagCategory} </td>
                  <td className="px-6 py-4 text-center align-middle">
                    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold ${tag.tagCategory ? 'bg-green-200' : 'bg-red-200'}`}>
                      {tag.tagType ? 'offline' : 'online'}
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
            {tags.length > itemsPerPage && (
              <Paginator
                currentPage={currentPage}
                totalPages={totalPages}
                itemsPerPage={itemsPerPage}
                onPageChange={handlePageChange}
                onItemsPerPageChange={handleItemsPerPageChange}
                items={tags}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default TagsPage;