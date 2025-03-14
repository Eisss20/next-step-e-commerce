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
      category: ['Performance Series'],
    },
    {
      id: 2,
      name: 'Urban Walker',
      price: 149,
      image: '/products-images/shoe-1.avif',
      category: ['Limited Edition', 'Sale'],
    },
    {
      id: 3,
      name: 'Terrain Explorer',
      price: 159,
      image: '/products-images/shoe-2.1.avif',
      category: ['Best Sellers'],
    },
    {
      id: 4,
      name: 'City Runner',
      price: 139,
      image: '/products-images/shoe-2.2.avif',
      category: ['Performance Series'],
    },
    {
      id: 5,
      name: 'City Runner',
      price: 159,
      image: '/products-images/shoe-3.1.avif',
      category: ['Performance Series'],
    },
    {
      id: 6,
      name: 'City Runner',
      price: 169,
      image: '/products-images/shoe-3.2.avif',
      category: ['Performance Series'],
    },
    {
      id: 7,
      name: 'City Runner',
      price: 179,
      image: '/products-images/shoe-4.1.avif',
      category: ['Performance Series'],
    },
    {
      id: 8,
      name: 'City Runner',
      price: 189,
      image: '/products-images/shoe-4.2.avif',
      category: ['Performance Series', 'Best Sellers'],
    },
    {
      id: 8,
      name: 'City Runner',
      price: 109,
      image: '/products-images/shoe-1.avif',
      category: ['Performance Series','Sale'],
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
    <div className="mx-auto py-12 sm:px-20">
      <div className="flex flex-col gap-10 md:flex-row">
        {/* Pass price range and filter change function to Sidebar */}
        <Sidebar priceRange={priceRange} onPriceChange={handlePriceChange} />
        {/* Pass the filtered products to ProductGrid */}
        <ProductGrid products={filteredProducts} />
      </div>
    </div>
  );
}
