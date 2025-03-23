'use client';
import { useState } from 'react';


type Product = {
  name: string;
  price: number;
  img: string;
  hoverimg: string;
  ads: string;
}

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
        }
    ];
    // {hoverIndex} คือตัวแปรที่เก็บ index ของรูปภาพที่กำลัง hover อยู่
    // {setHoverIndex} คือฟังก์ชันที่ใช้เปลี่ยนค่า {hoverIndex} เมื่อมีการ hover รูปภาพ

     const [hoverIndex, setHoverIndex] = useState<number | null>(null);
    
    return (
      
    <section className="container h-full w-full  mt-10 mx-auto">           
    <div className="offset-0 relative">
    <div className="mt-10 lg:flex lg:flex-row lg:space-x-5">
      {productSellers.map((product, index) => (
        <div
          key={index}
          className="relative cursor-pointer lg:w-[100rem] lg:h-[30vh]"
          onMouseOver={() => setHoverIndex(index)}
          onMouseLeave={() => setHoverIndex(null)}
        >
          <span className="absolute top-0 left-0 mx-5 my-5 rounded bg-white p-1 pr-3 pl-3 text-xs font-medium text-gray-700 shadow">
            {product.ads.toUpperCase()}
          </span>

        {/* รูปสินค้า */}
          <img
            src={hoverIndex === index ? product.hoverimg : product.img}
            alt={product.name}
            className="h-[30rem] lg:w-full rounded-xl object-cover shadow"
          />

        {/* ข้อมูลสินค้า */}
          <article className="mt-4 flex flex-col gap-1">
            <h3 className="text-lg font-medium">{product.name.toUpperCase()}</h3>
            <p className="text-md text-gray-800">${product.price}.00</p>
          </article>
        </div>
      ))}
    </div>
            </div>  
            </section>
  );
}
