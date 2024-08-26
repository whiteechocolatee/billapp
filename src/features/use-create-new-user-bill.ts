import { onCreateNewUserBill } from '@/src/actions/bills';
import { newBillUserSchema } from '@/src/schemas';
import { Bill } from '@prisma/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

type ResponseType = {
  status: number;
  message: string;
  data?: Bill;
};

type RequestType = {
  values: z.infer<typeof newBillUserSchema>;
  billId: string;
};

export const useCreateNewUserBill = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ values, billId }) => {
      const response = await onCreateNewUserBill(values, billId);

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
      queryClient.invalidateQueries({
        queryKey: ['bills'],
      });
    },
  });

  return mutation;
};
