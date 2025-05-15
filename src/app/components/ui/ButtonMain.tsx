'use client';
import Link from 'next/link';

type buttonType = 'primary' | 'secondary' | 'outline' | 'danger' | 'success' | 'third';

interface ButtonMain {
  type?: buttonType;
  children: React.ReactNode;
  onClick?: () => void; // ทำให้เป็น optional
  path?: string; // เพิ่ม prop path สำหรับการนำทาง
}

export default function ButtonMain({ type = 'primary', children, onClick, path }: ButtonMain) {
  const baseStyles: string =
    'z-30 rounded-full font-bold transition-all duration-300  cursor-pointer touch-manipulation shadow w-32 h-11 text-sm  ';

  /// เหลือแก้สีปุ่ม
  const typeStyles: Record<buttonType, string> = {
    primary:
      'bg-black text-white border-transparent border-0 hover:bg-gray-200 hover:text-amber-600 transition-all duration-300 text-yellow-500  cursor-pointer  active:bg-gray-300 active:text-amber-800 z-30',
    secondary:
      'bg-gray-200 text-black border border-gray-400 hover:bg-gray-300 active:bg-gray-400 z-30',
    third:
      'bg-transparent  text-white border-1 border-white hover:bg-amber-700 active:bg-amber-800 z-30',
    outline:
      'bg-transparent text-black border border-black hover:bg-black hover:text-white active:bg-gray-900 z-30 hover:text-yellow-500 ',
    danger: 'bg-red-600 text-white border border-red-700 hover:bg-red-700 active:bg-red-800 z-30',
    success:
      'bg-green-600 text-white border border-green-700 hover:bg-green-700 active:bg-green-800 z-30',
  };

  // จัดการกรณีที่ไม่มี onClick
  const handleClick = onClick || (() => {});

  // ถ้ามี path ให้ใช้ Link แทน button
  if (path) {
    return (
      <Link href={path}>
        <span
          className={`inline-block ${baseStyles} ${typeStyles[type as buttonType] || typeStyles.primary} text-center leading-[2.75rem]`}
          onClick={handleClick}
        >
          {children}
        </span>
      </Link>
    );
  }

  // ถ้าไม่มี path ใช้ button ตามปกติ
  return (
    <button
      className={`${baseStyles} ${typeStyles[type as buttonType] || typeStyles.primary}`}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}
