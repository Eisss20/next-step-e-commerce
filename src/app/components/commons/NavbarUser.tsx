'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SearchBarShopping from '../ui/SearchBarShopping';
import { PiHeartFill } from 'react-icons/pi';
import { GoPerson } from 'react-icons/go';
import CartButton from '../cart/CartButton';
import SlideText from '../ui/SlideText';
import { motion } from 'framer-motion';

// กำหนด interface สำหรับรายการสินค้าในแต่ละ category
// Define interface for product items in each category
interface ProductItem {
  id: number;
  name: string;
  price: number;
  image: string;
  route: string;
}

// กำหนด interface สำหรับรายการเมนูย่อย
// Define interface for submenu items
interface SubMenuItem {
  label: string;
  route: string;
}

// กำหนด interface สำหรับ object ที่เก็บเมนูย่อยทั้งหมด
// Define interface for submenu options object
interface SubMenuOptions {
  [key: number]: SubMenuItem[];
}

// กำหนด interface สำหรับรายการสินค้าในแต่ละ category
// Define interface for product items in each category
interface CategoryProducts {
  [key: number]: ProductItem[];
}

export default function NavbarUser() {
  // สถานะสำหรับเก็บ category ที่กำลัง active
  // State for storing active category
  const [activeCategory, setActiveCategory] = useState<number | null>(null);

  // ref สำหรับอ้างอิงถึง nav element
  // Ref for nav element
  const navRef = useRef<HTMLDivElement>(null);

  // ref สำหรับจัดการ timeout ในการแสดง/ซ่อน dropdown
  // Ref for managing dropdown show/hide timeout
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // ฟังก์ชันจัดการเมื่อ hover ที่เมนู
  // Function to handle menu hover
  const handleCategoryHover = (id: number) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setActiveCategory(id);
  };

  // ฟังก์ชันจัดการเมื่อเอาเมาส์ออกจากเมนู
  // Function to handle mouse leave
  const handleMouseLeave = () => {
    // ใช้ timeout เพื่อป้องกันการกระพริบของ dropdown
    // Use timeout to prevent dropdown flickering
    timeoutRef.current = setTimeout(() => {
      setActiveCategory(null);
    }, 100);
  };

  // รายการเมนูหลัก
  // Main menu items
  const menuItems = [
    { id: 1, label: 'NEW', route: '#' },
    { id: 2, label: 'MEN', route: '#' },
    { id: 3, label: 'WOMEN', route: '#' },
    { id: 4, label: 'KIDS', route: '#' },
  ];

  // รายการ action items (ปุ่มด้านขวา)
  // Action items (right side buttons)
  const actionItems = [
    { id: 'contract', label: 'Contact us', type: 'link', route: '#' },
    { id: 'person', icon: <GoPerson className="h-6 w-6" />, type: 'link', route: '#' },
    { id: 'heart', icon: <PiHeartFill className="h-6 w-6" />, type: 'link', route: '#' },
  ];

  // รายการเมนูย่อยสำหรับแต่ละหมวดหมู่
  // Submenu options for each category
  const subMenuOptions: SubMenuOptions = {
    1: [
      { label: 'View all product', route: '#' },
      { label: 'Sale', route: '#' },
      { label: 'Best Sellers', route: '#' },
      { label: 'Limited Editions', route: '#' },
      { label: 'Performance Series', route: '#' },
    ],
    2: [
      { label: 'View all product', route: '#' },
      { label: 'Sale', route: '#' },
      { label: 'Best Sellers', route: '#' },
      { label: 'Limited Editions', route: '#' },
      { label: 'Performance Series', route: '#' },
    ],
    3: [
      { label: 'View all product', route: '#' },
      { label: 'Sale', route: '#' },
      { label: 'Best Sellers', route: '#' },
      { label: 'Limited Editions', route: '#' },
      { label: 'Performance Series', route: '#' },
    ],
    4: [
      { label: 'View all product', route: '#' },
      { label: 'Sale', route: '#' },
      { label: 'Best Sellers', route: '#' },
      { label: 'Limited Editions', route: '#' },
      { label: 'Performance Series', route: '#' },
    ],
  };

  // รายการสินค้าในแต่ละ category
  // Product items for each category
  const categoryProducts: CategoryProducts = {
    1: [
      // NEW
      {
        id: 1,
        name: 'Latest Sneaker 2024',
        price: 129.99,
        image: '/images/content-nav/AIR+MAX+DN8-4.png',
        route: '#',
      },
      {
        id: 2,
        name: 'Air Max DN8',
        price: 149.99,
        image: '/images/content-nav/AIR+MAX+DN8-5.png',
        route: '#',
      },
      {
        id: 3,
        name: 'Air Max DN8 AMD',
        price: 159.99,
        image: '/images/content-nav/AIRMAXDN8AMD-1.png',
        route: '#',
      },
      {
        id: 4,
        name: 'Air Max DN8 AMD Pro',
        price: 179.99,
        image: '/images/content-nav/AIRMAXDN8AMD-2.png',
        route: '#',
      },
      {
        id: 5,
        name: 'Nike Vomero',
        price: 139.99,
        image: '/images/content-nav/NIKE+VOMERO-2.png',
        route: '#',
      },
    ],
    2: [
      // MEN
      {
        id: 1,
        name: 'Classic Oxford Shirt',
        price: 79.99,
        image: '/images/content-nav/men-1.png',
        route: '#',
      },
      {
        id: 2,
        name: 'Business Suit',
        price: 399.99,
        image: '/images/content-nav/men-2.png',
        route: '#',
      },
      {
        id: 3,
        name: 'Casual Denim',
        price: 89.99,
        image: '/images/content-nav/men-3.png',
        route: '#',
      },
      {
        id: 4,
        name: 'Sport Jacket',
        price: 129.99,
        image: '/images/content-nav/men-4.png',
        route: '#',
      },
      {
        id: 5,
        name: 'Running Shoes',
        price: 119.99,
        image: '/images/content-nav/men-5.png',
        route: '#',
      },
    ],
    3: [
      // WOMEN
      {
        id: 1,
        name: 'Evening Dress',
        price: 199.99,
        image: '/images/content-nav/woman-1.png',
        route: '#',
      },
      {
        id: 2,
        name: 'Designer Handbag',
        price: 299.99,
        image: '/images/content-nav/woman-2.png',
        route: '#',
      },
      {
        id: 3,
        name: 'Summer Blouse',
        price: 69.99,
        image: '/images/content-nav/woman-3.png',
        route: '#',
      },
      {
        id: 4,
        name: 'Yoga Set',
        price: 89.99,
        image: '/images/content-nav/woman-4.png',
        route: '#',
      },
      {
        id: 5,
        name: 'High Heels',
        price: 159.99,
        image: '/images/content-nav/woman-5.png',
        route: '#',
      },
    ],
    4: [
      // KIDS
      {
        id: 1,
        name: 'School Collection',
        price: 69.99,
        image: '/images/content-nav/kid-1.png',
        route: '#',
      },
      {
        id: 2,
        name: 'Play Set',
        price: 49.99,
        image: '/images/content-nav/kid-2.png',
        route: '#',
      },
      {
        id: 3,
        name: 'Sport Gear',
        price: 79.99,
        image: '/images/content-nav/kid-3.png',
        route: '#',
      },
      {
        id: 4,
        name: 'Winter Wear',
        price: 89.99,
        image: '/images/content-nav/kid-4.png',
        route: '#',
      },
      {
        id: 5,
        name: 'Casual Shoes',
        price: 59.99,
        image: '/images/content-nav/kid-5.png',
        route: '#',
      },
    ],
  };

  return (
    <>
      <SlideText />
      {/* Container สำหรับ navbar ทั้งหมด */}
      {/* Container for entire navbar */}
      <div className="relative z-40" ref={navRef}>
        <nav className="hidden lg:block">
          <div className="flex items-center justify-between bg-gray-100 px-10 py-3">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <img src="/images/next-step-logo.svg" width="120" height="120" alt="Next Step Logo" />
            </Link>

            {/* เมนูหลัก พร้อม animation */}
            {/* Main menu with animation */}
            <div className="flex flex-row justify-start space-x-5">
              {menuItems.map((item) => (
                <motion.div
                  key={item.id}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                  className="flex justify-center rounded-2xl p-2 font-medium whitespace-nowrap transition-all duration-300 hover:bg-gray-200 hover:text-amber-600"
                  onMouseEnter={() => handleCategoryHover(item.id)}
                >
                  <Link href={item.route}>{item.label}</Link>
                </motion.div>
              ))}
            </div>

            {/* ช่องค้นหา */}
            {/* Search section */}
            <section className="pb-5">
              <SearchBarShopping />
            </section>

            {/* Action Items ด้านขวา */}
            {/* Right side action items */}
            <figure className="flex flex-row items-center justify-end space-x-10 px-5 pr-10">
              {actionItems.map((item) => (
                <motion.div
                  key={item.id}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                  className="flex justify-center rounded-2xl p-2 whitespace-nowrap transition-all duration-300 hover:bg-gray-200 hover:text-amber-600"
                >
                  <Link href={item.route}>{item.label ?? item.icon}</Link>
                </motion.div>
              ))}
              <CartButton />
            </figure>
          </div>

          {/* Dropdown Menu เมื่อ hover */}
          {/* Dropdown Menu on hover */}
          {activeCategory && (
            <div
              className="absolute top-full left-0 z-50 w-full bg-white shadow-lg"
              onMouseEnter={() => {
                if (timeoutRef.current) {
                  clearTimeout(timeoutRef.current);
                  timeoutRef.current = null;
                }
              }}
              onMouseLeave={handleMouseLeave}
            >
              <div className="flex px-16 py-4">
                {/* เมนูย่อยด้านซ้าย */}
                {/* Left side submenu */}
                <div className="mr-8 w-48 border-r border-gray-200 py-2">
                  {subMenuOptions[activeCategory].map((option, index) => (
                    <Link
                      href={option.route}
                      key={index}
                      className="block py-2 text-sm hover:text-amber-600"
                    >
                      {option.label}
                    </Link>
                  ))}
                </div>
                {/* พื้นที่แสดงรูปภาพด้านขวา */}
                {/* Right side image display area */}
                <div className="container flex w-full max-w-full flex-grow flex-row items-center justify-center space-x-12">
                  {categoryProducts[activeCategory]?.map((product) => (
                    <Link
                      key={product.id}
                      href={product.route}
                      className="flex flex-col items-center hover:text-amber-600"
                    >
                      <div className="relative h-44 w-44 overflow-hidden rounded-sm bg-gray-200 shadow-md">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 176px) 100vw, 176px"
                        />
                      </div>
                      <span className="mt-2 text-sm font-medium">{product.name}</span>
                      <span className="text-sm text-gray-600">${product.price}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
        </nav>
      </div>
    </>
  );
}
