'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { MdCancel } from 'react-icons/md';
import { useEffect, useState } from 'react';

export default function EditPhoneNumber({
  onClose,
  onSave,
}: {
  onClose: () => void;
  onSave: (newPhone: string) => void;
}) {
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [phone, setPhone] = useState('');
  const isValidPhone = /^0[689]\d{8}$/.test(phone);

  const handleSave = () => {
    if (isValidPhone) {
      onSave(phone);
      onClose();
    }
  };

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
          style={{ height: isMobile ? '40vh' : 'auto' }}
        >
          {/* Header */}
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-xl font-bold">แก้ไขเบอร์โทรศัพท์</h3>
            <button type="button" onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <MdCancel size={28} />
            </button>
          </div>

          {/* Input */}
          <input
            type="tel"
            placeholder="กรอกเบอร์โทรศัพท์"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mb-4 w-full rounded border border-gray-300 p-2"
          />

          {/* Validation */}
          {!isValidPhone && (
            <p className="mb-4 text-sm text-red-500">
              ✘ เบอร์โทรศัพท์ไม่ถูกต้อง (ต้องขึ้นต้นด้วย 06, 08, 09 และมี 10 หลัก)
            </p>
          )}

          {/* Submit */}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleSave}
              className="rounded bg-black px-4 py-2 font-bold text-white disabled:opacity-30"
              disabled={!isValidPhone}
            >
              บันทึก
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
