import { DotsVerticalIcon, DotsHorizontalIcon } from '@heroicons/react/solid';
import { DropdownOption } from '@/types/Options';
import { useState } from 'react';
import Link from 'next/link';


interface DropdownProps {
  description?: string;
  options: DropdownOption[];
  orientation?: 'vertical' | 'horizontal';
  title?: string;
  withIcons?: boolean;
}

let openDropdownIds: string[] = [];

const DropdownMenu: React.FC<DropdownProps> = ({
  orientation = 'vertical',
  title,
  description,
  withIcons = false,
  options,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownId = Math.random().toString(36).substring(7);

  const toggleDropdown = () => {
    if (!isOpen) {
      openDropdownIds.forEach((id) => {
        const prevDropdown = document.getElementById(id);
        if (prevDropdown) {
          prevDropdown.classList.remove('open');
        }
      });
      openDropdownIds = [dropdownId];
    } else {
      openDropdownIds = openDropdownIds.filter((id) => id !== dropdownId);
    }
    setIsOpen(!isOpen);
  };

  const Icon = orientation === 'vertical' ? DotsVerticalIcon : DotsHorizontalIcon;

  const handleOptionClick = (option: DropdownOption) => {
    toggleDropdown();
    if (typeof option.action === 'function') {
      option.action();
    } else if (option.action) {
      if (option.action === Link) {
        window.location.href = option.action || '';
      } else {
        // handle other types of actions
      }
    }
    if (option.method && option.endpoint && option.targetId) {
      fetch(`http://localhost:3001/api/${option.endpoint}/${option.targetId}`, {
        method: option.method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          id: option.targetId,
         }),
      })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <div
      id={dropdownId}
      className={`relative inline-block text-left ${isOpen ? 'open' : ''}`}
      style={{ 
        zIndex: isOpen ? 999 : 'auto',
        //position: isOpen ? 'fixed' : 'static',
        marginTop: isOpen ? 'mt-' : '0',
      }}
    >
      <div>
        <button
          onClick={toggleDropdown}
          className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Icon className="h-5 w-5" />
        </button>
      </div>
  
      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 w-full min-w-[10rem]">
          {(title || description) && (
            <div className="px-4 py-3">
              {title && <h3 className="text-sm font-medium text-gray-900">{title}</h3>}
              {description && <p className="mt-1 text-sm text-gray-500">{description}</p>}
            </div>
          )}
          <div className="py-1">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionClick(option)}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center w-full truncate"
              >
                {withIcons && (
                  <option.Icon
                    className="h-5 w-5 mr-2"
                    // @ts-ignore
                    style={{ color: option.color || 'inherit' }}
                  />
                )}
                {option.text}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
  
  
  
};

export default DropdownMenu;