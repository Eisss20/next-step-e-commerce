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
import { useCart } from '../../context/cartcontext';

export default function ProductDetail() {
  const params = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<ProductType | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [addedToCart, setAddedToCart] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState<ProductType[]>([]);
  const [loadingRelated, setLoadingRelated] = useState(false);
  const [showSizeError, setShowSizeError] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [favoriteAdded, setFavoriteAdded] = useState(false);

  // ตรวจสอบสถานะ favorite จาก localStorage
  useEffect(() => {
    if (product && typeof window !== 'undefined') {
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      setIsFavorited(favorites.includes(product.id));
    }
  }, [product]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/products/${params.id}`);
        const data = res.data;

        if (data.success && data.data) {
          setProduct(data.data);
          setSelectedSize(null);
          fetchRelatedProducts(data.data.category_id, data.data.id);
        } else {
          setError('Product not found.');
        }
      } catch {
        setError('Failed to fetch product.');
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
        setRelatedProducts(res.data.data.slice(0, 4));
      }
    } catch {
      console.error('Failed to fetch related products.');
      try {
        const res = await axios.get(`/api/products?limit=4&exclude=${excludeId}`);
        if (res.data.success && res.data.data) {
          setRelatedProducts(res.data.data.slice(0, 4));
        }
      } catch {
        console.error('Failed to fetch fallback products.');
      }
    } finally {
      setLoadingRelated(false);
    }
  };

  const handleSelectSize = (size: string) => {
    setSelectedSize(size);
    setShowSizeError(false);
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      setShowSizeError(true);
      setTimeout(() => setShowSizeError(false), 3000);
      return;
    }

    if (!product) return;

    addToCart({
      id: product.id,
      name: product.name,
      price: product.net_price,
      image: product.images?.[0]?.url || '/placeholder.svg',
      size: selectedSize,
    });

    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 3000);
  };

  const handleAddToWishlist = () => {
    if (!product) return;

    // อ่าน favorites จาก localStorage
    const currentFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');

    if (!isFavorited) {
      // เพิ่มเข้า favorites
      const newFavorites = [...currentFavorites, product.id];
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      setIsFavorited(true);
      setFavoriteAdded(true);
      console.log('Added to favorites:', product.name);

      // แสดง notification
      setTimeout(() => setFavoriteAdded(false), 3000);
    } else {
      // ลบออกจาก favorites
      const newFavorites = currentFavorites.filter((id: number | string) => String(id) !== String(product.id));
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      setIsFavorited(false);
      console.log('Removed from favorites:', product.name);
    }
  };

  const handlePrevImage = () => {
    if (!product?.images?.length) return;
    setCurrentImageIndex((prev) => (prev === 0 ? product.images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    if (!product?.images?.length) return;
    setCurrentImageIndex((prev) => (prev === product.images.length - 1 ? 0 : prev + 1));
  };

  const handleThumbnailClick = (index: number) => setCurrentImageIndex(index);

  if (loading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  if (error || !product) {
    return (
      <div className="flex h-screen flex-col items-center justify-center">
        <h1 className="mb-4 text-2xl">{error || 'Product not found.'}</h1>
        <Link href="/products" className="text-amber-600 hover:underline">
          Back to Products
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

      {/* Add to Cart Success Notification */}
      {addedToCart && (
        <div className="fixed inset-0 z-50 flex items-start justify-end pt-15 pl-4">
          <div className="relative w-full max-w-md rounded-lg border border-gray-200 bg-white p-4 shadow-lg">
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
                <h3 className="text-lg font-medium text-green-600">Added to Cart</h3>
                <p className="text-sm font-medium">{product.name}</p>
                <p className="text-sm text-gray-500">{product.category?.name}</p>
                <p className="text-sm">Size: {selectedSize}</p>
                <p className="text-sm font-semibold">฿{product.net_price.toLocaleString()}</p>
              </div>
            </div>

            <div className="mt-4 flex space-x-2">
              <button
                className="flex-1 rounded-lg border border-gray-300 py-2 text-gray-700 hover:bg-gray-50"
                onClick={() => setAddedToCart(false)}
              >
                Continue Shopping
              </button>
              <Link
                href="/cart"
                className="flex-1 rounded-lg bg-black py-2 text-center text-white hover:bg-gray-800"
                onClick={() => setAddedToCart(false)}
              >
                View Cart
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Add to Favorites Success Notification */}
      {favoriteAdded && (
        <div className="fixed top-10 right-4 z-50 w-full max-w-sm rounded-xl border border-gray-200 bg-white p-4 shadow-lg">
          {/* ปุ่มปิด */}
          <button
            onClick={() => setFavoriteAdded(false)}
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* ข้อความสำเร็จ */}
          <div className="mb-3 flex items-center space-x-2">
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500">
              <span className="text-xs font-bold text-white">✓</span>
            </div>
            <p className="text-sm font-semibold text-black">Added to Favorites</p>
          </div>

          {/* รายละเอียดสินค้า */}
          <div className="flex items-center space-x-4">
            <div className="h-16 w-16 overflow-hidden rounded-lg bg-gray-100">
              <Image
                src={product.images?.[0]?.url || '/placeholder.svg'}
                alt={product.name}
                width={64}
                height={64}
                className="h-full w-full object-contain"
              />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-black">{product.name}</p>
              {product.category?.name && (
                <p className="text-sm text-gray-500">{product.category.name}</p>
              )}
              <p className="text-sm font-medium text-black">
                ฿{product.net_price.toLocaleString()}
              </p>
            </div>
          </div>

          {/* ปุ่ม */}
          <div className="mt-4">
            <Link
              href="/favorites"
              onClick={() => setFavoriteAdded(false)}
              className="block w-full rounded-full bg-black py-2 text-center text-sm font-medium text-white hover:bg-gray-800"
            >
              View Favorites
            </Link>
          </div>
        </div>
      )}

      <div className="grid h-full gap-20 md:grid-cols-2">
        {/* Product Images */}
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

          {/* Thumbnails */}
          <div className="grid grid-cols-8 gap-0.5">
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

        {/* Product Details */}
        <div className="relative w-full max-w-max">
          <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
          <p className="mt-1 text-lg text-gray-600">{product.description}</p>

          {/* Price */}
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

          {/* Sizes */}
          <div className="mt-6">
            <h3 className="mb-2 text-sm font-medium text-gray-700">
              Select Size {showSizeError && <span className="text-red-500">*</span>}
            </h3>
            {showSizeError && (
              <p className="mb-2 text-sm text-red-500">Please select a size to continue.</p>
            )}
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
                        : showSizeError
                          ? 'border-red-300 text-gray-700 hover:border-red-500'
                          : 'border-gray-300 text-gray-700 hover:border-black'
                    } ${isOutOfStock ? 'cursor-not-allowed opacity-50' : ''}`}
                  >
                    {sizeObj.size}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Actions */}
          <div className="mt-10 flex flex-col items-center space-y-4 px-10">
            <button
              onClick={handleAddToCart}
              className="w-full rounded-3xl bg-black px-6 py-4 text-white transition-colors duration-200 hover:bg-gray-800"
            >
              Add to Bag
            </button>

            <button
              onClick={handleAddToWishlist}
              className={`flex w-full items-center justify-center rounded-3xl border px-8 py-4 transition-colors duration-200 ${
                isFavorited
                  ? 'border-red-500 bg-red-50 text-red-600 hover:bg-red-100'
                  : 'border-gray-300 bg-white text-black hover:bg-gray-50'
              }`}
            >
              <span className="mr-2">{isFavorited ? 'Favorited' : 'Add to Favorites'}</span>
              <FaHeart className={isFavorited ? 'text-red-500' : 'text-black'} />
            </button>
          </div>

          {/* More Details */}
          <div className="mt-10 space-y-4">
            <h2 className="text-lg font-semibold text-gray-800">Product Details</h2>
            <p className="text-gray-600">
              {product.detail_product || 'No additional information.'}
            </p>
          </div>
        </div>
      </div>

      {/* Related Products */}
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
            <div className="text-gray-500">No related products found.</div>
          </div>
        )}

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
