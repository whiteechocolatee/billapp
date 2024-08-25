import { onGetAllBills } from '@/src/actions/bills';
import { useQuery } from '@tanstack/react-query';

export const useGetBills = () => {
  const query = useQuery({
    queryKey: ['bills'],
    queryFn: async () => {
      const response = await onGetAllBills();

      return response;
    },
  });

  return query;
};
