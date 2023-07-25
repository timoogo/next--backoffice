import React, {useCallback, useEffect, useRef, useState} from 'react';
import { useRouter } from 'next/router';
import DropdownMenu from '../Dropdowns/DropdownMenu';
import {CogIcon, UserCircleIcon} from "@heroicons/react/solid";
import { XIcon } from "@heroicons/react/solid";
import {DropdownOption} from "@/types/Options";


const Header = () => {
    const router = useRouter();
    const handleSettingsClick = useCallback(() => {
        router.push('/account/settings');
    }, [router]);

    // @ts-ignore
    const optionList: DropdownOption[] = [
            // @ts-ignore
        {
            text: 'Profile',
            // @ts-ignore
            Icon: UserCircleIcon,
            color: "#3B82F6",
            action: () => console.log('Profile'),
        },
            // @ts-ignore
        {
            text: 'Settings',
            Icon: CogIcon,
            color: "#10B981",
            action: handleSettingsClick,
        },
            // @ts-ignore
        {
            text: 'Sign out',
            Icon: XIcon,
            color: "#EF4444",
            action: () => console.log('Sign out'),
        },
    ];


    // @ts-ignore
    return (
        <header>
        <nav className="bg-gray-800 fixed w-full">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        <button
                            type="button"
                            className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                            aria-controls="mobile-menu"
                            aria-expanded="false"
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg
                                className="block h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                            <svg
                                className="hidden h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex flex-shrink-0 items-center">
                            <img
                                className="block h-8 w-auto lg:hidden"
                                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                                alt="Your Company"
                            />
                            <img
                                className="hidden h-8 w-auto lg:block"
                                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                                alt="Your Company"
                            />
                        </div>
                        <div className="hidden sm:ml-6 sm:block">
                            <div className="flex space-x-4">
                                {/* Liens du menu */}
                                <a
                                    href="/"
                                    className={`${
                                        router.pathname === '/' ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                    } px-3 py-2 rounded-md text-sm font-medium`}
                                    id="dashboard-link" // ID pour le lien du tableau de bord
                                >
                                    Dashboard
                                </a>
                                <a
                                    href="/events"
                                    className={`${
                                        router.pathname === '/events' ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                    } px-3 py-2 rounded-md text-sm font-medium`}
                                    id="events-link" // ID pour le lien des événements
                                >
                                    Events
                                </a>
                                <a
                                    href="/organizations"
                                    className={`${
                                        router.pathname === '/organizations'
                                            ? 'bg-gray-900 text-white'
                                            : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                    } px-3 py-2 rounded-md text-sm font-medium`}
                                    id="organizations-link" // ID pour le lien des organisations
                                >
                                    Organizations
                                </a>
                                <a
                                    href="/users"
                                    className={`${
                                        router.pathname === '/users' ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                    } px-3 py-2 rounded-md text-sm font-medium`}
                                    id="users-link" // ID pour le lien des utilisateurs
                                >
                                    Users
                                </a>
                                <a
                                    href="/tags"
                                    className={`${
                                        router.pathname === '/tags' ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                    } px-3 py-2 rounded-md text-sm font-medium`}
                                    id="tags-link" // ID pour le lien des utilisateurs
                                >
                                    Tags
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-end">
                        <DropdownMenu
                            orientation={"horizontal"}
                            withIcons={true}
                            options={optionList}
                        />

                    </div>
                </div>
            </div>
        </nav>
        </header>
    );
};

export default Header;
