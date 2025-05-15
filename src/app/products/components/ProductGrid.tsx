'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { ProductType } from '@/types/types';
import { SlArrowDown } from 'react-icons/sl';

interface ProductGridProps {
  products: ProductType[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  const [sortOption, setSortOption] = useState('Recommended');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const sortOptions = [
    'Recommended',
    'Newest',
    'Price (low to high)',
    'Price (high to low)',
    'Name A-Z',
    'Name Z-A',
  ];

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const selectSortOption = (option: string) => {
    setSortOption(option);
    setIsDropdownOpen(false);
  };

  // Sorting logic
  const sortedProducts = [...products]; // Create a copy of the products array

  if (sortOption === 'Price (low to high)') {
    sortedProducts.sort((a, b) => a.net_price - b.net_price);
  } else if (sortOption === 'Price (high to low)') {
    sortedProducts.sort((a, b) => b.net_price - a.net_price);
  } else if (sortOption === 'Name A-Z') {
    sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortOption === 'Name Z-A') {
    sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
  } else if (sortOption === 'Newest') {
    // Assuming `newest` could be determined by an `id` or `createdAt` field
    sortedProducts.sort((a, b) => b.id - a.id); // or any other method to determine newness
  }

  return (
    <div className="flex-1 pt-10">
      <div className="mb-6 flex items-center justify-between">
        <span className="text-sm text-gray-800">{sortedProducts.length} products</span>
        <div className="relative">
          <button className="flex items-center gap-2 px-3 py-2 text-sm" onClick={toggleDropdown}>
            <span>Sort by: {sortOption}</span>
            <SlArrowDown
              size={18}
              className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 z-10 mt-1 w-56 rounded-sm border bg-white shadow-lg">
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
        {sortedProducts.map((product) => (
          <div key={product.id} className="group relative">
            <Link href={`/products/${product.id}`} className="block">
              <div className="relative aspect-[8/9] overflow-hidden rounded-lg bg-gray-100">
                {/* ป้าย Sale และ Best Seller */}
                {product.category?.includes('Best Sellers') && (
                  <div className="absolute top-2 left-2 z-10 rounded bg-yellow-400 px-2 py-1 text-xs font-semibold">
                    BEST SELLER
                  </div>
                )}
                {product.category?.includes('Sale') && (
                  <div className="absolute top-2 left-2 z-10 rounded bg-yellow-400 px-2 py-1 text-xs font-semibold">
                    SALE
                  </div>
                )}

                <Image
                  src={product.image || '/placeholder.svg'}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </Link>
            <div className="mt-4">
              <Link href={`/products/${product.id}`} className="block">
                <h3 className="text-sm font-medium hover:underline">{product.name}</h3>
              </Link>
              <p className="mt-1 text-sm font-semibold">฿{product.net_price}</p>
              {product.price_per_unit && (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400 line-through">
                    ฿{product.price_per_unit}
                  </span>
                  <span className="text-xs text-green-600">-{product.discount_percent}%</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
