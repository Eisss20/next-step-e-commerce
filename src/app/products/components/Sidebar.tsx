'use client';

import { useState } from 'react';
// import { Slider } from '@/components/ui/slider';

export default function Sidebar() {
  const [priceRange, setPriceRange] = useState([72, 180]);
  const [activeCategory, setActiveCategory] = useState('All Products');

  const categories = [
    'All Products',
    'Best Sellers',
    'Limited Edition',
    'Performance Series',
    'Kids Collection',
  ];

  const handlePriceChange = (value: number[]) => {
    setPriceRange(value);
  };

  return (
    <aside className="w-full shrink-0 md:w-64">
      <div className="mb-8">
        <h2 className="mb-4 text-lg font-medium">Browse by</h2>
        <ul className="space-y-2">
          {categories.map((category) => (
            <li key={category}>
              <button
                className={`w-full py-1 text-left text-sm ${
                  activeCategory === category ? 'font-semibold' : 'text-gray-600'
                }`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="border-t pt-6">
        <h2 className="mb-4 text-lg font-medium">Filter by</h2>
        <div className="mb-6">
          <h3 className="mb-4 flex justify-between text-sm font-medium">
            <span>Price</span>
            <span className="text-gray-500">—</span>
          </h3>
          <div className="px-2">
            {/* <Slider
              defaultValue={priceRange}
              min={0}
              max={300}
              step={1}
              onValueChange={handlePriceChange}
              className="mb-6"
            /> */}
            <div className="flex justify-between text-sm">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
