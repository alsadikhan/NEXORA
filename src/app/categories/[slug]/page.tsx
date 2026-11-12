import { notFound } from 'next/navigation';
import ProductsGrid from '@/components/shop/products-grid';
import { dummyProducts } from '@/data/products';

const categories = {
  't-shirts': { name: 'T-Shirts', productCategory: 'T-Shirts' },
  atars: { name: 'Atars', productCategory: 'Atars' },
  accessories: { name: 'Accessories', productCategory: 'Accessories' },
  eyewear: { name: 'Eyewear', productCategory: 'Eyewear' },
  footwear: { name: 'Footwear', productCategory: 'Footwear' },
  watches: { name: 'Watches', productCategory: 'Watches' },
} as const;

type CategorySlug = keyof typeof categories;

function isCategorySlug(slug: string): slug is CategorySlug {
  return Object.hasOwn(categories, slug);
}

export function generateStaticParams() {
  return Object.keys(categories).map((slug) => ({ slug }));
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!isCategorySlug(slug)) {
    notFound();
  }

  const category = categories[slug];
  const products = dummyProducts.filter(
    (product) => product.category === category.productCategory
  );

  return (
    <section className="container min-h-screen py-12 md:py-16">
      <div className="mb-8">
        <p className="mb-2 text-sm font-medium uppercase tracking-widest text-primary">
          NEXORA Collections
        </p>
        <h1 className="text-3xl font-bold md:text-4xl">{category.name}</h1>
      </div>
      <ProductsGrid products={products} />
    </section>
  );
}
