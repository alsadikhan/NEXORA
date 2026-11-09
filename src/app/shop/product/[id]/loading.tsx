export default function ProductLoading() {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 lg:pt-8">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          {/* Back button skeleton */}
          <div className="h-6 w-24 bg-gray-200 rounded animate-pulse"></div>
          
          {/* Breadcrumb skeleton */}
          <div className="flex items-center space-x-2">
            <div className="h-4 w-10 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-2 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-2 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image skeleton */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-200 rounded-xl animate-pulse"></div>
            <div className="grid grid-cols-5 gap-2 sm:gap-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="aspect-square bg-gray-200 rounded-lg animate-pulse"></div>
              ))}
            </div>
          </div>

          {/* Product info skeleton */}
          <div className="flex flex-col">
            <div className="mb-2">
              <div className="h-8 w-32 bg-gray-200 rounded animate-pulse mb-4"></div>
              <div className="h-10 w-3/4 bg-gray-200 rounded animate-pulse mb-2"></div>
              <div className="flex items-center gap-4 mb-2">
                <div className="h-5 w-24 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-5 w-16 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="h-8 w-32 bg-gray-200 rounded animate-pulse mb-4"></div>
              <div className="space-y-2 mb-6">
                <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-4/6 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>

            {/* Color options skeleton */}
            <div className="mb-6">
              <div className="h-5 w-16 bg-gray-200 rounded animate-pulse mb-2"></div>
              <div className="flex gap-2">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-8 w-8 rounded-full bg-gray-200 animate-pulse"></div>
                ))}
              </div>
            </div>

            {/* Size options skeleton */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <div className="h-5 w-12 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="flex gap-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-10 w-10 bg-gray-200 rounded-md animate-pulse"></div>
                ))}
              </div>
            </div>

            {/* Add to cart skeleton */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="h-12 w-32 bg-gray-200 rounded-md animate-pulse"></div>
              <div className="h-12 flex-1 bg-gray-200 rounded-md animate-pulse"></div>
              <div className="h-12 w-12 bg-gray-200 rounded-md animate-pulse"></div>
              <div className="h-12 w-12 bg-gray-200 rounded-md animate-pulse"></div>
            </div>

            {/* Specifications skeleton */}
            <div className="mt-6 border-t border-gray-200 pt-6">
              <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-4"></div>
              <div className="space-y-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex items-start">
                    <div className="h-5 w-5 bg-gray-200 rounded mr-2"></div>
                    <div className="flex-1">
                      <div className="h-5 w-full bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 