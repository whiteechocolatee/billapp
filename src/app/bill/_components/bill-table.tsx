import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/src/components/ui/table';
import React from 'react';

type Props = {
  items: { name: string; quantity: number; price: number }[];
  totalAmount: number;
};

export default function BillTable({ items, totalAmount }: Props) {
  return (
    <div className="border-2 border-dashed py-6 px-4 rounded-3xl">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Страва</TableHead>
            <TableHead className="text-center w-[80px]">К-ть</TableHead>
            <TableHead className="text-center">Ціна</TableHead>
            <TableHead className="text-right">Загалом</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map(item => (
            <TableRow key={item.name}>
              <TableCell className="font-medium">{item.name}</TableCell>
              <TableCell className="text-center">{item.quantity}</TableCell>
              <TableCell className="text-center">{item.price}₴</TableCell>
              <TableCell className="text-right">
                {item.price * item.quantity}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Загалом</TableCell>
            <TableCell className="text-right">{totalAmount}₴</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
