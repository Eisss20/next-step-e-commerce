import { NextResponse } from "next/server";
import { supabase } from "@/app/utils/supabaseClient";



// ขั้นตอนการทำงาน
// 1. รับข้อมูลจากผู้ใช้
// 2. ตรวจสอบความถูกต้องของข้อมูล
// 3. ลงทะเบียนผู้ใช้ใหม่
// 4. ส่งผลลัพธ์กลับไปยังผู้ใช้
// endpoint สำหรับการเข้าสู่ระบบ /api/auth/register/login


export async function POST(request: Request) {
    try {
        const { email, password,display_name } = await request.json();
        
        if (!email || !password || !display_name) {
            return NextResponse.json(
                { error: "Email และ password และ Username จำเป็นต้องระบุ" }, 
                { status: 400 }
            );
        }
        
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        
        if (error) {
            return NextResponse.json(
                { error: error.message }, 
                { status: 401 }
            );
        }
        
        // ส่งคืนเฉพาะข้อมูลที่จำเป็น
        return NextResponse.json({
            user: {
                id: data.user.id,
                email: data.user.email,
                user_metadata: data.user.user_metadata
            },
            access_token: data.session.access_token,
            refresh_token: data.session.refresh_token,
            expires_at: data.session.expires_at
        });
    } catch (error: any) {
        console.error('Login error:', error);
        return NextResponse.json(
            { error: error.message || "เกิดข้อผิดพลาดในการเข้าสู่ระบบ" }, 
            { status: 500 }
        );
    }
}