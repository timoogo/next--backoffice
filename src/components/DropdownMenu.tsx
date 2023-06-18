import React, { useState } from 'react';

interface DropdownMenuProps {
    isOpen: boolean;
    toggleMenu: () => void;
    items: { label: string; link: string }[];
}
const DropdownMenu: React.FC<DropdownMenuProps> = ({ isOpen, toggleMenu, items }) => {
    return (
        <div
            className={`absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${isOpen ? 'block' : 'hidden'}`}
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="user-menu-button"
        >
            {items.map((item, index) => (
                <a href={item.link} className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex={isOpen ? 0 : -1} key={index}>
                    {item.label}
                </a>
            ))}
        </div>
    );
};

export default DropdownMenu;
