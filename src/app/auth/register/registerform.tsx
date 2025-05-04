'use client';

import Link from 'next/link';
import { useState } from 'react';
import { IoArrowBack } from 'react-icons/io5';
import { motion } from 'framer-motion';
import { tr } from 'motion/react-client';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function RegisterForm() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setname] = useState('');
  const [continueButton, setContinueButton] = useState(false);

  const handleContinue = async () => {
    setContinueButton(true);
  };
  const handleBack = async () => {
    setContinueButton(false);
  };

  // 1 ต้องใส่ข้อมูลทั้งหมด
  // 2 กดปุ่ม continue จะเช็คว่าข้อมูลถูกต้องหรือไม่
  // 3 ถ้าถูกต้องจะเปิดหน้าต่อไป
  // 4 ถ้าไม่ถูกต้องจะไม่สามารถผ่านได้
  // 5 ถ้าถูกต้องจะเปิดหน้าต่อไป
  // 6 ถ้าไม่ถูกต้องจะไม่สามารถผ่านได้
  // 7 จะมีข้อมูลให้กรอกเพิ่มเติม
  // 8 จะมีปุ่มสำหรับกลับไปหน้าก่อนหน้า
  // 9 มีปุ่มsubmit สำหรับส่งข้อมูลใน

  const inputStyle =
    'w-full rounded-2xl border-2 border-gray-100 bg-white p-2 hover:border-amber-600 focus:outline-none';

  return (
    <>
      {!continueButton ? (
        <motion.div
          key="register-step-1"
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring' }}
        >
          <section className="lg:border-block flex h-[30rem] w-[20rem] flex-col items-center justify-center gap-10 rounded-xl lg:h-[35rem] lg:w-[30rem] lg:border-1 lg:border-white lg:bg-white/50">
            <h1 className="text-shadow-[0_0_3px_#000,_0_0_5px_#000] text-shadow-lg text-6xl font-bold text-white drop-shadow-sm">
              Register
            </h1>
            <form className="flex flex-col items-center justify-center gap-5">
              <input
                type="email"
                required
                placeholder="email"
                className={inputStyle}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="text"
                required
                placeholder="username"
                className={inputStyle}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="password"
                required
                placeholder="password"
                className="w-72 rounded-2xl border-2 border-gray-100 bg-white p-2 hover:border-amber-600 focus:outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </form>
            <div className="flex flex-row items-center justify-center gap-10"></div>
            <section className="flex flex-row items-center justify-center gap-2">
              <button
                type="button"
                className="hover:shadow-3xl transform cursor-pointer rounded-full border-b-1 border-amber-800 bg-amber-600 px-30 py-3 text-white shadow-lg drop-shadow-xl transition-transform duration-200 hover:scale-105 hover:bg-amber-700 active:bg-amber-800"
                onClick={handleContinue}
                disabled={continueButton}
              >
                Next
              </button>
            </section>
            <p className="text-sm text-gray-500">
              Already have an account?
              <Link
                href="/auth/login"
                className="ml-2 text-amber-800 transition-transform duration-200 hover:text-amber-600 hover:underline"
              >
                Login
              </Link>
            </p>
          </section>
        </motion.div>
      ) : (
        <motion.div
          key="register-step-2"
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring' }}
          className="lg:border-block flex max-h-screen w-[20rem] flex-col items-center justify-center gap-10 rounded-xl lg:h-[50rem] lg:w-[50rem] lg:border-1 lg:border-white lg:bg-white/50"
        >
          <h1 className="text-shadow-[0_0_3px_#000,_0_0_5px_#000] text-shadow-lg text-5xl font-bold text-wrap text-black drop-shadow-sm"></h1>
          <form
            className="flex w-full max-w-[400px] flex-col gap-4 px-6"
            onSubmit={(e) => {
              e.preventDefault(); /* handle submit here */
            }}
          >
            <div className="flex w-full flex-col gap-4 lg:flex-row">
              <div className="flex w-full flex-col lg:w-1/2">
                <label htmlFor="name" className="pl-1 text-[12px] text-gray-500">
                  Full name
                </label>
                <input
                  type="text"
                  className={inputStyle}
                  placeholder="Full name"
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                />
              </div>
              <div className="flex w-full flex-col lg:w-1/2">
                <label htmlFor="lastname" className="pl-1 text-[12px] text-gray-500">
                  Last name
                </label>
                <input type="text" className={inputStyle} placeholder="Last name" />
              </div>
            </div>

            <div className="flex w-full flex-col">
              <label htmlFor="phone" className="pl-1 text-[12px] text-gray-500">
                Phone
              </label>
              <input type="text" className={inputStyle} placeholder="Phone" />
            </div>
{/* มีปัญหาเรื่อง ขอบ */}
            <div className="flex w-full flex-col">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Birth Date"
                  slotProps={{ textField: { className: inputStyle } }}
                />
              </LocalizationProvider>
            </div>

            <div className="flex w-full flex-col">
              <label htmlFor="address" className="pl-1 text-[12px] text-gray-500">
                Address
              </label>
              <textarea
                className="min-h-[120px] w-full resize-none rounded-2xl border-2 border-gray-100 bg-white p-2 hover:border-amber-600 focus:outline-none"
                placeholder="Enter your full address"
                rows={4}
              />
            </div>

            <div className="flex w-full flex-col">
              <label htmlFor="postcode" className="pl-1 text-[12px] text-gray-500">
                Postcode
              </label>
              <input type="text" className={inputStyle} placeholder="Postcode" />
            </div>

            <div className="flex w-full flex-col">
              <label htmlFor="city" className="pl-1 text-[12px] text-gray-500">
                City
              </label>
              <input type="text" className={inputStyle} placeholder="City" />
            </div>

            <div className="flex w-full flex-col">
              <label htmlFor="country" className="pl-1 text-[12px] text-gray-500">
                Country
              </label>
              <input type="text" className={inputStyle} placeholder="Country" />
            </div>

            <div className="mt-4 flex flex-row items-center justify-center gap-10">
              <button
                type="button"
                onClick={handleBack}
                className="hover:shadow-3xl border-white-200 transform cursor-pointer rounded-full border-b-1 bg-gray-600 px-10 py-3 text-white shadow-lg drop-shadow-xl transition-transform duration-200 hover:scale-105 hover:bg-gray-400 active:bg-gray-800"
              >
                <IoArrowBack className="h-6 w-6" />
              </button>
              <button
                type="submit"
                className="hover:shadow-3xl transform cursor-pointer rounded-full border-b-1 border-amber-800 bg-amber-600 px-30 py-3 text-white shadow-lg drop-shadow-xl transition-transform duration-200 hover:scale-105 hover:bg-amber-700 active:bg-amber-800"
              >
                Submit
              </button>
            </div>
          </form>
        </motion.div>
      )}
    </>
  );
}

{
  /* <section className="lg:border-block flex h-[30rem] w-[20rem] flex-col items-center justify-center gap-10 rounded-xl lg:h-[35rem] lg:w-[30rem] lg:border-1 lg:border-white lg:bg-white/50"></section> */
}
