'use server';

import { z } from 'zod';
import { newBillSchema } from '@/src/schemas';
import { db } from '../lib/db';

export const onCreateBill = async (values: z.infer<typeof newBillSchema>) => {
  try {
    const validatedValues = newBillSchema.safeParse(values);

    if (!validatedValues.success) {
      return {
        status: 400,
        message: 'Неправильні дані при створенні нового рахунку!',
      };
    }

    const { dishes } = validatedValues.data;

    const billTotal = dishes.reduce(
      (sum, dish) => sum + dish.quantity * dish.pricePerUnit,
      0,
    );

    const newBill = await db.bill.create({
      data: {
        totalAmount: billTotal,
        items: {
          create: dishes.map(dish => ({
            name: dish.name,
            price: dish.pricePerUnit,
            quantity: dish.quantity,
          })),
        },
      },
    });

    return {
      status: 201,
      data: newBill,
      message: 'Рахунок успішно створено!',
    };
  } catch (error) {
    return {
      status: 500,
      message: 'Помилка при створенні нового рахунку!',
    };
  }
};
