'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaChevronLeft } from 'react-icons/fa';

interface Slide2Props {
  setSlide: (slide: number) => void;
  toggleSidebar?: () => void;
}
export default function Slide2({ setSlide, toggleSidebar }: Slide2Props) {
  const router = useRouter();

  return (
    <div className="space-y-6 p-6">
      <button
        className="flex items-center gap-4 text-lg font-semibold text-white"
        onClick={() => setSlide(1)}
      >
        <FaChevronLeft />
        ทั้งหมด
      </button>
      <h2 className="my-12 text-2xl font-bold text-white">บัญชีของฉัน</h2>
      <Link href="/profile" className="block text-lg font-semibold text-gray-900 dark:text-white">
        โปรไฟล์
      </Link>
      <Link href="/orders" className="block text-lg font-semibold text-gray-900 dark:text-white">
        คำสั่งซื้อ
      </Link>
      <Link href="/wishlist" className="block text-lg font-semibold text-gray-900 dark:text-white">
        รายการโปรด
      </Link>
      <button
        onClick={() => {
          if (toggleSidebar) toggleSidebar();
          router.push('/users/settings');
        }}
        className="block text-lg font-semibold text-gray-900 dark:text-white"
      >
        ตั้งค่าบัญชี
      </button>
      <button className="block text-lg font-semibold text-gray-900 dark:text-white">
        ออกจากระบบ
      </button>
    </div>
  );
}
