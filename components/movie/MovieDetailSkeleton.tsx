export function MovieDetailSkeleton() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Backdrop skeleton */}
      <div className="relative h-48 sm:h-64 md:h-80 lg:h-96 w-full overflow-hidden bg-gray-800">
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/70"></div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-900 to-transparent"></div>
      </div>

      {/* Content skeleton */}
      <div className="relative -mt-24 sm:-mt-32 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Poster skeleton */}
            <div className="lg:col-span-1 relative z-10 flex justify-center lg:justify-start">
              <div className="w-full max-w-[200px] sm:max-w-[250px] lg:max-w-none">
                <div className="w-full aspect-[2/3] bg-gray-800 rounded-lg ring-4 ring-black/20 animate-pulse"></div>
              </div>
            </div>

            {/* Movie details skeleton */}
            <div className="lg:col-span-2 space-y-6 relative z-10">
              {/* Header skeleton */}
              <div>
                {/* Title skeleton */}
                <div className="h-10 bg-gray-700 rounded-lg mb-2 animate-pulse"></div>
                {/* Tagline skeleton */}
                <div className="h-6 bg-gray-600 rounded-lg mb-4 w-3/4 animate-pulse"></div>

                {/* Metadata and genres row */}
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  {/* Year skeleton */}
                  <div className="h-4 bg-gray-600 rounded w-12 animate-pulse"></div>
                  {/* Runtime skeleton */}
                  <div className="h-4 bg-gray-600 rounded w-16 animate-pulse"></div>
                  {/* Rating skeleton */}
                  <div className="flex items-center gap-1">
                    <div className="w-4 h-4 bg-primary/50 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-600 rounded w-8 animate-pulse"></div>
                    <div className="h-4 bg-gray-600 rounded w-20 animate-pulse"></div>
                  </div>
                  {/* Genre pills */}
                  <div className="flex gap-2">
                    <div className="h-6 bg-gray-700 rounded-full px-3 animate-pulse w-16"></div>
                    <div className="h-6 bg-gray-700 rounded-full px-3 animate-pulse w-20"></div>
                    <div className="h-6 bg-gray-700 rounded-full px-3 animate-pulse w-14"></div>
                  </div>
                </div>
              </div>

              {/* Overview skeleton */}
              <div>
                <div className="h-6 bg-gray-700 rounded-lg mb-3 animate-pulse w-24"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-600 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-600 rounded animate-pulse w-5/6"></div>
                  <div className="h-4 bg-gray-600 rounded animate-pulse w-4/6"></div>
                  <div className="h-4 bg-gray-600 rounded animate-pulse w-3/6"></div>
                </div>
              </div>

              {/* Production companies skeleton */}
              <div>
                <div className="h-6 bg-gray-700 rounded-lg mb-3 animate-pulse w-40"></div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-gray-600 rounded animate-pulse"></div>
                  <div className="w-12 h-12 bg-gray-600 rounded animate-pulse"></div>
                  <div className="w-12 h-12 bg-gray-600 rounded animate-pulse"></div>
                </div>
              </div>

              {/* Details grid skeleton */}
              <div>
                <div className="h-6 bg-gray-700 rounded-lg mb-4 animate-pulse w-32"></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-600 rounded animate-pulse w-20"></div>
                    <div className="h-4 bg-gray-500 rounded animate-pulse w-24"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-600 rounded animate-pulse w-16"></div>
                    <div className="h-4 bg-gray-500 rounded animate-pulse w-28"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-600 rounded animate-pulse w-18"></div>
                    <div className="h-4 bg-gray-500 rounded animate-pulse w-22"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-600 rounded animate-pulse w-14"></div>
                    <div className="h-4 bg-gray-500 rounded animate-pulse w-20"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
