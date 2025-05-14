'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function UserProfileRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/users/settings/account');
  }, [router]);

  return null;
}
