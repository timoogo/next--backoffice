import { DotsVerticalIcon, DotsHorizontalIcon } from '@heroicons/react/solid';
import { Color } from '@/types/Color';
import { DropdownOption } from '@/types/Options';
import { useState } from 'react';
import Link from 'next/link';



interface DropdownProps {
    description?: string;
    options:  DropdownOption[];
    orientation?: 'vertical' | 'horizontal';
    title?: string;
    withIcons?: boolean;
    action: typeof Link | (() => void) | null;
}

const DropdownMenu: React.FC<DropdownProps> = ({
                                                   orientation = 'vertical',
                                                   title,
                                                   description,
                                                   withIcons = false,
                                                   options,
                                                   action
                                               }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const Icon = orientation === 'vertical' ? DotsVerticalIcon : DotsHorizontalIcon;

    const handleOptionClick = (action: typeof Link | (() => void) | null) => {
        toggleDropdown();
        if (action) {
            if (action === Link) {
                // @ts-ignore
                action.push(action.href, action.as || '', { shallow: true });
            } else {
                // @ts-ignore
                action();
            }
        }
    };

    // @ts-ignore
    return (
        <div className="relative inline-block text-left">
            <div>
                <button
                    onClick={toggleDropdown}
                    className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    <Icon className="h-5 w-5" />
                </button>
            </div>

            {isOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100">
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
                                onClick={() => handleOptionClick(option.action)} // Appel de handleOptionClick avec l'action spécifique
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
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
