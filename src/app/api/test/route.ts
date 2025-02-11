import { NextResponse } from "next/server";
import { connectionPool } from "@/app/utils/db"; // ✅ ใช้ Connection Pool

export async function GET() {
  try {
    console.log("✅ API ถูกเรียก!");

    // ✅ Query Database โดยตรง
    const client = await connectionPool.connect();
    const result = await client.query("SELECT * FROM user_test");
    client.release();

    return NextResponse.json({ success: true, data: result.rows });
  } catch (error) {
    console.error("❌ API ERROR:", error);
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}
