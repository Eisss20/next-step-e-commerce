import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    // ✅ แก้ตรงนี้ ไม่ต้อง destructuring
    const searchParams = request.nextUrl.searchParams;
    const provinceId = searchParams.get("provinceId");

    // ✅ แปลงเป็น number เพื่อความแม่นยำ
    const conditionProvinceId = provinceId ? { province_state_id: Number(provinceId) } : undefined;

    const dataCity = await prisma.province_state.findMany({
      where: conditionProvinceId,
      select: {
        province_state_id: true,
        location_id: true,
        location: {
          select: {
            location_id: true,
            location_name: true,
          }
        }
      }
    });

    if (!dataCity || dataCity.length === 0) {
      return NextResponse.json({ message: "Data not found" }, { status: 404 });
    }

    return NextResponse.json(dataCity);
  } catch (error) {
    console.error("❌ Error:", error); 
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
