'use client';
interface Slide1Props {
  setSlide: (slide: number) => void;
}
export default function Slide1({ setSlide }: Slide1Props) {
  return (
    <div className="space-y-6 p-6">
      <h1 className="my-6 mb-8 text-2xl font-bold text-white">เมนูหลัก</h1>
      <button
        className="block text-lg font-semibold text-gray-900 dark:text-white"
        onClick={() => setSlide(2)}
      >
        บัญชีของฉัน
      </button>
      <button className="block text-lg font-semibold text-gray-900 dark:text-white">สินค้า</button>
      <button className="block text-lg font-semibold text-gray-900 dark:text-white">
        โปรโมชั่น
      </button>
    </div>
  );
}
