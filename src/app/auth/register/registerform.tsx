'use client';

import Link from 'next/link';
import { useState } from 'react';
import { IoArrowBack } from 'react-icons/io5';
import { motion } from 'framer-motion';
import { style, tr } from 'motion/react-client';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function RegisterForm() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setname] = useState('');
  const [continueButton, setContinueButton] = useState(false);
  const [postcode, setPostcode] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');

  const handleChange = (event: any) => {
    setPostcode(event.target.value);
  };

  const handleContinue = async () => {
    setContinueButton(true);
  };
  const handleBack = async () => {
    setContinueButton(false);
  };

  const handleSubmit = async () => {
    console.log('submit');
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
    'w-full rounded-2xl border-1 border-gray-300 bg-white p-2 hover:border-amber-600 focus:outline-none';

  const selectStyle = `${inputStyle} cursor-pointer [&>option]:py-2 [&>option]:px-4 [&>option]:cursor-pointer [&>option]:bg-white [&>option:checked]:bg-blue-500 [&>option:checked]:text-white`;

  // Add styles to force dropdown direction
  const selectWrapperStyle = `
    ${selectStyle}
    [&_select]:absolute [&_select]:bottom-full
    [&_option]:absolute [&_option]:top-full
  `;

  return (
    <>
      {!continueButton ? (
        <motion.div
          key="register-step-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <section className="lg:border-block flex h-[30rem] w-[20rem] flex-col items-center justify-center gap-10 rounded-xl lg:h-[35rem] lg:w-[30rem] lg:border-1 lg:border-white lg:bg-white/50">
            <h1 className="text-shadow-[0_0_3px_#000,_0_0_5px_#000] text-shadow-lg text-6xl font-bold text-white drop-shadow-sm">
              Register
            </h1>
            <form className="flex flex-col items-center justify-center gap-5">
              <div className="flex w-full flex-col">
                <label htmlFor="email" className="pl-1 text-[12px] text-gray-500">
                  Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="email"
                  className="w-72 rounded-2xl border-2 border-gray-100 bg-white p-2 hover:border-amber-600 focus:outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex w-full flex-col">
                <label htmlFor="username" className="pl-1 text-[12px] text-gray-500">
                  Username
                </label>
                <input
                  type="text"
                  required
                  placeholder="username"
                  className="w-72 rounded-2xl border-2 border-gray-100 bg-white p-2 hover:border-amber-600 focus:outline-none"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="flex w-full flex-col">
                <label htmlFor="password" className="pl-1 text-[12px] text-gray-500">
                  Password
                </label>
                <input
                  type="password"
                  required
                  placeholder="password"
                  className="w-72 rounded-2xl border-2 border-gray-100 bg-white p-2 hover:border-amber-600 focus:outline-none"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
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
                  slotProps={{
                    textField: {
                      className: inputStyle,
                      InputProps: {
                        style: {
                          boxShadow: 'none',
                          borderRadius: '0.75rem',
                          border: 'none',
                          background: '#fff',
                          outline: 'none',
                        },
                      },
                    },
                  }}
                />
              </LocalizationProvider>
            </div>

            <div className="flex w-full flex-col">
              <label htmlFor="address" className="pl-1 text-[12px] text-gray-500">
                Address
              </label>
              <textarea className={inputStyle} placeholder="Enter your full address" rows={4} />
            </div>

            <div className="flex w-full flex-col">
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="country-select-label">Country</InputLabel>
                  <Select
                    labelId="country-select-label"
                    id="country-select"
                    value={country}
                    label="Country"
                    onChange={(event: SelectChangeEvent) => setCountry(event.target.value)}
                    className={inputStyle}
                    sx={{
                      width: '100%',
                      height: '3rem',
                      borderRadius: '1rem',
                      padding: '0.5rem',
                      border: '1px solid #ccc',
                      backgroundColor: '#fff',
                      color: '#000',
                      fontSize: '1rem',
                      marginTop: '3px',
                    }}
                    MenuProps={{
                      PaperProps: {
                        style: {
                          maxHeight: 200,
                        },
                      },
                      autoFocus: true,
                      disableAutoFocusItem: true,
                      onKeyDown: (e) => {
                        if (e.key === 'Backspace') {
                          e.stopPropagation();
                        }
                      },
                    }}
                  >
                    <MenuItem value="">
                      <em>Type to search country...</em>
                    </MenuItem>
                    <MenuItem value="thailand">Thailand</MenuItem>
                    <MenuItem value="usa">United States</MenuItem>
                    <MenuItem value="uk">United Kingdom</MenuItem>
                    <MenuItem value="japan">Japan</MenuItem>
                    <MenuItem value="china">China</MenuItem>
                    <MenuItem value="singapore">Singapore</MenuItem>
                    <MenuItem value="malaysia">Malaysia</MenuItem>
                    <MenuItem value="vietnam">Vietnam</MenuItem>
                    <MenuItem value="indonesia">Indonesia</MenuItem>
                    <MenuItem value="philippines">Philippines</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </div>

            <div className="flex w-full flex-col">
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="city-select-label">City</InputLabel>
                  <Select
                    labelId="city-select-label"
                    id="city-select"
                    value={city}
                    label="City"
                    onChange={(event: SelectChangeEvent) => setCity(event.target.value)}
                    className={inputStyle}
                    sx={{
                      width: '100%',
                      height: '3rem',
                      borderRadius: '1rem',
                      padding: '0.5rem',
                      border: '1px solid #ccc',
                      backgroundColor: '#fff',
                      color: '#000',
                      fontSize: '1rem',
                      marginTop: '3px',
                    }}
                    MenuProps={{
                      PaperProps: {
                        style: {
                          maxHeight: 200,
                        },
                      },
                      autoFocus: true,
                      disableAutoFocusItem: true,
                      onKeyDown: (e) => {
                        if (e.key === 'Backspace') {
                          e.stopPropagation();
                        }
                      },
                    }}
                  >
                    <MenuItem value="">
                      <em>Type to search city...</em>
                    </MenuItem>
                    <MenuItem value="bangkok">Bangkok</MenuItem>
                    <MenuItem value="chiangmai">Chiang Mai</MenuItem>
                    <MenuItem value="phuket">Phuket</MenuItem>
                    <MenuItem value="pattaya">Pattaya</MenuItem>
                    <MenuItem value="hatyai">Hat Yai</MenuItem>
                    <MenuItem value="udonthani">Udon Thani</MenuItem>
                    <MenuItem value="khonkaen">Khon Kaen</MenuItem>
                    <MenuItem value="nakhonratchasima">Nakhon Ratchasima</MenuItem>
                    <MenuItem value="suratthani">Surat Thani</MenuItem>
                    <MenuItem value="ubonratchathani">Ubon Ratchathani</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </div>

            <div className="flex w-full flex-col">
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="postcode-select-label">Postcode</InputLabel>
                  <Select
                    labelId="postcode-select-label"
                    id="postcode-select"
                    value={postcode}
                    label="Postcode"
                    onChange={(event: SelectChangeEvent) => setPostcode(event.target.value)}
                    className={inputStyle}
                    sx={{
                      width: '100%',
                      height: '3rem',
                      borderRadius: '1rem',
                      padding: '0.5rem',
                      border: '1px solid #ccc',
                      backgroundColor: '#fff',
                      color: '#000',
                      fontSize: '1rem',
                      marginTop: '3px',
                    }}
                    MenuProps={{
                      PaperProps: {
                        style: {
                          maxHeight: 200,
                        },
                      },
                      autoFocus: true,
                      disableAutoFocusItem: true,
                      onKeyDown: (e) => {
                        if (e.key === 'Backspace') {
                          e.stopPropagation();
                        }
                      },
                    }}
                  >
                    <MenuItem value="">
                      <em>Type to search postcode...</em>
                    </MenuItem>
                    <MenuItem value="1">1</MenuItem>
                    <MenuItem value="2">2</MenuItem>
                    <MenuItem value="3">3</MenuItem>
                    <MenuItem value="4">4</MenuItem>
                    <MenuItem value="5">5</MenuItem>
                    <MenuItem value="6">6</MenuItem>
                    <MenuItem value="700">700</MenuItem>
                    <MenuItem value="720">720</MenuItem>
                    <MenuItem value="73000">73000</MenuItem>
                    <MenuItem value="10">10</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </div>

            <div className="mt-4 flex flex-row items-center justify-center gap-10">
              <button
                type="button"
                onClick={handleBack}
                className="hover:shadow-3xl transform cursor-pointer rounded-full bg-gray-600 px-10 py-3 text-white shadow-lg drop-shadow-xl transition-transform duration-200 hover:scale-105 hover:bg-gray-400 active:bg-gray-800"
                title="Back to previous step"
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
