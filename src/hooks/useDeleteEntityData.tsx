// useDeleteEntityData.tsx

import { useMutation, MutationFunction, useQueryClient } from 'react-query';
import useActionDisplayWindow from '@/hooks/useActionDisplayWindow';

interface DeleteEntityDataArgs {
  entityName: string;
  identifier: {};
}

const deleteEntityData: MutationFunction<{ success: boolean }, DeleteEntityDataArgs> = async (
  args: DeleteEntityDataArgs
) => {
  try {
    const { entityName, identifier } = args;
    const apiUrlEntity = `http://localhost:3001/api/${entityName}/${identifier}`;

    const responseEntity = await fetch(apiUrlEntity, {
      method: 'DELETE',
    });

    if (!responseEntity.ok) {
      throw new Error('Failed to delete data');
    }

    return { success: true };
  } catch (error) {
    console.error('An Error has occurred: ', error);
    throw error;
  }
};

const useDeleteEntityData = () => {
  const queryClient = useQueryClient();
  const { isActionWindowDisplayed, openActionWindow, entityName, identifier } = useActionDisplayWindow();

  return useMutation(deleteEntityData, {
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(['entities', variables.entityName]);
      openActionWindow(null, undefined, undefined);
    },
  });
};

export default useDeleteEntityData;