'use client'
import { FcGoogle } from 'react-icons/fc';
import Link from 'next/link';
import { FaFacebookSquare } from 'react-icons/fa';

import { useState } from 'react';

export default function AuthPage() {

  const [isRegister, setIsRegister] = useState(false);

  const handleRegister = () => {
    setIsRegister(!isRegister);
  }


  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center bg-[url('/images/auth/authwallpaper.avif')] bg-cover bg-center">
        <section className="lg:border-block flex h-[30rem] w-[20rem] flex-col items-center justify-center gap-10 rounded-xl lg:h-[35rem] lg:w-[30rem] lg:border-1 lg:border-white lg:bg-white/50">
          <h1 className="text-shadow-[0_0_3px_#000,_0_0_5px_#000] text-shadow-lg drop-shadow-sm text-6xl font-bold text-white">
            {isRegister ? 'Register' : 'Login'}   
          </h1>
          <form className="flex flex-col items-center justify-center gap-5">
            <input
              type="email"
              required
              placeholder="email"
              className="w-72 rounded-2xl border-2 border-gray-100 bg-white p-2  hover:border-amber-600 focus:outline-none"
            />

            {isRegister && (
              <input
                type="text"
                required
                placeholder="username"
                className="w-72 rounded-2xl border-2 border-gray-100 bg-white p-2  hover:border-amber-600 focus:outline-none"
              />
            )}
            <input
              type="password"
              required
              placeholder="password"
              className="w-72 rounded-2xl border-2 border-gray-100 bg-white p-2 hover:border-amber-600  focus:outline-none"
            />
          </form>
          <div className="flex flex-row items-center justify-center gap-10">
            <Link
              href="#"
              className="flex h-10 w-10 flex-row items-center bg-white justify-center hover:scale-110 transition-transform duration-200 gap-2 rounded-full border-1 border-gray-200 shadow"
            >
              <FcGoogle size={40} />
            </Link>

            <Link
              href="#"
              className="flex flex-col items-center justify-center bg-white hover:scale-110 transition-transform duration-200  gap-2 rounded-md text-[#0766FE] shadow shadow-blue-500/50"
            >
              <FaFacebookSquare size={40} />
            </Link>
          </div>
          <section className="flex flex-row items-center justify-center gap-2">
          {/* <button type="submit" className="rounded-full bg-amber-600 shadow-2xl drop-shadow-lg hover:bg-amber-700 active:bg-amber-800 cursor-pointer px-6 py-3 text-white transform hover:scale-105 transition-transform duration-200 hover:shadow-3xl hover:shadow-amber-600/50">
            Login
          </button> */}
          <button
            type="submit"
            className="hover:shadow-3xl transform cursor-pointer rounded-full border-b-1 border-amber-800 bg-amber-600  px-30 py-3 text-white shadow-lg drop-shadow-xl transition-transform duration-200 hover:scale-105 hover:bg-amber-700  active:bg-amber-800"
          >
            Login
            </button>
          </section>
         {!isRegister && (
          <p className="text-sm text-gray-500">
            Don't have an account?
            <button onClick={handleRegister} className="ml-2 hover:text-amber-600 transition-transform hover:underline duration-200 text-amber-800">
              {isRegister ? 'Login' : 'Sign up'}
            </button>
            </p>
          )}
          {isRegister && (
            <p className="text-sm text-gray-500">
              Already have an account?
              <button onClick={handleRegister} className="ml-2 hover:text-amber-600 transition-transform hover:underline duration-200 text-amber-800">
                {isRegister ? 'Login' : 'Sign up'}
              </button>
            </p>
          )}
        </section>


        
      </main>
    </>
  );
}
