'use client';
import { useState } from 'react';
import Slide1 from './slides/Slide1';
import Slide2 from './slides/Slide2';

interface MobileSidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  className?: string;
}

export default function MobileSidebar({ isOpen, toggleSidebar, className }: MobileSidebarProps) {
  const [slide, setSlide] = useState(1);

  const handleCloseSidebar = () => {
    toggleSidebar();
    setSlide(1);
  };

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
          onClick={handleCloseSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-[75%] transform overflow-hidden bg-white shadow-lg dark:bg-blue-900 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } z-10 transition-transform duration-300 ease-in-out`}
      >
        {/* Slide 1 */}
        <div
          className={`absolute top-0 left-0 h-full w-full transition-transform duration-200 ease-in-out ${
            slide === 1 ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <Slide1 setSlide={setSlide} />
        </div>
        {/* Slide 2 */}
        <div
          className={`absolute top-0 left-0 h-full w-full transition-transform duration-200 ease-in-out ${
            slide === 2 ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <Slide2 setSlide={setSlide} toggleSidebar={toggleSidebar} />
        </div>
      </div>
    </>
  );
}
