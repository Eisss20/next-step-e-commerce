'use client';

interface MobileSidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  className?: string;
}

export default function MobileSidebar({ isOpen, toggleSidebar, className }: MobileSidebarProps) {
  return (
    <>
      {/* Hamburger Button */}
      <button
        className="fixed top-4 right-4 z-50 p-2 transition-transform duration-200 active:scale-90 md:hidden"
        onClick={toggleSidebar}
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

      {/* Decrease Opacity */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 transition-opacity duration-300"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}

      <div
        className={`fixed top-0 right-0 h-full w-72 transform bg-white shadow-lg dark:bg-blue-900 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } z-10 transition-transform duration-300 ease-in-out`}
      >
        {/* เมนูภายใน Sidebar */}
        <nav className="mt-12 flex flex-col space-y-4 p-6">
          <a href="#" className="text-lg font-semibold text-gray-900 dark:text-white">
            Home
          </a>
          <a href="#" className="text-lg font-semibold text-gray-900 dark:text-white">
            About
          </a>
          <a href="#" className="text-lg font-semibold text-gray-900 dark:text-white">
            Shop
          </a>
        </nav>
      </div>
    </>
  );
}
