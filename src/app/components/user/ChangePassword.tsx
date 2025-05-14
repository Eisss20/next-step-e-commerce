'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { MdCancel } from 'react-icons/md';
import { useEffect, useState } from 'react';

export default function ChangePassword({ onClose }: { onClose: () => void }) {
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const isValidLength = newPassword.length >= 8;
  const isValidFormat =
    /[A-Z]/.test(newPassword) && /[a-z]/.test(newPassword) && /[0-9]/.test(newPassword);

  const modalStyle = isMobile
    ? 'fixed inset-x-0 bottom-6 z-50 rounded-t-2xl bg-white p-6'
    : 'w-full max-w-md rounded-2xl bg-white p-6 shadow-lg';

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-40 flex items-end justify-center bg-black/40 md:items-center"
        onClick={onClose}
      >
        <motion.div
          onClick={(e) => e.stopPropagation()}
          initial={{ y: isMobile ? '100%' : 0, opacity: 0, scale: isMobile ? 1 : 0.95 }}
          animate={{ y: isMobile ? '40%' : 0, opacity: 1, scale: 1 }}
          exit={{ y: isMobile ? '100%' : 0, opacity: 0, scale: isMobile ? 1 : 0.95 }}
          transition={{ duration: 0.35, ease: 'easeInOut' }}
          className={modalStyle}
          style={{ height: isMobile ? '60vh' : 'auto' }}
        >
          {/* Header */}
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-xl font-bold">แก้ไขรหัสผ่าน</h3>
            <button type="button" onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <MdCancel size={28} />
            </button>
          </div>

          {/* Inputs */}
          <input
            type="password"
            placeholder="รหัสผ่านเดิม"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="mb-4 w-full rounded border border-gray-300 p-2"
          />
          <input
            type="password"
            placeholder="รหัสผ่านใหม่"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="mb-4 w-full rounded border border-gray-300 p-2"
          />
          <input
            type="password"
            placeholder="ยืนยันรหัสผ่านใหม่"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="mb-4 w-full rounded border border-gray-300 p-2"
          />

          {/* Validation */}
          <div className="mb-4 space-y-1 text-sm text-red-500">
            {!isValidLength && <p>✘ อักษรขั้นต่ำ 8 ตัว</p>}
            {!isValidFormat && <p>✘ ต้องมีอักษรพิมพ์ใหญ่ พิมพ์เล็ก และตัวเลข 1 ตัว</p>}
          </div>

          {/* Submit */}
          <div className="flex justify-end">
            <button
              className="rounded bg-black px-4 py-2 font-bold text-white disabled:opacity-30"
              disabled={!isValidLength || !isValidFormat || newPassword !== confirmPassword}
            >
              บันทึก
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
