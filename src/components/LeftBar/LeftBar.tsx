// import libraries
import Link from 'next/link';
import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
// import hooks
import useFetchEntityData from '@/hooks/useFetchEntityData';

const LeftBar = () => {
    const [displayedEntityId, setDisplayedEntityId] = useState(null);
    const entities = useFetchEntityData('tags').data;
    //console.log(useFetchEntityData('tags'));

    const EntityItem = ({ entity }) => {
        const isEntityInfoDisplayed = displayedEntityId === entity.id;

        const showEntityInfo = () => {
            setDisplayedEntityId(isEntityInfoDisplayed ? null : entity.id);
        };

        return (
            <div className="relative flex justify-between h-9 my-2 rounded cursor-pointer duration-300 bg-gray-300 text-gray-800 hover:bg-blue-300">
                <Link href={{ pathname: "/entity-info", query: { entityName: entity.entityName }}}>
                    <p className="flex items-center h-full p-2">{entity.entityName}</p>
                </Link>
                <div onClick={showEntityInfo} className="flex justify-center items-center bg-white h-full w-9 p-2 rounded-r border-l-2 border-gray-800 hover:bg-purple-300">
                    <FaChevronDown />
                </div>
                {isEntityInfoDisplayed && (
                    <div className="absolute z-10 left-full w-max ml-2 px-6 py-4 min-h-full rounded border-2 shadow border-lime-500 bg-white shadow-lime-300 cursor-auto">
                        {Object.keys(entity.entityData[0]).map((keyName, index) => (
                            <div key={index}>
                                <p>• {keyName}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="h-full w-80 border-y-2 rounded-r-3xl bg-gray-800 border-gray-200 p-6">
            {/*entities?.map((entity) => (
                <EntityItem key={entity.id} entity={entity} />
            ))*/}
            {entities && (
                <EntityItem entity={entities} />
            )}
        </div>
    );
};

export default LeftBar;