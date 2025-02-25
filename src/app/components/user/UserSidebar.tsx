'use client';
import { useState } from 'react';
import MobileSidebar from './MobileSidebar';

export default function UserSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Mobile Sidebar */}
      <MobileSidebar className="md:hidden" isOpen={isOpen} toggleSidebar={toggleSidebar} />

      {/* Sidebar */}
      <aside></aside>
    </>
  );
}
