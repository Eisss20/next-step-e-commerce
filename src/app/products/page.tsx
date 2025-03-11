import Sidebar from "./components/Sidebar";
import type { ProductType } from "@/types/types";
import ProductGrid from "./components/ProductGrid";

export default function ProductsPage() {
  // This would typically come from an API or database
  const products: ProductType[] = [
    {
      id: 1,
      name: 'Explorer Sneaker',
      price: 129,
      image: '/placeholder.svg?height=400&width=400',
      isBestSeller: false,
      category: 'Performance Series',
    },
    {
      id: 2,
      name: 'Urban Walker',
      price: 149,
      image: '/placeholder.svg?height=400&width=400',
      isBestSeller: false,
      category: 'Limited Edition',
    },
    {
      id: 3,
      name: 'Terrain Explorer',
      price: 159,
      image: '/placeholder.svg?height=400&width=400',
      isBestSeller: true,
      category: 'Best Sellers',
    },
    {
      id: 4,
      name: 'City Runner',
      price: 139,
      image: '/placeholder.svg?height=400&width=400',
      isBestSeller: false,
      category: 'Performance Series',
    },
    // Additional products would be added here
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <nav className="mb-4 flex text-sm">
        <a href="/" className="text-gray-500 hover:text-gray-700">
          Home
        </a>
        <span className="mx-2 text-gray-400">&gt;</span>
        <span className="text-gray-700">All Products</span>
      </nav>

      <h1 className="mb-8 text-3xl font-bold">All Products</h1>

      <div className="flex flex-col gap-8 md:flex-row">
        <Sidebar />
        <ProductGrid products={products} />
      </div>
    </div>
  );
}