'use client';

import { useState, useEffect } from 'react';
import { CustomSlider } from '../../components/ui/SliderPrice';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';

// Types
interface SidebarProps {
  priceRange: number[];
  onPriceChange: (value: number[]) => void;
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

interface Label {
  id: number;
  name: string;
}

interface Category {
  id: number;
  name: string;
  product_count: number;
}

interface BreadcrumbItem {
  name: string;
  link: string;
}

// Constants
const MAIN_CATEGORY_DISPLAYS = {
  new: 'NEW',
  men: 'MEN',
  women: 'WOMEN',
  kids: 'KIDS',
} as const;

const MAIN_CATEGORIES = [
  'men',
  'man',
  'women',
  'woman',
  'kids',
  'kid',
  'children',
  'child',
  'new',
  'new arrival',
  'new arrivals',
];

export default function Sidebar({
  priceRange,
  onPriceChange,
  activeCategory,
  onCategoryChange,
}: SidebarProps) {
  const searchParams = useSearchParams();
  const mainCategoryParam = searchParams.get('mainCategory');

  // State
  const [sliderValue, setSliderValue] = useState<number[]>(priceRange);
  const [labels, setLabels] = useState<Label[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  // Helper functions
  const isMainCategory = (categoryName: string): boolean => {
    return MAIN_CATEGORIES.includes(categoryName.toLowerCase().trim());
  };

  const getMainCategoryDisplay = (mainCategory: string | null): string => {
    if (!mainCategory) return 'All Products';
    return (
      MAIN_CATEGORY_DISPLAYS[mainCategory as keyof typeof MAIN_CATEGORY_DISPLAYS] || 'PRODUCTS'
    );
  };

  const generateBreadcrumbPath = (): BreadcrumbItem[] => {
    const path: BreadcrumbItem[] = [{ name: 'Home', link: '/' }];

    if (mainCategoryParam) {
      path.push({
        name: getMainCategoryDisplay(mainCategoryParam),
        link: `/products?mainCategory=${mainCategoryParam}`,
      });

      if (activeCategory === 'All Products') {
        path.push({
          name: 'All Products',
          link: `/products?mainCategory=${mainCategoryParam}`,
        });
      }
    }

    if (activeCategory && activeCategory !== 'All Products') {
      const link = mainCategoryParam
        ? `/products?mainCategory=${mainCategoryParam}&category=${encodeURIComponent(activeCategory)}`
        : `/products?category=${encodeURIComponent(activeCategory)}`;

      path.push({ name: activeCategory, link });
    }

    return path;
  };

  // Effects
  useEffect(() => {
    setSliderValue(priceRange);
  }, [priceRange]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [labelsRes, categoriesRes] = await Promise.all([
          axios.get('/api/labels'),
          axios.get('/api/categories'),
        ]);

        if (labelsRes.data.success) {
          setLabels(labelsRes.data.data);
        }

        if (categoriesRes.data.success) {
          const filteredCategories = categoriesRes.data.data.filter(
            (category: Category) => !isMainCategory(category.name)
          );
          setCategories(filteredCategories);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [mainCategoryParam]);

  // Event handlers
  const handleSliderChange = (_: Event, newValue: number | number[]): void => {
    const value = newValue as number[];
    setSliderValue(value);
    onPriceChange(value);
  };

  const breadcrumbPath = generateBreadcrumbPath();

  return (
    <aside className="w-full shrink-0 md:w-64">
      {/* Breadcrumb Navigation */}
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

      {/* Page Title */}
      <h1 className="mb-8 text-3xl font-bold">{getMainCategoryDisplay(mainCategoryParam)}</h1>

      {/* Category Filter */}
      <div className="mb-8">
        <h2 className="mb-4 text-lg font-medium">Browse by</h2>
        <ul className="space-y-2">
          <li>
            <button
              className={`w-full py-1 text-left text-sm ${
                activeCategory === 'All Products' ? 'font-semibold text-amber-600' : 'text-gray-600'
              }`}
              onClick={() => onCategoryChange('All Products')}
            >
              All Products
            </button>
          </li>

          {categories.map((category) => (
            <li key={category.id}>
              <button
                className={`flex w-full items-center justify-between py-1 text-left text-sm ${
                  activeCategory === category.name
                    ? 'font-semibold text-amber-600'
                    : 'text-gray-600'
                }`}
                onClick={() => onCategoryChange(category.name)}
              >
                <span>{category.name}</span>
                <span className="text-xs text-gray-400">({category.product_count})</span>
              </button>
            </li>
          ))}

          {labels.map((label) => (
            <li key={`label-${label.id}`}>
              <button
                className={`w-full py-1 text-left text-sm ${
                  activeCategory === label.name ? 'font-semibold text-amber-600' : 'text-gray-600'
                }`}
                onClick={() => onCategoryChange(label.name)}
              >
                {label.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Price Filter */}
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