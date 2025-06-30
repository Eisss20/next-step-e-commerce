'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { IoMdClose } from 'react-icons/io';
import { FaHeart } from 'react-icons/fa';
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';
import { ProductType } from '@/types/types';

export default function ProductDetail() {
  const params = useParams();
  const productId = params?.id;

  const [product, setProduct] = useState<ProductType | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [addedToCart, setAddedToCart] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState<ProductType[]>([]);
  const [loadingRelated, setLoadingRelated] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/products/${params.id}`);
        const data = res.data;

        if (data.success && data.data) {
          setProduct(data.data);
          setSelectedSize(data.data.sizes?.[0]?.size || null);

          // Fetch related products from same category
          fetchRelatedProducts(data.data.category_id, data.data.id);
        } else {
          setError('Product not found');
        }
      } catch (err) {
        setError('Error fetching product');
      } finally {
        setLoading(false);
      }
    };

    if (params?.id) fetchProduct();
  }, [params]);

  const fetchRelatedProducts = async (categoryId?: string, excludeId?: string | number) => {
    try {
      setLoadingRelated(true);
      const res = await axios.get(
        `/api/products?category=${categoryId}&limit=4&exclude=${excludeId}`
      );

      if (res.data.success && res.data.data) {
        setRelatedProducts(res.data.data.slice(0, 4)); // จำกัดแค่ 4 รายการ
      }
    } catch (err) {
      console.error('Error fetching related products:', err);
      try {
        const res = await axios.get(`/api/products?limit=4&exclude=${excludeId}`);
        if (res.data.success && res.data.data) {
          setRelatedProducts(res.data.data.slice(0, 4));
        }
      } catch (fallbackErr) {
        console.error('Error fetching fallback products:', fallbackErr);
      }
    } finally {
      setLoadingRelated(false);
    }
  };

  const handleSelectSize = (size: string) => setSelectedSize(size);
  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('โปรดเลือกขนาดรองเท้า');
      return;
    }
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 3000);
  };

  const handleAddToWishlist = () => alert('เพิ่มลงรายการโปรดแล้ว');

  const handlePrevImage = () => {
    if (!product?.images?.length) return;
    setCurrentImageIndex((prev) => (prev === 0 ? product.images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    if (!product?.images?.length) return;
    setCurrentImageIndex((prev) => (prev === product.images.length - 1 ? 0 : prev + 1));
  };

  const handleThumbnailClick = (index: number) => setCurrentImageIndex(index);

  const availableSizes = ['5', '6', '7', '8', '9', '10', '11', '12'];

  if (loading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  if (error || !product) {
    return (
      <div className="flex h-screen flex-col items-center justify-center">
        <h1 className="mb-4 text-2xl">{error || 'ไม่พบสินค้าที่คุณต้องการ'}</h1>
        <Link href="/products" className="text-amber-600 hover:underline">
          กลับไปหน้าสินค้า
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto mt-10 px-8 py-6 sm:mt-0 sm:px-20">
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
                  src={product.images?.[0]?.url || '/placeholder.svg'}
                  alt={product.name}
                  width={64}
                  height={64}
                  className="h-full w-full object-contain"
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

      <div className="grid h-full gap-20 md:grid-cols-2">
        {/* ภาพสินค้า */}
        <div className="relative">
          <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
            <Image
              src={product.images?.[currentImageIndex]?.url || '/placeholder.svg'}
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
          <div className="grid grid-cols-8 gap-2">
            {product.images.map((img, index) => (
              <div
                key={index}
                className={`relative aspect-square cursor-pointer rounded-md border-2 ${
                  index === currentImageIndex ? 'border-amber-600' : 'border-transparent'
                }`}
                onClick={() => handleThumbnailClick(index)}
              >
                <Image
                  src={img.url || '/placeholder.svg'}
                  alt={`Thumbnail ${index}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* รายละเอียดสินค้า */}
        <div className="relative w-full max-w-max">
          <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
          <p className="mt-1 text-lg text-gray-600">{product.description}</p>

          {/* ราคา */}
          <div className="mt-4 flex items-center space-x-3">
            <span className="text-xl font-bold">฿{product.net_price.toLocaleString()}</span>
            {product.discount_percent && product.discount_percent > 0 && (
              <>
                <span className="text-gray-400 line-through">
                  ฿{product.price_per_unit.toLocaleString()}
                </span>
                <span className="text-green-600">off {product.discount_percent}%</span>
              </>
            )}
          </div>

          {/* ขนาดรองเท้า */}
          <div className="mt-6">
            <h3 className="mb-2 text-sm font-medium text-gray-700">Select Size</h3>
            <div className="grid grid-cols-4 gap-3">
              {product.sizes.map((sizeObj) => {
                const isOutOfStock = sizeObj.stock === 0;
                return (
                  <button
                    key={sizeObj.id}
                    onClick={() => !isOutOfStock && handleSelectSize(sizeObj.size)}
                    disabled={isOutOfStock}
                    className={`border px-3 py-2 text-sm transition-all duration-200 ${
                      selectedSize === sizeObj.size
                        ? 'border-black bg-black text-white'
                        : 'border-gray-300 text-gray-700 hover:border-black'
                    } ${isOutOfStock ? 'cursor-not-allowed opacity-50' : ''}`}
                  >
                    {sizeObj.size}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ปุ่มการกระทำ */}
          <div className="mt-10 flex flex-col items-center space-y-4 px-10">
            <button
              onClick={handleAddToCart}
              className="w-full rounded-3xl bg-black px-6 py-4 text-white"
            >
              Add to Bag
            </button>

            <button
              onClick={handleAddToWishlist}
              className="flex w-full items-center justify-center rounded-3xl border border-gray-300 bg-white px-8 py-4 text-black"
            >
              <span className="mr-2">Favorite</span>
              <FaHeart className="text-bla" />
            </button>
          </div>

          {/* รายละเอียดเพิ่มเติม */}
          <div className="mt-10 space-y-4">
            <h2 className="text-lg font-semibold text-gray-800">Product Details</h2>
            <p className="text-gray-600">{product.detail_product || 'ไม่มีรายละเอียดเพิ่มเติม'}</p>
          </div>
        </div>
      </div>

      {/* You Might Also Like Section */}
      <div className="mt-16 border-t border-gray-200 pt-16">
        <h2 className="mb-8 text-center text-2xl font-bold text-gray-900">You might also like</h2>

        {loadingRelated ? (
          <div className="flex justify-center py-8">
            <div className="text-gray-500">Loading recommendations...</div>
          </div>
        ) : relatedProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {relatedProducts.map((relatedProduct) => (
              <Link
                key={relatedProduct.id}
                href={`/products/${relatedProduct.id}`}
                className="group block"
              >
                <div className="aspect-[4/3] overflow-hidden rounded-lg bg-gray-100">
                  <Image
                    src={relatedProduct.images?.[0]?.url || '/placeholder.svg'}
                    alt={relatedProduct.name}
                    width={300}
                    height={300}
                    className="h-full w-full object-contain transition-transform duration-200 group-hover:scale-105"
                  />
                </div>

                <div className="mt-4">
                  <h3 className="text-sm font-medium text-gray-900 group-hover:text-gray-700">
                    {relatedProduct.name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{relatedProduct.description}</p>
                  <div className="mt-2 flex items-center space-x-2">
                    <span className="text-sm font-bold text-gray-900">
                      ฿{relatedProduct.net_price.toLocaleString()}
                    </span>
                    {relatedProduct.discount_percent && relatedProduct.discount_percent > 0 && (
                      <span className="text-xs text-gray-400 line-through">
                        ฿{relatedProduct.price_per_unit.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex justify-center py-8">
            <div className="text-gray-500">No related products found</div>
          </div>
        )}

        {/* View All Products Link */}
        <div className="mt-12 text-center">
          <Link
            href="/products"
            className="inline-block rounded-3xl border border-gray-300 px-8 py-3 text-sm font-medium text-gray-700 transition-colors duration-200 hover:bg-gray-50"
          >
            View All Products
          </Link>
        </div>
      </div>
    </div>
  );
}
