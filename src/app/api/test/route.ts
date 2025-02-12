import { NextResponse } from "next/server";
// import { connectionPool } from "@/app/utils/db"; // ✅ ใช้ Connection Pool กรณี SQL raw
import { PrismaClient } from '@prisma/client' 


// export async function GET() {
//   try {
//     console.log("✅ API ถูกเรียก!");

//     // ✅ Query Database โดยตรง
//     const client = await connectionPool.connect();
//     const result = await client.query("SELECT * FROM user_test");
//     client.release();

//     return NextResponse.json({ success: true, data: result.rows });
//   } catch (error) {
//     console.error("❌ API ERROR:", error);
//     return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
//   }
// }



const prisma = new PrismaClient() // จะต้องประกาศทุกครั้งเมื่อคิวรี่ด้วย prisma

export async function GET() {
  try {
    console.log("✅ API ถูกเรียก!");

    // ✅ ใช้ Prisma Query ดึงข้อมูลจาก user_test
    const users = await prisma.user_test.findMany();

    return NextResponse.json({ success: true, data: users });
  } catch (error) {
    console.error("❌ API ERROR:", error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}