'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/app/utils/supabaseClient';
import { Session } from '@supabase/supabase-js';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [userData, setUserData] = useState<any>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  // ตรวจสอบ session เมื่อโหลดหน้าเว็บ
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);

      if (data.session) {
        setMessage('คุณเข้าสู่ระบบอยู่แล้ว');
        setAccessToken(data.session.access_token);
        testGetUserAPI();
      }
    };

    checkSession();

    // ลงทะเบียน listener สำหรับการเปลี่ยนแปลง auth state
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, newSession) => {
      setSession(newSession);
      if (newSession) {
        setMessage('สถานะการเข้าสู่ระบบเปลี่ยนแปลง: ' + event);
        setAccessToken(newSession.access_token);
      } else {
        setAccessToken(null);
      }
    });

    return () => {
      // ยกเลิก listener เมื่อ component unmount
      if (authListener && authListener.subscription) {
        authListener.subscription.unsubscribe();
      }
    };
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('กำลังเข้าสู่ระบบ...');

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setMessage(`เข้าสู่ระบบไม่สำเร็จ: ${error.message}`);
        return;
      }

      setSession(data.session);
      setAccessToken(data.session?.access_token || null);
      setMessage('เข้าสู่ระบบสำเร็จ!');

      // รอให้ session ถูกเซ็ตก่อนเรียก API
      setTimeout(() => {
        testGetUserAPI();
      }, 500);
    } catch (error: any) {
      setMessage(`เกิดข้อผิดพลาด: ${error.message}`);
    }
  };

  const testGetUserAPI = async () => {
    try {
      // ใช้ credentials: 'include' เพื่อส่ง cookies ไปด้วย
      const response = await fetch('/api/auth/getuser', {
        credentials: 'include',
        headers: {
          'Cache-Control': 'no-cache',
        },
      });

      const data = await response.json();

      // ถ้ามี error ให้ลองใช้ token แทน
      if (data.error && accessToken) {
        console.log('Session cookie ไม่ทำงาน ลองใช้ token แทน...');
        return testGetUserWithToken();
      }

      setUserData(data);
      console.log('ข้อมูลจาก API (ใช้ session cookie):', data);
    } catch (error: any) {
      console.error('เกิดข้อผิดพลาดในการเรียก API:', error);
      setMessage(`เกิดข้อผิดพลาดในการเรียก API: ${error.message}`);

      // ถ้าเกิด error ให้ลองใช้ token แทน
      if (accessToken) {
        console.log('ลองใช้ token แทน...');
        testGetUserWithToken();
      }
    }
  };

  const testGetUserWithToken = async () => {
    try {
      if (!accessToken) {
        setMessage('ไม่มี Access Token กรุณาเข้าสู่ระบบอีกครั้ง');
        return;
      }

      const response = await fetch('/api/auth/getuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ accessToken }),
      });

      const data = await response.json();
      setUserData(data);
      console.log('ข้อมูลจาก API (ใช้ token):', data);
    } catch (error: any) {
      console.error('เกิดข้อผิดพลาดในการเรียก API ด้วย token:', error);
      setMessage(`เกิดข้อผิดพลาด: ${error.message}`);

      // ถ้าเกิด error ให้ลองใช้ email แทน (สำหรับทดสอบเท่านั้น)
      testGetUserWithEmail();
    }
  };

  const testGetUserWithEmail = async () => {
    try {
      if (!email && session?.user?.email) {
        // ถ้าไม่มี email ในฟอร์ม แต่มีใน session ให้ใช้จาก session
        const userEmail = session.user.email;
        console.log('ใช้อีเมลจาก session:', userEmail);

        const response = await fetch('/api/auth/getuser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: userEmail }),
        });

        const data = await response.json();
        setUserData(data);
        console.log('ข้อมูลจาก API (ใช้ email จาก session):', data);
      } else if (email) {
        // ถ้ามี email ในฟอร์ม ให้ใช้จากฟอร์ม
        const response = await fetch('/api/auth/getuser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        });

        const data = await response.json();
        setUserData(data);
        console.log('ข้อมูลจาก API (ใช้ email จากฟอร์ม):', data);
      } else {
        console.error('ไม่พบอีเมล์สำหรับทดสอบ');
        setMessage('ไม่พบอีเมล์สำหรับทดสอบ กรุณากรอกอีเมล์ในฟอร์ม');
      }
    } catch (error: any) {
      console.error('เกิดข้อผิดพลาดในการเรียก API ด้วย email:', error);
      setMessage(`เกิดข้อผิดพลาด: ${error.message}`);
    }
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      setMessage(`ออกจากระบบไม่สำเร็จ: ${error.message}`);
    } else {
      setMessage('ออกจากระบบสำเร็จ');
      setUserData(null);
      setSession(null);
      setAccessToken(null);
    }
  };

  return (
    <div className="mx-auto mt-10 max-w-md rounded-lg bg-white p-6 shadow-md">
      <h1 className="mb-6 text-2xl font-semibold">เข้าสู่ระบบเพื่อทดสอบ API</h1>

      {!session ? (
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              อีเมล
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              รหัสผ่าน
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-md border border-transparent bg-blue-600 px-4 py-2 text-white shadow-sm hover:bg-blue-700"
          >
            เข้าสู่ระบบ
          </button>
        </form>
      ) : (
        <button
          onClick={handleLogout}
          className="w-full rounded-md border border-transparent bg-red-600 px-4 py-2 text-white shadow-sm hover:bg-red-700"
        >
          ออกจากระบบ
        </button>
      )}

      {message && (
        <div className="mt-4 rounded-md bg-gray-100 p-3">
          <p>{message}</p>
        </div>
      )}

      {userData && (
        <div className="mt-4 rounded-md bg-gray-100 p-3">
          <h2 className="mb-2 text-lg font-semibold">ผลลัพธ์จาก API:</h2>
          <pre className="overflow-auto text-xs">{JSON.stringify(userData, null, 2)}</pre>
        </div>
      )}

      <div className="mt-4">
        <button
          onClick={testGetUserAPI}
          className="w-full rounded-md border border-transparent bg-green-600 px-4 py-2 text-white shadow-sm hover:bg-green-700"
        >
          ทดสอบเรียก API
        </button>
      </div>
    </div>
  );
}
