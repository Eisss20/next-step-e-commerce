'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface MobileSidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  className?: string;
}

export default function MobileSidebar({ isOpen, toggleSidebar }: MobileSidebarProps) {
  const [isShopDropdownOpen, setIsShopDropdownOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  // ป้องกัน hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleShopDropdown = () => {
    setIsShopDropdownOpen(!isShopDropdownOpen);
  };

  // ฟังก์ชันสำหรับการนำทาง
  const handleNavigation = (path: string) => {
    router.push(path);
    toggleSidebar(); // ปิด sidebar หลังจากคลิก
  };

  // ไม่ render จนกว่า component จะ mount เสร็จ
  if (!mounted) {
    return null;
  }

  return (
    <>
      {/* Hamburger Button */}
      <button
        className="fixed top-4 right-4 z-50 p-2 transition-transform duration-200 active:scale-90 lg:hidden"
        onClick={toggleSidebar}
        aria-label="Toggle menu"
      >
        <div className="relative h-8 w-8">
          {/* เส้นบน */}
          <span
            className={`absolute top-4 left-0 h-0.5 w-8 bg-black transition-all duration-300 ${
              isOpen ? 'rotate-45' : '-translate-y-2'
            }`}
          />
          {/* เส้นกลาง */}
          <span
            className={`absolute top-4 left-0 h-0.5 w-8 bg-black transition-all duration-300 ${
              isOpen ? 'opacity-0' : 'opacity-100'
            }`}
          />
          {/* เส้นล่าง */}
          <span
            className={`absolute top-4 left-0 h-0.5 w-8 bg-black transition-all duration-300 ${
              isOpen ? '-rotate-45' : 'translate-y-2'
            }`}
          />
        </div>
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/30 transition-opacity duration-300"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 z-40 h-full w-72 transform bg-white shadow-lg transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* เมนูภายใน Sidebar */}
        <nav className="mt-12 flex flex-col space-y-4 p-6">
          <Link
            href="/"
            className="text-lg font-semibold text-gray-900 transition-colors"
            onClick={toggleSidebar}
          >
            Home
          </Link>
          <Link
            href="/about"
            className="text-lg font-semibold text-gray-900 transition-colors "
            onClick={toggleSidebar}
          >
            About
          </Link>

          {/* Shop with Dropdown */}
          <div className="relative">
            <button
              onClick={toggleShopDropdown}
              className="flex w-full items-center justify-between text-lg font-semibold text-gray-900 transition-colors "
              aria-expanded={isShopDropdownOpen}
            >
              Shop
              <svg
                className={`h-4 w-4 transition-transform duration-200 ${
                  isShopDropdownOpen ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Dropdown Menu */}
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isShopDropdownOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="mt-6 space-y-2">
                <button
                  className="block w-full cursor-pointer py-2 text-left text-base text-gray-700 transition-colors hover:text-yellow-600"
                  onClick={() => handleNavigation('/products?mainCategory=new')}
                >
                  NEW ARRIVALS
                </button>
                <button
                  className="block w-full cursor-pointer py-2 text-left text-base text-gray-700 transition-colors hover:text-yellow-600"
                  onClick={() => handleNavigation('/products?mainCategory=men')}
                >
                  MEN'S COLLECTION
                </button>
                <button
                  className="block w-full cursor-pointer py-2 text-left text-base text-gray-700 transition-colors hover:text-yellow-600"
                  onClick={() => handleNavigation('/products?mainCategory=women')}
                >
                  WOMEN'S COLLECTION
                </button>
                <button
                  className="block w-full cursor-pointer py-2 text-left text-base text-gray-700 transition-colors hover:text-yellow-600"
                  onClick={() => handleNavigation('/products?mainCategory=kids')}
                >
                  KIDS' COLLECTION
                </button>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
