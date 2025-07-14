'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '../context/cartcontext';
import { IoMdClose } from 'react-icons/io';

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, clearCart, getTotalPrice, getTotalItems } =
    useCart();

  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [selectedItems, setSelectedItems] = useState<{ [key: string]: boolean }>({});

  // Initialize all items as selected when component mounts or cart items change
  useEffect(() => {
    const initialSelected: { [key: string]: boolean } = {};
    cartItems.forEach((item) => {
      const key = `${item.id}-${item.size}`;
      initialSelected[key] = selectedItems[key] !== undefined ? selectedItems[key] : true; // Keep existing selection or default to true
    });
    setSelectedItems(initialSelected);
  }, [cartItems]);

  const handleIncreaseQuantity = (id: string, size: string, currentQuantity: number) => {
    updateQuantity(id, size, currentQuantity + 1);
  };

  const handleDecreaseQuantity = (id: string, size: string, currentQuantity: number) => {
    if (currentQuantity > 1) {
      updateQuantity(id, size, currentQuantity - 1);
    }
  };

  const handleClearCart = () => {
    clearCart();
    setShowClearConfirm(false);
    setSelectedItems({});
  };

  const handleSelectItem = (id: string, size: string) => {
    const key = `${id}-${size}`;
    setSelectedItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSelectAll = () => {
    const allSelected = cartItems.every((item) => selectedItems[`${item.id}-${item.size}`]);
    const newSelection: { [key: string]: boolean } = {};
    cartItems.forEach((item) => {
      const key = `${item.id}-${item.size}`;
      newSelection[key] = !allSelected;
    });
    setSelectedItems(newSelection);
  };

  const getSelectedItems = () => {
    return cartItems.filter((item) => selectedItems[`${item.id}-${item.size}`] === true);
  };

  const getSelectedTotalPrice = () => {
    return getSelectedItems().reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getSelectedTotalItems = () => {
    return getSelectedItems().reduce((total, item) => total + item.quantity, 0);
  };

  const allItemsSelected =
    cartItems.length > 0 &&
    cartItems.every((item) => selectedItems[`${item.id}-${item.size}`] === true);
  const someItemsSelected = cartItems.some(
    (item) => selectedItems[`${item.id}-${item.size}`] === true
  );

  if (cartItems.length === 0) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Your Cart</h1>
          <div className="mt-16 flex flex-col items-center">
            <div className="mb-4 text-6xl">🛒</div>
            <h2 className="text-xl font-semibold text-gray-600">Your cart is empty</h2>
            <p className="mt-2 text-gray-500">Add some items to get started!</p>
            <Link
              href="/products"
              className="mt-6 rounded-3xl bg-black px-8 py-3 text-white transition-colors duration-200 hover:bg-gray-800"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Your Cart</h1>
        <button
          onClick={() => setShowClearConfirm(true)}
          className="text-sm text-red-600 hover:text-red-800"
        >
          Clear Cart
        </button>
      </div>

      {/* Clear Cart Confirmation */}
      {showClearConfirm && (
        <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black">
          <div className="w-full max-w-md rounded-lg bg-white p-6">
            <h3 className="text-lg font-semibold">Clear Cart</h3>
            <p className="mt-2 text-gray-600">
              Are you sure you want to remove all items from your cart?
            </p>
            <div className="mt-6 flex space-x-3">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="flex-1 rounded-lg border border-gray-300 py-2 text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleClearCart}
                className="flex-1 rounded-lg bg-red-600 py-2 text-white hover:bg-red-700"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          {/* Select All */}
          <div className="mb-4 flex items-center space-x-3 border-b border-gray-200 pb-4">
            <input
              type="checkbox"
              id="select-all"
              checked={allItemsSelected}
              onChange={handleSelectAll}
              className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
            />
            <label htmlFor="select-all" className="text-sm font-medium text-gray-900">
              Select All ({cartItems.length} items)
            </label>
          </div>

          <div className="divide-y divide-gray-200">
            {cartItems.map((item) => {
              const itemKey = `${item.id}-${item.size}`;
              const isSelected = selectedItems[itemKey] === true;

              return (
                <div
                  key={itemKey}
                  className={`flex items-center py-6 ${!isSelected ? 'opacity-50' : ''}`}
                >
                  {/* Checkbox */}
                  <div className="mr-4">
                    <input
                      type="checkbox"
                      id={itemKey}
                      checked={isSelected}
                      onChange={() => handleSelectItem(item.id, item.size)}
                      className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                    />
                  </div>

                  {/* Product Image */}
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg border border-gray-200">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={96}
                      height={96}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="ml-4 flex flex-1 flex-col">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                        <p className="mt-1 text-sm text-gray-500">Size: {item.size}</p>
                        <p className="mt-1 text-lg font-bold text-gray-900">
                          ฿{item.price.toLocaleString()}
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id, item.size)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <IoMdClose size={24} />
                      </button>
                    </div>

                    {/* Quantity Controls */}
                    <div className="mt-4 flex items-center space-x-3">
                      <button
                        onClick={() => handleDecreaseQuantity(item.id, item.size, item.quantity)}
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 hover:bg-gray-50"
                      >
                        -
                      </button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <button
                        onClick={() => handleIncreaseQuantity(item.id, item.size, item.quantity)}
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 hover:bg-gray-50"
                      >
                        +
                      </button>
                    </div>

                    {/* Item Total */}
                    <div className="mt-2">
                      <p className="text-sm text-gray-600">
                        Total: ฿{(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-6">
            <h2 className="text-lg font-semibold text-gray-900">Order Summary</h2>

            <div className="mt-4 space-y-3">
              <div className="flex justify-between text-sm">
                <span>Selected Items ({getSelectedTotalItems()})</span>
                <span>฿{getSelectedTotalPrice().toLocaleString()}</span>
              </div>

              <div className="flex justify-between text-sm">
                <span>Shipping</span>
                <span>Free</span>
              </div>

              <div className="border-t border-gray-200 pt-3">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>฿{getSelectedTotalPrice().toLocaleString()}</span>
                </div>
              </div>
            </div>

            <button
              className={`mt-6 w-full rounded-3xl py-3 text-white transition-colors duration-200 ${
                someItemsSelected ? 'bg-black hover:bg-gray-800' : 'cursor-not-allowed bg-gray-400'
              }`}
              disabled={!someItemsSelected}
            >
              Proceed to Checkout
              {someItemsSelected && ` (${getSelectedTotalItems()} items)`}
            </button>

            <Link
              href="/products"
              className="mt-3 block w-full rounded-3xl border border-gray-300 py-3 text-center text-gray-700 transition-colors duration-200 hover:bg-gray-50"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}