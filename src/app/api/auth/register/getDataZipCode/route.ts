import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const cityId = searchParams.get("cityId");

    const conditionCityId = cityId ? { city_id: Number(cityId) } : undefined;

    const dataZipCode = await prisma.zipcode.findMany({
      where: conditionCityId, 
      select: {
        zipcode_id: true,
        zipcode: true,
        city: {
          select: {
            city_id: true,
            city_name: true,
          }
        }
      },
    });

    if (!dataZipCode || dataZipCode.length === 0) {
      return NextResponse.json({ message: "Data not found" }, { status: 404 });
      
    }

    return NextResponse.json({ data: dataZipCode }, { status: 200 });

  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
