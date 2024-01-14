// import libraries
import { useQuery } from 'react-query';
// import interfaces
import { EntityData } from '@/interfaces/EntityData.interface';

const fetchEntityData = async (entity: string): Promise<EntityData> => {
    try {
        const apiUrlEntity = `http://localhost:3001/api/${entity}`;
        const responseEntity = await fetch(apiUrlEntity);

        const entityData: any = await responseEntity.json();
        const entityName = entity;
        const entityDataElements = entityData.length;

        return { entityName, entityData, entityDataElements };
    }
    catch (error) {
        console.error('An Error has occurred: ', error);
        throw error;
    }
};

const useFetchEntityData = (entity: string) => {
    return useQuery<EntityData, Error>(['entities', entity], () => fetchEntityData(entity));
};

export default useFetchEntityData;