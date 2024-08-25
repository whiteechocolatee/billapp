type BillItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  billId: string;
};

type BillUser = {
  id: string;
  billId: string;
  name: string;
  shareAmount: number;
};

export type Bill = {
  id: string;
  name: string;
  totalAmount: number;
  items: BillItem[];
  users: BillUser[];
};
