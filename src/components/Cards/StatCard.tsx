// Import libraries
import React from 'react';
import Link from 'next/link';
import { FaTags } from 'react-icons/fa';
// Import interfaces
import { StatCardProps } from '@/interfaces/StatCard.interface';

const StatCard: React.FC<StatCardProps> = ({ value, redirection }) => {
    return (
        <>
            { redirection && (
                <Link href={redirection}>
                    <div className='flex items-center gap-x-2 w-72 h-24 p-4 m-2 border-2 border-blue-300 rounded-xl shadow-lg duration-300 cursor-pointer shadow-blue-100 hover:scale-105 bg-white hover:shadow-2xl'>
                        <div className="p-4 rounded-xl bg-blue-100">
                            <FaTags />
                        </div>
                        <div className='flex items-baseline gap-x-2'>
                            <h2>Total Entities: </h2>
                            <p className='text-3xl text-blue-700'>{value}</p>
                        </div>
                    </div>
                </Link>
            )}
        </>
    );
};

export default StatCard;
