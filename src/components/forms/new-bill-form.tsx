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
import { ScrollArea } from '@/src/components/ui/scroll-area';
import { useToast } from '@/src/components/ui/use-toast';
import { useCreateBill } from '@/src/features/use-create-bill';
import { newBillSchema } from '@/src/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Delete, Plus } from 'lucide-react';
import { useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';

type FormValues = z.infer<typeof newBillSchema>;

type FormProps = {
  onClose: () => void;
};

export default function NewBillForm({ onClose }: FormProps) {
  const { toast } = useToast();
  const form = useForm<FormValues>({
    resolver: zodResolver(newBillSchema),
    defaultValues: {
      name: '',
      dishes: [{ name: '', quantity: 1, pricePerUnit: '', totalPrice: 0 }],
    },
  });

  const mutation = useCreateBill();
  const { control, handleSubmit, setValue, watch, reset } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'dishes',
  });
  const dishes = watch('dishes');
  const isDisabled = dishes.length > 0;

  useEffect(() => {
    dishes.forEach((dish, index) => {
      const quantity = parseFloat(dish.quantity.toString()) || 0;
      const pricePerUnit = parseFloat(dish.pricePerUnit.toString()) || 0;
      const totalPrice = quantity * pricePerUnit;
      setValue(`dishes.${index}.totalPrice`, totalPrice);
    });
  }, [dishes, setValue]);

  const onSubmit = (values: FormValues) => {
    mutation.mutateAsync(
      { values },
      {
        onSuccess: data => {
          toast({
            title: 'Рахунок успішно створено!',
            description: data.message,
          });
          reset();
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
        id="billForm"
        className="flex flex-col gap-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-4">
          <FormField
            control={control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Назва рахунку</FormLabel>
                <Input id={field.name} placeholder="Назва рахунку" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <ScrollArea className="h-56 md:h-96 w-full">
          {fields.map((dishField, index) => (
            <div
              key={dishField.id}
              className="flex border rounded-lg p-3 pt-12 flex-col items-center gap-6 relative mt-4"
            >
              <div className="w-full">
                <FormField
                  control={control}
                  name={`dishes.${index}.name`}
                  render={({ field }) => (
                    <FormItem>
                      <Input id={field.name} placeholder="Борщ" {...field} />
                      <FormMessage className="text-[10px]" />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex w-full items-center gap-5">
                <FormField
                  control={control}
                  name={`dishes.${index}.quantity`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs">Кількість</FormLabel>
                      <Input
                        type="number"
                        id={field.name}
                        placeholder="Введіть кількість"
                        {...field}
                        onChange={({ target: { value } }) => {
                          const numericValue = parseFloat(value) || 0;
                          field.onChange(numericValue);
                          const pricePerUnit =
                            parseFloat(
                              watch(`dishes.${index}.pricePerUnit`).toString(),
                            ) || 0;
                          setValue(
                            `dishes.${index}.totalPrice`,
                            numericValue * pricePerUnit,
                          );
                        }}
                      />
                      <FormMessage className="text-[10px]" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`dishes.${index}.pricePerUnit`}
                  render={({ field }) => (
                    <FormItem className="max-w-30">
                      <FormLabel className="text-xs">Ціна 1 шт.</FormLabel>
                      <Input
                        type="text"
                        id={field.name}
                        placeholder="Введіть ціну за одиницю"
                        value={field.value || ''}
                        onChange={({ target: { value } }) => {
                          field.onChange(value);
                          const numericValue = parseFloat(value) || 0;
                          const quantity =
                            parseFloat(
                              watch(`dishes.${index}.quantity`).toString(),
                            ) || 0;
                          setValue(
                            `dishes.${index}.totalPrice`,
                            numericValue * quantity,
                          );
                        }}
                      />
                      <FormMessage className="text-[10px]" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`dishes.${index}.totalPrice`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs">Загальна</FormLabel>
                      <Input
                        disabled
                        type="number"
                        id={field.name}
                        value={field.value || 0}
                        readOnly
                      />
                      <FormMessage className="text-[10px]" />
                    </FormItem>
                  )}
                />
              </div>
              <Button
                className="absolute top-0 right-0"
                variant="ghost"
                type="button"
                onClick={() => remove(index)}
              >
                <Delete className="size-4" />
              </Button>
            </div>
          ))}
        </ScrollArea>
        <Button
          type="button"
          variant="outline"
          onClick={() =>
            append({
              name: '',
              quantity: 1,
              pricePerUnit: '',
              totalPrice: 0,
            })
          }
        >
          <Plus className="size-4 mr-2" />
          Додати страву
        </Button>
      </form>
      <div className="flex gap-4 justify-end mt-4">
        <Button variant="outline" onClick={onClose}>
          Скасувати
        </Button>
        <Button
          disabled={!isDisabled || mutation.isPending}
          type="submit"
          form="billForm"
        >
          Зберегти
        </Button>
      </div>
    </Form>
  );
}
