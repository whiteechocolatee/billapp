'use client';

import BillCard from '@/src/app/bill/_components/bill-card';
import BillsSkeleton from '@/src/components/bill-page-skeleton';
import NewBillFormDialog from '@/src/components/modals/new-bill-form-dialog';
import { useToast } from '@/src/components/ui/use-toast';
import { colors } from '@/src/constants';
import { useGetBills } from '@/src/features/use-get-bills';
import { Plus } from 'lucide-react';
import { useState } from 'react';

export default function Home() {
  const { toast } = useToast();
  const [open, setOpen] = useState<boolean>(false);

  const { data, isError, isLoading } = useGetBills();

  if (isError && !data.data) {
    toast({
      variant: 'destructive',
      title: 'Виникла помилка!',
      description: data.message,
    });
  }

  const { data: bills } = data || {};

  return (
    <main>
      <NewBillFormDialog isOpen={open} onClose={() => setOpen(false)} />
      <section className="w-full py-20">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl md:text-3xl font-semibold">
            Вітаємо, користувач!
          </h2>
          <p className="text-[16px] md:text-lg text-muted-foreground">
            На цій сторінці ви можете переглянути історію рахунків та створити
            нові.
          </p>
        </div>
        {isLoading ? (
          <BillsSkeleton />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 mt-10 gap-6">
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="bg-light-green rounded-xl shadow-sm h-[176px] flex items-center transition-all cursor-pointer
          justify-center gap-4 text-xl text-green hover:bg-green hover:text-light-green hover:shadow-md"
            >
              <Plus className="size-6" />
              Створити рахунок
            </button>
            {bills?.map((bill, index) => (
              <BillCard key={bill.id} color={colors[index % 3]} bill={bill} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
