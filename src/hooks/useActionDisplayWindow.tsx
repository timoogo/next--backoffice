import { useQuery, useQueryClient } from 'react-query';
import React from 'react';

const useActionDisplayWindow = () => {
  const queryClient = useQueryClient();

  const { data: isActionWindowDisplayed = false } = useQuery('isActionWindowDisplayed', () =>
    queryClient.getQueryData('isActionWindowDisplayed') || false
  );

  const { data: entityName = undefined } = useQuery('entityName', () =>
    queryClient.getQueryData('entityName') || undefined
  );

  const { data: identifier = null } = useQuery('identifier', () =>
    queryClient.getQueryData('identifier') || null
  );

  const openActionWindow = (id: number | null, entityName: string | undefined, event: React.MouseEvent | undefined) => {
    if (event?.target !== event?.currentTarget) {
      return;
    }

    event?.stopPropagation();
    queryClient.setQueryData('isActionWindowDisplayed', !isActionWindowDisplayed);
    queryClient.setQueryData('entityName', entityName);
    queryClient.setQueryData('identifier', id);
  };
  
  return { isActionWindowDisplayed, openActionWindow, entityName, identifier };
};

export default useActionDisplayWindow;
