'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center space-x-0.5 sm:space-x-1 md:space-x-2">
        {items.map((item, index) => (
          <li key={item.href} className="flex items-center">
            {index > 0 && (
              <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400 mx-0.5 sm:mx-1 flex-shrink-0" />
            )}
            <Link
              href={item.href}
              className={`text-[10px] sm:text-xs md:text-sm ${
                index === items.length - 1
                  ? 'font-medium text-gray-800'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
} 