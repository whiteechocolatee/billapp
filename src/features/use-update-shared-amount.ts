import { onUpdateShareAmount } from '@/src/actions/bills';
import { updateShareAmountSchema } from '@/src/schemas';
import { Bill } from '@prisma/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

type ResponseType = {
  status: number;
  message: string;
  data?: Bill;
};

type RequestType = {
  values: z.infer<typeof updateShareAmountSchema>;
  billId: string;
  userId: string;
};

export const useUpdateSharedAmount = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ values, billId, userId }) => {
      const response = await onUpdateShareAmount(values, billId, userId);

      if (response.status !== 201) {
        throw new Error(response.message);
      }

      return response;
    },
    onSuccess: data => {
      const billId = data.data.id;

      queryClient.invalidateQueries({
        queryKey: ['bill', billId],
      });
    },
  });

  return mutation;
};
