// Import libraries
import React from 'react';
import Link from 'next/link';
import { FaVial } from 'react-icons/fa';

const CrudCard = () => {
    return (
        <>
            <div className='flex items-center flex-col w-72 h-fit py-4 m-2 border-2 border-orange-300 rounded-xl shadow-lg duration-300 cursor-pointer shadow-orange-100  hover:scale-105 bg-white hover:shadow-2xl'>
                <div className='flex items-center gap-x-2 w-full px-4'>
                    <div className="p-4 rounded-xl bg-orange-100">
                        <FaVial />
                    </div>
                    <div className='flex items-baseline gap-x-2'>
                        <h2>CRUD Operations: </h2>
                    </div>
                </div>
                <div className='flex flex-col w-full px-4 my-4 gap-y-2'>
                    <div className='flex justify-between w-full gap-x-2'>
                        <Link href="/generic-entity/post" className='flex justify-center items-center w-full py-2 px-2 rounded duration-300 bg-orange-400 text-white hover:bg-orange-500'>Create</Link>
                        <button className='w-full py-2 px-2 rounded duration-300 bg-orange-400 text-white hover:bg-orange-500'>Read</button>
                    </div>
                    <div className='flex justify-between w-full gap-x-2'>
                        <button className='w-full py-2 px-2 rounded duration-300 bg-orange-400 text-white hover:bg-orange-500'>Update</button>
                        <button className='w-full py-2 px-2 rounded duration-300 bg-orange-400 text-white hover:bg-orange-500'>Delete</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CrudCard;
