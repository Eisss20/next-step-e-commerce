'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { IoArrowBack } from 'react-icons/io5';
import { motion } from 'framer-motion';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import axios from 'axios';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';

interface Location {
  location_id: string;
  location_name: string;
}

interface Province {
  province_state_id: string;
  province_state_name: string;
}

interface City {
  city_id: string;
  city_name: string;
}

interface Postcode {
  zipcode_id: string;
  zipcode: string;
}

export default function RegisterForm() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setfirstname] = useState('');
  const [lastname, setlastname] = useState('');
  const [phone, setphone] = useState('');
  const [birthdate, setbirthdate] = useState<dayjs.Dayjs | null>(null);
  const [address, setaddress] = useState('');
  const [gender, setgender] = useState('');

  const [continueButton, setContinueButton] = useState(false);

  const [allLocation, setAllLocation] = useState<Location[]>([]);
  const [selectedLocation, setSelectedLocation] = useState('');

  const [allProvince, setAllProvince] = useState<Province[]>([]);
  const [selectedProvince, setSelectedProvince] = useState('');

  const [allCity, setAllCity] = useState<City[]>([]);
  const [selectedCity, setSelectedCity] = useState('');

  const [allPostcode, setAllPostcode] = useState<Postcode[]>([]);
  const [selectedPostcode, setSelectedPostcode] = useState('');

  const router = useRouter();

  useEffect(() => {
    const fetchDataLocation = async () => {
      const response = await fetch('/api/auth/register/getDataLocation');
      const dataLocation = await response.json();
      setAllLocation(dataLocation.data);
      console.log('RESPONSE:', dataLocation);
    };
    fetchDataLocation();
  }, [selectedLocation]);

  useEffect(() => {
    const fetchDataProvince = async () => {
      const response = await fetch(
        `/api/auth/register/getDataProvince?locationId=${selectedLocation}`
      );
      const dataProvince = await response.json();
      setAllProvince(dataProvince.data);
      console.log('RESPONSE:', dataProvince);
    };
    fetchDataProvince();
  }, [selectedLocation]);

  useEffect(() => {
    const fetchDataCity = async () => {
      const response = await fetch(`/api/auth/register/getDataCity?provinceId=${selectedProvince}`);
      const dataCity = await response.json();
      setAllCity(dataCity.data);
      console.log('RESPONSE:', dataCity);
    };
    fetchDataCity();
  }, [selectedProvince]);

  useEffect(() => {
    const fetchDataPostcode = async () => {
      const response = await fetch(`/api/auth/register/getDataZipCode?cityId=${selectedCity}`);
      const dataPostcode = await response.json();
      setAllPostcode(dataPostcode.data);
      console.log('RESPONSE:', dataPostcode);
    };
    fetchDataPostcode();
  }, [selectedCity]);

  // function handleLocation for empty all selected province, city, postcode
  const handleLocation = (event: SelectChangeEvent) => {
    const value = event.target.value;
    setSelectedLocation(value);

    setSelectedProvince('');

    setSelectedCity('');
    setAllCity([]);

    setSelectedPostcode('');
    setAllPostcode([]);
  };

  /// for select province
  const handleProvince = (event: SelectChangeEvent) => {
    setSelectedProvince(event.target.value);
  };

  /// for select city
  const handleCity = (event: SelectChangeEvent) => {
    setSelectedCity(event.target.value);
  };

  /// for select postcode
  const handlePostcode = (event: SelectChangeEvent) => {
    setSelectedPostcode(event.target.value);
  };

  /// switch button continue and back
  const handleContinue = async () => {
    setContinueButton(true);
  };
  const handleBack = async () => {
    setContinueButton(false);
  };

  // send data to backend
  const CreateRegister = async () => {
    try {
      const response = await axios.post('/api/auth/register', {
        email,
        username,
        password,
        first_name: firstname,
        last_name: lastname,
        phone_number: phone,
        gender,
        date_of_birth: birthdate ? birthdate.format('YYYY-MM-DD') : '',
        detail_address: address,
        location_id: Number(selectedLocation),
        province_state_id: Number(selectedProvince),
        city_id: Number(selectedCity),
        zipcode_id: Number(selectedPostcode),
      });
      alert('Successfully registered');
      router.push('/auth/login');
      console.log('RESPONSE:', response);
      return response;
    } catch (error: unknown) {
      console.error('Registration error:', error);
      if (
        typeof error === 'object' &&
        error !== null &&
        'response' in error &&
        typeof (error as { response?: { data?: { message?: string } } }).response?.data?.message ===
          'string'
      ) {
        alert((error as { response: { data: { message: string } } }).response.data.message);
      } else {
        alert('Registration error');
      }
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields section
    if (
      !email ||
      !username ||
      !password ||
      !firstname ||
      !lastname ||
      !phone ||
      !birthdate ||
      !address ||
      !selectedLocation ||
      !selectedProvince ||
      !selectedCity ||
      !selectedPostcode
    ) {
      alert('Please fill in all fields');
      return;
    }

    try {
      const response = await CreateRegister();
      if (response.status === 200) {
        alert('Successfully registered');
        router.push('/auth/login');
      }
    } catch (error: unknown) {
      console.error('Registration error:', error);
      if (
        typeof error === 'object' &&
        error !== null &&
        'response' in error &&
        typeof (error as { response?: { data?: { message?: string } } }).response?.data?.message ===
          'string'
      ) {
        alert((error as { response: { data: { message: string } } }).response.data.message);
      } else {
        alert('Registration error');
      }
    }
  };

  const inputStyle =
    'w-full rounded-2xl border-1 border-gray-300 bg-white p-2 hover:border-amber-600 focus:outline-none';

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
          <form className="flex w-full max-w-[400px] flex-col gap-4 px-6" onSubmit={handleSubmit}>
            <div className="flex w-full flex-col gap-4 lg:flex-row">
              <div className="flex w-full flex-col lg:w-1/2">
                <label htmlFor="name" className="pl-1 text-[12px] text-gray-500">
                  First name
                </label>
                <input
                  type="text"
                  className={inputStyle}
                  placeholder="First name"
                  value={firstname}
                  onChange={(e) => setfirstname(e.target.value)}
                />
              </div>
              <div className="flex w-full flex-col lg:w-1/2">
                <label htmlFor="lastname" className="pl-1 text-[12px] text-gray-500">
                  Last name
                </label>
                <input
                  type="text"
                  className={inputStyle}
                  value={lastname}
                  onChange={(e) => setlastname(e.target.value)}
                  placeholder="Last name"
                />
              </div>
            </div>

            <div className="flex w-full flex-col">
              <label htmlFor="gender" className="pl-1 text-[12px] text-gray-500">
                Gender
              </label>
              <input
                type="text"
                className={inputStyle}
                value={gender}
                onChange={(e) => setgender(e.target.value)}
                placeholder="Gender"
              />
            </div>
            <div className="flex w-full flex-col">
              <label htmlFor="phone" className="pl-1 text-[12px] text-gray-500">
                Phone
              </label>
              <input
                type="text"
                className={inputStyle}
                value={phone}
                onChange={(e) => setphone(e.target.value)}
                placeholder="Phone"
              />
            </div>
            {/* มีปัญหาเรื่อง ขอบ */}
            <div className="flex w-full flex-col">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Birth Date"
                  value={birthdate}
                  onChange={(newValue) => setbirthdate(newValue)}
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
              <textarea
                className={inputStyle}
                value={address}
                onChange={(e) => setaddress(e.target.value)}
                placeholder="Enter your full address"
                rows={4}
              />
            </div>

            <div className="flex w-full flex-col">
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="country-select-label">Location</InputLabel>
                  <Select
                    labelId="country-select-label"
                    id="country-select"
                    value={selectedLocation}
                    label="Location"
                    onChange={handleLocation}
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
                    {allLocation.map((data) => (
                      <MenuItem key={data.location_id} value={data.location_id}>
                        {data.location_name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </div>

            <div className="flex w-full flex-col">
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="country-select-label">Province</InputLabel>
                  <Select
                    labelId="country-select-label"
                    id="country-select"
                    value={selectedProvince}
                    label="Province"
                    onChange={(event: SelectChangeEvent) => handleProvince(event)}
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
                      <em>Type to search province...</em>
                    </MenuItem>
                    {allProvince.map((data) => (
                      <MenuItem key={data.province_state_id} value={data.province_state_id}>
                        {data.province_state_name}
                      </MenuItem>
                    ))}
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
                    value={selectedCity}
                    label="City"
                    onChange={(event: SelectChangeEvent) => handleCity(event)}
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
                    {allCity.map((data) => (
                      <MenuItem key={data.city_id} value={data.city_id}>
                        {data.city_name}
                      </MenuItem>
                    ))}
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
                    value={selectedPostcode}
                    label="Postcode"
                    onChange={(event: SelectChangeEvent) => handlePostcode(event)}
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
                    {allPostcode.map((data) => (
                      <MenuItem key={data.zipcode_id} value={data.zipcode_id}>
                        {data.zipcode}
                      </MenuItem>
                    ))}
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
