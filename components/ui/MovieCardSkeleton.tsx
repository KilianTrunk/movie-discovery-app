
interface MovieCardSkeletonProps {
  index?: number;
}

export function MovieCardSkeleton({ index = 0 }: MovieCardSkeletonProps) {
  return (
    <div
      className="block overflow-hidden rounded-xl bg-surface border border-border shadow-lg relative animate-pulse"
      style={{
        animationDelay: `${index * 0.15}s`,
        animationDuration: '1.5s'
      }}
    >
      {/* Poster skeleton */}
      <div className="aspect-[3/4] sm:aspect-[2/3] relative overflow-hidden bg-surface-subtle"></div>

      {/* Content skeleton */}
      <div className="p-3 sm:p-5">
        {/* Title skeleton */}
        <div className="h-5 sm:h-6 bg-surface-subtle rounded mb-2" />

        {/* Meta information skeleton */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className="w-12 h-5 sm:h-6 bg-surface-subtle rounded-md" />
            <div className="w-16 h-3 sm:h-4 bg-surface-subtle rounded" />
          </div>
        </div>

        {/* Description skeleton */}
        <div className="space-y-2">
          <div className="h-3 sm:h-4 bg-surface-subtle rounded" />
          <div className="h-3 sm:h-4 bg-surface-subtle rounded w-3/4" />
          <div className="h-3 sm:h-4 bg-surface-subtle rounded w-1/2" />
        </div>
      </div>
    </div>
  );
}
