'use client';

import BillTable from '@/src/app/bill/_components/bill-table';
import BillUserSlider from '@/src/app/bill/_components/bill-user-slider';
import NewBillUserFormDialog from '@/src/components/modals/new-bill-user-form-dialog';
import { Button } from '@/src/components/ui/button';
import { useGetBillById } from '@/src/features/use-get-bill-by-id';
import { useState } from 'react';

type Props = {
  params: { billId: string };
};

function BillPage({ params: { billId } }: Props) {
  const { data, isLoading } = useGetBillById(billId);
  const [open, setOpen] = useState<boolean>(false);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const {
    data: { name, totalAmount, users, items, id },
  } = data || {};

  return (
    <div className="max-w-[500px] mx-auto pt-20">
      <NewBillUserFormDialog
        billId={id}
        isOpen={open}
        onClose={() => setOpen(false)}
      />
      <h2 className="text-3xl font-semibold border-2 border-dashed py-6 px-4 rounded-3xl">
        Ваш рахунок - {name}
      </h2>
      <BillTable items={items} totalAmount={totalAmount} />
      <div className="gap-2 xl:gap-0 flex flex-wrap items-center justify-between border-2 border-dashed py-6 px-4 rounded-3xl">
        <Button className="w-full xl:w-fit" variant="outline">
          Оплатити рахунок
        </Button>
        <Button
          onClick={() => setOpen(true)}
          className="w-full order-first xl:w-fit xl:order-last"
        >
          Додати людей для розподілу рахунка
        </Button>
      </div>
      <div className="flex flex-col gap-12 mt-12">
        {users.map(user => (
          <BillUserSlider
            usersLength={users.length}
            billId={user.billId}
            userId={user.id}
            key={user.id}
            name={user.name}
            totalAmount={totalAmount}
            shareAmount={user.shareAmount}
          />
        ))}
      </div>
    </div>
  );
}

export default BillPage;
