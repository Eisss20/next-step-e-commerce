'use client';

import { useState, useEffect } from 'react';
import { PiShoppingCartSimpleLight } from 'react-icons/pi';
import { IoMdClose } from 'react-icons/io';

// ทำ context api สำหรับการจัดการสินค้าในตะกร้า
// ทำการเพิ่มสินค้าลงในตะกร้า

export default function CartButton() {
  interface CartItem {
    id: number;
    name: string;
    price: number;
    image: string;
  }

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setCartItems([
      {
        id: 1,
        name: 'Nike Air Max 16 OG',
        price: 120,
        image: '/images/products/NIKEAIRMAX16OGG-1.png',
      },
      {
        id: 2,
        name: 'Nike Air Max 16 OG',
        price: 100,
        image: '/images/products/NIKEAIRMAX16OGG-2.png',
      },
    ]);
  }, []);

  const removeFromCart = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  return (
    <div
      className="relative cursor-pointer"
      onMouseEnter={() => setIsCartOpen(true)}
      onMouseLeave={() => setIsCartOpen(false)}
    >
      <button className="cursor-pointer rounded-2xl p-2 transition-all duration-300 hover:bg-gray-200 hover:text-amber-600">
        <PiShoppingCartSimpleLight className="h-6 w-6" />
        {cartItems.length > 0 && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4 animate-pulse items-center justify-center rounded-full bg-amber-500 text-[10px] font-semibold text-white transition-all duration-300">
            {cartItems.length}
          </span>
        )}
      </button>

      {isCartOpen && (
        <div className="absolute top-10 right-0 w-80 rounded-lg border border-gray-200 bg-white p-4 shadow-lg">
          <h3 className="mb-2 text-lg font-semibold">Your Cart</h3>
          {cartItems.length === 0 ? (
            <p className="text-gray-500">Your cart is empty.</p>
          ) : (
            <ul className="space-y-2">
              {cartItems.map((product) => (
                <li
                  key={product.id}
                  className="group flex items-center justify-between space-x-3 rounded-xl p-2 hover:bg-gray-100"
                >
                  <div className="flex items-center space-x-3">
                    {cartItems.length > 0 && (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-12 w-12 rounded border border-gray-200 object-cover"
                      />
                    )}
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-gray-500">${product.price}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(product.id)}
                    className="cursor-pointer rounded-full p-1 text-gray-400 transition-colors duration-200 hover:bg-red-50 hover:text-red-500"
                  >
                    <IoMdClose size={20} title="Remove" />
                  </button>
                </li>
              ))}
            </ul>
          )}
          <div className="mt-3 space-y-2">
            <div className="flex justify-between font-medium">
              <span>Total:</span>
              <span>${cartItems.reduce((sum, item) => sum + item.price, 0).toFixed(2)}</span>
            </div>
            <button className="w-full cursor-pointer rounded-2xl bg-amber-600 py-2 text-white transition hover:bg-amber-700">
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
