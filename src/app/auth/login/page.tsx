'use client';
import { FcGoogle } from 'react-icons/fc';
import Link from 'next/link';
import { FaFacebookSquare } from 'react-icons/fa';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function AuthPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const loginUser = async () => {
    try {
      const response = await axios.post('/api/auth/login', {
        email,
        password,
      });

      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        router.push('/');
      }
    } catch (error: any) {
      console.log('Login error:', error);
      if (error.response?.data?.error) {
        setError(error.response.data.error);
      } else {
        setError('An error occurred during login');
      }
    }
  };

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setError(''); // Clear previous errors
    await loginUser();
  };

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center bg-[url('/images/auth/authwallpaper.avif')] bg-cover bg-center">
        <section className="lg:border-block flex h-[30rem] w-[20rem] flex-col items-center justify-center gap-10 rounded-xl lg:h-[35rem] lg:w-[30rem] lg:border-1 lg:border-white lg:bg-white/50">
          <h1 className="text-shadow-[0_0_3px_#000,_0_0_5px_#000] text-shadow-lg text-6xl font-bold text-white drop-shadow-sm">
            Login
          </h1>
          <form className="flex flex-col items-center justify-center gap-5">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email"
              className="w-72 rounded-2xl border-2 border-gray-100 bg-white p-2 hover:border-amber-600 focus:outline-none"
            />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
              className="w-72 rounded-2xl border-2 border-gray-100 bg-white p-2 hover:border-amber-600 focus:outline-none"
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
          </form>
          <div className="flex flex-row items-center justify-center gap-10">
            <Link
              href="#"
              className="flex h-10 w-10 flex-row items-center justify-center gap-2 rounded-full border-1 border-gray-200 bg-white shadow transition-transform duration-200 hover:scale-110"
            >
              <FcGoogle size={40} />
            </Link>

            <Link
              href="#"
              className="flex flex-col items-center justify-center gap-2 rounded-md bg-white text-[#0766FE] shadow shadow-blue-500/50 transition-transform duration-200 hover:scale-110"
            >
              <FaFacebookSquare size={40} />
            </Link>
          </div>
          <section className="flex flex-row items-center justify-center gap-2">
            <button
              onClick={handleSubmit}
              type="submit"
              className="hover:shadow-3xl transform cursor-pointer rounded-full border-b-1 border-amber-800 bg-amber-600 px-30 py-3 text-white shadow-lg drop-shadow-xl transition-transform duration-200 hover:scale-105 hover:bg-amber-700 active:bg-amber-800"
            >
              Login
            </button>
          </section>
          <p className="text-sm text-gray-500">
            Don't have an account?
            <Link
              href="/auth/register"
              className="ml-2 text-amber-800 transition-transform duration-200 hover:text-amber-600 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </section>
      </main>
    </>
  );
}
