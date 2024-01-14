// Import libraries
import { useQuery, useQueryClient } from 'react-query';

const useLeftNavVisibility = () => {
  const queryClient = useQueryClient();

  const { data: isLeftNavVisible = false } = useQuery('isLeftNavVisible', () =>
    queryClient.getQueryData('isLeftNavVisible') || false
  );
  
  const openLeftNav = () => {
    queryClient.setQueryData('isLeftNavVisible', !isLeftNavVisible );
  };

  return {isLeftNavVisible, openLeftNav};
};

export default useLeftNavVisibility;