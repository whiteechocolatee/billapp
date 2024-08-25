import { onGetBillById } from '@/src/actions/bills';
import { useQuery } from '@tanstack/react-query';

export const useGetBillById = (billId: string) => {
  const query = useQuery({
    enabled: !!billId,
    queryKey: ['bill', billId],
    queryFn: async () => {
      const response = await onGetBillById(billId);

      return response;
    },
  });

  return query;
};
