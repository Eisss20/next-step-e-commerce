'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import { ProductType } from '@/types/types';
import Sidebar from './components/Sidebar';
import ProductGrid from './components/ProductGrid';

interface ExtendedProductType extends ProductType {
  mainCategory?: string | string[];
}

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const mainCategoryParam = searchParams.get('mainCategory');
  const categoryParam = searchParams.get('category');

  const [products, setProducts] = useState<ExtendedProductType[]>([]);
  const [priceRange, setPriceRange] = useState<number[]>([0, 300]);
  const [activeCategory, setActiveCategory] = useState<string>('All Products');
  const [activeMainCategory, setActiveMainCategory] = useState<string>('all');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await axios.get('/api/products');

        if (res.data) {
          if (res.data.success && Array.isArray(res.data.data)) {
            setProducts(res.data.data);
            setError('');
          } else if (Array.isArray(res.data.data)) {
            setProducts(res.data.data);
            setError('');
          } else if (Array.isArray(res.data)) {
            setProducts(res.data);
            setError('');
          } else if (Array.isArray(res.data.products)) {
            setProducts(res.data.products);
            setError('');
          } else {
            setError(
              `Invalid API response structure. Available keys: ${Object.keys(res.data).join(', ')}`
            );
          }
        } else {
          setError('No data received from API');
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(
            `API Error: ${error.response?.status} - ${error.response?.statusText || error.message}`
          );
        } else {
          setError('Failed to fetch products');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (mainCategoryParam) {
      setActiveMainCategory(mainCategoryParam);
    }
    if (categoryParam) {
      setActiveCategory(categoryParam);
    }
  }, [mainCategoryParam, categoryParam]);

  const handlePriceChange = (value: number[]): void => {
    setPriceRange(value);
  };

  const handleCategoryChange = (category: string): void => {
    setActiveCategory(category);
  };

  const filteredProducts: ExtendedProductType[] = products.filter((product) => {
    const priceMatch = product.net_price >= priceRange[0] && product.net_price <= priceRange[1];

    let mainCategoryMatch = false;
    if (activeMainCategory === 'all') {
      mainCategoryMatch = true;
    } else if (Array.isArray(product.mainCategory)) {
      mainCategoryMatch = product.mainCategory.includes(activeMainCategory);
    } else if (typeof product.mainCategory === 'string') {
      mainCategoryMatch = product.mainCategory === activeMainCategory;
    } else {
      mainCategoryMatch = true;
    }

    let categoryMatch = false;
    if (activeCategory === 'All Products') {
      categoryMatch = true;
    } else {
      if (Array.isArray(product.category)) {
        categoryMatch = product.category.includes(activeCategory);
      } else if (
        product.category &&
        typeof product.category === 'object' &&
        'name' in product.category
      ) {
        categoryMatch = (product.category as any).name === activeCategory;
      } else if (typeof product.category === 'string') {
        categoryMatch = product.category === activeCategory;
      }

      if (!categoryMatch && product.label) {
        if (typeof product.label === 'object' && 'name' in product.label) {
          categoryMatch = product.label.name === activeCategory;
        } else if (typeof product.label === 'string') {
          categoryMatch = product.label === activeCategory;
        }
      }
    }

    return priceMatch && mainCategoryMatch && categoryMatch;
  });

  const getAvailableCategories = (): string[] => {
    const categories = new Set<string>();
    categories.add('All Products');

    products.forEach((product) => {
      let matchesMainCategory = false;
      if (activeMainCategory === 'all') {
        matchesMainCategory = true;
      } else if (Array.isArray(product.mainCategory)) {
        matchesMainCategory = product.mainCategory.includes(activeMainCategory);
      } else if (typeof product.mainCategory === 'string') {
        matchesMainCategory = product.mainCategory === activeMainCategory;
      } else {
        matchesMainCategory = true;
      }

      if (matchesMainCategory) {
        if (Array.isArray(product.category)) {
          product.category.forEach((cat) => categories.add(cat));
        } else if (
          product.category &&
          typeof product.category === 'object' &&
          'name' in product.category
        ) {
          categories.add((product.category as any).name);
        } else if (typeof product.category === 'string') {
          categories.add(product.category);
        }

        if (product.label) {
          if (typeof product.label === 'object' && 'name' in product.label) {
            categories.add(product.label.name);
          } else if (typeof product.label === 'string') {
            categories.add(product.label);
          }
        }
      }
    });

    return Array.from(categories);
  };

  const getPageTitle = (): string => {
    switch (activeMainCategory) {
      case 'new':
        return 'New Arrivals';
      case 'men':
        return "Men's Collection";
      case 'women':
        return "Women's Collection";
      case 'kids':
        return 'Kids Collection';
      default:
        return 'All Products';
    }
  };

  if (loading) {
    return (
      <div className="mx-auto py-12 sm:px-20">
        <div className="flex min-h-[400px] items-center justify-center">
          <div className="text-lg">Loading products...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto py-12 sm:px-20">
        <div className="flex min-h-[400px] items-center justify-center">
          <div className="text-red-500">Error: {error}</div>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="mx-auto py-12 sm:px-20">
        <div className="flex min-h-[400px] items-center justify-center">
          <div className="text-lg">No products found</div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto py-12 sm:px-20">
      <div className="flex flex-col gap-10 md:flex-row">
        <Sidebar
          priceRange={priceRange}
          onPriceChange={handlePriceChange}
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />
        <ProductGrid products={filteredProducts} />
      </div>
    </div>
  );
}