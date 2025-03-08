export function ShareSkeleton() {
  return (
    <div className="absolute left-1/2 z-50 mt-4 w-56 -translate-x-3/4 transform overflow-hidden rounded-xl border border-gray-200 bg-white shadow-2xl md:w-80 md:-translate-x-1/2 lg:w-80 lg:-translate-x-1/2">
      <div className="px-4 py-4">
        <div className="mb-4 h-4 w-32 animate-pulse rounded bg-gray-300"></div>
        <div className="mb-2 h-10 w-full animate-pulse rounded bg-gray-200"></div>
        <div className="h-10 w-full animate-pulse rounded bg-gray-200"></div>
      </div>
    </div>
  );
}
