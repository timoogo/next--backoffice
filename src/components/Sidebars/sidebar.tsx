import React, { useState } from 'react';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className={`${isOpen ? 'w-64' : 'w-20'} transition-all duration-200 bg-white shadow-lg h-screen`}>
            {isOpen && (
                <nav>
                    <a href="#" className="block p-2 rounded hover:bg-gray-100">Home</a>
                    <a href="#" className="block p-2 rounded hover:bg-gray-100">About</a>
                    <a href="#" className="block p-2 rounded hover:bg-gray-100">Services</a>
                    <a href="#" className="block p-2 rounded hover:bg-gray-100">Contact</a>
                </nav>
            )}
            <button onClick={() => setIsOpen(!isOpen)} className="p-2">
                {isOpen ? 'Hide' : 'Show'}
            </button>
        </div>
    );
};

export default Sidebar;
