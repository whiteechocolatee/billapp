'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/src/components/ui/dialog';
import NewBillForm from '../forms/new-bill-form';

type Props = {
  onClose: () => void;
  isOpen: boolean;
};

export default function NewBillFormDialog({ isOpen, onClose }: Props) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            Створення нового рахунку
          </DialogTitle>
          <DialogDescription>
            Введіть інформацію про рахунок (страви, ціну, кількість)
          </DialogDescription>
        </DialogHeader>
        <div>
          <NewBillForm onClose={onClose} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
