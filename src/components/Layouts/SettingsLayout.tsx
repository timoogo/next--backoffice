import React from 'react';
import { SettingsLayoutProps } from '@/interfaces/SettingsLayout.interface';

const SettingsLayout = ({ children, titles }: SettingsLayoutProps) => {
    return (
        <div className="flex h-screen bg-gray-200">
            <div className="w-64 bg-white p-4 shadow-lg">
                {titles}
            </div>
            <div className="flex-grow bg-white p-4 overflow-auto">
                {children}
            </div>
        </div>
    );
};

export default SettingsLayout;
