'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { FaChevronLeft } from 'react-icons/fa';
import { useState } from 'react';
import ChangePassword from '@/app/components/user/ChangePassword';
import EditPhoneNumber from '@/app/components/user/EditPhoneNumber';
import ThailandAddressForm from '@/app/components/address/ThailandAddressForm';

export default function AccountDetailsPage() {
  const router = useRouter();

  const [email] = useState('example@email.com');
  const [phone, setPhone] = useState('');
  const [birthday, setBirthday] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const [province, setProvince] = useState('');
  const [district, setDistrict] = useState('');
  const [zip, setZip] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = {
      email,
      phone,
      birthday,
      province,
      district,
      zip,
    };
    console.log('ส่งข้อมูล:', formData);
    // TODO: ส่งข้อมูลไปยัง backend ผ่าน fetch/axios
  };

  return (
    <motion.div
      className="md:p-6"
      initial={{ y: '100%', opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: '100%', opacity: 0 }}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
    >
      <button
        className="flex items-center gap-2 text-lg font-semibold text-black md:hidden"
        type="button"
        onClick={() => router.back()}
      >
        <FaChevronLeft />
        ย้อนกลับ
      </button>

      <h2 className="my-6 text-xl font-bold">รายละเอียดบัญชี</h2>

      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* E-mail */}
        <div>
          <label className="block text-base font-medium">อีเมล</label>
          <input
            type="email"
            value={email}
            className="mt-1 w-full rounded border border-gray-300 bg-gray-100 p-2 text-gray-500"
            disabled
          />
        </div>

        {/* Password */}
        <label className="block text-base font-medium">รหัสผ่าน</label>
        <div>
          <div className="flex items-center justify-between">
            <span className="text-lg font-medium tracking-wider">••••••••</span>
            <button
              onClick={() => setShowPassword(true)}
              type="button"
              className="text-sm text-blue-500"
            >
              แก้ไข
            </button>
          </div>
        </div>

        {/* Phone */}
        <label className="block text-sm font-medium text-gray-800">เบอร์โทรศัพท์</label>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">{phone || 'ยังไม่ระบุเบอร์โทรศัพท์'}</span>
          <button
            type="button"
            className="text-sm font-semibold text-blue-500"
            onClick={() => setShowPhoneModal(true)}
          >
            {phone ? 'แก้ไข' : 'เพิ่ม'}
          </button>
        </div>

        {/* Birthday */}
        <div>
          <label className="block text-sm font-medium">วันเกิด</label>
          <input
            type="date"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            className="mt-1 w-full rounded border border-gray-300 p-2"
          />
        </div>

        {/* ตำแหน่งที่ตั้ง */}
        <ThailandAddressForm
          province={province}
          setProvince={setProvince}
          district={district}
          setDistrict={setDistrict}
          zip={zip}
          setZip={setZip}
          onChange={() => {}}
        />

        {/* ลบบัญชี */}
        <div className="mt-10 flex items-center justify-between border-t border-gray-200 pt-6">
          <button
            type="button"
            className="text-sm font-semibold text-red-500 hover:underline"
            onClick={() => {
              // TODO: เปิด modal ยืนยันการลบบัญชี
              alert('ฟีเจอร์ลบบัญชียังไม่พร้อมใช้งาน');
            }}
          >
            ลบบัญชี
          </button>

          <button
            type="submit"
            className="hidden rounded bg-black px-6 py-2 font-bold text-white hover:bg-gray-800 disabled:opacity-50 md:block"
          >
            บันทึก
          </button>
        </div>

        <button
          type="submit"
          className="mt-4 w-full rounded bg-black p-2 text-white transition hover:bg-gray-800 disabled:opacity-50 md:hidden"
        >
          บันทึกข้อมูล
        </button>
      </form>

      {/* Modals */}
      <AnimatePresence>
        {showPassword && <ChangePassword onClose={() => setShowPassword(false)} />}
        {showPhoneModal && (
          <EditPhoneNumber
            onClose={() => setShowPhoneModal(false)}
            onSave={(newPhone) => setPhone(newPhone)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
