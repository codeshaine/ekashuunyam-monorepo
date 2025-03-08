export const GroupsSkeleton = () => (
  <div className="flex w-full flex-col items-center">
    {/* Header area with title and share button */}
    <div className="flex w-full justify-between gap-4 p-4">
      <div className="h-12 w-40 animate-pulse rounded-lg bg-gray-200"></div>
      <div className="h-10 w-10 animate-pulse rounded-full bg-gray-200"></div>
    </div>

    {/* Description text placeholders */}
    <div className="mb-4 h-5 w-full max-w-2xl animate-pulse rounded bg-gray-200"></div>
    <div className="mb-4 mt-2 h-5 w-3/4 max-w-2xl animate-pulse rounded bg-gray-200"></div>

    {/* Note text placeholder with red tint */}
    <div className="mb-10 h-6 w-full max-w-xl animate-pulse rounded bg-red-100"></div>

    {/* Group links grid */}
    <div className="grid w-full gap-6 md:grid-cols-2">
      {Array(8)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className="flex flex-col rounded-lg border border-gray-100 p-4 shadow-sm"
          >
            {/* Group name */}
            <div className="mb-2 h-7 w-3/4 animate-pulse rounded bg-gray-200"></div>
            {/* Group subname */}
            <div className="mb-4 h-5 w-1/2 animate-pulse rounded bg-gray-100"></div>
            {/* Join button */}
            <div className="h-10 w-32 animate-pulse self-end rounded-md bg-green-100"></div>
          </div>
        ))}
    </div>
  </div>
);
