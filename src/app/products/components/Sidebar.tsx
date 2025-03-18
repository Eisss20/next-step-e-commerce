'use client';

import { useState, useEffect } from 'react';
import { CustomSlider } from '../../components/ui/SliderPrice';

interface SidebarProps {
  priceRange: number[];
  onPriceChange: (value: number[]) => void;
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function Sidebar({
  priceRange,
  onPriceChange,
  activeCategory,
  onCategoryChange,
}: SidebarProps) {
  // Local state for the slider value
  const [sliderValue, setSliderValue] = useState<number[]>(priceRange);

  // Update local state when props change
  useEffect(() => {
    setSliderValue(priceRange);
  }, [priceRange]);

  // Handle slider change
  const handleSliderChange = (_: Event, newValue: number | number[]): void => {
    const value = newValue as number[];
    setSliderValue(value);
    onPriceChange(value);
  };

  const categories: string[] = [
    'All Products',
    'Best Sellers',
    'Sale',
    'Performance Series',
    'Limited Edition',
  ];

  return (
    <aside className="w-full shrink-0 md:w-64">
      <nav className="mb-4 flex text-sm">
        <a href="/" className="text-gray-500 hover:text-gray-700">
          Home
        </a>
        <span className="mx-2 text-gray-400">&gt;</span>
        <span className="text-gray-700">All Products</span>
      </nav>

      <h1 className="mb-8 text-3xl font-bold">All Products</h1>

      <div className="mb-8">
        <h2 className="mb-4 text-lg font-medium">Browse by</h2>
        <ul className="space-y-2">
          {categories.map((category: string) => (
            <li key={category}>
              <button
                className={`w-full py-1 text-left text-sm ${
                  activeCategory === category ? 'font-semibold' : 'text-gray-600'
                }`}
                onClick={() => onCategoryChange(category)}
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
            <CustomSlider
              value={sliderValue}
              min={0}
              max={300}
              step={1}
              onChange={handleSliderChange}
              className="mb-6"
            />
            <div className="flex justify-between text-sm">
              <span>${sliderValue[0]}</span>
              <span>${sliderValue[1]}</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
