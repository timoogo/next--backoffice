import React, {useCallback} from 'react';
import { useRouter } from 'next/router';
import DropdownMenu from '../Dropdowns/DropdownMenu';
import {CogIcon, UserCircleIcon} from "@heroicons/react/solid";
import { XIcon } from "@heroicons/react/solid";
import {DropdownOption} from "@/types/Options";
import Link from 'next/link';
import Image from "next/image";
import useLeftNavVisibility from '@/hooks/useLeftNavVisibility';

const Header = () => {
    const router = useRouter();
    const { openLeftNav } = useLeftNavVisibility();

    const handleSettingsClick = useCallback(() => {
        router.push('/account/settings');
    }, [router]);

    // @ts-ignore
    const optionList: DropdownOption[] = [
            // @ts-ignore
        {
            text: 'Profile',
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
                    <div className="flex flex-1 items-center justify-center sm:justify-start">
                        <div className="flex flex-shrink-0 items-center">
                            <img src="/assets/images/logos/wizard.svg" alt="Your Company" height="40" width="40" />
                        </div>
                        {/* Button left navbar */}
                        <div className="cursor-pointer w-10 h-fit sm:ml-4" onClick={openLeftNav}>
                            <div className="w-full h-1 rounded-5 bg-white"></div>
                            <div className="w-full h-1 rounded-5 bg-white my-2"></div>
                            <div className="w-full h-1 rounded-5 bg-white"></div>
                        </div>
                        <div className="hidden sm:ml-4 sm:block">
                            <div className="flex space-x-4">
                                {/* Liens du menu */}
                                <Link
                                    href={{ pathname: '/', query: { type: 'dashboard' } }}
                                    className={`${
                                        router.pathname === '/' ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                    } px-3 py-2 rounded-md text-sm font-medium`}
                                    id="dashboard-link" // ID pour le lien du tableau de bord
                                >
                                    Dashboard
                                </Link>
                                <Link
                                    href="/generic-entity"
                                    className={`${
                                        router.pathname === '/generic-entity' ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                    } px-3 py-2 rounded-md text-sm font-medium`}
                                    id="generic-link" // ID pour le lien des utilisateurs
                                >
                                    Entity Name
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
        </header>
    );
};

export default Header;
