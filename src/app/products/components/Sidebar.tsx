'use client';

import { useState, useEffect } from 'react';
import { CustomSlider } from '../../components/ui/SliderPrice';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

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

  // Get URL parameters to determine main category
  const searchParams = useSearchParams();
  const mainCategoryParam = searchParams.get('mainCategory');

  // Format main category for display
  const getMainCategoryDisplay = (mainCategory: string | null): string => {
    if (!mainCategory) return 'All Products';

    switch (mainCategory) {
      case 'new':
        return 'NEW';
      case 'men':
        return "MEN";
      case 'women':
        return "WOMEN";
      case 'kids':
        return 'KIDS';
      default:
        return 'PRODUCTS';
    }
  };

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

  // Generate breadcrumb path based on active selections
  const generateBreadcrumbPath = () => {
    const path = [];

    // Always add Home
    path.push({ name: 'Home', link: '/' });

    // Add main category if available
    if (mainCategoryParam) {
      path.push({
        name: getMainCategoryDisplay(mainCategoryParam),
        link: `/products?mainCategory=${mainCategoryParam}`,
      });

      // ✅ ถ้า activeCategory เป็น "All Products" ให้แสดงใน breadcrumb ด้วย
      if (activeCategory === 'All Products') {
        path.push({
          name: 'All Products',
          link: `/products?mainCategory=${mainCategoryParam}`,
        });
      }
    }

    // Add sub-category if selected and not "All Products"
    if (activeCategory && activeCategory !== 'All Products') {
      const link = mainCategoryParam
        ? `/products?mainCategory=${mainCategoryParam}&category=${encodeURIComponent(activeCategory)}`
        : `/products?category=${encodeURIComponent(activeCategory)}`;

      path.push({ name: activeCategory, link });
    }

    return path;
  };


  const breadcrumbPath = generateBreadcrumbPath();

  return (
    <aside className="w-full shrink-0 md:w-64">
      {/* Dynamic Breadcrumb Navigation */}
      <nav className="mb-4 flex text-sm">
        {breadcrumbPath.map((item, index) => (
          <span key={index} className="flex items-center">
            {index > 0 && <span className="mx-2 text-gray-400">&gt;</span>}
            {index === breadcrumbPath.length - 1 ? (
              <span className="text-gray-700">{item.name}</span>
            ) : (
              <Link href={item.link} className="text-gray-500 hover:text-gray-700">
                {item.name}
              </Link>
            )}
          </span>
        ))}
      </nav>

      <h1 className="mb-8 text-3xl font-bold">
        {mainCategoryParam ? getMainCategoryDisplay(mainCategoryParam) : 'All Products'}
      </h1>

      <div className="mb-8">
        <h2 className="mb-4 text-lg font-medium">Browse by</h2>
        <ul className="space-y-2">
          {categories.map((category: string) => (
            <li key={category}>
              <button
                className={`w-full py-1 text-left text-sm ${
                  activeCategory === category ? 'font-semibold text-amber-600' : 'text-gray-600'
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
