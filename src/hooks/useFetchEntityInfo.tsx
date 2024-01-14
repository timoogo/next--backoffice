// Import libraries
import { useQuery } from 'react-query';
// Import interfaces
import { Tag } from '@/interfaces/Tag.interface';

const fetchOneEntityInfo = async (id: number) => {
  try {
    const apiUrlEntity = `http://localhost:3001/api/tags/${id}`;
    const responseEntity = await fetch(apiUrlEntity);

    if (!responseEntity.ok) {
        throw new Error('Failed to fetch entity information');
    }

    const entities: Tag[] = await responseEntity.json();
    return entities;
  } catch (error: any) {
    throw new Error(`Error fetching entity information: ${error.message}`);
  }
};

const useFetchOneEntityInfo = (id: number) => {
  return useQuery<Tag[], Error>(['entity', id], () => fetchOneEntityInfo(id));
};

export default useFetchOneEntityInfo;