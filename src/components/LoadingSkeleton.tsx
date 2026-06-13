export default function LoadingSkeleton({ label = 'Loading VOIRE content' }: { label?: string }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-[60vh]">
      <div className="mb-8 space-y-3">
        <div className="h-3 w-36 bg-[#E8E6E1] rounded animate-pulse" />
        <div className="h-10 w-72 max-w-full bg-[#E8E6E1] rounded animate-pulse" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8" aria-label={label}>
        {[...Array(6)].map((_, index) => (
          <div key={index} className="space-y-4">
            <div className="aspect-[3/4] rounded-[8px] bg-[#E8E6E1] animate-pulse" />
            <div className="h-3 w-1/3 bg-[#E8E6E1] rounded animate-pulse" />
            <div className="h-4 w-3/4 bg-[#E8E6E1] rounded animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}
