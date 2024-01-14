import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import { EntityFormData } from '@/types/EntityFormData';

const postOneEntityData = async (formData: any, finalData: any, entityName: Partial<EntityFormData>) => {
  try {
    const response = await fetch(`http://localhost:3001/api/tags`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(finalData),
    });

    if (!response.ok) { throw new Error(`Error when creating entity: ${entityName}`); }
    return "Post successful";
  }
  catch (error) {
    throw error;
  }
};

const usePostOneEntityData = () => {
  const router = useRouter();

  return useMutation((data: { formData: any; finalData: any; entityName: Partial<EntityFormData> }) => postOneEntityData(data.formData, data.finalData, data.entityName), {
    onSuccess: () => {
      console.log("Post successful");
      router.push('/entity-info?entityName=tags');
    },
    onError: (error: any) => {
      console.error(`Error when creating entity: ${error.message}`);
    },
  });
};

export default usePostOneEntityData;