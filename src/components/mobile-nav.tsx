import { House, Plus, Settings } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';

export default function MobileNavigationBar() {
  return (
    <div className="md:hidden sticky bottom-0 px-12 left-0 rounded-t-[60px] pt-4 pb-8 bg-light-green">
      <div className="flex justify-between w-full gap-8">
        <Link href="/" className="">
          <House />
        </Link>
        <Button
          className=" absolute inset-x-1/2 transform -translate-x-1/2 -top-5 w-fit size-12 border-2 bg-black border-gray-300 rounded-full"
          variant="outline"
        >
          <div className="">
            <Plus className="stroke-white" />
          </div>
        </Button>
        <Link href="/settigns">
          <Settings />
        </Link>
      </div>
    </div>
  );
}
