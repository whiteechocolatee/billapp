'use client';

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/src/components/ui/card';
import { Bill } from '@/src/types';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  bill: Bill;
};

function UserPreview() {
  return (
    <div className="h-14 relative  w-14 rounded-full border-2 border-gray-300 bg-white overflow-hidden flex justify-center items-end">
      <Image src="/user_preview.png" alt="user" width={40} height={20} />
    </div>
  );
}

export default function BillCard({ bill }: Props) {
  const { name, totalAmount, users, id } = bill;

  return (
    <Link href={`/bill/${id}`} className="transition-all hover:shadow-xl">
      <Card className="p-2 md:p-8 bg-green text-white flex items-center h-full">
        <CardHeader className="flex-row w-full justify-between">
          <div className="space-y-1">
            <CardTitle>{name}</CardTitle>
            <CardDescription className="text-white">
              Загальна сума:{' '}
              <span className="font-bold text-lg">{totalAmount} грн</span>
            </CardDescription>
          </div>
          {users && users.length > 1 && (
            <div className="hidden lg:flex items-center">
              <UserPreview />
              <span className="ml-2 font-mono text-lg">
                +{users.length - 1}
              </span>
            </div>
          )}
        </CardHeader>
      </Card>
    </Link>
  );
}
