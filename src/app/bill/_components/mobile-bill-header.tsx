import { MoveLeft } from 'lucide-react';
import Link from 'next/link';

export default function MobileBillHeader() {
  return (
    <div className="sticky top-0 z-50 w-full flex gap-4 bg-light-green pt-6 pb-4 px-8 rounded-b-[60px] md:hidden">
      <Link href="/" className="flex items-center">
        <div className="bg-white size-9 rounded-full" />
        <MoveLeft className="size-7 relative -left-5" />
      </Link>
      <div className="flex flex-col">
        <h2 className="text-xl font-medium">На головну</h2>
        <p className="text-muted-foreground text-xs">
          Ви можете переглянути історію рахунків
        </p>
      </div>
    </div>
  );
}
