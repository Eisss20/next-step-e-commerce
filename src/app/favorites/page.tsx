'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { PiHeartFill } from 'react-icons/pi';
import type { ProductType } from '@/types/types';
import { useCart } from '../context/cartcontext';

interface FavoriteItem {
  id: number;
  productId: number;
  dateAdded: string;
  product?: ProductType;
}

export default function FavoritesPage() {
  const { addToCart } = useCart();
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [addedToCart, setAddedToCart] = useState<{ show: boolean; product?: ProductType }>({
    show: false,
  });
  const [selectedSize, setSelectedSize] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      setLoading(true);
      const favoriteIds = JSON.parse(localStorage.getItem('favorites') || '[]');

      if (favoriteIds.length === 0) {
        setFavorites([]);
        setLoading(false);
        return;
      }

      const favoritePromises = favoriteIds.map(async (id: number) => {
        try {
          const response = await axios.get(`/api/products/${id}`);
          if (response.data.success) {
            return {
              id: Date.now() + Math.random(),
              productId: id,
              dateAdded: new Date().toISOString(),
              product: response.data.data,
            };
          }
          return null;
        } catch {
          return null;
        }
      });

      const favoriteItems = await Promise.all(favoritePromises);
      const validFavorites = favoriteItems.filter((item) => item !== null) as FavoriteItem[];
      setFavorites(validFavorites);
    } catch (err) {
      setError('Failed to load favorites');
      console.error('Error fetching favorites:', err);
    } finally {
      setLoading(false);
    }
  };

  const removeFromFavorites = (productId: number) => {
    setFavorites((prev) => prev.filter((item) => item.productId !== productId));
    const currentFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const updatedFavorites = currentFavorites.filter((id: number) => id !== productId);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const handleAddToCart = (product: ProductType) => {
    const size = selectedSize[product.id.toString()] || 'M'; // Default size

    addToCart({
      id: product.id,
      name: product.name,
      price: product.net_price,
      image: product.images?.[0]?.url || '/placeholder.svg',
      size: size,
    });

    setAddedToCart({ show: true, product });
    setTimeout(() => setAddedToCart({ show: false }), 3000);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-black border-t-transparent"></div>
          <p className="text-sm text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-white">
        <h1 className="mb-4 text-xl text-red-600">{error}</h1>
        <button
          onClick={fetchFavorites}
          className="bg-black px-6 py-2 text-sm text-white transition-colors hover:bg-gray-800"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="mix-h-screen bg-white">
      {/* Add to Cart Success Notification */}
      {addedToCart.show && addedToCart.product && (
        <div className="fixed right-4 z-50 max-w-sm rounded-lg border border-gray-200 bg-white p-4 shadow-lg">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div className="h-12 w-12 overflow-hidden rounded bg-gray-100">
                <Image
                  src={addedToCart.product.images?.[0]?.url || '/placeholder.svg'}
                  alt={addedToCart.product.name}
                  width={48}
                  height={48}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-medium text-green-600">Added to Cart</p>
                <p className="text-xs text-gray-600">{addedToCart.product.name}</p>
              </div>
            </div>
            <button
              onClick={() => setAddedToCart({ show: false })}
              className="text-gray-400 hover:text-gray-600"
            ></button>
          </div>
        </div>
      )}

      <div className="mx-auto px-14 py-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-2xl font-medium text-black">Favorites</h1>
        </div>

        {/* Empty State */}
        {favorites.length === 0 ? (
          <div className="py-20 text-center">
            <div className="mb-6">
              <PiHeartFill className="mx-auto h-16 w-16 text-gray-300" />
            </div>
            <h2 className="mb-2 text-xl font-medium text-gray-900">
              Items added to your Favorites will be saved here.
            </h2>
            <p className="mb-8 text-gray-600">Start adding products you love to see them here.</p>
            <Link
              href="/products"
              className="inline-block bg-black px-8 py-3 text-sm text-white transition-colors hover:bg-gray-800"
            >
              Shop Now
            </Link>
          </div>
        ) : (
          /* Products Grid */
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {favorites.map((favorite) => {
              const product = favorite.product;
              if (!product) return null;

              return (
                <div key={favorite.id} className="group">
                  {/* Product Image Container */}
                  <div className="relative mb-4">
                    <Link href={`/products/${product.id}`}>
                      <div className="relative aspect-square overflow-hidden bg-gray-50">
                        <Image
                          src={product.images?.[0]?.url || '/placeholder.svg'}
                          alt={product.name}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                    </Link>

                    {/* Heart Icon */}
                    <button
                      onClick={() => removeFromFavorites(favorite.productId)}
                      className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm transition-shadow hover:shadow-md"
                    >
                      <PiHeartFill className="h-5 w-full fill-black text-black" />
                    </button>
                  </div>

                  {/* Product Info */}
                  <div className="space-y-1">
                    <div className="flex items-start justify-between">
                      <Link href={`/products/${product.id}`} className="flex-1">
                        <h3 className="font-medium text-black hover:text-gray-600">
                          {product.name}
                        </h3>
                      </Link>
                      <span className="text-md font-medium whitespace-nowrap text-black">
                        ฿{product.net_price.toLocaleString()}
                      </span>
                    </div>

                    <p className="line-clamp-2 text-sm text-gray-500">{product.description}</p>

                    {/* Add to Cart Button */}
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="text-md mt-4 ml-4 w-auto rounded-3xl border border-gray-300 px-6 py-2 text-black"
                    >
                      Add to Bag
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Continue Shopping */}
        {favorites.length > 0 && (
          <div className="mt-16 text-center">
            <Link
              href="/products"
              className="inline-block border border-gray-300 px-10 py-3 text-sm text-gray-700 transition-colors hover:bg-gray-50"
            >
              Continue Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
