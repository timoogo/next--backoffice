// Import libraries
import React from 'react';
import { useRouter } from 'next/router';
// Import hooks
import useFetchEntityData from '@/hooks/useFetchEntityData';
import useActionDisplayWindow from '@/hooks/useActionDisplayWindow';

const EntityInfo = () => {
    const router = useRouter();
    const entityName = router.query.entityName ? router.query.entityName as string : undefined;
    const { data: entityInfo } = useFetchEntityData(entityName || '');
    console.log(entityInfo?.entityData);

    const { openActionWindow } = useActionDisplayWindow();

    return (
        <div>
            <div className='flex gap-x-2'>
                <div className='flex items-baseline gap-x-2 w-fit mb-4 px-6 py-2 rounded-md border-2 shadow-lg bg-white border-blue-300 shadow-blue-100'>
                    <h2 className='text-2xl font-bold'>{entityName}</h2>
                </div>
                <div className='flex items-baseline gap-x-2 w-fit mb-4 px-6 py-2 rounded-md border-2 bg-white border-blue-300 shadow-blue-100'>
                    <h2 className='text-xl'>{entityName} elements:</h2>
                    <p className='text-2xl text-blue-700'>{entityInfo?.entityDataElements}</p>
                </div>
                <a href="/generic-entity/post" className='flex items-center gap-x-2 w-fit mb-4 px-6 py-2 rounded-md border-2 shadow-lg bg-white border-orange-300 shadow-orange-100 cursor-pointer'>
                    <h2 className='text-xl'>Add {entityName}</h2>
                </a>
            </div>
            <div className='flex justify-center items-center'>
                <table className='table-auto w-full border-2 border-gray-800 bg-gray-200'>
                    <thead>
                        <tr>
                            {entityInfo && entityInfo.entityData && entityInfo.entityData.length > 0 &&  Object.keys(entityInfo.entityData[0]).map((keyName, index) => (
                                <th className='h-10 bg-gray-800 text-white' key={index}>
                                    {keyName}
                                </th>
                            ))}
                            <th className='h-10 bg-gray-800 text-white'>
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {entityInfo && Array.isArray(entityInfo.entityData) && entityInfo.entityData.map((element: any, rowIndex: number) => (
                            <tr key={rowIndex}>
                            {Object.values(element).map((value: any, colIndex: number) => (
                                <td className={`h-10 border-2 border-gray-800 text-center ${colIndex === 0 ? 'bg-orange-400' : 'bg-white'}`} key={colIndex}>
                                {value}
                                </td>
                            ))}
                            <td className='h-10 border-2 border-gray-800 text-center bg-white'>
                                <button onClick={(event) => openActionWindow(element.id, entityName, event)} className="h-full w-full duration-300 bg-yellow-400 hover:bg-yellow-500" >Actions</button>
                            </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EntityInfo;