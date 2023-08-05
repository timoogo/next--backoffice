import React, { Component, ReactNode, useState } from 'react';
import { useQuery } from 'react-query';
import { API_ROUTES } from '@/constants/api.routes.constants';
import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary';
import Paginator from '@/components/Paginators/Paginator';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { DotsCircleHorizontalIcon, PencilAltIcon, XCircleIcon } from '@heroicons/react/solid';
import DropdownMenu from '@/components/Dropdowns/DropdownMenu';
import Link from 'next/link';

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
  tagName: string;
  tagCategory: string;
  tagType: string;
  tagColor?: string;
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

  function getContrastingTextColor(tagColor: string): string {
    // Extrait les composantes R, G, B de la couleur
    const r = parseInt(tagColor.substr(1, 2), 16);
    const g = parseInt(tagColor.substr(3, 2), 16);
    const b = parseInt(tagColor.substr(5, 2), 16);
  
    // Calcule la luminosité
    const luminosity = (0.299 * r + 0.587 * g + 0.114 * b);
  
    // Renvoie la classe Tailwind pour noir ou blanc en fonction de la luminosité
    return luminosity > 128 ? 'text-black' : 'text-white';
  }


  const indexOfLasttag = currentPage * itemsPerPage;
  const indexOfFirsttag = indexOfLasttag - itemsPerPage;
  const currenttags = tags.slice(indexOfFirsttag, indexOfLasttag);

  return (
    <>
       <div className="flex justify-end">
        <Link
          href="/tags/post"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Créer un tag
        </Link>
      </div>
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
                  <td className="px-6 py-4  text-center align-middle">{tag.tagName}</td>
                  <td className="px-6 py-4 text-center align-middle"> {tag.tagType} </td>
                  <td className="px-6 py-4 text-center align-middle"> {tag.tagCategory} </td>
                  <td className="px-6 py-4 text-center align-middle">
                 {tag.tagColor && (
                   <span
                   className={`inline-flex px-2 text-xs font-semibold leading-5 rounded-full ${getContrastingTextColor(tag.tagColor)}`}
                   style={{ backgroundColor: tag.tagColor }}
                 >
                   {tag.tagColor}
                 </span>
                  )}
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