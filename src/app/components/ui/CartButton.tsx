"use client";

import { useState, useEffect } from "react";
import { PiShoppingCartSimpleLight } from "react-icons/pi";

export default function CartButton() {
  interface CartItem {
    id: number;
    name: string;
    price: number;
    image: string;
  }

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // ✅ ใช้ `useEffect()` โหลด cartItems เพื่อแก้ Hydration
  useEffect(() => {
    setCartItems([
      { id: 1, name: "Nike Air Max", price: 120, image: "/images/shoes1.jpg" },
      { id: 2, name: "Adidas Superstar", price: 100, image: "/images/shoes2.jpg" },
    ]);
  }, []);

  return (
    <div
      className="relative cursor-pointer"
      onMouseEnter={() => setIsCartOpen(true)}
      onMouseLeave={() => setIsCartOpen(false)}
    >

      <button className="rounded-2xl p-2 hover:bg-gray-200 cursor-pointer transition-all duration-300 hover:text-amber-600">
        <PiShoppingCartSimpleLight className="h-6 w-6" />
      </button>


      {isCartOpen && (
        <div className="absolute top-10 right-0 w-80 bg-white shadow-lg p-4 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold mb-2">Your Cart</h3>
          {cartItems.length === 0 ? (
            <p className="text-gray-500">Your cart is empty.</p>
          ) : (
            <ul className="space-y-2">
              {cartItems.map((product) => (
                <li key={product.id} className="flex items-center space-x-3 hover:bg-gray-200 rounded-xl">
                  {cartItems.length > 0 && (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-12 h-12 border border-gray-200 object-cover rounded"
                    />
                  )}
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-gray-500">${product.price}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <button className="mt-3 w-full bg-amber-600 text-white py-2 rounded-2xl cursor-pointer hover:bg-amber-700 transition">
            Checkout
          </button>
        </div>
      )}
    </div>
  );
}
