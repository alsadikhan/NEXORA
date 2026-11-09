import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ProductNotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16 bg-white">
      <div className="text-center max-w-md">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-6">
          <ShoppingBag className="h-8 w-8 text-gray-500" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Product Not Found</h1>
        <p className="text-gray-600 mb-8">
          We couldn&apos;t find the product you&apos;re looking for. It may have been removed or is no longer available.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild className="bg-black hover:bg-gray-800 text-white">
            <Link href="/shop">
              Continue Shopping
            </Link>
          </Button>
          <Button asChild variant="outline" className="border-gray-300">
            <Link href="/">
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
} 