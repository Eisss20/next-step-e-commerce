import { supabase } from "@/app/utils/supabaseClient";
import { NextResponse } from "next/server";

/**
 * ประเภทข้อมูลสำหรับคำขอลงทะเบียน
 * กำหนดรูปแบบของข้อมูลที่จำเป็นสำหรับการสร้างบัญชีผู้ใช้ใหม่
 */
interface RegisterData {
    username: string;
    email: string;    // อีเมลของผู้ใช้
    password: string; // รหัสผ่านของผู้ใช้
}   

/**
 * API Endpoint สำหรับการลงทะเบียนผู้ใช้ใหม่
 * 
 * ขั้นตอนการทำงาน:
 * 1. ตรวจสอบความถูกต้องของการสมัครสมาชิก
 * 2. ลงทะเบียนผู้ใช้ใหม่ผ่าน supabase.auth.signUp
 * 3. ส่งผลลัพธ์กลับไปยังผู้ใช้ ว่าสำเร็จหรือไม่
 * 
 * - HTTP Request object จาก Next.js
 * JSON response พร้อมสถานะการลงทะเบียน
 */
export async function POST(request: Request) {
    try {
        // 1. รับและตรวจสอบข้อมูลคำขอ
        const body = await request.json() as RegisterData;
        const { username, email, password } = body;

        // 1.1 ตรวจสอบว่ามีข้อมูลที่จำเป็นครบถ้วนหรือไม่
        if (!email || !password) {
            return NextResponse.json(
                { error: "password and email are required" }, 
                { status: 400 }
            );
        }

        // 1.2 ตรวจสอบรูปแบบของอีเมล
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: "invalid email format" }, 
                { status: 400 }
            );
        }

        // 2. ลงทะเบียนผู้ใช้ใหม่
        const { data: userData, error: signUpError } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    display_name: username,
                    username: username
                }
            }
        });

        // 3. ตรวจสอบผลลัพธ์การลงทะเบียน
        if (signUpError) {
            // 3.1 ตรวจสอบว่าเป็นข้อผิดพลาดจากการที่อีเมลถูกใช้ไปแล้วหรือไม่
            if (signUpError.message.includes("email already in use")) {
                return NextResponse.json(
                    { error: "email already in use" }, 
                    { status: 400 }
                );
            }
            
            // 3.2 ข้อผิดพลาดอื่นๆ
            return NextResponse.json(
                { error: signUpError.message }, 
                { status: 400 }
            );
        }

        // 4. ส่งผลลัพธ์สำเร็จกลับไปยังผู้ใช้
        return NextResponse.json(
            { 
                message: "registration successful", 
                user: { 
                    id: userData?.user?.id,
                    email: userData?.user?.email 
                } 
            }, 
            { status: 201 }
        );
    } catch (error) {
        // 5. จัดการ error
        console.error("Registration error:", error);
        return NextResponse.json(
            { error: "registration error" }, 
            { status: 500 }
        );
    }
}
