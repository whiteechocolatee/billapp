import { useState } from 'react';
import UpdateShareAmountForm from '@/src/components/forms/update-share-amout';
import Image from 'next/image';
import { cn } from '@/src/lib/utils';

type Props = {
  name: string;
  userId: string;
  billId: string;
  color: string;
  shareAmount: number;
  totalAmount: number;
  usersLength: number;
};

export default function BillUserSlider({
  name,
  userId,
  billId,
  color,
  shareAmount,
  usersLength,
  totalAmount,
}: Props) {
  const [currentShareAmount, setCurrentShareAmount] =
    useState<number>(shareAmount);

  return (
    <div
      className={cn(
        'w-full relative p-5 rounded-2xl bg-opacity-30',
        `${color}`,
      )}
    >
      <Image
        className="hidden md:block absolute md:-top-10 md:-left-10"
        src="/user_bill.png"
        alt="user"
        width={120}
        height={120}
        loading="lazy"
      />
      <div className="w-full md:w-[300px] flex flex-col gap-4  ml-auto">
        <div className="flex justify-between">
          <h3 className="text-xl font-semibold">{name}</h3>
          <p className="text-lg">{currentShareAmount}₴</p>
        </div>
        <UpdateShareAmountForm
          usersLength={usersLength}
          totalAmount={totalAmount}
          shareAmount={currentShareAmount}
          userId={userId}
          billId={billId}
          onUpdateShareAmount={setCurrentShareAmount}
        />
      </div>
    </div>
  );
}
