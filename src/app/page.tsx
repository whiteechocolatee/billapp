'use client';

import NewBillFormDialog from '@/src/components/modals/new-bill-form-dialog';
import { Plus } from 'lucide-react';
import { useState } from 'react';

export default function Home() {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <main>
      <NewBillFormDialog isOpen={open} onClose={() => setOpen(false)} />
      <section className="w-full pt-20">
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-semibold">Вітаємо, користувач!</h2>
          <p className="text-lg text-muted-foreground">
            На цій сторінці ви можете переглянути історію рахунків та створити
            нові.
          </p>
        </div>
        <div className="grid grid-cols-3 mt-10">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="bg-light-green rounded-xl shadow-sm py-36 flex items-center transition-all cursor-pointer
          justify-center gap-4 text-xl text-green hover:bg-green hover:text-light-green hover:shadow-md"
          >
            <Plus className="size-6" />
            Створити рахунок
          </button>
        </div>
      </section>
    </main>
  );
}
