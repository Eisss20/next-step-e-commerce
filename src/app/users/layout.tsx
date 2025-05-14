'use client';
import UserSidebar from '../components/user/UserSidebar';
import MobileSidebar from '../components/user/MobileSidebar';
import { useState } from 'react';

export default function UserLayout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className="min-h-screen bg-[#f5f5f5] text-black">
      {/* Mobile Sidebar */}
      <MobileSidebar className="md:hidden" isOpen={isOpen} toggleSidebar={toggleSidebar} />

      <div className="flex max-w-7xl flex-col px-4 py-10 md:flex-row md:gap-10 md:px-6">
        {/* Sidebar */}
        <aside className="mb-8 ml-20 md:mb-0 md:w-[240px] md:shrink-0">
          <UserSidebar />
        </aside>

        {/* Main Content */}
        <main className="flex-1 rounded-xl bg-white p-10 shadow-sm">{children}</main>
      </div>
    </div>
  );
}
