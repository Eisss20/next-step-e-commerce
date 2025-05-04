
import { FcGoogle } from 'react-icons/fc';
import Link from 'next/link';
import { FaFacebookSquare } from 'react-icons/fa';
import RegisterForm from './registerform';

export default function RegisterPage() {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center bg-[url('/images/auth/authwallpaper.avif')] bg-cover bg-center">
        <RegisterForm />
      </main>
    </>
  );
}
