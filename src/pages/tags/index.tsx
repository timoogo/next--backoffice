import React, { useState } from 'react';
import { useRouter } from 'next/router';
import DropdownMenu from '@/components/Dropdowns/DropdownMenu';
import Link from 'next/link';
import Paginator from '@/components/Paginators/Paginator';
import { DropdownOption } from '@/types/Options';
import { PencilAltIcon, XCircleIcon } from '@heroicons/react/solid';
import { API_ROUTES } from '@/constants/api.routes.constants';

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
  const router = useRouter();

  const handleEdit = (tagId: number) => {
    router.push(`/tags/put/${tagId}`);
  };

  const [currentTags, setCurrentTags] = useState(tags);

  const handleDelete = async (tagId: number) => {
    try {
      const response = await fetch(`http://localhost:3001/api/tags/${tagId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log(`Tag with ID ${tagId} deleted successfully.`);
        setCurrentTags(currentTags.filter(tag => tag.id !== tagId));
      } else {
        console.error(`Error deleting tag with ID ${tagId}.`);
      }
    } catch (error: any) {
      console.error(`Error deleting tag with ID ${tagId}: ${error.message}`);
    }
  };

  const options = (tagId: number): DropdownOption[] => [
    // @ts-ignore
    {
      text: 'Modifier',
      Icon: PencilAltIcon,
      color: '#3490dc',
      action: () => handleEdit(tagId),
    },
    {
      text: 'Supprimer',
      Icon: XCircleIcon,
      color: '#e3342f',
      action: () => handleDelete(tagId),
    },
  ];

  const getContrastingTextColor = (tagColor: string): string => {
    const r = parseInt(tagColor.substr(1, 2), 16);
    const g = parseInt(tagColor.substr(3, 2), 16);
    const b = parseInt(tagColor.substr(5, 2), 16);
    const luminosity = 0.299 * r + 0.587 * g + 0.114 * b;
    return luminosity > 128 ? 'text-black' : 'text-white';
  };

  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(currentTags.length / itemsPerPage);

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

  const indexOfLastTag = currentPage * itemsPerPage;
  const indexOfFirstTag = indexOfLastTag - itemsPerPage;
  const displayedTags = currentTags.slice(indexOfFirstTag, indexOfLastTag);

  const renderTableHeaders = () => {
    if (displayedTags.length > 0) {
      const tagKeys = ['id', 'tagName', 'tagCategory', 'tagType', 'tagColor'];
      return (
        <tr className="border-b border-gray-200 text-center">
          {tagKeys.map((key) => (
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
    }
    return null;
  };
  

  return (
    <div>
      <div className="flex justify-end">
        <Link
          href="/tags/post"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Créer un tag
        </Link>
      </div>
      {currentTags.length === 0 ? (
        <div className='flex justify-center mt-5'>
          <p className="text-gray-500 text-lg">No tags found.</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              {renderTableHeaders()}
            </thead>
            <tbody className="divide-y divide-gray-100 border-t border-gray-100">
              {displayedTags.map((tag) => (
                <tr key={tag.id} className="hover:bg-gray-100">
                  <td className="px-6 py-4 text-center align-middle">{tag.id}</td>
                  <td className="px-6 py-4  text-center align-middle">{tag.tagName}</td>
                  <td className="px-6 py-4 text-center align-middle"> {tag.tagType} </td>
                  <td className="px-6 py-4 text-center align-middle"> {tag.tagCategory} </td>
                  <td className="px-6 py-4 text-center align-middle">
                    {tag.tagColor && (
                      <span
                        className={`inline-flex px-2 text-xs font-semibold leading-5 rounded-full ${getContrastingTextColor(
                          tag.tagColor
                        )}`}
                        style={{ backgroundColor: tag.tagColor }}
                      >
                        {tag.tagColor}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 align-middle text-center">
                    <DropdownMenu options={options(tag.id)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-center mt-4">
            {currentTags.length > itemsPerPage && (
              <Paginator
                currentPage={currentPage}
                totalPages={totalPages}
                itemsPerPage={itemsPerPage}
                onPageChange={handlePageChange}
                onItemsPerPageChange={handleItemsPerPageChange}
                items={currentTags}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default TagsPage;

export const getServerSideProps = async () => {
  // Fetch the tags data from your API or source
  const res = await fetch(`${API_ROUTES.TAGS}`);
  const tags = await res.json();

  return {
    props: {
      tags,
    },
  };
};
