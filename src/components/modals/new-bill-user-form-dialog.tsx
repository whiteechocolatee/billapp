'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/src/components/ui/dialog';
import NewBillUserForm from '../forms/new-bill-user-form';

type NewBillUserFormDialogProps = {
  onClose: () => void;
  isOpen: boolean;
  billId: string;
};

export default function NewBillUserFormDialog({
  isOpen,
  onClose,
  billId,
}: NewBillUserFormDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[90%] md:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            Додати нового користувача
          </DialogTitle>
          <DialogDescription>
            Введіть ім’я нового користувача, який буде доданий до рахунку.
          </DialogDescription>
        </DialogHeader>
        <div>
          <NewBillUserForm billId={billId} onClose={onClose} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
