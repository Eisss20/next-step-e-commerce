'use client';
import Link from 'next/link';
import { FaChevronRight, FaUser } from 'react-icons/fa';

const settingsMenu = [
  { icon: <FaUser />, label: 'รายละเอียดบัญชี', href: '/users/settings/account' },
];

export default function SettingsPage() {
  return (
    <>
      <div className="space-y-6 p-6 md:hidden">
        <h1 className="mb-12 text-2xl font-bold">User Settings</h1>
        <ul className="space-y-4">
          {settingsMenu.map((item, index) => (
            <li key={index}>
              <Link
                href={item.href}
                className="flex items-center justify-between rounded-lg border-2 bg-white p-3 shadow-md transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <span className="text-xl text-black">{item.icon}</span>
                  <span className="text-lg font-medium text-gray-900">{item.label}</span>
                </div>
                <span className="text-lg text-black">
                  <FaChevronRight />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
