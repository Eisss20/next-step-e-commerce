'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { ProductType } from '@/types/types';
import Sidebar from './components/Sidebar';
import ProductGrid from './components/ProductGrid';

// อัพเดทประเภทสินค้าให้รองรับ mainCategory
interface ExtendedProductType extends ProductType {
  mainCategory?: string[];
}

export default function ProductsPage() {
  // รับพารามิเตอร์จาก URL
  const searchParams = useSearchParams();
  const mainCategoryParam = searchParams.get('mainCategory');
  const categoryParam = searchParams.get('category');

  // สถานะสำหรับตัวกรองช่วงราคา
  const [priceRange, setPriceRange] = useState<number[]>([0, 300]);

  // สถานะสำหรับตัวกรองหมวดหมู่ที่กำลังทำงานอยู่
  const [activeCategory, setActiveCategory] = useState<string>('All Products');

  // สถานะสำหรับเก็บหมวดหมู่หลัก
  const [activeMainCategory, setActiveMainCategory] = useState<string>('all');

  // อัปเดตหมวดหมู่จาก URL พารามิเตอร์
  useEffect(() => {
    if (mainCategoryParam) {
      setActiveMainCategory(mainCategoryParam);
    }

    if (categoryParam) {
      setActiveCategory(categoryParam);
    }
  }, [mainCategoryParam, categoryParam]);

  // ข้อมูลสินค้าตัวอย่าง - เพิ่ม mainCategory
  const products: ExtendedProductType[] = [
    {
      id: 1,
      name: 'Air Jordan 1 Low SE',
      net_price: 129,
      price_per_unit: 200,
      image: '/products-images/shoe-1.2.avif',
      category: ['Performance Series'],
      mainCategory: ['men', 'new'],
      images: [
        '/products-images/shoe-1.2.avif',
        '/products-images/shoe-1.avif',
        '/products-images/shoe-2.1.avif',
        '/products-images/shoe-2.2.avif',
        '/products-images/shoe-3.1.avif',
        '/products-images/shoe-3.2.avif',
        '/products-images/shoe-4.1.avif',
        '/products-images/shoe-4.2.avif',
      ],
      description: 'รองเท้าผู้ชาย',
      discount_percent: 23,
    },
    {
      id: 2,
      name: 'Urban Walker',
      net_price: 149,
      price_per_unit: 210,
      image: '/products-images/shoe-1.avif',
      category: ['Limited Edition', 'Sale'],
      mainCategory: ['men', 'new'],
      images: [
        '/products-images/shoe-1.avif',
        '/products-images/shoe-1.2.avif',
        '/products-images/shoe-2.1.avif',
        '/products-images/shoe-2.2.avif',
      ],
      description: 'รองเท้าผู้ชายสไตล์เออร์เบิ้น',
      discount_percent: 29,
    },
    {
      id: 3,
      name: 'Terrain Explorer',
      net_price: 159,
      price_per_unit: 180,
      image: '/products-images/shoe-2.1.avif',
      category: ['Best Sellers'],
      mainCategory: ['men'],
      images: [
        '/products-images/shoe-2.1.avif',
        '/products-images/shoe-2.2.avif',
        '/products-images/shoe-3.1.avif',
      ],
      description: 'รองเท้าสำหรับสำรวจภูมิประเทศ',
      discount_percent: 12,
    },
    {
      id: 4,
      name: 'City Runner',
      net_price: 139,
      price_per_unit: 175,
      image: '/products-images/shoe-2.2.avif',
      category: ['Performance Series'],
      mainCategory: ['women', 'new'],
      images: [
        '/products-images/shoe-2.2.avif',
        '/products-images/shoe-3.1.avif',
        '/products-images/shoe-3.2.avif',
      ],
      description: 'รองเท้าวิ่งสำหรับผู้หญิง',
      discount_percent: 20,
    },
    {
      id: 5,
      name: 'Trail Blazer',
      net_price: 159,
      price_per_unit: 190,
      image: '/products-images/shoe-3.1.avif',
      category: ['Performance Series'],
      mainCategory: ['women'],
      images: [
        '/products-images/shoe-3.1.avif',
        '/products-images/shoe-3.2.avif',
        '/products-images/shoe-4.1.avif',
      ],
      description: 'รองเท้าสำหรับกิจกรรมผจญภัย',
      discount_percent: 16,
    },
    {
      id: 6,
      name: 'Urban Explorer',
      net_price: 169,
      price_per_unit: 220,
      image: '/products-images/shoe-3.2.avif',
      category: ['Performance Series'],
      mainCategory: ['men'],
      images: [
        '/products-images/shoe-3.2.avif',
        '/products-images/shoe-4.1.avif',
        '/products-images/shoe-4.2.avif',
      ],
      description: 'รองเท้าผู้ชายสำหรับการเดินเมือง',
      discount_percent: 23,
    },
    {
      id: 7,
      name: 'Mountain Climber',
      net_price: 179,
      price_per_unit: 240,
      image: '/products-images/shoe-4.1.avif',
      category: ['Performance Series'],
      mainCategory: ['men'],
      images: [
        '/products-images/shoe-4.1.avif',
        '/products-images/shoe-4.2.avif',
        '/products-images/shoe-1.2.avif',
      ],
      description: 'รองเท้าสำหรับปีนเขา',
      discount_percent: 25,
    },
    {
      id: 8,
      name: 'Street Runner',
      net_price: 189,
      price_per_unit: 230,
      image: '/products-images/shoe-4.2.avif',
      category: ['Performance Series', 'Best Sellers'],
      mainCategory: ['women', 'new'],
      images: [
        '/products-images/shoe-4.2.avif',
        '/products-images/shoe-1.avif',
        '/products-images/shoe-2.1.avif',
      ],
      description: 'รองเท้าวิ่งสไตล์สตรีท',
      discount_percent: 18,
    },
    {
      id: 9,
      name: 'Kids Jumper',
      net_price: 109,
      price_per_unit: 140,
      image: '/products-images/shoe-1.avif',
      category: ['Performance Series', 'Sale'],
      mainCategory: ['kids', 'new'],
      images: [
        '/products-images/shoe-1.avif',
        '/products-images/shoe-2.2.avif',
        '/products-images/shoe-3.1.avif',
      ],
      description: 'รองเท้าสำหรับเด็ก',
      discount_percent: 22,
    },
  ];

  // จัดการการเปลี่ยนแปลงช่วงราคา
  const handlePriceChange = (value: number[]): void => {
    setPriceRange(value);
  };

  // จัดการการเปลี่ยนแปลงหมวดหมู่ย่อย
  const handleCategoryChange = (category: string): void => {
    setActiveCategory(category);
  };

  // กรองสินค้าตามหมวดหมู่หลัก, หมวดหมู่ย่อย และช่วงราคา
  const filteredProducts: ExtendedProductType[] = products.filter(
    (product: ExtendedProductType) => {
      // ตัวกรองราคา
      const priceMatch: boolean = product.net_price >= priceRange[0] && product.net_price <= priceRange[1];

      // ตัวกรองหมวดหมู่หลัก (NEW, MEN, WOMEN, KIDS)
      let mainCategoryMatch: boolean = true;
      if (activeMainCategory !== 'all') {
        mainCategoryMatch = product.mainCategory?.includes(activeMainCategory) || false;
      }

      // ตัวกรองหมวดหมู่ย่อย (Sale, Best Sellers, Limited Edition, Performance Series)
      let categoryMatch: boolean = true;
      if (activeCategory !== 'All Products') {
        categoryMatch = product.category?.includes(activeCategory) || false;
      }

      return priceMatch && mainCategoryMatch && categoryMatch;
    }
  );

  // หาหมวดหมู่ย่อยที่มีในหมวดหมู่หลักที่เลือก
  const getAvailableCategories = (): string[] => {
    const categories = new Set<string>();
    categories.add('All Products');

    products.forEach((product) => {
      if (activeMainCategory === 'all' || product.mainCategory?.includes(activeMainCategory)) {
        product.category?.forEach((cat) => {
          categories.add(cat);
        });
      }
    });

    return Array.from(categories);
  };

  // สร้างชื่อหัวข้อหน้าที่กำลังดูอยู่
  const getPageTitle = (): string => {
    if (activeMainCategory === 'all') {
      return 'All Products';
    }

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
        return 'Products';
    }
  };

  return (
    <div className="mx-auto py-12 sm:px-20">
      {/* หัวข้อหน้า */}

      <div className="flex flex-col gap-10 md:flex-row">
        {/* Sidebar พร้อมตัวกรอง */}
        <Sidebar
          priceRange={priceRange}
          onPriceChange={handlePriceChange}
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />

        {/* แสดงสินค้าที่กรองแล้ว */}
        <ProductGrid products={filteredProducts} />
      </div>
    </div>
  );
}
