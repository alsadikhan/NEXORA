import { Footer } from '@/components/layout/footer';

export const metadata = {
  title: 'Product Details | NEXORA ',
  description: 'Explore our premium products at NEXORA',
};

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="min-h-screen bg-white">
        {children}
      </main>
      <Footer />
    </>
  );
} 