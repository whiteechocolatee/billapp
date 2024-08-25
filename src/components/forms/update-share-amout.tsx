'use client';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/src/components/ui/form';
import { Slider } from '@/src/components/ui/slider';
import { useToast } from '@/src/components/ui/use-toast';
import { updateShareAmountSchema } from '@/src/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { useState, useEffect } from 'react';
import { useUpdateSharedAmount } from '@/src/features/use-update-shared-amount';

type Props = {
  shareAmount: number;
  totalAmount: number;
  billId: string;
  userId: string;
  usersLength: number;
  onUpdateShareAmount: (value: number) => void;
};

type UpdateShareAmountFormValues = z.infer<typeof updateShareAmountSchema>;

export default function UpdateShareAmountForm({
  shareAmount,
  totalAmount,
  billId,
  usersLength,
  userId,
  onUpdateShareAmount,
}: Props) {
  const { toast } = useToast();
  const [tempValue, setTempValue] = useState<number>(shareAmount);
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(
    null,
  );

  const form = useForm<UpdateShareAmountFormValues>({
    resolver: zodResolver(updateShareAmountSchema),
    defaultValues: {
      shareAmount,
    },
  });

  const mutation = useUpdateSharedAmount();

  const isDisabled = usersLength === 1 || mutation.isPending;

  const onSubmit = (values: UpdateShareAmountFormValues) => {
    mutation.mutateAsync(
      { values, billId, userId },
      {
        onError: data => {
          toast({
            variant: 'destructive',
            title: 'Виникла помилка!',
            description: data.message,
          });
        },
      },
    );
  };

  useEffect(() => {
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    setDebounceTimer(
      setTimeout(() => {
        form.handleSubmit(onSubmit)();
      }, 500),
    );

    return () => {
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
    };
  }, [tempValue]);

  return (
    <Form {...form}>
      <form
        id="updateShareAmountForm"
        onSubmit={e => e.preventDefault()}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="shareAmount"
          render={({ field: controllerField }) => (
            <FormItem>
              <FormControl>
                <Controller
                  name="shareAmount"
                  control={form.control}
                  render={() => (
                    <Slider
                      min={0}
                      disabled={isDisabled}
                      max={totalAmount}
                      step={1}
                      value={[tempValue]}
                      onValueChange={values => {
                        setTempValue(values[0]);
                        controllerField.onChange(values[0]);
                        onUpdateShareAmount(values[0]);
                      }}
                    />
                  )}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
