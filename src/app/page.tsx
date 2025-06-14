'use client';

import { useEffect, useRef, useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import HeroSection from './components/home/HeroSection';
import BestSellersSection from './components/home/BestSellersSection';
import PromoKidsStyles from './components/home/PromoKidsStyles';
import ShopCollection from './components/home/ShopCollection';
import CommitSection from './components/home/CommitSection';

export default function Home() {
  const sections = useRef<(HTMLElement | null)[]>([]);
  const [currentSection, setCurrentSection] = useState(0); // <-- เพิ่ม useState เก็บ section ปัจจุบัน

  const setRef = (index: number) => (el: HTMLElement | null) => {
    sections.current[index] = el;
  };

  const scrollToNext = () => {
    if (currentSection < sections.current.length - 1) {
      const nextSection = currentSection + 1;
      sections.current[nextSection]?.scrollIntoView({ behavior: 'smooth' });
      setCurrentSection(nextSection);
    }
  };

  const scrollToPrev = () => {
    if (currentSection > 0) {
      const prevSection = currentSection - 1;
      sections.current[prevSection]?.scrollIntoView({ behavior: 'smooth' });
      setCurrentSection(prevSection);
    }
  };

  useEffect(() => {
    const handleScroll = (event: WheelEvent) => {
      const scrollDirection = event.deltaY;
      if (scrollDirection > 0) {
        scrollToNext();
      } else if (scrollDirection < 0) {
        scrollToPrev();
      }
    };

    window.addEventListener('wheel', handleScroll);
    return () => window.removeEventListener('wheel', handleScroll);
  }, [currentSection, scrollToNext, scrollToPrev]); // depend on currentSection, scrollToNext, scrollToPrev

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
        onClick={scrollToPrev}
        className="fixed right-8 bottom-24 z-[9999] cursor-pointer rounded-full bg-gray-400 p-3 text-white shadow-lg transition-all duration-300 hover:bg-gray-800"
        aria-label="Scroll to previous section"
      >
        <IoIosArrowUp size={24} />
      </button>

      <button
        onClick={scrollToNext}
        className="fixed right-8 bottom-8 z-[9999] cursor-pointer rounded-full bg-gray-400 p-3 text-white shadow-lg transition-all duration-300 hover:bg-gray-800"
        aria-label="Scroll to next section"
      >
        <IoIosArrowDown size={24} />
      </button>
    </>
  );
}
