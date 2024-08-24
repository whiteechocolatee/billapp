import { onCreateBill } from '@/src/actions/bills';
import { newBillSchema } from '@/src/schemas';
import { Bill } from '@prisma/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

type ResponseType = {
  status: number;
  message: string;
  data?: Bill;
};

type RequestType = {
  values: z.infer<typeof newBillSchema>;
};

export const useCreateBill = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ values }) => {
      const response = await onCreateBill(values);

      if (response.status !== 201) {
        throw new Error(response.message);
      }

      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['bills'],
      });
    },
  });

  return mutation;
};
