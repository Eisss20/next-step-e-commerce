import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {

    const searchParams = request.nextUrl.searchParams;
    const provinceId = searchParams.get("provinceId");

    const conditionProvinceId = provinceId ? { province_state_id: Number(provinceId) } : undefined;

    const dataCity = await prisma.city.findMany({
      where: conditionProvinceId,
      select: {
        city_id: true,
        city_name: true,
        province_state: {
          select: {
            province_state_id: true,
            province_state_name: true,
          }
        }
      }
    });

    if (!dataCity || dataCity.length === 0) {
      return NextResponse.json({ message: "Data not found" }, { status: 404 });
    }
    return NextResponse.json({ data: dataCity }, { status: 200 });
    console.log(dataCity);
    return NextResponse.json(dataCity);
  } catch (error) {
    console.error("❌ Error in GET city:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

