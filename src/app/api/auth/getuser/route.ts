import { NextResponse } from "next/server";
import { supabase } from "@/app/utils/supabaseClient";
import { createClient } from "@supabase/supabase-js";

// สำหรับ GET request (ใช้ session cookie)
export async function GET(request: Request) {
  try {
    // ดึงข้อมูลผู้ใช้จาก session cookie
    const { data: userData, error: userError } = await supabase.auth.getUser();
    
    if (userError) {
      return NextResponse.json({ error: userError.message }, { status: 401 });
    }
    
    if (!userData.user) {
      return NextResponse.json({ error: "ไม่พบข้อมูลผู้ใช้ กรุณาเข้าสู่ระบบก่อน" }, { status: 401 });
    }

    // ดึงข้อมูล session และ JWT token (ถ้ามี)
    const { data: sessionData } = await supabase.auth.getSession();
    
    // ส่งคืนข้อมูลที่จำเป็น
    return NextResponse.json({
      user: {
        id: userData.user.id,  // UUID ของผู้ใช้
        email: userData.user.email,
        user_metadata: userData.user.user_metadata
      },
      session: sessionData.session ? {
        access_token: sessionData.session.access_token,
        refresh_token: sessionData.session.refresh_token,
        expires_at: sessionData.session.expires_at
      } : null
    });
  } catch (error: any) {
    console.error('Error fetching user data:', error);
    return NextResponse.json({ error: error.message || "เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้" }, { status: 500 });
  }
}

// สำหรับ POST request (รับ access token หรือ email)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { accessToken, email } = body;
    
    // กรณีมี accessToken: ใช้ token โดยตรง
    if (accessToken) {
      const supabaseClient = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL as string,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string,
        {
          global: {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        }
      );
      
      // ดึงข้อมูลผู้ใช้โดยใช้ token ที่ส่งมา
      const { data: userData, error: userError } = await supabaseClient.auth.getUser();
      
      if (userError) {
        return NextResponse.json({ error: userError.message }, { status: 401 });
      }
      
      return NextResponse.json({
        user: {
          id: userData.user.id,
          email: userData.user.email,
          user_metadata: userData.user.user_metadata
        }
      });
    } 
    // กรณีมี email: ใช้ admin API (สำหรับการทดสอบเท่านั้น)
    else if (email) {
      // ตรวจสอบว่ามี service role key หรือไม่
      if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
        return NextResponse.json({ error: "Service role key is not configured" }, { status: 500 });
      }
      
      const supabaseAdmin = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL as string,
        process.env.SUPABASE_SERVICE_ROLE_KEY as string
      );
      
      // ค้นหาผู้ใช้โดยใช้ admin API
      const { data, error } = await supabaseAdmin.auth.admin.listUsers();
      
      if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
      }
      
      // หาผู้ใช้ที่มี email ตรงกับที่ระบุ
      const user = data.users.find(u => u.email === email);
      
      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }
      
      return NextResponse.json({
        user: {
          id: user.id,
          email: user.email,
          user_metadata: user.user_metadata
        }
      });
    } else {
      return NextResponse.json({ 
        error: "ต้องระบุ accessToken หรือ email" 
      }, { status: 400 });
    }
  } catch (error: any) {
    console.error('Error in POST /api/auth/getuser:', error);
    return NextResponse.json({ error: error.message || "เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ" }, { status: 500 });
  }
} 