'use client';
import { useState, useEffect } from 'react';
import * as motion from 'motion/react-client';

type Product = {
  name: string;
  price: number;
  img: string;
  hoverimg: string;
  ads: string;
};

export default function CardBestSeller() {
  const productSellers: Product[] = [
    {
      name: 'Nike Air Max 270',
      ads: 'best seller',
      price: 150,
      img: '/images/products/NIKEAIRMAX16OGG-1.png',
      hoverimg: '/images/products/NIKEAIRMAX16OGG-2.png',
    },
    {
      name: 'Adidas Ultraboost',
      ads: 'best seller',
      price: 180,
      img: '/images/products/NIKEFREEMETCON6-1.png',
      hoverimg: '/images/products/NIKEFREMETCON6-2.png',
    },
    {
      name: 'Puma RS-X',
      ads: 'best seller',
      price: 120,
      img: '/images/products/NIKECOURTVISIONLONN-1.png',
      hoverimg: '/images/products/NIKECOURTVISIONLONN-2.png',
    },
    {
      name: 'Nike Air Max 270',
      ads: 'best seller',
      price: 150,
      img: '/images/products/WAIRFORCE107FLYEASE-2.png',
      hoverimg: '/images/products/WAIRFORCE107FLYEASE-1.png',
    },
  ];

  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('best-seller-section');
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  return (
    <section id="best-seller-section" className="container mx-auto mt-10 h-full w-full">
      <div className="relative">
        <div className="mt-10 lg:flex lg:flex-row lg:space-x-5">
          {productSellers.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.5 }}
              className="relative cursor-pointer lg:h-[30vh] lg:w-[100rem]"
              onMouseOver={() => setHoverIndex(index)}
              onMouseLeave={() => setHoverIndex(null)}
            >
              <span className="absolute top-0 left-0 z-10 mx-5 my-5 rounded bg-white p-1 pr-3 pl-3 text-xs font-medium text-gray-700 shadow">
                {product.ads.toUpperCase()}
              </span>

              {/* รูปสินค้า */}
              <div className="flex h-[25.5rem] items-center justify-center rounded-xl bg-[#F6F6F6] p-4 shadow lg:w-full">
                <img
                  src={hoverIndex === index ? product.hoverimg : product.img}
                  alt={product.name}
                  className="h-[90%] w-[90%] object-contain transition-transform duration-300 hover:scale-105"
                />
              </div>

              {/* ข้อมูลสินค้า */}
              <article className="mt-4 flex flex-col gap-1">
                <h3 className="text-lg font-medium">{product.name.toUpperCase()}</h3>
                <p className="text-md text-gray-800">${product.price}.00</p>
              </article>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
