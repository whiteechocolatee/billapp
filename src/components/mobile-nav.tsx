'use client';

import { House, Plus, Settings } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { Button } from './ui/button';
import NewBillFormDialog from './modals/new-bill-form-dialog';

export default function MobileNavigationBar() {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <NewBillFormDialog isOpen={open} onClose={() => setOpen(false)} />
      <div className="md:hidden sticky bottom-0 px-12 left-0 rounded-t-[60px] pt-4 pb-8 bg-light-green">
        <div className="flex justify-between w-full gap-8">
          <Link href="/" className="">
            <House />
          </Link>
          <Button
            className=" absolute inset-x-1/2 transform -translate-x-1/2 -top-5 w-fit size-12 border-2 bg-black border-gray-300 rounded-full"
            variant="outline"
            onClick={() => setOpen(true)}
          >
            <div className="">
              <Plus className="stroke-white" />
            </div>
          </Button>
          <Link href="/settings">
            <Settings />
          </Link>
        </div>
      </div>
    </>
  );
}
