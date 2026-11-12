import { notFound } from 'next/navigation';
import ProductDetail from '@/app/shop/product/[id]/_components/product-detail';
import { dummyProducts } from '@/data/products';

export function generateStaticParams() {
  return dummyProducts.flatMap((product) =>
    product.urlSlug ? [{ slug: product.urlSlug }] : []
  );
}

export default async function ProductBySlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = dummyProducts.find((item) => item.urlSlug === slug);

  if (!product) {
    notFound();
  }

  return <ProductDetail product={product} />;
}
