'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

export default function FooterBar() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const announcements = [
    { text: ' Register for exclusive member benefits ', href: '/design' },
    { text: ' Shop special sale items before anyone else ', href: '/member' },
    { text: ' Need help or have questions Click here !', href: '/join-us' },
  ];

  const nextSlide = () => {
    setCurrentIndex((current) => (current === announcements.length - 1 ? 0 : current + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((current) => (current === 0 ? announcements.length - 1 : current - 1));
  };

  useEffect(() => {
    if (!isPaused) {
      const timer = setInterval(() => {
        nextSlide();
      }, 3000);

      return () => clearInterval(timer);
    }
  }, [isPaused]);

  return (
    <div
      className="z-50 h-[10vh]   w-full bg-black lg:h-[5rem] md:h-[10rem] "
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className=" flex h-full items-center container mx-auto    justify-center lg:gap-20 lg:mt-0 lg:items-center lg:justify-center">
        <button
          onClick={prevSlide}
          className="cursor-pointer text-white transition-colors hover:text-amber-600"
          aria-label="Previous announcement"
        >
          <IoIosArrowBack size={20} />
        </button>

        <div className=" w-[20rem] md:w-[30rem]  lg:w-[50rem] text-center">
          <Link
            href={announcements[currentIndex].href}
            className="cursor-pointer text-sm md:text-lg flex-row  md:text-xl text-nowrap text-white transition-all hover:text-amber-600"
          >
            {announcements[currentIndex].text}
          </Link>
        </div>

        <button
          onClick={nextSlide}
          className="z-50 cursor-pointer text-white transition-colors hover:text-amber-600"
          aria-label="Next announcement"
        >
          <IoIosArrowForward size={20} />
        </button>
      </div>
    </div>
  );
}
