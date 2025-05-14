'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaUser, FaCog, FaBoxOpen, FaHeart, FaHistory } from 'react-icons/fa';

export default function UserSidebar() {
  const pathname = usePathname();

  return (
    <>
      {/* Sidebar */}
      <aside className="hidden w-full space-y-3 rounded-lg border border-gray-300 bg-white p-6 md:block">
        <SidebarItem
          href="/users/settings/account"
          icon={<FaUser />}
          text="บัญชีของฉัน"
          active={pathname === '/users/settings/account'}
        />
        <SidebarItem
          href="/users/settings/orders"
          icon={<FaHistory />}
          text="คำสั่งซื้อ"
          active={pathname === '/users/settings/orders'}
        />
        <SidebarItem
          href="/users/settings/wishlist"
          icon={<FaHeart />}
          text="รายการโปรด"
          active={pathname === '/users/settings/wishlist'}
        />
        <SidebarItem
          href="/users/settings/addresses"
          icon={<FaBoxOpen />}
          text="ที่อยู่"
          active={pathname === '/users/settings/addresses'}
        />
        <SidebarItem
          href="/users/settings/preferences"
          icon={<FaCog />}
          text="ตั้งค่าบัญชี"
          active={pathname === '/users/settings/preferences'}
        />
      </aside>
    </>
  );
}

function SidebarItem({
  href,
  icon,
  text,
  active,
}: {
  href: string;
  icon: React.ReactNode;
  text: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 rounded-lg p-3 transition ${
        active ? 'bg-gray-200 font-bold' : 'hover:bg-gray-100'
      }`}
    >
      {icon}
      <span>{text}</span>
    </Link>
  );
}
