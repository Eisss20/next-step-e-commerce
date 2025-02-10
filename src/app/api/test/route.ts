import { NextResponse } from "next/server";
import { connectionPool } from "@/app/utils/db";
import { supabase } from "@/app/utils/supabaseClient"; // ✅ Import Supabase Client

export async function GET() { // ✅ Named Export (GET)
  try {
    console.log("✅ API ถูกเรียก!");

    // ✅ ใช้ Supabase Client ดึงข้อมูลจาก Supabase
    const { data, error } = await supabase.from("user_test").select("*");
    if (error) {
      throw error;
    }

    // ✅ ใช้ Connection Pool ดึงข้อมูลจาก PostgreSQL โดยตรง
    const client = await connectionPool.connect();
    const dbResult = await client.query("SELECT * FROM user_test");
    client.release();

    return NextResponse.json({
      success: true,
      data: {
        supabase: data, // ข้อมูลจาก Supabase API
        database: dbResult.rows, // ข้อมูลจาก PostgreSQL โดยตรง
      },
    });
  } catch (error) {
    console.error("❌ API ERROR:", error);
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}
