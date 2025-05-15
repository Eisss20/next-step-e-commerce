'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { IoMdClose } from 'react-icons/io';
import { FaHeart } from 'react-icons/fa';
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';
import { ProductType } from '@/types/types';

// ขยาย ProductType ให้รองรับ mainCategory
interface ExtendedProductType extends ProductType {
  mainCategory?: string[];
}

// ข้อมูลสินค้าตัวอย่าง - เพิ่ม mainCategory
const dummyProducts: ExtendedProductType[] = [
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
    discount_percent: 35,
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
  // เพิ่มสินค้าอื่นๆ ตามต้องการ
];

export default function ProductDetail({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<ExtendedProductType | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [addedToCart, setAddedToCart] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  

  useEffect(() => {
    const productId = params?.id;
    if (productId) {
      const foundProduct = dummyProducts.find((p) => p.id === Number(productId));
      if (foundProduct) {
        setProduct(foundProduct);
        setSelectedSize('12'); // เลือก size เริ่มต้น
      }
    }
    setLoading(false);
  }, [params]);

  const handleSelectSize = (size: string) => {
    setSelectedSize(size);
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('โปรดเลือกขนาดรองเท้า');
      return;
    }
    setTimeout(() => {
      setAddedToCart(true);
      setTimeout(() => {
        setAddedToCart(false);
      }, 3000);
    }, 500);
  };

  const handleAddToWishlist = () => {
    alert('เพิ่มลงรายการโปรดแล้ว');
  };

  const handlePrevImage = () => {
    if (product?.images) {
      setCurrentImageIndex((prev) => (prev === 0 ? product.images.length - 1 : prev - 1));
    }
  };

  const handleNextImage = () => {
    if (product?.images) {
      setCurrentImageIndex((prev) => (prev === product.images.length - 1 ? 0 : prev + 1));
    }
  };

  const handleThumbnailClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  const availableSizes = [
    '4',
    '4.5',
    '5',
    '5.5',
    '6',
    '6.5',
    '7',
    '7.5',
    '8',
    '8.5',
    '9',
    '9.5',
    '10',
    '10.5',
    '11',
    '11.5',
    '12',
    '13',
  ];

  if (loading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  if (!product) {
    return (
      <div className="flex h-screen flex-col items-center justify-center">
        <h1 className="mb-4 text-2xl">ไม่พบสินค้าที่คุณต้องการ</h1>
        <Link href="/products" className="text-amber-600 hover:underline">
          กลับไปหน้าสินค้า
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto px-4 py-6 sm:px-20">
      {/* Breadcrumb */}
      <nav className="mb-4 flex text-sm">
        <Link href="/" className="text-gray-500 hover:text-gray-700">
          Home
        </Link>
        <span className="mx-2 text-gray-400">&gt;</span>
        <Link href="/products" className="text-gray-500 hover:text-gray-700">
          Products
        </Link>
        <span className="mx-2 text-gray-400">&gt;</span>
        <span className="text-gray-700">{product.name}</span>
      </nav>

      {/* แจ้งเตือนเพิ่มลงตะกร้า */}
      {addedToCart && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20">
          <div className="relative w-full max-w-md rounded-lg bg-white p-4 shadow-lg">
            <button
              onClick={() => setAddedToCart(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            >
              <IoMdClose size={24} />
            </button>

            <div className="flex items-center">
              <div className="mr-4 h-16 w-16 overflow-hidden rounded-lg">
                <Image
                  src={product.images?.[0] || product.image || '/placeholder.svg'}
                  alt={product.name}
                  width={64}
                  height={64}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-lg font-medium">{product.name}</h3>
                <p className="text-sm text-gray-600">{product.description}</p>
                <p className="text-sm">ไซด์ {selectedSize}</p>
                <p className="text-sm font-semibold">฿{product.net_price.toLocaleString()}</p>
              </div>
            </div>

            <div className="mt-4">
              <button
                className="w-full rounded-none bg-black py-3 text-white"
                onClick={() => setAddedToCart(false)}
              >
                ปิดการแจ้งเตือน
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols- gap-8 md:grid-cols-2">
        {/* ภาพสินค้า */}
        <div className="relative">
          <div className="relative aspect-square overflow-hidden bg-gray-100">
            <Image
              src={product.images?.[currentImageIndex] || product.image || '/placeholder.svg'}
              alt={product.name}
              fill
              className="object-cover"
            />
            <button
              onClick={handlePrevImage}
              className="absolute top-1/2 left-2 -translate-y-1/2 rounded-full bg-white/60 p-2"
            >
              <SlArrowLeft size={16} />
            </button>
            <button
              onClick={handleNextImage}
              className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full bg-white/60 p-2"
            >
              <SlArrowRight size={16} />
            </button>
          </div>

          {/* Thumbnail */}
          <div className="mt-4 grid grid-cols-8 gap-2">
            {(product.images || [product.image]).map((img, index) => (
              <div
                key={index}
                className={`relative aspect-square cursor-pointer rounded-md border-2 ${
                  index === currentImageIndex ? 'border-amber-600' : 'border-transparent'
                }`}
                onClick={() => handleThumbnailClick(index)}
              >
                <Image
                  src={img || '/placeholder.svg'}
                  alt={`Thumbnail ${index}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* รายละเอียดสินค้า */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
          <p className="mt-1 text-lg text-gray-600">{product.description}</p>

          {/* ราคา */}
          <div className="mt-4 flex items-center space-x-3">
            <span className="text-xl font-bold">฿{product.net_price.toLocaleString()}</span>
            {product.price_per_unit && (
              <>
                <span className="text-gray-400 line-through">
                  ฿{product.price_per_unit.toLocaleString()}
                </span>
                <span className="text-green-600">ลดราคา {product.discount_percent}%</span>
              </>
            )}
          </div>

          {/* ขนาดรองเท้า */}
          <div className="mt-6">
            <h3 className="mb-2 text-sm font-medium text-gray-700">เลือกขนาด</h3>
            <div className="grid grid-cols-6 gap-2">
              {availableSizes.map((size) => (
                <button
                  key={size}
                  onClick={() => handleSelectSize(size)}
                  className={`border px-3 py-2 text-sm ${
                    selectedSize === size
                      ? 'border-black bg-black text-white'
                      : 'border-gray-300 text-gray-700 hover:border-black'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* ปุ่มการกระทำ */}
          <div className="mt-6 flex space-x-4">
            <button onClick={handleAddToCart} className="flex-1 bg-black px-6 py-3 text-white">
              เพิ่มลงตะกร้า
            </button>
            <button
              onClick={handleAddToWishlist}
              className="flex items-center justify-center border border-gray-300 px-4"
            >
              <FaHeart className="text-red-500" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
