'use client';

import HeroSection from './components/home/HeroSection';
import BestSellersSection from './components/home/BestSellersSection';
import PromoKidsStyles from './components/home/PromoKidsStyles';
import ShopCollection from './components/home/ShopCollection';
import CommitSection from './components/home/CommitSection';
import { useEffect, useRef } from 'react';
import { IoIosArrowUp } from 'react-icons/io';

export default function Home() {
  const sections = useRef<(HTMLElement | null)[]>([]);

  const setRef = (index: number) => (el: HTMLElement | null) => {
    sections.current[index] = el;
  };

  const scrollToTop = () => {
    sections.current[0]?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    let currentSection = 0;
    const totalSections = sections.current.length;

    const handleScroll = (event: WheelEvent) => {
      const scrollDirection = event.deltaY;

      if (scrollDirection > 0 && currentSection < totalSections - 1) {
        currentSection++;
        sections.current[currentSection]?.scrollIntoView({ behavior: 'smooth' });
      } else if (scrollDirection < 0 && currentSection > 0) {
        currentSection--;
        sections.current[currentSection]?.scrollIntoView({ behavior: 'smooth' });
      }
    };

    window.addEventListener('wheel', handleScroll);
    return () => window.removeEventListener('wheel', handleScroll);
  }, []);

  return (
    <>
      <div ref={setRef(0)}>
        <HeroSection />
      </div>
      <div ref={setRef(1)}>
        <BestSellersSection />
      </div>
      <div ref={setRef(2)}>
        <PromoKidsStyles />
      </div>
      <div ref={setRef(3)}>
        <ShopCollection />
      </div>
      <div ref={setRef(4)}>
        <CommitSection />
      </div>

      <button
        onClick={scrollToTop}
        className="fixed right-8 bottom-8 z-[9999] cursor-pointer rounded-full bg-gray-400 p-3 text-white shadow-lg transition-all duration-300 hover:bg-gray-800"
        aria-label="Scroll to top"
      >
        <IoIosArrowUp size={24} />
      </button>
    </>
  );
}
