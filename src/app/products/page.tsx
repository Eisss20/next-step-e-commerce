'use client'; // Add this directive at the top

import { useState } from 'react';
import { ProductType } from '@/types/types';
import Sidebar from './components/Sidebar';
import ProductGrid from './components/ProductGrid';

export default function ProductsPage() {
  // State for price range filter
  const [priceRange, setPriceRange] = useState([0, 300]);

  // Sample product data
  const products: ProductType[] = [
    {
      id: 1,
      name: 'Explorer Sneaker',
      price: 129,
      image: '/products-images/shoe-1.2.avif',
      isBestSeller: false,
      category: 'Performance Series',
    },
    {
      id: 2,
      name: 'Urban Walker',
      price: 149,
      image: '/products-images/shoe-1.avif',
      isBestSeller: false,
      category: 'Limited Edition',
    },
    {
      id: 3,
      name: 'Terrain Explorer',
      price: 159,
      image: '/products-images/shoe-2.1.avif',
      isBestSeller: true,
      category: 'Best Sellers',
    },
    {
      id: 4,
      name: 'City Runner',
      price: 139,
      image: '/products-images/shoe-2.1.avif',
      isBestSeller: false,
      category: 'Performance Series',
    },
    {
      id: 5,
      name: 'City Runner',
      price: 139,
      image: '/products-images/shoe-2.1.avif',
      isBestSeller: false,
      category: 'Performance Series',
    },
    {
      id: 6,
      name: 'City Runner',
      price: 139,
      image: '/products-images/shoe-2.1.avif',
      isBestSeller: false,
      category: 'Performance Series',
    },
  ];

  // Handle price range change
  const handlePriceChange = (value: number[]) => {
    setPriceRange(value);
  };

  // Filter products by the selected price range
  const filteredProducts = products.filter(
    (product) => product.price >= priceRange[0] && product.price <= priceRange[1]
  );

  return (
    <div className="mx-auto px-4 sm:px-20 py-12">
      <nav className="mb-4 flex text-sm">
        <a href="/" className="text-gray-500 hover:text-gray-700">
          Home
        </a>
        <span className="mx-2 text-gray-400">&gt;</span>
        <span className="text-gray-700">All Products</span>
      </nav>

      <h1 className="mb-8 text-3xl font-bold">All Products</h1>

      <div className="flex flex-col gap-10 md:flex-row">
        {/* Pass price range and filter change function to Sidebar */}
        <Sidebar priceRange={priceRange} onPriceChange={handlePriceChange} />
        {/* Pass the filtered products to ProductGrid */}
        <ProductGrid products={filteredProducts} />
      </div>
    </div>
  );
}
