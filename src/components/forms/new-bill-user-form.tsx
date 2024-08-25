'use client';

import { Button } from '@/src/components/ui/button';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/src/components/ui/form';
import { Input } from '@/src/components/ui/input';
import { useToast } from '@/src/components/ui/use-toast';
import { useCreateNewUserBill } from '@/src/features/use-create-new-user-bill';
import { newBillUserSchema } from '@/src/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type NewBillUserFormValues = z.infer<typeof newBillUserSchema>;

type NewBillUserFormProps = {
  onClose: () => void;
  billId: string;
};

export default function NewBillUserForm({
  onClose,
  billId,
}: NewBillUserFormProps) {
  const { toast } = useToast();
  const form = useForm<NewBillUserFormValues>({
    resolver: zodResolver(newBillUserSchema),
    defaultValues: {
      name: '',
    },
  });

  const mutation = useCreateNewUserBill();

  const onSubmit = (values: NewBillUserFormValues) => {
    mutation.mutateAsync(
      { values, billId },
      {
        onSuccess: data => {
          toast({
            title: 'Користувача додано!',
            description: data.message,
          });
          onClose();
        },
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

  return (
    <Form {...form}>
      <form
        id="newBillUserForm"
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ім’я користувача</FormLabel>
              <Input id={field.name} placeholder="Андрій" {...field} />
              <FormMessage className="text-[10px]" />
            </FormItem>
          )}
        />
        <div className="flex gap-4 justify-end mt-4">
          <Button variant="outline" onClick={onClose}>
            Скасувати
          </Button>
          <Button
            disabled={!form.formState.isValid || mutation.isPending}
            type="submit"
            form="newBillUserForm"
          >
            Додати
          </Button>
        </div>
      </form>
    </Form>
  );
}
