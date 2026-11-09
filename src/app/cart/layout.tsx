import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Your Cart | NEXORA',
  description: 'Review and manage items in your shopping cart.',
};

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // We're handling layout directly in the page components
  // to have custom headers and no main layout wrapper
  return children;
} 