'use server';

import {
  newBillSchema,
  newBillUserSchema,
  updateShareAmountSchema,
} from '@/src/schemas';
import { z } from 'zod';
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

    const { name, dishes } = validatedValues.data;

    const billTotal = dishes.reduce(
      (sum, dish) => sum + dish.quantity * dish.pricePerUnit,
      0,
    );

    const newBill = await db.bill.create({
      data: {
        name,
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

export const onGetAllBills = async () => {
  try {
    const bills = await db.bill.findMany({
      include: {
        items: true,
        users: true,
      },
    });

    if (!bills) {
      return {
        status: 404,
        message: 'Рахунків не знайдено!',
      };
    }

    return {
      status: 200,
      data: bills,
      message: 'Рахунки успішно отримано!',
    };
  } catch (error) {
    return {
      status: 500,
      message: 'Помилка при отриманні рахунків!',
    };
  }
};

export const onGetBillById = async (billId: string) => {
  try {
    const bill = await db.bill.findUnique({
      where: {
        id: billId,
      },
      include: {
        items: true,
        users: {
          select: {
            id: true,
            billId: true,
            name: true,
            shareAmount: true,
            createdAt: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });

    if (!bill) {
      return {
        status: 404,
        message: 'Рахунок не знайдено!',
      };
    }

    return {
      status: 200,
      data: bill,
      message: 'Рахунок успішно отримано!',
    };
  } catch (error) {
    return {
      status: 500,
      message: 'Помилка при отриманні рахунку!',
    };
  }
};

export const onCreateNewUserBill = async (
  values: z.infer<typeof newBillUserSchema>,
  billId: string,
) => {
  try {
    const validatedValues = newBillUserSchema.safeParse(values);

    if (!validatedValues.success) {
      return {
        status: 400,
        message: 'Неправильні дані при створенні нового користувача!',
      };
    }

    const { name } = validatedValues.data;

    const newBill = await db.bill.update({
      where: {
        id: billId,
      },
      data: {
        users: {
          create: {
            name,
            shareAmount: 0,
          },
        },
      },
    });

    return {
      status: 201,
      data: newBill,
      message: 'Рахунок успішно оновлено!',
    };
  } catch (error) {
    return {
      status: 500,
      message: 'Помилка при створенні нового рахунку!',
    };
  }
};

export const onUpdateShareAmount = async (
  values: z.infer<typeof updateShareAmountSchema>,
  billId: string,
  userId: string,
) => {
  try {
    const validatedValues = updateShareAmountSchema.safeParse(values);

    if (!validatedValues.success) {
      return {
        status: 400,
        message: 'Неправильні дані при оновленні розподілу!',
      };
    }

    const { shareAmount } = validatedValues.data;

    const newBill = await db.bill.update({
      where: {
        id: billId,
      },
      data: {
        users: {
          update: {
            where: {
              id: userId,
            },
            data: {
              shareAmount,
            },
          },
        },
      },
    });

    return {
      status: 201,
      data: newBill,
      message: 'Рахунок успішно оновлено!',
    };
  } catch (error) {
    return {
      status: 500,
      message: 'Помилка при оновленні розподілу!',
    };
  }
};
