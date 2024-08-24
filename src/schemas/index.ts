import { z } from 'zod';

export const newBillSchema = z.object({
  dishes: z
    .array(
      z.object({
        name: z.string().min(1, { message: 'Назва страви обов’язкова' }),
        quantity: z
          .number()
          .min(1, { message: 'Кількість повинна бути більше нуля' }),
        pricePerUnit: z
          .number()
          .min(0, { message: 'Ціна за одиницю не може бути від’ємною' }),
        totalPrice: z.number().optional(),
      }),
    )
    .nonempty({ message: 'Додайте хоча б одну страву' }),
});
