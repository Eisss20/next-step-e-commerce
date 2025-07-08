'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import { ProductType } from '@/types/types';
import Sidebar from './components/Sidebar';
import ProductGrid from './components/ProductGrid';

function ProductsPageContent() {
  const searchParams = useSearchParams();
  const mainCategoryParam = searchParams.get('mainCategory');
  const categoryParam = searchParams.get('category');

  const [products, setProducts] = useState<ProductType[]>([]);
  const [, setCategories] = useState<{ id: number; name: string }[]>([]);
  const [priceRange, setPriceRange] = useState<number[]>([0, 300]);
  const [activeCategory, setActiveCategory] = useState<string>('All Products');
  const [activeMainCategory, setActiveMainCategory] = useState<string>('all');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [productsRes, categoriesRes] = await Promise.all([
          axios.get('/api/products'),
          axios.get('/api/categories'),
        ]);

        if (productsRes.data) {
          if (productsRes.data.success && Array.isArray(productsRes.data.data)) {
            setProducts(productsRes.data.data);
          } else if (Array.isArray(productsRes.data.data)) {
            setProducts(productsRes.data.data);
          } else if (Array.isArray(productsRes.data)) {
            setProducts(productsRes.data);
          } else if (Array.isArray(productsRes.data.products)) {
            setProducts(productsRes.data.products);
          } else {
            setError(
              `Invalid API response structure. Available keys: ${Object.keys(productsRes.data).join(', ')}`
            );
          }
        } else {
          setError('No data received from API');
        }

        if (categoriesRes.data.success) {
          setCategories(categoriesRes.data.data);
        }

        setError('');
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(
            `API Error: ${error.response?.status} - ${error.response?.statusText || error.message}`
          );
        } else {
          setError('Failed to fetch data');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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

  const normalizeCategoryName = (categoryName: string): string => {
    return categoryName.toLowerCase().trim();
  };

  const productMatchesMainCategory = (product: ProductType, mainCategory: string): boolean => {
    if (mainCategory === 'all') return true;

    if (product.category && typeof product.category === 'object' && 'name' in product.category) {
      const categoryName = normalizeCategoryName(product.category.name);
      const targetCategory = normalizeCategoryName(mainCategory);

      const categoryMap: { [key: string]: string[] } = {
        new: ['new arrival', 'new arrivals', 'new'],
        women: ['women', 'woman'],
        men: ['men', 'man'],
        kids: ['kids', 'kid', 'children', 'child'],
      };

      if (categoryMap[targetCategory]) {
        return categoryMap[targetCategory].includes(categoryName);
      }

      return categoryName === targetCategory;
    }

    if (product.label && typeof product.label === 'object' && 'name' in product.label) {
      const labelName = normalizeCategoryName(product.label.name);
      const targetCategory = normalizeCategoryName(mainCategory);

      const categoryMap: { [key: string]: string[] } = {
        new: ['new arrival', 'new arrivals', 'new'],
        women: ['women', 'woman'],
        men: ['men', 'man'],
        kids: ['kids', 'kid', 'children', 'child'],
      };

      if (categoryMap[targetCategory]) {
        return categoryMap[targetCategory].includes(labelName);
      }

      return labelName === targetCategory;
    }

    return false;
  };

  const filteredProducts: ProductType[] = products.filter((product) => {
    const priceMatch = product.net_price >= priceRange[0] && product.net_price <= priceRange[1];
    const mainCategoryMatch = productMatchesMainCategory(product, activeMainCategory);

    let categoryMatch = false;
    if (activeCategory === 'All Products') {
      categoryMatch = true;
    } else {
      if (product.category && typeof product.category === 'object' && 'name' in product.category) {
        categoryMatch = product.category.name === activeCategory;
      }
      if (
        !categoryMatch &&
        product.label &&
        typeof product.label === 'object' &&
        'name' in product.label
      ) {
        categoryMatch = product.label.name === activeCategory;
      }
    }

    return priceMatch && mainCategoryMatch && categoryMatch;
  });

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
    <div className="mx-auto px-6 py-12 sm:px-10">
      <div className="sm:gap-10 flex flex-col md:flex-row">
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

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="mx-auto py-12 sm:px-20"><div className="flex min-h-[400px] items-center justify-center"><div className="text-lg">Loading products...</div></div></div>}>
      <ProductsPageContent />
    </Suspense>
  );
}
