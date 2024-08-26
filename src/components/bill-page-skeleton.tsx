import { Skeleton } from '@/src/components/ui/skeleton';

export default function BillsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 mt-10 gap-6">
      <div
        className="bg-light-green rounded-xl shadow-sm h-[176px] flex items-center transition-all cursor-pointer
          justify-center gap-4 text-xl text-green hover:bg-green hover:text-light-green hover:shadow-md"
      >
        <Skeleton className="w-6 h-6 rounded-full bg-gray-300" />
        <Skeleton className="w-24 h-8 rounded-md bg-gray-300" />
      </div>
      {Array.from({ length: 9 }).map((_, index) => (
        <div
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          className="bg-white rounded-xl shadow-sm h-[176px] flex flex-col transition-all cursor-pointer
            justify-between p-4 hover:shadow-md"
        >
          <Skeleton className="w-full h-6 rounded-md bg-gray-300 mb-4" />
          <Skeleton className="w-3/4 h-6 rounded-md bg-gray-300 mb-2" />
          <Skeleton className="w-1/2 h-6 rounded-md bg-gray-300" />
        </div>
      ))}
    </div>
  );
}
