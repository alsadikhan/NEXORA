'use client';

import { useParams } from 'next/navigation';
import { notFound } from 'next/navigation';
import { dummyProducts } from '@/data/products';
import ProductDetail from './_components/product-detail';

export default function ProductPage() {
  // Use client-side hooks to access params
  const params = useParams();
  const id = params?.id;
  
  if (!id || Array.isArray(id)) {
    return notFound();
  }
  
  // Convert id to number
  const productId = parseInt(id);
  
  // Find the product by ID
  const product = dummyProducts.find((p) => p.id === productId);
  
  // If product not found, return 404
  if (!product) {
    return notFound();
  }
  
  return <ProductDetail product={product} />;
}

// Metadata will be handled in layout.tsx since we're using client component now 