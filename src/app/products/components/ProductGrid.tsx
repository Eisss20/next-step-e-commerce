'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { ProductType } from '@/types/types';
import { ChevronDown } from 'lucide-react';

interface ProductGridProps {
  products: ProductType[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  const [sortOption, setSortOption] = useState('Recommended');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const sortOptions = ['Recommended', 'Price: Low to High', 'Price: High to Low', 'Newest'];

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const selectSortOption = (option: string) => {
    setSortOption(option);
    setIsDropdownOpen(false);
  };

  return (
    <div className="flex-1">
      <div className="mb-6 flex items-center justify-between">
        <span className="text-sm text-gray-500">{products.length} products</span>
        <div className="relative">
          <button
            className="flex items-center gap-2 rounded-md border px-3 py-2 text-sm"
            onClick={toggleDropdown}
          >
            <span>Sort by: {sortOption}</span>
            <ChevronDown
              size={16}
              className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 z-10 mt-1 w-48 rounded-md border bg-white shadow-lg">
              {sortOptions.map((option) => (
                <button
                  key={option}
                  className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                  onClick={() => selectSortOption(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <div key={product.id} className="group relative">
            <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
              {product.isBestSeller && (
                <div className="absolute top-2 left-2 z-10 rounded bg-yellow-400 px-2 py-1 text-xs font-semibold">
                  BEST SELLER
                </div>
              )}
              <Image
                src={product.image || '/placeholder.svg'}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="mt-4">
              <h3 className="text-sm font-medium">{product.name}</h3>
              <p className="mt-1 text-sm font-semibold">${product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
