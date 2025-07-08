'use client';

import { useState } from 'react';
import { PiShoppingCartSimpleLight } from 'react-icons/pi';
import { IoMdClose } from 'react-icons/io';
import { useCart } from '../../context/cartcontext';
import Image from 'next/image';
import Link from 'next/link';

export default function CartButton() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice, getTotalItems } = useCart();

  const handleQuantityChange = (id: string, size: string, newQuantity: number) => {
    updateQuantity(id, size, newQuantity);
  };

  return (
    <div
      className="relative cursor-pointer"
      onMouseEnter={() => setIsCartOpen(true)}
      onMouseLeave={() => setIsCartOpen(false)}
    >
      <button className="cursor-pointer rounded-2xl p-2 transition-all duration-300 hover:bg-gray-200 hover:text-amber-600">
        <PiShoppingCartSimpleLight className="h-6 w-6" />
        {getTotalItems() > 0 && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4 animate-pulse items-center justify-center rounded-full bg-amber-500 text-[10px] font-semibold text-white transition-all duration-300">
            {getTotalItems()}
          </span>
        )}
      </button>

      {isCartOpen && (
        <div className="absolute top-10 right-0 z-50 w-80 rounded-lg border border-gray-200 bg-white p-4 shadow-lg">
          <h3 className="mb-2 text-lg font-semibold">Your Cart</h3>
          {cartItems.length === 0 ? (
            <p className="text-gray-500">Your cart is empty.</p>
          ) : (
            <ul className="max-h-64 space-y-2 overflow-y-auto">
              {cartItems.map((item) => (
                <li
                  key={`${item.id}-${item.size}`}
                  className="group flex items-center justify-between space-x-3 rounded-xl p-2 hover:bg-gray-100"
                >
                  <div className="flex items-center space-x-3">
                    <div className="h-12 w-12 overflow-hidden rounded border border-gray-200">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={48}
                        height={48}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-xs text-gray-500">Size: {item.size}</p>
                      <p className="text-sm text-gray-600">฿{item.price.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => handleQuantityChange(item.id, item.size, item.quantity - 1)}
                        className="flex h-6 w-6 items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100"
                      >
                        -
                      </button>
                      <span className="w-8 text-center text-sm">{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item.id, item.size, item.quantity + 1)}
                        className="flex h-6 w-6 items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id, item.size)}
                      className="cursor-pointer rounded-full p-1 text-gray-400 transition-colors duration-200 hover:bg-red-50 hover:text-red-500"
                    >
                      <IoMdClose size={16} title="Remove" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {cartItems.length > 0 && (
            <div className="mt-3 space-y-2 border-t pt-3">
              <div className="flex justify-between font-medium">
                <span>Total:</span>
                <span>฿{getTotalPrice().toLocaleString()}</span>
              </div>
              <Link
                href="../cart"
                className="mt-6 block w-full rounded-3xl bg-black py-3 text-center text-white transition-colors duration-200 hover:bg-gray-800"
              >
                Checkout
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}